import React, {Fragment , useState} from 'react';
import {Link} from "react-router-dom";

const Register = () => {

    const [ formData , setFormData] = useState({
        name:'',
        mobileNo:'',
        password:'',
        password2:''
    });

    const {name,mobileNo,password,password2} = formData;

    const onChange = (e) => setFormData({...formData,[e.target.name]:e.target.value});

    const onSubmit = (e) =>{
        e.preventDefault();
        if(password !== password2){
            console.log('passwords do not match')
        }else{
            console.log('Success')
        }
    };

    return(
        <Fragment>
            <section className="container">
                <h1 className="large text-primary">Sign Up</h1>
                <p className="lead"><i className="fas fa-user"></i> Create Your Account</p>
                <form className="form" onSubmit={e => onSubmit(e)} action="create-profile.html">
                    <div className="form-group">
                        <input type="text" placeholder="Name" name="name" value={name} onChange={e=>onChange(e)} required/>
                    </div>
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
                    <div className="form-group">
                        <input
                            type="password"
                            placeholder="Confirm Password"
                            name="password2"
                            value={password2}
                            onChange={e=>onChange(e)}
                            minLength="4"
                        />
                    </div>
                    <input type="submit" className="btn btn-primary" value="Register"/>
                </form>
                <p className="my-1">
                    Already have an account? <Link to="/login">Sign In</Link>
                </p>
            </section>
        </Fragment>
    )
};

export default  Register