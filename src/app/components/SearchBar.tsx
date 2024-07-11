import * as React from 'react';
import {Box, Button, Divider, IconButton, Select, MenuItem} from '@mui/material';
import { Popper } from "@mui/base/Popper";
import AutoCompleteInputBox from "@/app/components/shared/AutoCompleteInputBox";
import Typography from "@mui/material/Typography";
import {AddCircleOutlineSharp,RemoveCircleRounded,} from "@mui/icons-material";
import CountrySelect from "@/app/components/shared/CountrySelector";

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';


const SearchBar: React.FC = () => {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const [adults, setAdults] = React.useState<number>(1);
    const [children, setChildren] = React.useState<number>(0);
    const [childrenAges , setChildrenAges] = React.useState<number[]>([]);

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(anchorEl ? null : event.currentTarget);
    };

    /*const handleClose = () => {
        setAnchorEl(null);
    };*/

    const handleAdultsChange = (amount : number) => {
        if (amount > 0){
            setAdults(amount);
        }
    };
    const handleChildrenChange = (amount : number) => {
        if (amount >= 0 && amount <= 4){
            setChildren(amount);
            setChildrenAges(new Array(amount).fill(0));
        }
    }
    const handleChildrenAgesChange = (index : number , age : number) => {
        const newAges = [...childrenAges];
        newAges[index] = age;
        setChildrenAges(newAges);
    }

    const open = Boolean(anchorEl);
    const id = open ? 'guests-popper' : undefined;

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                p: 0,
                backgroundColor: 'transparent',
                backgroundSize: 'cover',
                backgroundPosition: 'center'
            }}
        >
            <Box
                component="form"
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    flexDirection: { xs: 'column', sm: 'row' },
                    gap: { xs: 2, sm: 4 },
                    background: '#fffefe',
                    p: { xs: 2, sm: 4 },
                    borderRadius: 6,
                    height: { xs: 'auto', sm: 140 },
                    width: '100%',

                }}
            >
                <AutoCompleteInputBox />
                <Divider orientation="vertical" flexItem sx={{ height: { xs: 'auto', sm: '100%' }, mx: { xs: 0, sm: -2 }, backgroundColor: 'grey' }} />
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker label="Check-in" sx={{
                            width:`200px`,
                            fontSize :`10px`,
                            padding :0
                        }}/>
                </LocalizationProvider>
                <Divider orientation="vertical" flexItem sx={{ height: { xs: 'auto', sm: '100%' }, mx: { xs: 0, sm: -2 }, backgroundColor: 'grey' }} />
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker label="Check-out" sx={{
                            width:`200px`,
                            fontSize :`10px`,
                            padding :0
                        }}/>
                </LocalizationProvider>
                <Divider orientation="vertical" flexItem sx={{ height: { xs: 'auto', sm: '100%' }, mx: { xs: 0, sm: -2 }, backgroundColor: 'grey' }} />
                <Button
                    aria-describedby={id}
                    variant="outlined"
                    onClick={handleClick}
                    sx={{
                        '&:hover': { backgroundColor: 'white', borderColor: '#1f1f1f' },
                        borderRadius: 1.5,
                        p: 1,
                        textTransform: 'none',
                        fontSize: 20,
                        borderColor: '#a2a2a2',
                        color: '#363131',
                        backgroundColor: 'white',
                        width: 140,
                        cursor: 'pointer',
                        height: '73%',
                    }}
                >
                    <Typography variant='h6' sx={{ color:"#6C6565"}}>Guests</Typography>
                </Button>
                <Popper
                    id={id}
                    open={open}
                    anchorEl={anchorEl}
                    modifiers={[{
                        name: 'offset',
                        options: {
                            offset: [0, 10]
                        },
                    }]}
                >
                        <Box
                            sx={{
                                backgroundColor: 'rgba(245,254,255,0.96)',
                                borderRadius: 3,
                                border: '1px solid #ccc',
                                boxShadow: '0px 2px 5px rgba(0,0,0,2)',
                                p: 2,
                                pr:4,
                                pl:4,
                                minWidth: 300,
                                minHeight: 100,
                                display: 'flex',
                                flexDirection: 'column',
                                gap:1,
                                overflowY:'auto'
                            }}
                        >
                            <Box sx={{ display:'flex' , justifyContent:'space-between', gap:1 , alignItems:'center'}}> {/* NATIONALITY */}
                                <Typography variant='body1' sx={{ color:"#000000"}}>Nationality</Typography>
                                <CountrySelect />
                            </Box>

                            {/*<Divider orientation={'horizontal'} sx={{ backgroundColor: 'black'}} />*/}

                            <Box sx={{ display:'flex' , justifyContent: 'space-between' , gap:1, alignItems: 'center'}}>{/* ADULTS */}
                                <Typography variant='body1' sx={{color:"#000000"}}>
                                    Adults
                                </Typography>
                                <Box sx={{display:'flex', alignItems:'center', borderRadius:1 , border:'1px solid #ccc' , backgroundColor:'rgba(161,213,236,0.3)'}}>
                                    <IconButton aria-label="decrease adults" onClick={() => handleAdultsChange(adults-1)} disabled={adults === 1} size="small"
                                                sx={{ color: adults === 1 ? '#6c6565' : 'rgba(0,0,0,0.73)' }}>
                                        <RemoveCircleRounded />
                                    </IconButton>

                                    <IconButton aria-label="number of adults">
                                        <Typography variant='body1' sx={{color:"#000000"}}>
                                            {adults}
                                        </Typography>
                                    </IconButton>

                                    <IconButton aria-label="increase adults" onClick={() => handleAdultsChange(adults+1)} size='small'>
                                        <AddCircleOutlineSharp sx={{color:'rgba(0,0,0,0.73)'}}/>
                                    </IconButton>
                                </Box>
                            </Box>

                            <Box sx={{ display:'flex' , justifyContent: 'space-between' , gap:2, alignItems: 'center'}}>{/* CHILDREN */}
                                <Typography variant='body1' sx={{color:"#000000"}}>
                                    Children
                                </Typography>
                                <Box sx={{display:'flex' ,alignItems:'center', borderRadius:1 , border:'1px solid #ccc' , backgroundColor:'rgba(161,213,236,0.3)'}}>
                                    <IconButton aria-label="decrease children" onClick={() => handleChildrenChange(children-1)} disabled={children === 0} size='small'
                                                sx={{ color: children === 0 ? '#6c6565' : 'rgba(0,0,0,0.73)' }}>
                                        <RemoveCircleRounded />
                                    </IconButton>

                                    <IconButton aria-label="number of children">
                                        <Typography variant='body1' sx={{color:"#000000"}}>
                                            {children}
                                        </Typography>
                                    </IconButton>

                                    <IconButton aria-label="increase children" onClick={() => handleChildrenChange(children+1)} disabled={children === 4} size= 'small'
                                                sx={{color: children === 4 ? '#6c6565' : 'rgba(0,0,0,0.73)'}}>
                                        <AddCircleOutlineSharp />
                                    </IconButton>

                                </Box>
                            </Box>

                            {/*{children >0 && (
                                <Box sx={{mt:0.2 , flexWrap:'wrap' , display:'flex' , gap:1 , p:1}}>
                                    {Array.from({length: children}).map((_, index) => (
                                        <Box key={index} sx={{ display: 'flex', alignItems:'center', gap:1, marginBottom:0}}>
                                            <Typography variant='body1' sx={{color:'#000000'}}>
                                                #{index + 1}
                                            </Typography>
                                            <Select
                                                value = {childrenAges[index]}
                                                onChange={(e) => handleChildrenAgesChange(index, e.target.value as number)}
                                                sx={{width: 70 , height:30 , fontSize:14}}
                                            >
                                                {Array.from({length: 18}).map((_, age) => (
                                                    <MenuItem key={age} value={age}>{age}</MenuItem>
                                                ))}
                                            </Select>
                                        </Box>
                                    ))}
                                </Box>
                            )}*/}
                            {children > 0 && (
                                <Box sx={{ mt: 2 }}>
                                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2.5, mb: 1 }}>
                                        {Array.from({ length: Math.min(2, children) }).map((_, index) => (
                                            <Box key={index} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                <Typography variant='body2' sx={{ color: "#000000" }}>
                                                    kid {index + 1}
                                                </Typography>
                                                <Select
                                                    value={childrenAges[index]}
                                                    onChange={(e) => handleChildrenAgesChange(index, parseInt(e.target.value as string))}
                                                    displayEmpty
                                                    size="small"
                                                    sx={{ width: 60, height: 30, fontSize: '0.875rem' }}
                                                >
                                                    {Array.from({ length: 18 }).map((_, age) => (
                                                        <MenuItem key={age} value={age}>{age}</MenuItem>
                                                    ))}
                                                </Select>
                                            </Box>
                                        ))}
                                    </Box>
                                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                                        {Array.from({ length: Math.max(0, children - 2) }).map((_, index) => (
                                            <Box key={index + 2} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                <Typography variant='body2' sx={{ color: "#000000" }}>
                                                    kid {index + 3}
                                                </Typography>
                                                <Select
                                                    value={childrenAges[index + 2]}
                                                    onChange={(e) => handleChildrenAgesChange(index + 2, parseInt(e.target.value as string))}
                                                    displayEmpty
                                                    size="small"
                                                    sx={{ width: 60, height: 30, fontSize: '0.875rem' }}
                                                >
                                                    {Array.from({ length: 18 }).map((_, age) => (
                                                        <MenuItem key={age} value={age}>{age}</MenuItem>
                                                    ))}
                                                </Select>
                                            </Box>
                                        ))}
                                    </Box>
                                </Box>
                            )}
                        </Box>
                </Popper>
                <Button
                    variant="contained"
                    sx={{
                        backgroundColor: 'orange',
                        '&:hover': { backgroundColor: 'darkorange' },
                        borderRadius: 3,
                        p: 1,
                        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
                        textTransform: 'none',
                        fontSize: 26,
                        marginLeft: { xs: 0, sm: 'auto' },
                        width: { xs: '100%', sm: 120 }
                    }}
                >
                    Search
                </Button>
            </Box>
        </Box >
    );
};

export default SearchBar;
