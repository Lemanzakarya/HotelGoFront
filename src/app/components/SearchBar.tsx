import * as React from 'react';
import {Box, TextField, Button, Divider, ClickAwayListener} from '@mui/material';
import { Popper } from "@mui/base/Popper";
import AutoCompleteInputBox from "@/app/components/shared/AutoCompleteInputBox";


const SearchBar: React.FC = () => {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(anchorEl ? null : event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

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
                        '&:hover': { backgroundColor: 'rgba(117,207,215,0.56)' },
                        borderRadius: 3,
                        p: 1,
                        textTransform: 'none',
                        fontSize: 20,
                        borderColor: '#75CFD78E', // Adjust the border color as needed
                        color: 'black', // Adjust the text color as needed
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
                    <ClickAwayListener onClickAway={handleClose}>
                        <Box
                            sx={{
                                backgroundColor: 'rgb(245,254,255)',
                                borderRadius: 3,
                                border: '1px solid #ccc',
                                boxShadow: '0px 2px 5px rgba(0,0,0,0.2)',
                                p: 14,
                                minWidth: 350,
                                minHeight: 350
                            }}
                        >

                            {/* guest seçenekleri burada olacak */}

                        </Box>
                    </ClickAwayListener>
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
