import React, { useState } from 'react';
import { Typography, Grid, Paper, Box, Button, Dialog, DialogContent  } from '@mui/material';
import { Close, PhotoCamera } from '@mui/icons-material';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import CloseIcon from '@mui/icons-material/Close';
import { spacing } from 'material-ui/styles';

const images = [
  'https://images.etstur.com/imgproxy/files/images/hotelImages/TR/95763/l/Granada-Luxury-Belek-Genel-257544.jpg',
  'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2b/3b/c9/63/exterior.jpg?w=700&h=-1&s=1',
  'https://images.etstur.com/imgproxy/files/images/hotelImages/TR/95763/l/Granada-Luxury-Belek-Yeme-Icme-257428.jpg',
  'https://images.etstur.com/files/images/hotelImages/TR/95763/m/Granada-Luxury-Belek-Oda-313523.jpg',
  'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2b/3b/c9/63/exterior.jpg?w=700&h=-1&s=1',
  'https://images.etstur.com/imgproxy/files/images/hotelImages/TR/95763/l/Granada-Luxury-Belek-Yeme-Icme-257428.jpg',
  'https://images.etstur.com/files/images/hotelImages/TR/95763/m/Granada-Luxury-Belek-Oda-313523.jpg',
  'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2b/3b/c9/63/exterior.jpg?w=700&h=-1&s=1',
  'https://images.etstur.com/imgproxy/files/images/hotelImages/TR/95763/l/Granada-Luxury-Belek-Yeme-Icme-257428.jpg',
  'https://images.etstur.com/files/images/hotelImages/TR/95763/m/Granada-Luxury-Belek-Oda-313523.jpg',
];

interface GalleryProps{
  images : string[];
}



const Gallery: React.FC<GalleryProps> = ({  }) => {
  const [showMore, setShowMore] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
  const [open, setOpen] = useState(false);

  const handleShowMore = () => {
    setShowMore(!showMore);
  };

  const handleClickOpen = (index: number) => {
    setSelectedImageIndex(index);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedImageIndex(null);
  };

  const handlePrevious = () => {
    if (selectedImageIndex !== null && selectedImageIndex > 0) {
      setSelectedImageIndex(selectedImageIndex - 1);
    }
    if(selectedImageIndex == 0){
      setSelectedImageIndex(images.length -1);
    }
  };

  const handleNext = () => {
    if (selectedImageIndex !== null && selectedImageIndex < images.length - 1) {
      setSelectedImageIndex(selectedImageIndex + 1);
    }
    if(selectedImageIndex == images.length -1){
      setSelectedImageIndex(0);
    }
  };

  const imagesToShow = showMore ? images : images.slice(0, 5);

  return (
    <Paper elevation={3} style={{ padding: 16 }}>
      <Typography variant="h6" component="h2" gutterBottom>
        Gallery
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Box
            component="img"
            src={images[0]}
            alt="Main Hotel Image"
            onClick={() => handleClickOpen(0)}
            sx={{
              width: '100%',
              height: '400px',
              objectFit: 'cover',
              borderRadius: 1,
              cursor: 'pointer',
            }}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Grid container mb={2}  columnSpacing={2}>
            {imagesToShow.slice(1, 5).map((image, index) => (
              <Grid item xs={12} sm={6} key={index + 1} >
                <Box
                  component="img"
                  src={image}
                  alt={`Hotel image ${index + 2}`}
                  onClick={() => handleClickOpen(index + 1)}
                  sx={{
                    width: '100%',
                    height: '200px',
                    objectFit: 'cover',
                    borderRadius: 1,
                    cursor: 'pointer',
                  }}
                />
              </Grid>
            ))}
          </Grid>
        </Grid>
        {showMore && (
          <Grid container spacing={1} justifyContent="flex-start" ml={1}>
            {images.slice(5).map((image, index) => (
              <Grid item xs={12} sm={6} md={3} key={index + 5}>
                <Box
                  component="img"
                  src={image}
                  alt={`Hotel image ${index + 6}`}
                  onClick={() => handleClickOpen(index + 5)}
                  sx={{
                    width: '100%',
                    height: '200px',
                    objectFit: 'cover',
                    borderRadius: 1,
                    cursor: 'pointer',
                  }}
                />
              </Grid>
            ))}
          </Grid>
        )}
      </Grid>
      <Box mt={2} textAlign="center">
        <Button variant="outlined" startIcon={<PhotoCamera />} onClick={handleShowMore}>
          {showMore ? 'Show Less' : 'Show All Photos'}
        </Button>
      </Box>
      <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
        <DialogContent sx={{ overflow: 'hidden', padding: 0 }}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              height: '80vh', 
              position: 'relative',
            }}
          >
            <ArrowBackIosNewIcon
              onClick={handlePrevious}
              sx={{ zIndex: 1, cursor: 'pointer', fontSize: '2rem' }} 
            />
            <Box
              component="img"
              src={selectedImageIndex !== null ? images[selectedImageIndex] : ''}
              alt="Selected Hotel Image"
              sx={{
                maxHeight: '90%', //look into the settings for different pictures
                maxWidth: '90%',  
                objectFit: 'contain',
              }}
            />
            <ArrowForwardIosIcon
              onClick={handleNext}
              sx={{ zIndex: 1, cursor: 'pointer', fontSize: '2rem' }} // Ensuring the arrow is clickable and visible
            />
            <Close onClick={handleClose} sx={{ position: 'absolute', top: 8, right: 8, zIndex: 2, cursor: 'pointer' }} />
          </Box>
        </DialogContent>
      </Dialog>
    </Paper>
  );
};

export default Gallery;
