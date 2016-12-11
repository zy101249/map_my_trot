import React from 'react';
import { merge } from 'lodash';
import { withRouter } from 'react-router';
import Shortcuts from '../shortcuts';

class LogTrot extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      route_id: "",
      name: "",
      description: "",
      date: "",
      hours: "",
      minutes: "",
      seconds: "",
      duration: "",
    };

    this._duration = this._duration.bind(this);
    this.handleTrotSubmit = this.handleTrotSubmit.bind(this);
  }

  update(field) {
		return e => this.setState({
			[field]: e.currentTarget.value
		});
	}

  componentDidMount() {
    this.props.fetchRoutes();
  }

  renderTrotForm() {
    return (
      <form className='log_trot_form'>
        <h1>LOG A TROTOUT</h1>
        <div className="log_trot_description_container group">
          <div className="dumbbell_img"></div>
          <div className="log_trot_description">
            If you've been active, get credit for it! Add your trot
            details below, and stay on top of your trotting goals.
          </div>
        </div>
        <div className="log_trot_form">
          <div className="log_trot_form_row group">
            <div className="log_trot_form_row_name">
              <span>Trot name</span>
              <input
                type='text'
                value={ this.state.name }
                onChange={ this.update('name') }
              />
            </div>
            <div className="log_trot_form_row_date group">
              <label>
                <span>Date</span>
                <div className="date_container">
                  <input type='date'
                    value={ this.state.date }
                    onChange={ this.update('date') }
                    />
                  <div className="calendar_blue_img"></div>
                </div>
              </label>
            </div>
          </div>

          <div className="duration_row group">
            <div>Duration</div>
            <input type='number'
              value={ this.state.hours }
              onChange={ this.update('hours') }
              min="0" max="999" placeholder="hh"
              />
            <span> : </span>
            <input type='number'
              value={ this.state.minutes }
              onChange={ this.update('minutes') }
              min="0" max="59" placeholder="mm"
              />
            <span> : </span>
            <input type='number'
              value={ this.state.seconds }
              onChange={ this.update('seconds') }
              min="0" max="59" placeholder="ss"
              />
          </div>

          <div className="description_row">
            <div>How did it go?</div>
            <textarea
              value={ this.state.description }
              onChange={ this.update('description') }
              placeholder='Describe your trot'
            />
          </div>
        </div>
      </form>
    );
  }

  _duration() {
    const { hours, minutes, seconds } = this.state;
    return hours + ":" + minutes + ":" + seconds;
  }

  handleTrotSubmit() {
    // this.setState({
    //   merge({}, this.state, { duration: this._duration()})},
    //   () => this.props.postTrot(this.state.trot)
    //     .then(() => this.props.router.push("/routes"))
    // );
    //
    // this.props.clearErrors();
  }

  render() {
    return (
      <div className='log_trot_container'>
        <Shortcuts />
        <div className='log_trot_form_container'>
          { this.renderTrotForm() }
          <input type='submit'
            onClick={ this.handleSubmit }
            value='Save Trot'/>
        </div>
      </div>
    );
  }
}

export default withRouter(LogTrot);
