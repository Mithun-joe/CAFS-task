import React, {Fragment,useEffect} from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import {getProfiles} from "../../actions/profile";
import Spinner from "../layout/Spinner";
import {deleteProfile} from "../../actions/profile";


const Table = ({getProfiles,deleteProfile, profile:{profile,profiles,loading}}) => {


    useEffect(()=>{
        getProfiles();
    },[profile]);

    // const profileData = profiles.length > 0 ?
    //     (profiles.map(pro =>(
    //             <td key={pro._id}>
    //                 <td>{pro.mobileNo}</td>
    //                 <td className='hide-sm'>{pro.role}</td>
    //                 <td>
    //                     <Moment format='YYYY/MM/DD'>{pro.dob}</Moment>
    //                 </td>
    //             </td>
    //         ))):'';
    //
    // console.log(profileData);

    return(
        <Fragment>
            {loading ? <Spinner/> : <Fragment>
                <h2 className='my-2'>User Profiles</h2>
                <table className='table'>
                    <thead>
                    <tr>
                        <th >MobileNo</th>
                        <th className='hide-sm'>Gender</th>
                        <th className='hide-sm'>Role</th>
                        <th className='hide-sm'>Email</th>
                        <th className='hide-sm'>Date of birth</th>
                        <th className='hide-sm'>Skills</th>
                        <th className='hide-sm'>button</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        profiles && profiles.length > 0 ? (profiles.map(pro =>(
                            <tr key={pro._id}>
                                <td>{pro.mobileNo}</td>
                                <td className='hide-sm'>{pro.gender}</td>
                                <td className='hide-sm'>{pro.role}</td>
                                <td className='hide-sm'>{pro.email}</td>
                                <td className='hide-sm'><Moment format='YYYY/MM/DD'>{pro.dob}</Moment></td>
                                <td className='hide-sm'>{pro.skills.join(',')}</td>
                                <td>
                                    <button onClick={() => deleteProfile(pro._id)} className='btn btn-danger'>
                                       Delete
                                    </button>
                                </td>
                            </tr>
                        ))):(<td>no profile found</td>)
                    }
                    </tbody>
                </table>
            </Fragment>}


        </Fragment>
    )
};

Table.propTypes ={
    deleteProfile : PropTypes.func.isRequired,
    getProfiles : PropTypes.func.isRequired,
    profile : PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    profile : state.profile
});

export default connect(mapStateToProps,{getProfiles,deleteProfile})(Table)