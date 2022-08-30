import React from "react";
import { useNavigate } from 'react-router-dom';

const NavbarLanding = (props) => {

    const navigate = useNavigate();

    return <div>
        <div>
            <nav class="navbar navbar-expand-xl navbar-light bg-transparent position-absolute w-100 d-flex">
                <div class="container-fluid">
                    <div id="logo">
                        <a class="navbar-brand fs-1 fw-bold text-light" href="#">Hello Hello</a>
                    </div>
                    <div id="btn" class="d-flex justify-content-end">
                        <button id="signup" class="btn" type="submit" onClick={() => navigate('/register')}>Sign Up</button>
                        <button id="signin" class="btn" type="submit" onClick={() => navigate('/login')}>Sign In</button>
                    </div>
                </div>
            </nav>
        </div>
    </div>
}

export default NavbarLanding;