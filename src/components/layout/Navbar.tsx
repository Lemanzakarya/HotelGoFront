'use client'
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Image from 'next/image';
import Link from 'next/link';
import logo from '../../assets/logo.png';
import Currency from '../shared/Currency';

export default function Navbar() {
    return (
        <AppBar position="static" sx={{ backgroundColor: 'white' }}>
            <Toolbar>
                <Link href="/" passHref>
                        <Image src={logo} alt="Logo" width={150} height={40} layout="fixed" objectFit="contain" />
                </Link>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                </Typography>
                <Currency />
                <div style={{ width: 20, height: 60 }} />
            </Toolbar>
        </AppBar>
    );
}
