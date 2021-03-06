import axios from 'axios';
import {setAlert} from "./alert";
import {
    CLEAR_PROFILE,
    GET_PROFILE,
    PROFILE_ERROR,
    UPDATE_PROFILE,
    GET_PROFILES,
    ACCOUNT_DELETED
} from "./type";

//Get the current users profile
export const getCurrentProfile = () => async dispatch => {
    try{
        const res = await axios.get('/api/profile/me');
        dispatch({
            type:GET_PROFILE,
            payload:res.data
        })
    }catch (err) {
        dispatch({
            type:PROFILE_ERROR,
            payload: {msg : err.response.statusText,status:err.response.status}
        })
    }
};

export const getProfiles = () => async dispatch => {
    dispatch({type:CLEAR_PROFILE});
    try{
        const res = await axios.get('api/profile');
        dispatch({
            type:GET_PROFILES,
            payload:res.data
        })
    }catch (err) {
        dispatch({
            type:PROFILE_ERROR,
            payload: {msg : err.response.statusText,status:err.response.status}
        })
    }
};


//update a profile
export const createProfile = (formData,history,edit=false)=> async dispatch =>{
    try{
        const config = {
            headers: {
                'Content-Type':'application/json'
            }
        };

        const res = await axios.post('/api/profile',formData,config);

        dispatch({
            type:GET_PROFILE,
            payload:res.data
        });
        dispatch(setAlert(edit? 'Profile updated' : 'Profile created','success'));
        history.push('/dashboard');
    }catch (err) {
        const errors = err.response.data.errors;

        if (errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        }
        dispatch({
            type:PROFILE_ERROR,
            payload:{msg:err.response.statusText,status:err.response.status}
        })
    }
};

export const deleteProfile = (id) => async dispatch => {

    try{
        const res = await axios.delete(`/api/profile/${id}`);

        dispatch({
            type:UPDATE_PROFILE,
            payload:res.data
        });

        dispatch(setAlert('Profile Deleted','success'))

    }catch (err) {
        dispatch({
            type:PROFILE_ERROR,
            payload:{msg:err.response.statusText,status:err.response.status}
        })
    }

};

export const deleteAccount = () => async dispatch => {
    if(window.confirm('Are you sure? This can NOT be undone')){
        try{
            const res = await axios.delete('/api/profile');

            dispatch({type:CLEAR_PROFILE});
            dispatch({type: ACCOUNT_DELETED});

            dispatch(setAlert('your account has been deleted' , 'success'))
        }catch (err) {
            dispatch({type:PROFILE_ERROR,payload:{msg:err.response.statusText,status:err.response.status}})
        }
    }
}