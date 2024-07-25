import React, { useState } from 'react';
import { Typography, Grid, Paper, Box, Button, Dialog, DialogContent  } from '@mui/material';
import { Close, PhotoCamera } from '@mui/icons-material';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';




interface GalleryProps{
  images : (string[] | null );
}



const Gallery: React.FC<GalleryProps> = ({ images }) => {
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
    setSelectedImageIndex((prevIndex) => {
        if (prevIndex === null || prevIndex === 0) {
            return images ? images.length - 1 : null;
        }
        return prevIndex - 1;
    });
  };

  const handleNext = () => {
    setSelectedImageIndex((prevIndex) => {
        if (prevIndex === null || (images && prevIndex === images.length - 1)) {
            return 0;
        }
        return prevIndex + 1;
    });
  };

  /*const validImages = images?.filter((img) => img !== null) as string[];*/
  const validImages = (images as string[])?.filter((img) => img !== null) || [];
  const fallbackImage = "https://www.generationsforpeace.org/wp-content/uploads/2018/03/empty.jpg";
  const imagesToShow = showMore ? validImages : validImages.slice(0, 5);


  return (
    <Paper elevation={3} style={{ padding: 16 }}>
      <Typography variant="h6" component="h2" gutterBottom>
        Gallery
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Box
            component="img"
            src={validImages[0] || fallbackImage}
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
            {images?.slice(5).map((image, index) => (
              <Grid item xs={12} sm={6} md={3} key={index + 5}>
                <Box
                  component="img"
                  src={image || fallbackImage}
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
              src={selectedImageIndex !== null && images?.[selectedImageIndex] ? images[selectedImageIndex] : fallbackImage}
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
