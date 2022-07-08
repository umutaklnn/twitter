import React, { useState, useEffect } from 'react'
import BgImg from '../asset/img/login-bg.png'
import { NextUIProvider, Avatar, Button, Container, Grid, Loading, useInput, Image, Input, Text, Spacer } from '@nextui-org/react';
import { FaTwitter } from 'react-icons/fa';
import { AiFillHome } from 'react-icons/ai'
import Google from '../asset/img/google.png'
import { db } from "../firebase-config";
import {
    collection,
    getDocs,
    addDoc,
    updateDoc,
    deleteDoc,
    doc,
    query,
    where
} from "firebase/firestore";
import Alert from '@mui/material/Alert';

export default function Profile({ userId }) {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    async function getProfile() {
        const citiesRef = collection(db, "users");
        const querySnapshot = await getDocs(citiesRef);
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots

        });
    }
    getProfile()
    return (
        <div className='profile-app'>
            <div className='general'>
                <div className='left'>
                    <span className='icon-div-profile'>
                        <FaTwitter />
                    </span>
                    <ul className='profile-ul'>
                        <li className='profile-li'>
                            <span className='li-icon'>
                                <AiFillHome />
                            </span>
                            <span className='li-text'>
                                Home
                            </span>
                        </li>
                    </ul>
                </div>
                <div className='middle'>

                </div>
                <div className='right'>

                </div>
            </div>
        </div>
    )
}
