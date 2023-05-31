import React, { Component, useState } from 'react';

import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    Container,
    NavLink
} from 'reactstrap';

function NavBarComp(props) {

    // set initial state to false i.e. collapsed nav bar toggler
    const [show, setShow] = useState(false);

    function getNavBar() {
        return (
            <>
                <Navbar color="dark" dark expand="xl" className="mb-5">
                    <Container>
                        <NavbarBrand href='/'>My List</NavbarBrand>
                        <NavbarToggler onClick={() => setShow(!show)}></NavbarToggler>
                        <Collapse isOpen={show} navbar>
                            <Nav className="ml-auto" navbar> 
                                <NavItem>
                                    <NavLink href="htttp://google.com.au">Google</NavLink>
                                </NavItem>
                            </Nav>
                        </Collapse>
                    </Container>
                </Navbar>
            </>
        );
    }

    return getNavBar();
}

export default NavBarComp;