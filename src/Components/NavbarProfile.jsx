import React from "react";
import { useNavigate } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { logoutAction } from "../Actions/userAction";

const NavbarProfile = (props) => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    return <div className="d-flex justify-content-between">
        <div className="ms-3 mb-3">
            <a id="logo" class="fs-1 fw-bold text-dark" href="#" onClick={() => navigate('/')}>Hello Hello</a>
        </div>
        <div className="align-items-center mt-3 me-3">
            <button id="signup" class="btn" type="submit" onClick={() => navigate('/home')}>Home</button>
            <button id="signin" class="btn" type="submit" onClick={() => dispatch(logoutAction(), navigate('/'))}>Logout</button>
        </div>
    </div>
}

export default NavbarProfile;