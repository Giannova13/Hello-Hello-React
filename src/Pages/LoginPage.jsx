import React from "react";
import { useNavigate } from 'react-router-dom';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import Axios from 'axios';
import { API_URL } from "../helper";
import { useToast } from '@chakra-ui/react';
import { loginAction } from '../Actions/userAction';
import { useDispatch } from 'react-redux';
import NavbarRegLog from '../Components/NavbarRegLog'

const LoginPage = (props) => {

    const [visible, setVisible] = React.useState('password');

    const navigate = useNavigate();
    const toast = useToast()
    const dispatch = useDispatch();

    const [email, setEmail] = React.useState();
    const [password, setPassword] = React.useState();

    const [passValidate, setPassValidate] = React.useState('')

    const onLogin = () => {
        console.log(email, password);
        Axios.get(API_URL + `/users?email=${email}&password=${password}`)
            .then((res) => {
                console.log(res.data)
                localStorage.setItem('HelloLog', res.data[0].id);
                dispatch(loginAction(res.data[0]));
                navigate('/home', { replace: true });
                toast({
                    title: "You are logged",
                    description: `Welcome to Hello-Hello`,
                    status: "success",
                    duration: 3000,
                    isClosable: true
                })
            }).catch((err) => {
                console.log(err);
                toast({
                    title: "Login failed",
                    description: `Incorrect email or password`,
                    status: "error",
                    duration: 3000,
                    isClosable: true
                })
            })
    }

    const passValidation = (e) => {
        console.log(e.target.value);
        const passInp = e.target.value;
        setPassword(passInp);

        if (setPassword === password) {
            setPassValidate('')
        } else {
            setPassValidate(`Password doesn't match`)
        }




    }

    const onVisibility = () => {
        if (visible == "password") {
            setVisible("text")
        } else if (visible == "text") {
            setVisible("password")
        }
    }

    return <div id="bg-login">
        <div><NavbarRegLog /></div>
        <div class="card col-lg-4 container shadow">
            <div class="card-body">
                <h3 className="text-center mb-5 fw-bold fs-5">Sign in to your account</h3>
                <br></br>
                <label class="form-label fw-bold text-muted">Email or Username</label>
                <input type="email" class="form-control" onChange={(e) => { setEmail(e.target.value) }} />
                <br></br>
                <label class="form-label fw-bold text-muted">Password</label>
                <div className="input-group border rounder">
                    <input type={visible} class="form-control border-0" onChange={(e) => { passValidation(e) }} />
                    <span className="input-group-text bg-transparent border-0" onClick={onVisibility}>

                        {
                            visible == "password" ? <AiOutlineEye /> : <AiOutlineEyeInvisible />
                        }

                    </span>
                </div>
                <br></br>
                <div className="d-flex justify-content-center">
                    <p>Don't have an account? <a href="/register" className="text-primary fw-bold">Sign Up</a></p>
                </div>
                <br />
                <div className="d-flex justify-content-center">
                    <button id="btn-signin" type="button" class="btn fw-bold w-100 shadow" onClick={onLogin}>Sign In</button>
                </div>
            </div>
        </div>
    </div>
}

export default LoginPage;