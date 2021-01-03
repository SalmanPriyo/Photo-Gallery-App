import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { logOut } from '../../redux/authActionCreator';


const mapDispatchToProps = dispatch => {
    return {
        logOut: () => dispatch(logOut()),
    }
}

class Logout extends Component {
    componentDidMount() {
        this.props.logOut();
    }
    render() {
        return (
            <Redirect to='/' />
        )
    }
}


export default connect(null, mapDispatchToProps)(Logout);