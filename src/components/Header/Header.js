import React, { Component } from 'react';
import { Navbar, NavbarBrand, NavbarToggler, Nav, NavItem, Collapse } from 'reactstrap';
import { NavLink } from 'react-router-dom';
import './Header.css';
import { connect } from 'react-redux';



const mapStateToProps = state => {
    return {
        token: state.token
    }
}




class Header extends Component {
    state = {
        isNavOpen: false
    }


    navToggle = () => {
        this.setState({
            isNavOpen: !this.state.isNavOpen
        })
    }

    render() {
        let links = null;

        if (this.props.token === null) {
            links = (
                <Nav className="ml-auto" navbar>
                    <NavItem>
                        <NavLink exact to="/login" className="Navlink">Log in</NavLink>
                    </NavItem>
                </Nav>
            )
        } else {
            links = (
                <Collapse isOpen={this.state.isNavOpen} navbar style={{ textAlign: "center" }}>
                    <Nav className="ml-auto" navbar>
                        <NavItem >
                            <NavLink exact to="/" className="Navlink">Book Now</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink exact to="/orders" className="Navlink">Bookings</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink exact to="/logOut" className="Navlink">Log Out</NavLink>
                        </NavItem>
                    </Nav>
                </Collapse>
            )
        }

        return (
            <div>
                <Navbar dark light style={{ background: "linear-gradient(to right, #0f2027, #203a43, #2c5364)" }} expand="md">
                    <div className="container">
                        <NavbarToggler onClick={this.navToggle} />
                        <NavbarBrand href="/" style={{ color: "wheat", fontSize: "30px", fontWeight: "bold" }}>Hotel SeaShore</NavbarBrand>
                        {links}
                    </div>
                </Navbar>
            </div>
        )
    }
}

export default connect(mapStateToProps)(Header);






// ------------------------------------------------------------------



// const mapStateToProps = state => {
//     return {
//         token: state.token
//     }
// }


// const Header = props => {
//     let links = null;

//     if (props.token === null) {
//         links = (
//             <Nav className="ml-auto" navbar>
//                 <NavItem>
//                     <NavLink exact to="/login" className="Navlink">Log in</NavLink>
//                 </NavItem>
//             </Nav>
//         )
//     } else {
//         links = (
//             <Nav className="ml-auto" navbar>
//                 <NavItem >
//                     <NavLink exact to="/" className="Navlink">Book Now</NavLink>
//                 </NavItem>
//                 <NavItem>
//                     <NavLink exact to="/orders" className="Navlink">Bookings</NavLink>
//                 </NavItem>
//                 <NavItem>
//                     <NavLink exact to="/logOut" className="Navlink">Log Out</NavLink>
//                 </NavItem>
//             </Nav>
//         )
//     }

//     return (
//         <div>
//             <Navbar dark light style={{ background: "linear-gradient(to right, #0f2027, #203a43, #2c5364)" }} expand="md">
//                 <div className="container">
//                     <NavbarBrand href="/" style={{ color: "wheat", fontSize: "30px", fontWeight: "bold" }}>Hotel SeaShore</NavbarBrand>
//                     {links}
//                 </div>
//             </Navbar>
//         </div>
//     )
// }

// export default connect(mapStateToProps)(Header);



