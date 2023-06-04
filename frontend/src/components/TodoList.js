import React, { useEffect } from 'react';
import { Container, ListGroup, Button, ListGroupItem } from 'reactstrap';
import {CSSTransition, TransitionGroup } from 'react-transition-group';
import { connect } from 'react-redux';
import { getItems, deleteItem } from '../actions/itemActions';
import { PropTypes } from 'prop-types';

function TodoList(props) {

    useEffect(() => {
        props.getItems();
    }, []);

    function onDeleteClick(id) {
        props.deleteItem(id);
    };

    const { items } = props.item;
    function getTodoList() {
        return (
            <Container>
                <ListGroup>
                    <TransitionGroup className="todo-list">
                        {items.map(({ _id, name}) => (
                            <CSSTransition key={_id} timeout={500} classNames="fade">
                                <ListGroupItem>
                                    <Button
                                        className="remove-btn"
                                        color="danger"
                                        size="sm"   
                                        onClick={() => onDeleteClick(_id)}
                                    >&times;</Button>
                                    {name}
                                </ListGroupItem>
                            </CSSTransition>
                        ))}
                    </TransitionGroup>
                </ListGroup>
            </Container>
        );
    }

    return getTodoList();
}


TodoList.propTypes = {
    getItems: PropTypes.func.isRequired,
    item: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    item: state.item
});

export default connect(
    mapStateToProps,
    { getItems, deleteItem }
)(TodoList);