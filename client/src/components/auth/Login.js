import React, {Fragment, useState} from 'react';
import {Link} from "react-router-dom";

const Login = () => {

    const [ formData , setFormData] = useState({
        mobileNo:'',
        password:'',
    });

    const {mobileNo,password} = formData;

    const onChange = (e) => setFormData({...formData,[e.target.name]:e.target.value});

    const onSubmit = (e) =>{
        e.preventDefault();
        console.log('Success')
    };

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
                </form>
                <p className="my-1">
                    Dont have a account <Link to="/register">Sign up</Link>
                </p>
            </section>
        </Fragment>
    )
}

export default  Login