import React from "react";
import { useSelector } from 'react-redux';
import { Avatar, Img } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import NavbarProfile from "../Components/NavbarProfile";
import { Toast } from "bootstrap";

import {
    Text, Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
    TableContainer,
    Button, Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton, Image, useToast, ButtonGroup
} from '@chakra-ui/react';
import { AiFillDelete, AiFillEdit, AiFillPlusCircle } from "react-icons/ai";
import Axios from "axios";
import { API_URL } from "../helper";

const ProfilePage = (props) => {

    const [toggle, setToggle] = React.useState(false); // untuk membuka/menutup modal

    const navigate = useNavigate();
    const toast = useToast();

    const [newImage, setNewImage] = React.useState('')
    const [newFullName, setNewFullName] = React.useState('')
    const [newUserName, setNewUserName] = React.useState('')
    const [newBio, setNewBio] = React.useState('')

    const { fullname, username, email, status, bio, profile } = useSelector((state) => {
        return {
            fullname: state.userReducer.fullname,
            username: state.userReducer.username,
            email: state.userReducer.email,
            status: state.userReducer.status,
            bio: state.userReducer.bio,
            profile: state.userReducer.profile
        }
    });

    const saveEdit = (id) => {
        Axios.patch(API_URL + "/users", {
            profile,
            fullname,
            username,
            bio
        }).then((res) => {
            console.log(res.data)
            if (res.data.id) {
                toast({
                    title: "Edit your profile",
                    description: `Saved`,
                    status: "success",
                    duration: 3000,
                    isClosable: true
                })
            }
        }).catch((err) => {
            console.log(err);
        })
    }



    return <div>
        <div><NavbarProfile /></div>
        <div class="card" className="container border-bottom border-dark col-lg-6 align-items-center">
            <Button
                leftIcon={<AiFillPlusCircle size={26} />}
                colorScheme='gray'
                variant='solid'
                type='button'
                onClick={() => setToggle(!toggle)}
            >
                Edit Profile
            </Button>
            <Modal isOpen={toggle} onClose={() => setToggle(!toggle)} size='xl'>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader className="text-center">Edit your profile</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <div className>
                            <div className='col-8 container justify-content-center'>
                                <label className="form-label fw-bold text-muted">Image</label>
                                <Image className='shadow-sm' boxSize='100% 50%' margin='auto' objectFit='cover' src={newImage} fallbackSrc={profile} />
                                <br />
                                <input className='form-control m-auto' onChange={(e) => setNewImage(e.target.value)} type='text' placeholder='URL image' />
                                <br />
                                <label className="form-label fw-bold text-muted">Fullname</label>
                                <input className='form-control m-auto' src={newFullName} onChange={(e) => setNewFullName(e.target.value)} type='text' />
                                <br />
                                <label className="form-label fw-bold text-muted">Username</label>
                                <input className='form-control m-auto' src={newUserName} onChange={(e) => setNewUserName(e.target.value)} type='text' />
                                <br />
                                <label className="form-label fw-bold text-muted">Bio</label>
                                <textarea className='form-control m-auto' src={newBio} onChange={(e) => setNewBio(e.target.value)} type='text' />
                                <br />
                                <div className="d-flex justify-content-center">
                                    <button id="save-edit" type="button" class="btn" onClick={saveEdit}>Save</button>
                                </div>
                            </div>
                        </div>
                    </ModalBody>
                </ModalContent>
            </Modal>
            <div className="d-flex justify-content-center">

                {
                    profile ? <img id="profile-img" class="card-img-top" className="border" src={profile} /> :
                        <Avatar id="profile-img" name={username} />
                }

            </div>
            <div class="card-body">
                {
                    fullname ? <h5 className="text-center mb-1 fs-4 fw-bold">{fullname}</h5> :
                        <h5 class="card-title" className="text-center mt-3 mb-1 fs-4 fw-bold">Fullname</h5>
                }
                {
                    username ? <h5 className="text-center mb-1">{username}</h5> :
                        <h5 class="card-title" className="text-center mb-2">Username</h5>
                }
                {
                    email ? <h5 className="text-center mb-1">{email}</h5> :
                        <h5 class="card-title" className="text-center mb-2">Email</h5>
                }
                {
                    status ? <h5 className="text-center mb-2 fst-italic">{status}</h5> :
                        <h5 class="card-title" className="text-center mb-2 fst-italic">Status</h5>
                }
                {
                    bio ? <h5 className="text-center mb-3">{bio}</h5> :
                        <p class="card-text" className="text-center mb-3">Bio</p>
                }
            </div>
        </div>
    </div>
}

export default ProfilePage;