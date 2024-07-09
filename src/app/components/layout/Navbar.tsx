import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Image from 'next/image';
import Link from 'next/link';
import { Box } from '@mui/material';
import logo from '../../../assets/logo.png';

export default function Navbar() {
    return (
        <AppBar position="static" sx={{ backgroundColor: 'white' }}>
            <Toolbar>
                <Image src={logo} alt="Logo" width={170} height={50} layout="fixed" objectFit="contain" />
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                </Typography>
                <Box sx={{ display: 'flex', gap: 2 }}>
                    <Link href="/" passHref>
                        <Button color="primary">Home</Button>
                    </Link>
                    <Link href="/about" passHref>
                        <Button color="primary">About</Button>
                    </Link>
                </Box>
                <div style={{ width: 20, height: 80}} />
            </Toolbar>
        </AppBar>
    );
}