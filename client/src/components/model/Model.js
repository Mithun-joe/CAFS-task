import React, {Fragment,useState} from 'react';
import Modal from "react-bootstrap/cjs/Modal";
import CreateProfile from "../profile-forms/CreateProfile";
import {connect} from "react-redux";
import PropTypes from 'prop-types'
import EditProfile from "../profile-forms/EditProfile";


const Model = ({profile:{profile}}) =>{
    const [show, setShow] = useState(false);

    const handleClose = () =>{
        setShow(false)
    };

    const handleShow = () => {
        setShow(true)
    };

    return (
        <Fragment>

           { profile ? (<button className="btn btn-primary" onClick={handleShow}>
                Edit Profile
            </button>):(<div>
               <p>You have not yet setup a profile, please add some info</p>
               <button className="btn btn-primary" onClick={handleShow}>
                   Create Profile
               </button>
           </div>)}

            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>
                        {profile ? (<h1 className="medium text-primary">
                            Edit Your Profile
                        </h1>):(<h1 className="medium text-primary">
                            Create Your Profile
                        </h1>)}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {profile ? (<EditProfile close={handleClose}/>):(<CreateProfile close={handleClose}/>)}
                </Modal.Body>
            </Modal>
        </Fragment>
    )

};

Model.propTypes ={
    profile : PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    profile : state.profile
})

export default connect(mapStateToProps)(Model)