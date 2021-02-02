import React, {Fragment, useState} from 'react';
import {Link , Redirect} from "react-router-dom";
import {connect} from "react-redux";
import PropTypes from 'prop-types';
import {login} from "../../actions/auth";


const Login = ({login,isAuthenticated}) => {

    const [ formData , setFormData] = useState({
        mobileNo:'',
        password:'',
    });

    const [demoLoginData] = React.useState({
        mobileNoDemo: '0000000',
        passwordDemo: '1234'
    });

    const {mobileNo,password} = formData;
    const {mobileNoDemo,passwordDemo} = demoLoginData;

    const onChange = (e) => setFormData({...formData,[e.target.name]:e.target.value});

    const onSubmit = (e) =>{
        e.preventDefault();
        login(mobileNo,password)
    };

    const onClick = async e => {
        e.preventDefault();
        login(mobileNoDemo,passwordDemo)
    };

    if(isAuthenticated){
        return <Redirect to='/dashboard' />
    }

    return(
        <Fragment>
            <section className="container">
                <h1 className="large text-primary">Sign In</h1>
                <p className="lead"><i className="fas fa-user"></i> Sign Your Account</p>
                <form className="form" onSubmit={e => onSubmit(e)} action="create-profile.html">
                    <div className="form-group">
                        <input type="text" placeholder="Mobile Number" value={mobileNo} onChange={e=>onChange(e)} name="mobileNo"/>
                    </div>
                    <div className="form-group">
                        <input
                            type="password"
                            placeholder="Password"
                            name="password"
                            value={password}
                            onChange={e=>onChange(e)}
                            minLength="4"
                        />
                    </div>
                    <input type="submit" className="btn btn-primary" value="Login"/>
                    <input type="submit" onClick={e=>onClick(e)} className="btn btn-primary" value="Demo login"/>
                </form>
                <p className="my-1">
                    Dont have a account <Link to="/register">Sign up</Link>
                </p>
            </section>
        </Fragment>
    )
};

Login.propTypes ={
    login : PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
    isAuthenticated : state.auth.isAuthenticated
});

export default  connect(mapStateToProps,{login})(Login)