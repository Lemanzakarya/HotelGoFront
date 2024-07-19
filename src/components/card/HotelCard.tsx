import * as React from 'react';
import { useEffect, useState } from 'react';
import AspectRatio from '@mui/joy/AspectRatio';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import CardOverflow from '@mui/joy/CardOverflow';
import Typography from '@mui/joy/Typography';
import Button from '@mui/joy/Button';
import { useMediaQuery, Rating } from '@mui/material';
import { useRouter } from 'next/navigation';


interface HotelCardProps {
  title: string;
  location: string;
  apiEndpoint: string;
  price: string;
  tags?: string[];
  stars : number;
}

const HotelCard: React.FC<HotelCardProps> = ({
  title,
  location,
  apiEndpoint,
  price: initialPrice,
  tags,
  stars = 3.5,
}) => {
  const [price, setPrice] = useState<string>(initialPrice);
  const isSmallScreen = useMediaQuery('(max-width:900px)');
  const router = useRouter();

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await fetch(apiEndpoint);
  //       if (!response.ok) {
  //         throw new Error('Data could not be fetched');
  //       }
  //       const data = await response.json();
  //       setPrice(data.price); 
  //     } catch (error) {
  //       console.error('Data fetch error', error);
  //     }
  //   };
  //   fetchData();
  // }, [apiEndpoint]);

  const handleLookThrough = () => {
    router.push('/hoteldetail');
  };

  return (
    <Card
      orientation={isSmallScreen ? "vertical" : "horizontal"}
      variant="outlined"
      sx={{
        width: 'auto',
        m:1,
        display: 'flex',
        alignContent:isSmallScreen ? 'center' : 'unset',
        flexDirection: isSmallScreen ? 'column' : 'row',
      }}
    >
      <CardOverflow>
        <AspectRatio ratio={isSmallScreen ? 2 : 1} sx={{ width: isSmallScreen ? '200' : 200 }} >
          <img
            src={"https://media.istockphoto.com/id/472899538/tr/foto%C4%9Fraf/downtown-cleveland-hotel-entrance-and-waiting-taxi-cab.jpg?s=612x612&w=0&k=20&c=q9BvQpnL3l4b8t3K_4VRTSS8FkBnv6Pue4tgZucjqIQ="}
            alt={title}
            loading="lazy"
            style={{
              borderRadius: isSmallScreen ? '4px 4px 0 0' : '4px 0 0 4px',
            }}
          />
        </AspectRatio>
      </CardOverflow>
      <CardContent sx={{ flex: '1 0 auto', ml:1}} >
        <Typography fontWeight="bold" textColor="text.primary" fontSize={27}>
          {title}
        </Typography>
        <Rating name=" card-rating"  value={stars} readOnly={true} size={"medium"}  precision={0.5}/>
        <Typography textColor="text.secondary" mt={5}>
          {location}
        </Typography>
        {tags && (
          <Typography textColor="text.secondary" sx={{ mt: 1 }}>
            {tags.join(', ')}
          </Typography>
        )}
      </CardContent>
      <CardContent sx={{}}>
      <Typography fontWeight="bold" textColor="success.plainColor" sx={{ mt:4 ,mr:1 , alignSelf: 'flex-end', fontSize : 30 }}>
          {price} $
        </Typography>
        <Button
          variant="solid"
          size="lg"
          sx={{ mt: 3, width: isSmallScreen ? '100%' : 'auto', alignSelf: isSmallScreen ? 'center' : 'flex-end',backgroundColor:'orange','&:hover': { backgroundColor: 'darkorange' }}}
          onClick={handleLookThrough}
        >
          Look Through
        </Button>
      </CardContent>
    </Card>
  );
};

export default HotelCard;
