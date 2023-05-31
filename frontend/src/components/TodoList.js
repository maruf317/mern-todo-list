import React, { Component, useState } from 'react';
import { Container, ListGroup, ListGroupButton, Button, ListGroupItem } from 'reactstrap';
import {CSSTransition, TransitionGroup } from 'react-transition-group';
import {v4 as  uuid} from 'uuid';

function TodoList(props) {

    const [list, setList] = useState([
        { id: uuid(), name: 'Eggs' },
        { id: uuid(), name: 'Milk' },
        { id: uuid(), name: 'Bread' },
        { id: uuid(), name: 'Meat' }]);

    function getTodoList() {
        return (
            <Container>
                <Button 
                color="dark"
                style={{marginBottom: '2rem'}}
                onClick={() => {
                    const name = prompt('Enter Item');
                    if(name) {
                        setList([...list, { id: uuid(), name}]);
                    }
                }}
                >Add Item</Button>

                <ListGroup>
                    <TransitionGroup className="todo-list">
                        {list.map(({ id, name}) => (
                            <CSSTransition key={id} timeout={500} classNames="fade">
                                <ListGroupItem>
                                    <Button
                                        className="remove-btn"
                                        color="danger"
                                        size="sm"   
                                        onClick={() => {
                                            setList(list => list.filter(item => item.id !== id))
                                        }}
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

export default TodoList;