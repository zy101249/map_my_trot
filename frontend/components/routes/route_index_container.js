import React from 'react';
import { connect } from 'react-redux';
import RouteIndex from './route_index';
import { fetchRoutes, deleteRoute } from '../../actions/route_actions';
import { clearErrors } from '../../actions/error_actions';

const mapStateToProps = ({ routes }) => ({
  routes: Object.keys(routes).reverse().map(key => routes[key]),
});

const mapDispatchToProps = (dispatch) => ({
  fetchRoutes: (offset) => dispatch(fetchRoutes(offset)),
  deleteRoute: (id) => dispatch(deleteRoute(id)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RouteIndex);
