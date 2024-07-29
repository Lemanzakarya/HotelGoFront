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
    console.log("nationality",selectedNationality);
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
        {Array.from({ length: adults }).map((_, index) => (
          <Box key={`adult-${index}`} sx={{ mb: 4, width: '100%' }}>
            <Typography component="h1" variant="h5" sx={{ color: '#516D87', mb: 2 }}>
              Adult {index + 1}
            </Typography>

            {/* Guest Information */}
            <Typography component="h2" variant="h6" sx={{ color: '#516D87', alignSelf: 'flex-start', mb: 1 }}>
              Guest Information
            </Typography>
            <Grid container spacing={2}>
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
                  label="Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={5}>
                <TextField
                  required
                  size="small"
                  fullWidth
                  id={`lastName-adult-${index}`}
                  label="Surname"
                  name={`lastName-adult-${index}`}
                  autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <FormControl fullWidth size="small">
                  <InputLabel id={`nationality-select-label-${index}`}>Nationality</InputLabel>
                  <Select
                    labelId={`nationality-select-label-${index}`}
                    id={`nationality-select-${index}`}
                    label={selectedNationality}
                  >
                  </Select>
                </FormControl>
              </Grid>
            </Grid>

            {/* Contact Information */}
            <Typography component="h2" variant="h6" sx={{ color: '#516D87', alignSelf: 'flex-start', mt: 3, mb: 1 }}>
              Contact Information
            </Typography>
            <Grid container spacing={2}>
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
            </Grid>

            {/* Passport/ID Information */}
            <Typography component="h2" variant="h6" sx={{ color: '#516D87', alignSelf: 'flex-start', mt: 3, mb: 1 }}>
              Passport/ID Information
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={3}>
                <TextField
                  size="small"
                  fullWidth
                  label="Serial Number"
                  id={`serialNumber-adult-${index}`}
                  name={`serialNumber-adult-${index}`}
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <TextField
                  size="small"
                  fullWidth
                  label="Passport Number"
                  id={`passportNumber-adult-${index}`}
                  name={`passportNumber-adult-${index}`}
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <TextField
                  size="small"
                  fullWidth
                  label="Expiry Date"
                  id={`expiryDate-adult-${index}`}
                  name={`expiryDate-adult-${index}`}
                  type="date"
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <FormControl fullWidth size="small">
                  <InputLabel id={`issue-country-label-${index}`}>Issue Country</InputLabel>
                  <Select
                    labelId={`issue-country-label-${index}`}
                    id={`issue-country-select-${index}`}
                    label="Issue Country"
                  >
                    <MenuItem value="tr">Turkey</MenuItem>
                    {/* Diğer ülkeleri ekleyebilirsiniz */}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </Box>
        ))}

        {Array.from({ length: children }).map((_, index) => (
          <Box key={`child-${index}`} sx={{ mb: 4, width: '100%' }}>
            <Typography component="h1" variant="h5" sx={{ color: '#516D87', mb: 2 }}>
              Child {index + 1}
            </Typography>

            {/* Guest Information */}
            <Typography component="h2" variant="h6" sx={{ color: '#516D87', alignSelf: 'flex-start', mb: 1 }}>
              Guest Information
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={5}>
                <TextField
                  size="small"
                  autoComplete="given-name"
                  name={`firstName-child-${index}`}
                  required
                  fullWidth
                  id={`firstName-child-${index}`}
                  label="Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={5}>
                <TextField
                  required
                  size="small"
                  fullWidth
                  id={`lastName-child-${index}`}
                  label="Surname"
                  name={`lastName-child-${index}`}
                  autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12} sm={2}>
                <TextField
                  size="small"
                  required
                  fullWidth
                  id={`age-child-${index}`}
                  label="Age"
                  name={`age-child-${index}`}
                  type="number"
                  defaultValue={0} // default age
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <FormControl fullWidth size="small">
                  <InputLabel id={`nationality-select-label-child-${index}`}>{selectedNationality}</InputLabel>
                  <Select
                    labelId={`nationality-select-label-child-${index}`}
                    id={`nationality-select-child-${index}`}
                    label={selectedNationality}
                  >
                  </Select>
                </FormControl>
              </Grid>
            </Grid>

            {/* Contact Information */}
            <Typography component="h2" variant="h6" sx={{ color: '#516D87', alignSelf: 'flex-start', mt: 3, mb: 1 }}>
              Contact Information
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  size="small"
                  required
                  fullWidth
                  id={`email-child-${index}`}
                  label="Email Address"
                  name={`email-child-${index}`}
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
            </Grid>

            {/* Passport/ID Information */}
            <Typography component="h2" variant="h6" sx={{ color: '#516D87', alignSelf: 'flex-start', mt: 3, mb: 1 }}>
              Passport/ID Information
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={3}>
                <TextField
                  size="small"
                  fullWidth
                  label="Serial Number"
                  id={`serialNumber-child-${index}`}
                  name={`serialNumber-child-${index}`}
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <TextField
                  size="small"
                  fullWidth
                  label="Passport Number"
                  id={`passportNumber-child-${index}`}
                  name={`passportNumber-child-${index}`}
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <TextField
                  size="small"
                  fullWidth
                  label="Expiry Date"
                  id={`expiryDate-child-${index}`}
                  name={`expiryDate-child-${index}`}
                  type="date"
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <FormControl fullWidth size="small">
                  <InputLabel id={`issue-country-label-child-${index}`}>Issue Country</InputLabel>
                  <Select
                    labelId={`issue-country-label-child-${index}`}
                    id={`issue-country-select-child-${index}`}
                    label="Issue Country"
                  >
                    <MenuItem value="tr">Turkey</MenuItem>
                    {/* Diğer ülkeleri ekleyebilirsiniz */}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </Box>
        ))}
      </Box>
    </ThemeProvider>
  );
}
