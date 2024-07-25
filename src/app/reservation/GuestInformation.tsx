import * as React from 'react';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import MuiPhoneNumber from 'mui-phone-number';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

const defaultTheme = createTheme();

function handleOnChange(value: any) {
  console.log(value);
}

export default function SignUp() {
  const [title, setTitle] = React.useState<string>('');
  const [country, setCountry] = React.useState<string>('');

  const handleTitleChange = (event: SelectChangeEvent<string>) => {
    setTitle(event.target.value);
  };

  const handleCountryChange = (event: SelectChangeEvent<string>) => {
    setCountry(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: '16px',
          backgroundColor: 'white',
        }}
      >
        <Typography component="h1" variant="h5" sx={{ color: '#516D87', alignSelf: 'flex-start' }}>
          Guest Details
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3, width: '100%' }}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} sm={2}>
              <FormControl fullWidth size="small">
                <InputLabel id="title-select-label">Title</InputLabel>
                <Select
                  labelId="title-select-label"
                  id="title-select"
                  value={title}
                  label="Title"
                  onChange={handleTitleChange}
                >
                  <MenuItem value={10}>Mr</MenuItem>
                  <MenuItem value={20}>Ms</MenuItem>
                  <MenuItem value={30}>Mrs</MenuItem>
                  <MenuItem value={40}>Miss</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={5}>
              <TextField
                size="small"
                autoComplete="given-name"
                name="firstName"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={5}>
              <TextField
                required
                size="small"
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="family-name"
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                size="small"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <MuiPhoneNumber
                fullWidth
                size="small"
                label="Phone Number"
                defaultCountry={'tr'}
                onChange={handleOnChange}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Address*"
                id="address"
                size="small"
                name="address"
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Zip code*"
                id="zipCode"
                size="small"
                name="zipCode"
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="City*"
                id="city"
                size="small"
                name="city"
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth size="small">
                <InputLabel id="country-select-label">Country*</InputLabel>
                <Select
                  labelId="country-select-label"
                  id="country-select"
                  label="Country"
                  value={country}
                  onChange={handleCountryChange}
                  required
                >
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
