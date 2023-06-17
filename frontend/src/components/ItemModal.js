/**
 * This modal is used to accept user input when adding new items to the list.
 * The modal provides a nice pop-up form for the user to fill in.
 */

import React, { useState } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input,
} from "reactstrap";
import PropType from "prop-types";
import { connect } from "react-redux";
import { addItem } from "../actions/itemActions";

function ItemModal(props) {
  // This state refers to the state of this modal.
  const [show, setShow] = useState(false);
  const [name, setName] = useState("");

  function toggle() {
    setShow(!show);
  }

  function onChange(e) {
    setName(e.target.value);
  }

  function onSubmit(e) {
    e.preventDefault();
    const newItem = {
      name: name,
    };
    props.addItem(newItem);
    // Close the modal
    toggle();
  }

  function getItemModal() {
    return (
      <div>
        {props.isAuthenticated ? (
          <Button
            color="dark"
            style={{ marginBottom: "2rem" }}
            onClick={() => toggle()}
          >
            Add Item
          </Button>
        ) : (
          <h4 className="mb-3 ml-4" style={{ color: "white" }}>
            Please Login
          </h4>
        )}

        <Modal isOpen={show} toggle={toggle}>
          <ModalHeader toggle={toggle}>Add To List</ModalHeader>
          <ModalBody>
            <Form onSubmit={onSubmit}>
              <FormGroup>
                <Label for="item">Item</Label>
                <Input
                  type="text"
                  name="name"
                  id="item"
                  placeholder="Add list item"
                  onChange={onChange}
                />
                <Button color="dark" style={{ marginTop: "2rem " }} block>
                  Add Item
                </Button>
              </FormGroup>
            </Form>
          </ModalBody>
        </Modal>
      </div>
    );
  }

  return getItemModal();
}

ItemModal.propTypes = {
  isAuthenticated: PropType.func.bool,
};

const mapStateToProps = (state) => ({
  item: state.item,
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { addItem })(ItemModal);
