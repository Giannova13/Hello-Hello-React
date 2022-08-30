import React from "react";
import { useSelector } from 'react-redux';
import { Avatar } from "@chakra-ui/react";
import NavbarHome from "../Components/NavbarHome";
import PostButton from "../Components/PostButton";
import Axios from "axios";
import { API_URL } from "../helper";
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
import { Toast } from "bootstrap";

const HomePage = (props) => {

    const [toggle, setToggle] = React.useState(false);
    const toast = useToast();

    const [postImage, setPostImage] = React.useState('');
    const [postCaption, setPostCaption] = React.useState('');

    // const [username] = React.useState('');
    const [data, setData] = React.useState([]);

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

    console.log(global)

    const getData = () => {
        Axios.get(API_URL + "/content")
            .then((res) => {
                setData(res.data);
            }).catch((err) => {
                console.log(err);
            })
    }

    React.useEffect(() => {
        getData()
    }, [])

    return <div>
        <div><NavbarHome /></div>
        <div class="card" className="container border-bottom border-dark col-lg-6">
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
        <div className="d-flex justify-content-center mt-5">
            <Button
                leftIcon={<AiFillPlusCircle size={26} />}
                colorScheme='gray'
                variant='solid'
                type='button'
                onClick={() => setToggle(!toggle)}>
            </Button>
            <Modal isOpen={toggle} onClose={() => setToggle(!toggle)} size='xl'>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader className="text-center">Post something</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <div className>
                            <div className='col-8 container justify-content-center'>
                                <label className="form-label fw-bold text-muted">Image</label>
                                <Image className='shadow-sm' boxSize='100% 50%' margin='auto' objectFit='cover' src={postImage} />
                                <br />
                                <input className='form-control m-auto' onChange={(e) => setPostImage(e.target.value)} type='text' placeholder='URL image' />
                                <br />
                                <label className="form-label fw-bold text-muted">Caption</label>
                                <input className='form-control m-auto' src={postCaption} onChange={(e) => setPostCaption(e.target.value)} type='text' />
                                <br />
                                <div className="d-flex justify-content-center">
                                    <button id="save-edit" type="button" class="btn" onClick>Post</button>
                                </div>
                            </div>
                        </div>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </div>
    </div>
}

export default HomePage;