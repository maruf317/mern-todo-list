/**
 * This modal is used to accept user input when adding new items to the list.
 * The modal provides a nice pop-up form for the user to fill in.
 */

import React, { useState, useEffect, useCallback } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input,
  NavLink,
  Alert,
} from "reactstrap";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { login } from "../../actions/authActions";
import { clearErrors } from "../../actions/errorActions";

function LoginModal(props) {
  // This state refers to the state of this modal.
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState(null);
  const [show, setShow] = useState(false);

  const toggle = useCallback(() => {
    props.clearErrors();
    setShow(!show);
  }, [props.clearErrors, show]);

  useEffect(() => {
    if (props.error.id === "LOGIN_FAIL") {
      setMsg(props.error.msg.msg);
    } else {
      setMsg(null);
    }

    // If authenticated, close the modal.
    if (show && props.isAuthenticated) {
      toggle();
    }
  }, [props.error, show, toggle, props.isAuthenticated]);

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  function onSubmit(e) {
    e.preventDefault();

    const user = {
      email: email,
      password: password,
    };

    // Attempt to login
    props.login(user);
  }

  function getLoginModal() {
    return (
      <div>
        <NavLink onClick={toggle} href="#">
          Login
        </NavLink>
        <Modal isOpen={show} toggle={toggle}>
          <ModalHeader toggle={toggle}>Login</ModalHeader>
          <ModalBody>
            {msg ? <Alert color="danger">{msg}</Alert> : null}
            <Form onSubmit={onSubmit}>
              <FormGroup>
                <Label for="email">Email</Label>
                <Input
                  type="text"
                  name="email"
                  id="email"
                  placeholder="Email"
                  className="mb-3"
                  onChange={handleEmailChange}
                />

                <Label for="password">Password</Label>
                <Input
                  type="text"
                  name="password"
                  id="password"
                  placeholder="Password"
                  className="mb-3"
                  onChange={handlePasswordChange}
                />

                <Button color="dark" style={{ marginTop: "2rem " }} block>
                  Login
                </Button>
              </FormGroup>
            </Form>
          </ModalBody>
        </Modal>
      </div>
    );
  }

  return getLoginModal();
}

LoginModal.propTypes = {
  isAuthenticated: PropTypes.bool,
  error: PropTypes.object.isRequired,
  login: PropTypes.func.isRequired,
  clearErrors: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  error: state.error,
});

export default connect(mapStateToProps, {
  login,
  clearErrors,
})(LoginModal);
