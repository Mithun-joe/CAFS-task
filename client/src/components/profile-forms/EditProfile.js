import React, {Fragment, useState , useEffect} from 'react';
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import {createProfile , getCurrentProfile} from "../../actions/profile";
import {Link, withRouter} from 'react-router-dom'

const EditProfile = ({createProfile, getCurrentProfile, profile:{profile,loading}, history}) => {
    const [formData,setformData] = useState({
        mobileNo:'',
        gender:'',
        role: '',
        skills: '',
        email: '',
        resume: '',
        dob:''
    });

    const[displaySocialInputs,toggleSocialInputs] = useState(false);

    useEffect(()=>{
        getCurrentProfile();

        setformData({
            mobileNo: loading || !profile.mobileNo ? '' : profile.mobileNo,
            gender: loading || !profile.gender ? '' : profile.gender,
            role: loading || !profile.role ? '' : profile.role,
            email: loading || !profile.email ? '' : profile.email,
            status: loading || !profile.status ? '' : profile.status,
            githubusername: loading || !profile.githubusername ? '' : profile.githubusername,
            skills: loading || !profile.skills ? '' : profile.skills.join(',')
        })
    },[loading]);

    const {
        mobileNo,
        gender,
        role,
        skills,
        email,
        resume,
        dob
    } = formData;

    const onChange = (e) => setformData({...formData,[e.target.name]:e.target.value});

    const onSubmit = (e) => {
        e.preventDefault();
        createProfile(formData,history,true);

    };

    return(
        <Fragment>
            <h1 className="large text-primary">
                Create Your Profile
            </h1>
            <p className="lead">
                <i className="fas fa-user"></i> Let's get some information to make your
                profile stand out
            </p>
            <small>* = required field</small>
            <form className="form" onSubmit={e => onSubmit(e)}>
                <div className="form-group">
                    <select name="role" value={role} onChange={e=>onChange(e)}>
                        <option value="0">* Select Status</option>
                        <option value="Admin">Admin</option>
                        <option value="User">User</option>
                    </select>
                    <small className="form-text"
                    >Select whether you are a admin or user</small
                    >
                </div>
                <div className="form-group">
                    <input type="text" placeholder="Mobile Number" name="mobileNo" value={mobileNo} onChange={e=>onChange(e)}/>
                    <small className="form-text"
                    >Could be your own company or one you work for</small
                    >
                </div>
                <div className="form-group">
                    <input type="text" placeholder="Gender" name="gender" value={gender} onChange={e=>onChange(e)}/>
                    <small className="form-text"
                    >Could be your own or a company website</small
                    >
                </div>
                <div className="form-group">
                    <input type="text" placeholder="* Skills" name="skills" value={skills} onChange={e=>onChange(e)}/>
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
                        onChange={e=>onChange(e)}
                    />
                    <small className="form-text"
                    >Please Enter your Email address</small
                    >
                </div>
                <div className="form-group">
                    <input type='text' placeholder="resume" name="resume" value={resume} onChange={e=>onChange(e)}></input>
                    <small className="form-text">Tell us a little about yourself</small>
                </div>

                <div className="form-group">
                    <input type='text' placeholder="Date of birth" name="dob" value={dob} onChange={e=>onChange(e)}></input>
                    <small className="form-text">please enter your date of birth</small>
                </div>



                <input type="submit" className="btn btn-primary my-1"/>
                <Link className="btn btn-light my-1" to="/dashboard">Go Back</Link>
            </form>
        </Fragment>
    )
};

EditProfile.propTypes = {
    createProfile: PropTypes.func.isRequired,
    getCurrentProfile: PropTypes.func.isRequired,
    profile:PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    profile: state.profile,

});


export default connect(mapStateToProps,{createProfile,getCurrentProfile})(withRouter(EditProfile));