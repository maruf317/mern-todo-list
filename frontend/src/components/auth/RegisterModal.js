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
import { register } from "../../actions/authActions";
import { clearErrors } from "../../actions/errorActions";

function RegisterModal(props) {
  // This state refers to the state of this modal.
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState(null);
  const [show, setShow] = useState(false);

  const toggle = useCallback(() => {
    props.clearErrors();
    setShow(!show);
  }, [props.clearErrors, show]);

  useEffect(() => {
    if (props.error.id === "REGISTER_FAIL") {
      setMsg(props.error.msg.msg);
    } else {
      setMsg(null);
    }

    // If authenticated, close the modal.
    if (show && props.isAuthenticated) {
      toggle();
    }
  }, [props.error, show, toggle, props.isAuthenticated]);

  const handleNameChange = (e) => setName(e.target.value);
  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  function onSubmit(e) {
    e.preventDefault();

    // Create User
    const newUser = {
      name,
      email,
      password,
    };

    console.log(newUser);

    // Attempt to register new user
    props.register(newUser);
  }

  function getRegisterModal() {
    return (
      <div>
        <NavLink onClick={toggle} href="#">
          Register
        </NavLink>
        <Modal isOpen={show} toggle={toggle}>
          <ModalHeader toggle={toggle}>Register</ModalHeader>
          <ModalBody>
            {msg ? <Alert color="danger">{msg}</Alert> : null}
            <Form onSubmit={onSubmit}>
              <FormGroup>
                <Label for="name">Name</Label>
                <Input
                  type="text"
                  name="name"
                  id="name"
                  placeholder="Name"
                  className="mb-3"
                  onChange={handleNameChange}
                />

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
                  Register
                </Button>
              </FormGroup>
            </Form>
          </ModalBody>
        </Modal>
      </div>
    );
  }

  return getRegisterModal();
}

RegisterModal.propTypes = {
  isAuthenticated: PropTypes.bool,
  error: PropTypes.object.isRequired,
  register: PropTypes.func.isRequired,
  clearErrors: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  error: state.error,
});

export default connect(mapStateToProps, {
  register,
  clearErrors,
})(RegisterModal);
