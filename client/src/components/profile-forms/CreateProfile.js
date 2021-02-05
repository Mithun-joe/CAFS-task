import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { createProfile } from "../../actions/profile";
import { Link, withRouter } from 'react-router-dom'

const CreateProfile = ({ close, createProfile, history }) => {
    const [formData, setformData] = useState({
        mobileNo: '',
        gender: 'male',
        role: '',
        skills: '',
        email: '',
        dob: ''
    });

    const [selectedFile, setSelectedFile] = useState(null)

    const {
        mobileNo,
        gender,
        role,
        skills,
        email,
        dob
    } = formData;

    const onChange = (e) => setformData({ ...formData, [e.target.name]: e.target.value });

    const onFileChange = (e) => {
        setSelectedFile(e.target.files[0])
    };

    const onSelect = (e) => {
        setformData({ ...formData, gender: e.target.value });
    };
    const onSubmit = (e) => {
        e.preventDefault();
        createProfile(formData, history)
    };

    return (
        <Fragment>
            <div className='container'>
                <h1 className="large text-primary">Create Profile</h1>
                <p className="lead">
                    <i className="fas fa-user"></i> Let's get some information to make your
                profile stand out
            </p>
                <small>* = required field</small>
                <form className="form" onSubmit={e => onSubmit(e)}>
                    <div className="form-group">
                        <select name="role" value={role} onChange={e => onChange(e)}>
                            <option value="0">* Select Status</option>
                            <option value="Admin">Admin</option>
                            <option value="User">User</option>
                        </select>
                        <small className="form-text"
                        >Select whether you are a admin or user</small
                        >
                    </div>
                    <div className="form-group">
                        <input type="text" placeholder="Mobile Number" name="mobileNo" value={mobileNo} onChange={e => onChange(e)} />
                        <small className="form-text"
                        >Could be your own company or one you work for</small
                        >
                    </div>
                    <div className="form-group" >
                        <div className='radio'>
                            <label>
                                <input type='radio' value='male' onChange={e => onSelect(e)} checked={gender === 'male'} />
                                {' '} Male
                        </label>
                        </div>
                        <div className='radio'>
                            <label>
                                <input type='radio' value='female' onChange={e => onSelect(e)} checked={gender === 'female'} />
                                {' '} female
                        </label>
                        </div>
                        <div className='radio'>
                            <label>
                                <input type='radio' value='others' onChange={e => onSelect(e)} checked={gender === 'others'} />
                                {''} others
                        </label>
                        </div>
                    </div>
                    <div className="form-group">
                        <input type="text" placeholder="* Skills" name="skills" value={skills} onChange={e => onChange(e)} />
                        <small className="form-text"
                        >Please use comma separated values (eg.
                        HTML,CSS,JavaScript,PHP)</small
                        >
                    </div>
                    <div className="form-group">
                        <input
                            type="email"
                            placeholder="Email"
                            name="email"
                            value={email}
                            onChange={e => onChange(e)}
                        />
                        <small className="form-text"
                        >Please Enter your Email address</small
                        >
                    </div>
                    <div className="form-group">
                        <input type='file' placeholder="resume" name="file" onChange={e => onFileChange(e)}></input>
                        <small className="form-text">Tell us a little about yourself</small>
                    </div>

                    <div className="form-group">
                        <input type='date' placeholder="Date of birth" name="dob" value={dob} onChange={e => onChange(e)}></input>
                        <small className="form-text">please enter your date of birth</small>
                    </div>


                    <input onClick={close} type="submit" className="btn btn-primary my-1" />
                    <Link className="btn btn-light my-1" to="/dashboard">Go Back</Link>
                </form>
            </div>
        </Fragment>
    )
};

CreateProfile.propTypes = {
    createProfile: PropTypes.func.isRequired
};




export default connect(null, { createProfile })(withRouter(CreateProfile));