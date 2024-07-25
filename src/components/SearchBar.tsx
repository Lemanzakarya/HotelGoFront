import * as React from 'react';
import {Box, Button, Dialog, Divider, IconButton, Typography, useMediaQuery, Snackbar, Slide, Alert} from '@mui/material';
import AutoCompleteInputBox from "../components/shared/AutoCompleteInputBox";
import {Add, Remove} from "@mui/icons-material";
import CountrySelect from "../components/shared/CountrySelector";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

import { useRouter } from 'next/navigation';
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import dayjs, { Dayjs } from 'dayjs';
import {MobileDatePicker} from "@mui/x-date-pickers";
import {useEffect} from "react";





interface SearchBarProps {
    sx?: React.CSSProperties;
    backgroundColor?: string;
    height?: string | number;
    width?: string | number;
    checkOutDateParam?: Dayjs | null;
    checkInDateParam?: Dayjs | null;
    nationalityParam?: string;
    adultsParam?: number;
    childrenParam?: number;
    childrenAgesParam?: number[];
    isLoading: boolean;
    setIsLoading : React.Dispatch<React.SetStateAction<boolean>>
}

const SearchBar: React.FC<SearchBarProps> = ({
    sx,
    backgroundColor = '#fffefe',
    height = 'auto',
    width = '100%',
    checkOutDateParam,
    checkInDateParam,
    nationalityParam,
    adultsParam,
    childrenParam,
    childrenAgesParam,
    isLoading,
    setIsLoading
}) => {

    const [adults, setAdults] = React.useState<number>(0);
    const [children, setChildren] = React.useState<number>(0);
    const router = useRouter();
    const [childrenAges, setChildrenAges] = React.useState<number[]>([]);
    const [checkInDate, setCheckInDate] = React.useState<Dayjs | null>(null);
    const [checkOutDate, setCheckOutDate] = React.useState<Dayjs | null>(null);
    const [nights, setNights] = React.useState<number>(0);
    const isSmallScreen = useMediaQuery('(max-width: 900px)');
    const [guestDialog, setGuestDialog] = React.useState(false);
    const [snackbarOpen, setSnackbarOpen] = React.useState(false);
    const [errorMessage, setErrorMessage] = React.useState<string>('');
    const [location, setLocation]= React.useState<string>('');
    const [selectedNationality , setSelectedNationality] = React.useState<string | null>('TR');


    useEffect(() => {
        // Update state with props if they are provided, but only if they haven't been set already
        if (checkInDateParam && !checkInDate) {
            setCheckInDate(dayjs(checkInDateParam));
        }
        if (checkOutDateParam && !checkOutDate) {
            setCheckOutDate(dayjs(checkOutDateParam));
        }
        if (adultsParam !== undefined && adults === 0) {
            setAdults(adultsParam);
        }
        if (childrenParam !== undefined && children === 0) {
            setChildren(childrenParam);
        }
        if (childrenAgesParam && childrenAges.length === 0) {
            setChildrenAges(childrenAgesParam);
        }
        if (nationalityParam && selectedNationality === 'TR') {
            setSelectedNationality(nationalityParam);
        }
    }, [checkInDateParam, checkOutDateParam, adultsParam, childrenParam, childrenAgesParam, nationalityParam]);

    const handleClick = () => {
        setGuestDialog(!guestDialog);
    };
    const handleAdultsChange = (amount: number) => {
        if (amount >= 0) {
            setAdults(amount);
            setSnackbarOpen(false);
            if (amount == 0){
                setChildren(0);
                setChildrenAges([]);
            }
        }
    };

    const handleChildrenChange = (amount: number) => {
        if (amount >= 0 && amount <= 4) {
            setChildren(amount);
            if (amount > children) {
                setChildrenAges(prevAges => [...prevAges, ...new Array(amount - children).fill(0)]);
            } else {
                setChildrenAges(prevAges => prevAges.slice(0, amount));
            }
        }

    };


    const handleChildrenAgesChange = (index: number, age: number) => {
        const newAges = [...childrenAges];
        newAges[index] = age;
        setChildrenAges(newAges);
    };

    const handleLocationChange = (location: string) => {
        setLocation(location);
        setSnackbarOpen(false);
    };


    const handleSearch = () => {
        setIsLoading(true);
        const missingFields = [];

        if (!location) {
            missingFields.push('location');
        }
        if (!checkInDate) {
            missingFields.push('check-in date');
        }
        if (!checkOutDate) {
            missingFields.push('check-out date');
        }
        if (adults === 0) {
            missingFields.push('at least 1 adult');
        }

        if (missingFields.length > 0) {
            const message = `Please provide ${missingFields.join(', ')}.`;
            setErrorMessage(message);
            setSnackbarOpen(true);
            //setIsLoading(false);  // Reset loading state when there is an error

        }
        //add an else condition to prevent going to next page if there is an error
        setTimeout(() => {
            const query = new URLSearchParams({
                checkInDate: checkInDate ? checkInDate.toISOString() : '',
                checkOutDate: checkOutDate ? checkOutDate.toISOString() : '',
                adults: adults.toString(),
                children: children.toString(),
                nights: nights.toString(),
                childrenAges: childrenAges.join(','),
                selectedNationality: selectedNationality || '',
            }).toString();
            router.push(`/search?${query}`);
            setIsLoading(false);
        },3000);

    };
    
    
    const handleCloseSnackbar = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        setSnackbarOpen(false);
    };

    const open = Boolean(guestDialog);
    const id = open ? 'guests-popper' : undefined;

    const handleCheckInChange = (date: Dayjs | null) => {
        setCheckInDate(date);
        setSnackbarOpen(false);
        if (date && checkOutDate && date.isAfter(checkOutDate)) {
            setCheckOutDate(date);
            setNights(0);
        } else if (date && checkOutDate) {
            setNights(checkOutDate.diff(date, 'day'));
        }
    };

    const handleCheckOutChange = (date: Dayjs | null) => {
        setCheckOutDate(date);
        setSnackbarOpen(false);
        if (checkInDate && date && date.isBefore(checkInDate)) {
            setCheckOutDate(checkInDate);
            setNights(0);
        } else {
            setCheckOutDate(date);
            if (date && checkInDate) {
                setNights(date.diff(checkInDate, 'day'));
            }
        }
    };

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                p: 0,
                backgroundColor: 'transparent',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                ...sx
            }}
        >
            <Box
                component="form"
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    flexDirection: { xs: 'column', sm: 'row' },
                    gap: { xs: 2, sm: 4 },
                    background: backgroundColor,
                    p: { xs: 2, sm: 4 },
                    borderRadius: 6,
                    boxShadow: '0px 2px 5px rgba(4,7,10,1)',
                    width,
                    height
                }}
            >
                <AutoCompleteInputBox onChange={handleLocationChange} />

                <Divider orientation="vertical" flexItem sx={{ height: 'auto' }} />
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <MobileDatePicker
                            sx={{width: isSmallScreen ? '100%' : '20%', fontSize: '10px', padding: 0}}
                            onChange={(newDateValue) => {handleCheckInChange(newDateValue)}}
                            value={checkInDate}
                            label={"Check-in"}
                            minDate={dayjs()}
                        />
                </LocalizationProvider>

                <Divider orientation="vertical" flexItem sx={{ height: 'auto' }} />

                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <MobileDatePicker
                            onChange={(newDateValue) => {handleCheckOutChange(newDateValue)}}
                            value={checkOutDate}
                            label={'Check-out'}
                            disabled={checkInDate === null}
                            minDate={checkInDate ? checkInDate.add(1, 'day'): undefined}
                            sx={{ width: isSmallScreen ? '100%' : '20%', fontSize: '10px', padding: 0  }}
                    />
                </LocalizationProvider>
                <Divider orientation="vertical" flexItem sx={{ height: 'auto' }} />
                <Button
                    aria-describedby={id}
                    variant="outlined"
                    onClick={ () => handleClick()}
                    sx={{
                        '&:hover': { backgroundColor: 'white', borderColor: '#1f1f1f' },
                        borderRadius: 1.5,
                        p: 1,
                        textTransform: 'none',
                        fontSize: 20,
                        borderColor: '#a2a2a2',
                        color: '#363131',
                        backgroundColor: 'transparent',
                        width: isSmallScreen ? '100%' : '20%',
                        cursor: 'pointer',
                        height: 55,
                    }}
                >

                    <Typography variant='h6' sx={{ display: 'block' , color: '#6c6565' }}>
                        {adults === 0 && children === 0 ? ('Guests') : (
                            <>
                                {adults > 0 && (
                                    <span style={{ fontSize: 17 , fontWeight:500}}>{adults} Adults</span>
                                )}
                                {adults > 0 && children > 0 && <br />}
                                {children > 0 && (
                                    <span style={{ fontSize: 17 , fontWeight:500}}>{children} Children</span>
                                )}
                            </>
                        )}
                    </Typography>
                </Button>
                <Dialog
                    id="guest-dialog"
                    open={guestDialog}
                    onClose={ () => handleClick()}
                    aria-labelledby={id}
                    maxWidth={'md'}
                    PaperProps={{
                        style: {
                            boxShadow: 'none',
                            overflow: 'visible',
                            borderRadius:10,
                            margin:'0 10px'
                        }
                    }}
                    slotProps ={{
                        backdrop : {
                            style: {
                                backgroundColor: 'rgba(103,97,97,0.22)'
                            }
                        }
                    }}
                >
                    <Box
                        sx={{
                            borderRadius: 2,
                            border: '1px solid #ccc',
                            boxShadow: '0px 2px 5px rgba(0,0,0,0.2)',
                            p: 2,
                            pr: 4,
                            pl: 4,
                            minWidth: 350,
                            minHeight: 220,
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 2,
                            width:'100%',
                            '@media (max-width:600px)': {
                                minWidth: 'auto',
                                padding: '16px'
                            }
                        }}
                    >
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 2, alignItems: 'center'}}>
                            <Typography variant='body1' sx={{ color: "#000000" }}>Nationality</Typography>
                            <CountrySelect
                                value={selectedNationality}
                                onChange={(e , newValue) => setSelectedNationality(newValue)}
                            />
                        </Box>

                        <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 2, alignItems: 'center', flexWrap:'wrap' }}>
                            <Typography variant='body1' sx={{ color: "#000000" }}>
                                Adults
                            </Typography>
                            <Box sx={{
                                display: 'flex',
                                alignItems: 'center',
                                borderRadius: 4,
                                border: '1px solid #ccc',
                                backgroundColor: 'rgba(161,213,236,0.3)',
                                width:130,
                                justifyContent:'space-between',
                                padding:'0 4px'
                            }}>
                                <IconButton aria-label="decrease adults" onClick={() => handleAdultsChange(adults - 1)} disabled={adults === 0} size="small"
                                            sx={{ color: adults === 0 ? '#6c6565' : 'rgba(0,0,0,0.73)' , padding : 0}}>
                                    <Remove/>
                                </IconButton>
                                <IconButton aria-label="number of adults" disabled={true}>
                                    <Typography variant='body1' sx={{ color: "#000000" }}>
                                        {adults}
                                    </Typography>
                                </IconButton>
                                <IconButton aria-label="increase adults" onClick={() => handleAdultsChange(adults + 1)} sx={{ padding:0 }}>
                                    <Add sx={{ color: 'rgba(0,0,0,0.73)' }} />
                                </IconButton>
                            </Box>
                        </Box>

                        <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 2, alignItems: 'center' , flexWrap:'wrap'}}>
                            <Typography variant='body1' sx={{color: "#000000"}}>
                                Children
                            </Typography>
                            <Box sx={{
                                display: 'flex',
                                alignItems: 'center',
                                borderRadius: 4,
                                border: '1px solid #ccc',
                                backgroundColor: 'rgba(161,213,236,0.3)',
                                width:130,
                                justifyContent:'space-between',
                                padding:'0 4px'
                            }}>
                                <IconButton aria-label="decrease children" onClick={() => handleChildrenChange(children - 1)} disabled={children === 0} size="small"
                                            sx={{ color: children === 0 ? '#6c6565' : 'rgba(0,0,0,0.73)' , padding :0 }}>
                                    <Remove />
                                </IconButton>
                                <IconButton aria-label="number of children" disabled={true}>
                                    <Typography variant='body1' sx={{ color: "#000000" }}>
                                        {children}
                                    </Typography>
                                </IconButton>
                                <IconButton sx={{padding:0}} aria-label="increase children" onClick={() => handleChildrenChange(children + 1)} disabled={children === 4 || adults === 0}>
                                    <Add sx={{ color: adults === 0 || children === 4 ? '#6c6565' : 'rgba(0,0,0,0.73)' }} />
                                </IconButton>
                            </Box>
                        </Box>
                        {children === 4 && (
                            <Box sx={{justifyContent:'flex-end' , display:'flex', paddingRight:2}}>
                                <Typography sx={{ color: 'rgba(217,33,33,0.72)' , fontSize:15}}>Max 4 children !</Typography>
                            </Box>
                        )}

                        {children > 0 && (
                                <Box sx={{ mt: 1 }}>
                                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2.5, mb: 1 }}>
                                        {Array.from({ length: Math.min(2, children) }).map((_, index) => (
                                            <Box key={index} sx={{ display: 'flex', alignItems: 'center', gap: 1, paddingLeft:2.2 }}>
                                                <Typography variant='body2' sx={{ color: "#000000" }}>
                                                    kid {index + 1}
                                                </Typography>
                                                <Select
                                                    value={childrenAges[index]}
                                                    onChange={(e) => handleChildrenAgesChange(index, parseInt(e.target.value as string))}
                                                    displayEmpty
                                                    size="small"
                                                    sx={{ width: 65, height: 30, fontSize: '0.875rem' }}
                                                >
                                                    {Array.from({ length: 18 }).map((_, age) => (
                                                        <MenuItem key={age} value={age}>{age}</MenuItem>
                                                    ))}
                                                </Select>
                                            </Box>
                                        ))}
                                    </Box>
                                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2.5 }}>
                                        {Array.from({ length: Math.max(0, children - 2) }).map((_, index) => (
                                            <Box key={index + 2} sx={{ display: 'flex', alignItems: 'center', gap: 1 , paddingLeft:2.2 }}>
                                                <Typography variant='body2' sx={{ color: "#000000" }}>
                                                    kid {index + 3}
                                                </Typography>
                                                <Select
                                                    value={childrenAges[index + 2]}
                                                    onChange={(e) => handleChildrenAgesChange(index + 2, parseInt(e.target.value as string))}
                                                    displayEmpty
                                                    size="small"
                                                    sx={{ width: 65, height: 30, fontSize: '0.875rem' }}
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
                </Dialog>
                <Button
                    variant="contained"
                    onClick={handleSearch}
                    sx={{
                        '&:hover': { backgroundColor: 'orange' },
                        borderRadius: 2,
                        p: 1,
                        textTransform: 'none',
                        fontSize: 20,
                        backgroundColor: 'orange',
                        color: '#ffffff',
                        width: isSmallScreen ? '100%' : '20%',
                        height: 55,
                    }}
                    disabled={isLoading}
                >
                    {isLoading ? 'Loading...' : "Search"}

                </Button>
            </Box>
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={6000}
                onClose={handleCloseSnackbar}
                message={errorMessage}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                TransitionComponent={(props) => <Slide {...props} direction="left" />}
            >
                <Alert
        onClose={handleCloseSnackbar}
        severity="error"
        sx={{
            backgroundColor: 'white',
            color: 'black',
            mt: 8
        }}

                 >
                    {errorMessage}
                </Alert>
            
            </Snackbar>
            
        </Box>
    );
}

export default SearchBar;