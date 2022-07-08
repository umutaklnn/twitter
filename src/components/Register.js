import React, { useState, useEffect } from 'react'
import BgImg from '../asset/img/login-bg.png'
import { NextUIProvider, Avatar, Button, Container, Grid, Loading, useInput, Image, Input, Text, Spacer } from '@nextui-org/react';
import { FaTwitter } from 'react-icons/fa';
import Google from '../asset/img/google.png'
import { db } from "../firebase-config";
import {
    collection,
    getDocs,
    addDoc,
    updateDoc,
    deleteDoc,
    doc,
} from "firebase/firestore";

import Alert from '@mui/material/Alert';


export default function Register({ loginExt, setLogin }) {
    const [inputCss, setInputCss] = useState(false);
    const [loginCheck, setLoginCheck] = useState(false);
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [confirmPassword, setConfirmPassword] = useState();
    const [alert, setAlert] = useState(null);
    const usersCollectionRef = collection(db, "users");
    function register() {
        let count = 0;
        setLoginCheck(true)
        setInterval(async function () {
            if (count < 1) {
                setLoginCheck(false)
                if (password !== confirmPassword) {
                    setAlert(<Alert style={{ position: 'absolute', top: '20px', right: '20px' }} severity="error">Passwords are not the same !</Alert>)
                } else {
                    let val = 0;
                    const citiesRef = collection(db, "users");
                    const querySnapshot = await getDocs(citiesRef);
                    querySnapshot.forEach((doc) => {
                        // doc.data() is never undefined for query doc snapshots
                        if (doc.data().email === email) {
                            val++
                        }
                    });
                    if (val === 0) {
                        await addDoc(usersCollectionRef, { email: email, password: password });
                        setLogin(true);
                    } else {
                        setAlert(<Alert style={{ position: 'absolute', top: '20px', right: '20px' }} severity="error">Email adress already using !</Alert>)
                    }
                }
            } count++
        }, 2000);
    }


    const createUser = async () => {
    };

    return (
        <>
            {alert}
            <Grid.Container className='grid-item' gap={2} justify="center" >
                <Grid className='grid-no-margin grid-img-item' xs={12} md={7} >
                    <FaTwitter className='twitter-login-big' />
                </Grid>
                <Grid className='grid-black-bg' xs={12} md={5} >
                    <div className='grid-safe-div'>
                        <Text
                            h1
                            size={60}
                            className="login-title"
                            css={{
                                color: 'white',
                                marginTop: "20vh",
                                textAlign: 'center'
                            }}
                            weight="bold"
                        >
                            Register
                        </Text>
                        <Input
                            labelPlaceholder="Email"
                            underlined
                            clearable
                            color={'primary'}

                            type="email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            css={{
                                display: 'block',
                                marginTop: '11vh',
                                marginLeft: 'auto',
                                marginRight: 'auto',
                                color: 'white !important',
                                width: '60%'
                            }} />
                        <Input.Password
                            clearable
                            labelPlaceholder="Password"
                            color="primary"
                            underlined
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            css={{
                                display: 'block',
                                marginTop: '5vh',
                                marginLeft: 'auto',
                                marginRight: 'auto',
                                width: '60%'
                            }} />
                        <Input.Password
                            clearable
                            labelPlaceholder="Confirm Password"
                            color="primary"
                            underlined
                            value={confirmPassword}
                            onChange={e => setConfirmPassword(e.target.value)}
                            css={{
                                display: 'block',
                                marginTop: '5vh',
                                marginLeft: 'auto',
                                marginRight: 'auto',
                                width: '60%'
                            }} />
                        <Button
                            css={{
                                margin: '7vh auto',
                                marginBottom: '0vh',
                                width: '120px'
                            }}
                            onClick={() => register()}
                            shadow color="primary" auto>
                            {loginCheck ? <Loading type="spinner" color="currentColor" size="sm" /> : 'Register'}
                        </Button>
                    </div>
                </Grid>
            </Grid.Container>
            <Grid.Container gap={0}>
                <Grid md={1} >

                </Grid>
            </Grid.Container>
        </>
    )
}
