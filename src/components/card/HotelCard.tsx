import * as React from 'react';
import { useEffect, useState } from 'react';
import AspectRatio from '@mui/joy/AspectRatio';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import CardOverflow from '@mui/joy/CardOverflow';
import Typography from '@mui/joy/Typography';
import Button from '@mui/joy/Button';
import { useMediaQuery, Rating, Grid } from '@mui/material';
import { useRouter } from 'next/navigation';
import useSearchStore from '@/stores/useSearchStore';
import usePriceSearchStore from '@/stores/usePriceSearch';
import useProductInfoStore from '@/stores/useProductInfoStore';

interface HotelCardProps {
  title: string | undefined;
  location: string | undefined;
  price: string | undefined;
  stars: string | undefined;
  isLoading: boolean | undefined;
  thumbnail: string | undefined;
  nights: number | undefined;
  currency: string | undefined;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  offerId:string|undefined;
  productId:string|undefined;
  ownerProvider: number | undefined
}

const HotelCard: React.FC<HotelCardProps> = ({
  title, 
  location,
  price: initialPrice,
  stars = '0',
  isLoading,
  thumbnail,
  nights,
  currency,
  setIsLoading,
  offerId,
  productId,
  ownerProvider
}) => {
  const [price, setPrice] = useState<string>(initialPrice || '');
  const isSmallScreen = useMediaQuery('(max-width:900px)');
  const router = useRouter();

  const starnum = parseInt(stars);
  const defaultThumbnail = 'https://orinter.com.br/public/img/hotel-default.jpg';

  const setOfferId = usePriceSearchStore(state => state.setOfferId);
  const setProduct = useProductInfoStore(state => state.setProduct); 
  const setOwnerProvider = useProductInfoStore(state => state.setOwnerProvider);
  const setProductId = usePriceSearchStore(state => state.setProductId);
  const setCurrency = usePriceSearchStore(state => state.setCurrency);
  

  const handleLookThrough = () => {
    setIsLoading(true);

    setOfferId(offerId);
    setProductId(productId);
    setCurrency(currency);
    setProduct(productId);
    setOwnerProvider(ownerProvider);

    setTimeout(() => {
      router.push('/hoteldetail');
      setIsLoading(false);
    }, 2000);
  };


  return (

    <Card
      orientation={isSmallScreen ? 'vertical' : 'horizontal'}
      variant="outlined"
      sx={{
        width: 'auto',
        m: 1,
        display: 'flex',
        alignContent: isSmallScreen ? 'center' : 'unset',
        flexDirection: isSmallScreen ? 'column' : 'row',
      }}
    >
      <CardOverflow>
        <AspectRatio ratio={isSmallScreen ? 2 : 1} sx={{ width: isSmallScreen ? "auto" : 230 }}>
          <img
            src={thumbnail || defaultThumbnail}
            alt={title}
            loading="lazy"
            style={{
              borderRadius: isSmallScreen ? '4px 4px 0 0' : '4px 0 0 4px',
            }}
          />
        </AspectRatio>
      </CardOverflow>
      <CardContent>
      <Typography fontWeight="bold" textColor="text.primary" fontSize={25}>
          {title || 'Title Missing'}
        </Typography>
        <CardContent sx={{flexDirection:"row"}}>
      <CardContent sx={{ flex: '1 0 auto', ml: 1 }}>
        <Rating name="card-rating" value={starnum} readOnly size="medium" precision={0.5} />
        <Typography textColor="text.secondary" sx={{ mt: 2, fontSize: '1.3rem' }} fontWeight={'500'}>
          {location || 'Location Missing'}
        </Typography>
        <Typography textColor="black" sx={{ mt: 2, fontSize: '1.1rem' }}>
          {nights !== undefined ? `Nights: ${nights}` : 'Nights Missing'}
        </Typography>
      </CardContent>
      <CardContent >
        <Typography fontWeight="bold" textColor="success.plainColor" sx={{ mt: 1, mr: 1, alignSelf: 'flex-end', fontSize: 28 }}>
          {initialPrice || 'Price Missing'} {currency || '$'}
        </Typography>
        <Button
          variant="solid"
          size="lg"
          sx={{
            mt: 3,
            mr: 1,
            width: isSmallScreen ? '100%' : "auto",
            alignSelf: isSmallScreen ? 'center' : 'flex-end',
            backgroundColor: 'orange',
            '&:hover': { backgroundColor: 'darkorange' },
          }}
          onClick={handleLookThrough}
          disabled={isLoading}
        >
          {isLoading ? 'Loading...' : 'Look Through'}
        </Button>
      </CardContent>
      </CardContent>
      </CardContent>
    </Card>
  );
};

export default HotelCard;
