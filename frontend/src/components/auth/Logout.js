import React, { Fragment } from "react";
import { connect } from "react-redux";
import { logout } from "../../actions/authActions";
import { NavLink } from "reactstrap";
import PropTypes from "prop-types";

function Logout(props) {
  function getLogout() {
    return (
      <Fragment>
        <NavLink onClick={props.logout} href="#">
          Logout
        </NavLink>
      </Fragment>
    );
  }

  return getLogout();
}

Logout.propTypes = {
  logout: PropTypes.func.isRequired,
};

export default connect(null, {
  logout,
})(Logout);
