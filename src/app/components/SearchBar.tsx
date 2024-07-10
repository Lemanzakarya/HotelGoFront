import * as React from 'react';
import {Box, TextField, Button, Divider, InputLabel, SelectChangeEvent, IconButton} from '@mui/material';
import { Popper } from "@mui/base/Popper";
import AutoCompleteInputBox from "@/app/components/shared/AutoCompleteInputBox";
import Typography from "@mui/material/Typography";
import {AddCircleOutlineSharp, RemoveCircleOutlineRounded} from "@mui/icons-material";
import CountrySelect from "@/app/components/shared/CountrySelector";



const SearchBar: React.FC = () => {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const [adults, setAdults] = React.useState<number>(1);
    const [children, setChildren] = React.useState<number>(0);

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(anchorEl ? null : event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleAdultsChange = (amount : number) => {
        if (amount >= 0){
            setAdults(amount);
        }
    };
    const handleChildrenChange = (amount : number) => {
        if (amount >= 0){
            setChildren(amount);
        }
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
                    flexDirection: 'row',
                    gap: 5,
                    background: '#fffefe',
                    p: 6,
                    borderRadius: 10,
                    height: 160
                }}
            >
                <AutoCompleteInputBox width="200px" height="50px" />
                <Divider orientation="vertical" flexItem sx={{ height: '100%', mx: -2 , backgroundColor : 'black'}} />
                <TextField
                    type="date"
                    variant="outlined"
                    inputProps={{
                        style: {
                            height: "20px"
                        },
                    }}
                />
                <Divider orientation="vertical" flexItem sx={{ height: '100%', mx: -2 , backgroundColor : 'black'}} />
                <TextField
                    type="date"
                    variant="outlined"
                    inputProps={{
                        style: {
                            height: "20px"
                        },
                    }}
                />
                <Divider orientation="vertical" flexItem sx={{ height: '100%', mx: -2 , backgroundColor : 'black'}} />
                <Button
                    aria-describedby={id}
                    variant="outlined"
                    onClick={handleClick}
                    sx={{
                        '&:hover': { backgroundColor: 'white' , borderColor: '#1f1f1f'},
                        borderRadius: 1.5,
                        p: 1,
                        textTransform: 'none',
                        fontSize: 20,
                        borderColor: '#a2a2a2', // Adjust the border color as needed
                        color: '#363131', // Adjust the text color as needed
                        backgroundColor: 'white', // Ensures background color is white
                        width: 140,
                        cursor: 'pointer',
                        height: 50
                    }}
                >
                    Guests
                </Button>
                <Popper
                    id={id}
                    open={open}
                    anchorEl={anchorEl}
                    modifiers={[{
                        name: 'offset',
                        options: {
                            offset: [0, 10] },
                    }]}
                >
                        <Box
                            sx={{
                                backgroundColor: 'rgba(245,254,255,0.96)',
                                borderRadius: 3,
                                border: '1px solid #ccc',
                                boxShadow: '0px 2px 5px rgba(0,0,0,0.2)',
                                p: 2,
                                minWidth: 250,
                                minHeight: 250,
                                display: 'flex',
                                flexDirection: 'column',
                                gap:2
                            }}
                        >
                            <Box sx={{ display:'flex' , justifyContent:'space-between', gap:2 , alignItems:'center'}}> {/* NATIONALITY */}
                                <Typography variant='h6' sx={{ color:"#000000"}}>Nationality</Typography>
                                <CountrySelect/>
                            </Box>

                            <Divider orientation={'horizontal'} sx={{ backgroundColor: 'black'}} />

                            <Box sx={{ display:'flex' , justifyContent: 'space-between' , gap:2, alignItems: 'center'}}>{/* ADULTS */}
                                <Typography variant='h6' sx={{color:"#000000"}}>
                                    Adults
                                </Typography>
                                <Box sx={{display:'flex' ,alignItems:'center', borderRadius:1 , border:'1px solid #ccc' , backgroundColor:'rgba(161,213,236,0.3)'}}>
                                    <IconButton aria-label="decrease adults" onClick={() => handleAdultsChange(adults-1)} disabled={adults === 0} size="small"
                                                sx={{ color: adults === 0 ? '#6c6565' : 'rgba(0,0,0,0.73)' }}>
                                        <RemoveCircleOutlineRounded />
                                    </IconButton>

                                    <IconButton aria-label="number of adults">
                                        <Typography variant='h6' sx={{color:"#000000"}}>
                                            {adults}
                                        </Typography>
                                    </IconButton>

                                    <IconButton aria-label="increase adults" onClick={() => handleAdultsChange(adults+1)}>
                                        <AddCircleOutlineSharp sx={{color:'rgba(0,0,0,0.73)'}}/>
                                    </IconButton>

                                </Box>
                            </Box>
                            <Divider orientation={'horizontal'} sx={{ backgroundColor: 'black'}} />

                            <Box sx={{ display:'flex' , justifyContent: 'space-between' , gap:2, alignItems: 'center'}}>{/* CHILDREN */}
                                <Typography variant='h6' sx={{color:"#000000"}}>
                                    Children
                                </Typography>
                                <Box sx={{display:'flex' ,alignItems:'center', borderRadius:1 , border:'1px solid #ccc' , backgroundColor:'rgba(161,213,236,0.3)'}}>
                                    <IconButton aria-label="decrease children" onClick={() => handleChildrenChange(children-1)} disabled={children === 0} size="small"
                                                sx={{ color: children === 0 ? '#6c6565' : 'rgba(0,0,0,0.73)' }}>
                                        <RemoveCircleOutlineRounded />
                                    </IconButton>

                                    <IconButton aria-label="number of children">
                                        <Typography variant='h6' sx={{color:"#000000"}}>
                                            {children}
                                        </Typography>
                                    </IconButton>

                                    <IconButton aria-label="increase children" onClick={() => handleChildrenChange(children+1)}>
                                        <AddCircleOutlineSharp sx={{color:'rgba(0,0,0,0.73)'}}/>
                                    </IconButton>

                                </Box>
                            </Box>
                        </Box>
                </Popper>
                <Button
                    variant="contained" sx={{
                    backgroundColor: 'orange',
                    '&:hover': { backgroundColor: 'darkorange' },
                    borderRadius: 3,
                    p: 1,
                    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
                    textTransform: 'none',
                    fontSize: 26,
                    marginLeft: 'auto' ,
                    width: 120
                }}
                >
                    Search
                </Button>
            </Box>
        </Box>
    );
};

export default SearchBar;
