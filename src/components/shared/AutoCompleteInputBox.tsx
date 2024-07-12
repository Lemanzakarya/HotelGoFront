import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import axios from 'axios';
import {json} from "node:stream/consumers";

interface Option {
    label: string;
    value: string;
}

export default function AutoCompleteInputBox() {
    const [options, setOptions] = useState<Option[]>([]);
    const [inputValue, setInputValue] = useState('');
    const apiUrl = "https://api.publicapis.org/entries";
    /*
    useEffect(() => {
        const fetchData = async () => {
            if (inputValue.length >= 3) {
                try {
                    const response = await axios.get<Option[]>(apiUrl);
                    setOptions(response.data.map((item: any) => ({ label: item.name, value: item.id })));
                } catch (error) {
                    console.error('Error fetching data:', error);
                }
            } else {
                setOptions([]);
            }
        };
        const handleFetchData = () => {
            fetchData().catch((error) => {
                console.error('Error in fetchData:', error);
            });
        };

        handleFetchData();
    }, [inputValue]);*/
    useEffect(() => {
        fetch(apiUrl)
            .then((response) => response.json())
            .then((json) => {json.value})
    }, []);


    return (
        <Autocomplete
            id="location-selection"
            sx={{ width: '30%' }}
            options={options}
            autoHighlight
            noOptionsText={inputValue.length >= 3 ? "No result ":"Type 3 letters at least"}
            getOptionLabel={(option : Option) => option.label}
            onInputChange={(event, newInputValue) => {
                setInputValue(newInputValue);
            }}
            renderOption={(props, option) => (
                <Box component="li" {...props}>
                    {option.value}
                </Box>
            )}
            renderInput={(params) => (
                <TextField
                    {...params}
                    label="Location"
                    sx={{ width: '100%' }}
                    inputProps={{
                        ...params.inputProps,
                        autoComplete: 'new-password'
                    }}
                />
            )}
        />
    );
}
