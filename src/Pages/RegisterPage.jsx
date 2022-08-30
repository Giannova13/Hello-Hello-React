import React from "react";
import { useNavigate } from 'react-router-dom';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { FcGoogle } from 'react-icons/fc';
import { API_URL } from '../helper';
import Axios from "axios";
import { useToast } from '@chakra-ui/react';
import NavbarRegLog from "../Components/NavbarRegLog";

const RegisPage = (props) => {

    const [fullname, setFullname] = React.useState('');
    const [username, setUsername] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');

    const [emailVal, setEmailVal] = React.useState(''); // Email validation

    const [repeatPassword, setRepeatPassword] = React.useState(''); // Repeat password validation
    const [isError, setIsError] = React.useState(''); // Repeat password validation

    const [visible, setVisible] = React.useState('password');
    const [visible1, setVisible1] = React.useState('password');

    const toast = useToast();

    const navigate = useNavigate();

    const onRegis = () => {
        Axios.post(API_URL + "/users", {
            fullname,
            username,
            email,
            password,
            status: "Unverified"
        }).then((res) => {
            console.log(res.data)
            if (res.data.id) {
                navigate('/', { replace: true });
                toast({
                    title: "Account created",
                    description: `You created an account`,
                    status: "success",
                    duration: 3000,
                    isClosable: true
                })
            }
        }).catch((err) => {
            console.log(err);
        })
    }

    const emailValidation = (e) => {
        console.log(e.target.value);
        const emailInp = e.target.value;
        setEmail(emailInp);
        if (email.includes("@") && email.includes(".com")) {
            setEmailVal("Email is invalid")
        } else if (email == null) {
            setEmailVal("")
        } else {
            setEmailVal("")
        }

    }


    const passValidation = (e) => {
        const repPass = e.target.value;
        setRepeatPassword(repPass);

        let check = /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/;

        if(password.match(check)){
            if (password != repPass) {
                setIsError("Repeat password should be match!");
            } else {
                setIsError(null);
            }
        } else {
            setIsError('Your password is weak');
        }

    }

    const onVisibility = () => {
        if (visible == "password") {
            setVisible("text")
        } else if (visible == "text") {
            setVisible("password")
        }
    }

    const onVisibility1 = () => {
        if (visible1 == "password") {
            setVisible1("text")
        } else if (visible1 == "text") {
            setVisible1("password")
        }
    }

    return <div id="bg-regis">
        <div><NavbarRegLog /></div>
        <div class="card col-lg-4 container shadow">
            <div class="card-body">
                <h3 className="text-center mb-5 fw-bold fs-5">Create your account</h3>
                <label class="form-label fw-bold text-muted">Fullname</label>
                <input type="text" class="form-control" placeholder="" onChange={(e) => setFullname(e.target.value)} />
                <br></br>
                <label class="form-label fw-bold text-muted">Username</label>
                <input type="text" class="form-control" placeholder="name01" onChange={(e) => setUsername(e.target.value)} />
                <br></br>
                <label class="form-label fw-bold text-muted">Email</label>
                <input type="email" class="form-control" placeholder="name01@mail.com" onChange={(e) => emailValidation(e)} />
                <br></br>
                <div id="emailVal" className="mb-1">{emailVal}</div>
                <label class="form-label fw-bold text-muted">Password</label>
                <div className="input-group border rounder">
                    <input value={password} type={visible} class="form-control border-0" onChange={(e) => setPassword(e.target.value)} />
                    <span className="input-group-text bg-transparent border-0" onClick={onVisibility}>

                        {
                            visible == "password" ? <AiOutlineEye /> : <AiOutlineEyeInvisible />
                        }

                    </span>
                </div>
                <br></br>
                <label class="form-label fw-bold text-muted">Repeat Password</label>
                <div className="input-group border rounder">
                    <input value={repeatPassword} type={visible1} class="form-control border-0" onChange={(e) => passValidation(e)} />
                    <span className="input-group-text bg-transparent border-0" onClick={onVisibility1}>

                        {
                            visible1 == "password" ? <AiOutlineEye /> : <AiOutlineEyeInvisible />
                        }

                    </span>
                </div>
                <br />
                <div id="repeatPass">{isError}</div>
                <br></br>
                <div className="d-flex justify-content-center">
                    <button id="btn-signup" type="button" class="btn fw-bold w-100 shadow" onClick={onRegis}>Sign Up</button>
                </div>
                <div className="d-flex justify-content-center pt-3">
                    <p>or</p>
                </div>
                <div className="d-flex justify-content-center">
                    <button id="btn-signin-google" type="button" class="btn shadow w-100">
                        <div className='d-flex justify-content-center align-items-center'>
                            <FcGoogle size={30} className="me-2" /> <span> Sign up with Google</span>
                        </div>
                    </button>
                </div>
            </div>
        </div>
    </div>
}

export default RegisPage;