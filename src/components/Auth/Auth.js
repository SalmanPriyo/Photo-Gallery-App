import React, { Component } from 'react';
import { Alert } from 'reactstrap';
import { Formik } from 'formik';
import { connect } from 'react-redux';
import { auth } from '../../redux/authActionCreator';
import Spiner from '../Spinner/Spiner';

const mapDispatchToProps = dispatch => {
    return {
        auth: (email, password, mode) => dispatch(auth(email, password, mode))
    }
}

const mapStateToProps = state => {
    return {
        authLoading: state.authLoading,
        authMsgFailed: state.authMsgFailed
    }
}

class Auth extends Component {
    state = {
        mode: "Sign Up"
    }

    switchMoodHandler = () => {
        this.setState({
            mode: this.state.mode === "Sign Up" ? "Log In" : "Sign Up"
        })
    }
    render() {
        let error = null;
        if (this.props.authMsgFailed !== null) {
            error = <Alert color="danger">{this.props.authMsgFailed}</Alert>
        }
        let form = null;

        if (this.props.authLoading) {
            form = <Spiner />
        } else {
            form =
                <Formik
                    initialValues={
                        {
                            email: "",
                            password: "",
                            confirmPassword: ""
                        }
                    }
                    onSubmit={
                        (values) => {
                            this.props.auth(values.email, values.password, this.state.mode);
                        }
                    }

                    validate={(values) => {
                        const errors = {}

                        if (!values.email) {
                            errors.email = "Required"
                        } else if (!/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/.test(values.email)) {
                            errors.email = "Invalid Email"
                        }

                        if (!values.password) {
                            errors.password = "Required"
                        } else if (values.password.length < 4) {
                            errors.password = "Password must contain at least 4 characters"
                        }

                        if (this.state.mode === "Sign Up") {
                            if (!values.confirmPassword) {
                                errors.confirmPassword = "Required"
                            } else if (values.password !== values.confirmPassword) {
                                errors.confirmPassword = "Password did not match"
                            }
                        }
                        console.log(errors);
                        return errors;
                    }}
                >

                    {({ values, handleChange, handleSubmit, errors }) => (
                        <div className="my-3">
                            <p style={{ textAlign: "center", fontSize: "30px", fontWeight: "bold" }}>Welcome to Hotel SeaShore</p><hr />
                            <p style={{ fontSize: "13px", fontWeight: "bold" }}>Please sign up or log in to place your booking!</p><br /><br />

                            <form onSubmit={handleSubmit}>
                                <div>
                                    <div className="container row">
                                        <div className="col-md-4">
                                            <h5>Email Address :</h5>
                                        </div>
                                        <div className="col-md-8">
                                            <input name="email" value={values.email} className="form-control" placeholder="enter your email address" onChange={handleChange} />
                                            <span style={{ float: "right", color: "red" }}>{errors.email}</span>
                                            <br />
                                        </div>
                                    </div>

                                    <div className="container row">
                                        <div className="col-md-4">
                                            <h5>Password :</h5>
                                        </div>
                                        <div className="col-md-8">
                                            <input name="password" value={values.password} className="form-control" placeholder="set your password" onChange={handleChange} />
                                            <span style={{ float: "right", color: "red" }}>{errors.password}</span>
                                            <br />
                                        </div>

                                    </div>

                                    {this.state.mode === "Sign Up" ?
                                        <div className="container row">
                                            <div className="col-md-4">
                                                <h5>Confirm Password :</h5>
                                            </div>
                                            <div className="col-md-8">
                                                <input name="confirmPassword" value={values.confirmPassword} className="form-control" placeholder="confirm password" onChange={handleChange} />
                                                <span style={{ float: "right", color: "red" }}>{errors.confirmPassword}</span>
                                                <br />
                                            </div>
                                        </div> : null}

                                    <div style={{ textAlign: "center" }}>
                                        <button style={{ background: "linear-gradient(to right, #0f2027, #203a43, #2c5364)", color: "white", marginBottom: "20px" }} className="btn btn-lg" type="submit">{this.state.mode === "Sign Up" ? "Sign Up" : "Log In"}</button>
                                    </div>
                                    <button style={{ background: "linear-gradient(to right, #0f2027, #203a43, #2c5364)", color: "white", marginBottom: "20px", marginLeft: "10px" }} className="btn form-control" onClick={this.switchMoodHandler}>{this.state.mode === "Sign Up" ? "Already have an account, Log in" : "Don't have an account, Create now"}</button>
                                </div>
                            </form>
                        </div>
                    )}


                </Formik>
        }


        return (
            <div>
                {error}
                {form}
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);