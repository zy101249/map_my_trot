import React from 'react';
import { merge } from 'lodash';
import { withRouter } from 'react-router';
import RouteManager from './route_manager';
import moment from 'moment';
import Modal from 'react-modal';

const _getMapOptions = (pos) => ({
  center: { lat: pos.coords.latitude, lng: pos.coords.longitude },
  zoom: 17
});

const _defaultMapOptions = {
  center: {lat: 37.773972 , lng: -122.431297},
  zoom: 17
};

class CreateRoute extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      distance: "",
      origin: "",
      destination: "",
      polyline: "",
      bounds: {},
      search: "",
      modalOpen: true,
      trot: {
        route_id: "",
        description: "",
        date: moment().format('YYYY-MM-DD'),
        hours: "",
        minutes: "",
        seconds: "",
        duration: "",
      }
    };

    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);

    this.initMap = this.initMap.bind(this);
    this._duration = this._duration.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleRouteSubmit = this.handleRouteSubmit.bind(this);
    this.handleTrotSubmit = this.handleTrotSubmit.bind(this);
  }

  componentDidMount() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((pos) => {
        this.initMap(_getMapOptions(pos));
      });
    } else {
      this.initMap(_defaultMapOptions);
    }
  }

  openModal() {
    this.setState({ modalOpen: true });
  }

  closeModal() {
    this.setState({ modalOpen: false });
  }

  update(field) {
		return e => this.setState({
			[field]: e.currentTarget.value
		});
	}

  updateTrot(field) {
    return e => {
      const val = e.currentTarget.value;
      if (!(field === "seconds" && parseInt(val) >= 60) && !(field === "minutes" && parseInt(val) >= 60)) {
        this.setState({
    			trot: merge({}, this.state.trot, {[field]: e.currentTarget.value})
    		});
      }
    }
  }

  _duration() {
    const { hours, minutes, seconds } = this.state.trot;
    return hours + ":" + minutes + ":" + seconds;
  }

  initMap(mapOptions) {
    this.map = new google.maps.Map(this.mapNode, mapOptions);
    this.directionsService = new google.maps.DirectionsService;
    this.directionsDisplay = new google.maps.DirectionsRenderer({
      map: this.map,
      suppressMarkers: true,
    });
    this.RouteManager = new RouteManager(
      this.directionsDisplay,
      this.directionsService,
      this.map
    );

    this.map.addListener('click', (e) => {
      this.RouteManager.renderRoute(e.latLng);
      const bounds = JSON.stringify(this.map.getBounds());
      this.setState({bounds: bounds});
    });

    this.map.addListener('idle', (e) => {
      this.closeModal();
    });
  }

  handleTrotSubmit() {
    this.setState(
      this.RouteManager.getRouteInfo(),
      () => this.props.postRoute(this.state)
        .then(() => this.setState({
          trot:
            merge(
              {}, this.state.trot,
              { duration: this._duration(),
                route_id: this.props.route_id,
                name: this.state.name
              })
          },
          () => this.props.postTrot(this.state.trot)
          .then(() => this.props.router.push("/routes"))
    )));

    this.props.clearErrors();
  }

  handleSearch() {
    const geocoder = new google.maps.Geocoder();
    geocoder.geocode({'address': this.state.search}, (results, status) =>
      this.map.setCenter(results[0].geometry.location)
    );

    this.setState( {search: ""} );
    this.props.clearErrors();
  }

  handleRouteSubmit() {
    this.setState(
      this.RouteManager.getRouteInfo(),
      () => this.props.postRoute(this.state)
        .then(() => this.props.router.push("/routes"))
    );

    this.props.clearErrors();
  }

  searchLocForm() {
    return (
      <form className='search_loc_form'>
        <h3>Choose a map location</h3>
        <input
          type='text'
          value={ this.state.search }
          onChange={ this.update('search') }
          placeholder='Address or Zip/Postal Code'/>
        <input
          type='submit'
          onClick={ this.handleSearch }
          value='Search'/>
      </form>
    );
  }

  renderRouteForm() {
    const { routeErrors } = this.props;

    return (
      <form className='create_route_form'>
        <h2>Route Details</h2>
        <input
          type='text'
          value={ this.state.name }
          onChange={ this.update('name') }
          placeholder='Name this map'
        />
        <span>*</span>
        { (Boolean(routeErrors.name)) ?
          <div className="error_message">* Name is required</div> : "" }
        <input type='submit'
          onClick={ this.handleRouteSubmit }
          value='Save Route'/>
      </form>
    );
  }

  renderTrotForm() {
    const { trotErrors } = this.props;
    let descPlaceholder;
    if (Boolean(trotErrors.description)) {
      descPlaceholder = "Description is required";
    } else {
      descPlaceholder = "Describe your trot";
    }

    return (
      <form className='log_trot_form'>
        <h2>Log as a Trot</h2>
        <input
          type='text'
          value={ this.state.trot.description }
          onChange={ this.updateTrot('description') }
          placeholder={ descPlaceholder }
        />

      <div className="datePicker">
          <input type='number'
            value={ this.state.trot.hours }
            onChange={ this.updateTrot('hours') }
            min="0" max="999" placeholder="hh"
          />
          <span> : </span>
          <input type='number'
            value={ this.state.trot.minutes }
            onChange={ this.updateTrot('minutes') }
            min="0" max="59" placeholder="mm"
          />
          <span> : </span>
          <input type='number'
            value={ this.state.trot.seconds }
            onChange={ this.updateTrot('seconds') }
            min="0" max="59" placeholder="ss"
          />
        </div>
        <div className="date_container">
          <div id="calendar_img"></div>
          <input id="date" type='date'
            value={ this.state.trot.date }
            onChange={ this.updateTrot('date') }
          />
        { (Boolean(trotErrors.date)) ?
          <div className="error_message">* Date is required</div> : "" }
        </div>
        <input type='submit'
          onClick={ this.handleTrotSubmit }
          value='Save Route with Trot'/>
      </form>
    );
  }

  render() {
    return (
      <div className='create_route_container group'>
        <div className='create_route_forms_container group'>
          { this.searchLocForm() }
          { this.renderRouteForm() }
          { this.renderTrotForm() }
        </div>
        <div id='create_route_map' ref={ map => this.mapNode = map }/>
        <Modal
          isOpen={this.state.modalOpen}
          className="modal-content"
          overlayClassName="modal-overlay"
          contentLabel="Modal">

          <div className="map_loading_container">
            <div className="map_loading_inner">
              <p>Loading Map</p>
              <span>Please wait</span>
              <div className="loader"></div>
            </div>
          </div>
        </Modal>
      </div>
    );
  }
}

export default withRouter(CreateRoute);
