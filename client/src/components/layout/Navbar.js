import React, { Fragment } from 'react'
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import { logout } from "../../actions/auth";


const Navbar = ({ auth: { isAuthenticated, loading }, logout ,history }) => {
    const authLinks = (
        <ul>
            <li><Link to="/dashboard" style={{ textDecoration: "none" }}>
                <i className='fas fa-user'></i>{' '}
                <span className='hide-sm'>dashboard</span></Link>
            </li>
            <li>
                <Link onClick={logout} to='/' style={{ textDecoration: "none" }}>
                    <i className='fas fa-sign-out-alt'></i>{' '}
                    <span className='hide-sm'>Logout</span></Link>
            </li>
        </ul>
    );

    const guestLinks = (
        <ul>
            <li><Link to="/profiles" style={{ textDecoration: "none" }}>
                <i className='fas fa-user'></i>{' '}
                <span className='hide-sm'>Profiles</span></Link>
            </li>
            <li><Link to="/register" style={{ textDecoration: "none" }}>Register</Link></li>
            <li><Link to="/login" style={{ textDecoration: "none" }}>Login</Link></li>
        </ul>
    );
    return (
        <nav className='navbar'>
            <h1>
                <Link to='/' className='small' style={{ textDecoration: "none" }}>CRUD APP</Link>
            </h1>
            {!loading && (<Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>)}
        </nav>
    )
};

Navbar.propTypes = {
    logout: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps, { logout })(Navbar)