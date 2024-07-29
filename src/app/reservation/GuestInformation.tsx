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
import CountrySelect from '@/components/shared/CountrySelector';

const defaultTheme = createTheme();

function handleOnChange(value: any) {
  console.log(value);
}

export default function Reservation() {
  const [title, setTitle] = React.useState<string>('');
  const [gender, setGender] = React.useState<string>('');
  const { selectedNationality, adults, children, childrenAges, setSelectedNationality } = useSearchStore();

  // Ensure at least one adult is present
  const adultCount = Math.max(adults, 1);

  const handleTitleChange = (event: SelectChangeEvent<string>) => {
    setTitle(event.target.value);
  };

  const handleGenderChange = (event: SelectChangeEvent<string>) => {
    setGender(event.target.value);
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
        {Array.from({ length: adultCount }).map((_, index) => (
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
              <Grid item xs={12} sm={2}>
                <FormControl fullWidth size="small">
                  <InputLabel id={`gender-select-label-${index}`}>Gender</InputLabel>
                  <Select
                    labelId={`gender-select-label-${index}`}
                    id={`gender-select-${index}`}
                    label="Gender"
                    value={gender}
                    onChange={handleGenderChange}
                  >
                    <MenuItem value="Male">Male</MenuItem>
                    <MenuItem value="Female">Female</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  size="small"
                  fullWidth
                  label={`Nationality`}
                  value={selectedNationality || ''}
                  InputProps={{
                    readOnly: true,
                  }}
                />
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
              <Grid item xs={12} sm={4}>
                <TextField
                  size="small"
                  fullWidth
                  label="Serial Number"
                  id={`serialNumber-adult-${index}`}
                  name={`serialNumber-adult-${index}`}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  size="small"
                  fullWidth
                  label="Passport Number"
                  id={`passportNumber-adult-${index}`}
                  name={`passportNumber-adult-${index}`}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
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
              <Grid item xs={12} sm={5}>
                <CountrySelect
                  value={selectedNationality}
                  onChange={(e, newValue) => setSelectedNationality(newValue)}
                  label={"Issue Country"}
                />
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
                  fullWidth
                  label="Age"
                  type="number"
                  defaultValue={childrenAges}
                  InputProps={{
                    readOnly: true,
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  size="small"
                  fullWidth
                  label={`Nationality`}
                  value={selectedNationality || ''}
                  InputProps={{
                    readOnly: true,
                  }}
                />
              </Grid>
            </Grid>

            {/* Passport/ID Information */}
            <Typography component="h2" variant="h6" sx={{ color: '#516D87', alignSelf: 'flex-start', mt: 3, mb: 1 }}>
              Passport Information
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={4}>
                <TextField
                  size="small"
                  fullWidth
                  label="Serial Number"
                  id={`serialNumber-child-${index}`}
                  name={`serialNumber-child-${index}`}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  size="small"
                  fullWidth
                  label="Passport Number"
                  id={`passportNumber-child-${index}`}
                  name={`passportNumber-child-${index}`}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
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
              <Grid item xs={12} sm={5}>
                  <CountrySelect
                  value={selectedNationality}
                  onChange={(e, newValue) => setSelectedNationality(newValue)}
                  label={"Issue Country"}
                />
              </Grid>
            </Grid>
          </Box>
        ))}
      </Box>
    </ThemeProvider>
  );
}
