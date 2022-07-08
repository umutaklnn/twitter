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


export default function Login({ loginExt, setLogin , setUserId }) {
    const [inputCss, setInputCss] = useState(false);
    const [loginCheck, setLoginCheck] = useState(false);
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [alert, setAlert] = useState(null);
    const usersCollectionRef = collection(db, "users");

    const login = () => {
        let count = 0;
        setLoginCheck(true)
        setInterval(async function () {
            if (count < 1) {
                setLoginCheck(false)
                let val = 0
                const citiesRef = collection(db, "users");
                const querySnapshot = await getDocs(citiesRef);
                querySnapshot.forEach((doc) => {
                    // doc.data() is never undefined for query doc snapshots
                    console.log();
                    if (doc.data().email === email && doc.data().password === password) {
                        val++;
                        setUserId(doc.id)
                    }
                });
                if (val === 0) {
                    setAlert(<Alert style={{ position: 'absolute', top: '20px', right: '20px' }} severity="error">Passwords are not the same !</Alert>)
                } else {
                    setLogin(2)
                }
            } count++
        }, 2000);
    }


    const createUser = async () => {
        await addDoc(usersCollectionRef, { name: email, age: '15' });
    };




    const { value, reset, bindings } = useInput("");

    const validateEmail = (value) => {
        return value.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}$/i);
    };

    const helper = React.useMemo(() => {
        if (!value)
            return {
                text: "",
                color: "",
            };
        const isValid = validateEmail(value);
        return {
            text: isValid ? "Correct email" : "Enter a valid email",
            color: isValid ? "success" : "error",
        };
    }, [value]);
    return (
        <>
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
                            Login
                        </Text>
                        <Input
                            labelPlaceholder="Email"
                            underlined
                            {...bindings}
                            clearable
                            onClearClick={reset}
                            status={helper.color}
                            color={'primary'}
                            helperColor={helper.color}
                            helperText={helper.text}
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
                            onClearClick={reset}
                            value={password}
                            onChange={e => setPassword(e.target.value)}
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
                            onClick={() => login()}
                            shadow color="primary" auto>
                            {loginCheck ? <Loading type="spinner" color="currentColor" size="sm" /> : 'Login'}
                        </Button>
                        <Grid.Container
                            css={{
                                display: 'flex',
                                width: '100%',
                                marginTop: '7vh',
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}
                        >
                            <Grid
                                css={{
                                    margin: '2px 2vw',
                                    marginRight: '10px',
                                }}
                            >
                                <Avatar
                                    css={{
                                        padding: '5px',
                                        cursor: 'pointer'

                                    }}
                                    src={Google}
                                    size={'md'}
                                    color="default"
                                    textColor="white" />
                            </Grid>
                            <Grid
                                css={{
                                    margin: '2px 10px'
                                }}
                            >
                                <Text css={{
                                    color: 'white'
                                }} size={20} h1>or</Text>
                            </Grid>
                            <Grid
                                css={{
                                    margin: '2px 2vw',
                                    marginLeft: '10px'
                                }}>
                                <Button onClick={() => setLogin(1)} color="gradient" auto>
                                    Register
                                </Button>
                            </Grid>
                        </Grid.Container>
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
