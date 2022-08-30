import React from "react";
import { useNavigate } from 'react-router-dom';

const NavbarRegLog = (props) => {

    const navigate = useNavigate();

    return <div>
        <div className="d-flex justify-content-center mb-3">
            <a id="logo" class="navbar-brand fs-1 fw-bold text-light" href="#" onClick={() => navigate('/')}>Hello Hello</a>
        </div>
    </div>
}

export default NavbarRegLog;