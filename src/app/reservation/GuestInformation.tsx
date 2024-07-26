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
import useSearchStore from '../../stores/useSearchStore';

const defaultTheme = createTheme();

function handleOnChange(value: any) {
  console.log(value);
}

export default function Reservation() {
  const [title, setTitle] = React.useState<string>('');
  const { selectedNationality, setSelectedNationality, adults, children } = useSearchStore();

  const handleTitleChange = (event: SelectChangeEvent<string>) => {
    setTitle(event.target.value);
  };

  const handleCountryChange = (event: SelectChangeEvent<string>) => {
    setSelectedNationality(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Implement form submission logic if needed
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
            {/* Generate sections for each adult */}
            {Array.from({ length: adults }).map((_, index) => (
              <React.Fragment key={`adult-${index}`}>
                <Grid item xs={12}>
                  <Typography variant="subtitle1">Adult {index + 1}</Typography>
                </Grid>
                <Grid item xs={12} sm={2}>
                  <FormControl fullWidth size="small">
                    <InputLabel id={`title-select-label-${index}`}>Title</InputLabel>
                    <Select
                      labelId={`title-select-label-${index}`}
                      id={`title-select-${index}`}
                      label="Title"
                      value={title}
                      onChange={handleTitleChange}
                    >
                      <MenuItem value="Mr">Mr</MenuItem>
                      <MenuItem value="Ms">Ms</MenuItem>
                      <MenuItem value="Mrs">Mrs</MenuItem>
                      <MenuItem value="Miss">Miss</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={5}>
                  <TextField
                    size="small"
                    autoComplete="given-name"
                    name={`firstName-adult-${index}`}
                    required
                    fullWidth
                    id={`firstName-adult-${index}`}
                    label="First Name"
                    autoFocus
                  />
                </Grid>
                <Grid item xs={12} sm={5}>
                  <TextField
                    required
                    size="small"
                    fullWidth
                    id={`lastName-adult-${index}`}
                    label="Last Name"
                    name={`lastName-adult-${index}`}
                    autoComplete="family-name"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    size="small"
                    required
                    fullWidth
                    id={`email-adult-${index}`}
                    label="Email Address"
                    name={`email-adult-${index}`}
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
              </React.Fragment>
            ))}

            {/* Generate sections for each child */}
            {Array.from({ length: children }).map((_, index) => (
              <React.Fragment key={`child-${index}`}>
                <Grid item xs={12}>
                  <Typography variant="subtitle1">Child {index + 1}</Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    size="small"
                    autoComplete="given-name"
                    name={`firstName-child-${index}`}
                    required
                    fullWidth
                    id={`firstName-child-${index}`}
                    label="First Name"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    size="small"
                    fullWidth
                    id={`lastName-child-${index}`}
                    label="Last Name"
                    name={`lastName-child-${index}`}
                    autoComplete="family-name"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    size="small"
                    fullWidth
                    id={`age-child-${index}`}
                    label="Age"
                    name={`age-child-${index}`}
                  />
                </Grid>
              </React.Fragment>
            ))}

            {/* Address and other details common for all */}
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Address"
                id="address"
                size="small"
                name="address"
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Zip code"
                id="zipCode"
                size="small"
                name="zipCode"
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="City"
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
                  onChange={handleCountryChange}
                  required
                >
                  <MenuItem value="tr">Turkey</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
