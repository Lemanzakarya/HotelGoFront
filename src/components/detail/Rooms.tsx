'use client'
import React, {SetStateAction} from 'react';
import { Grid, Card, CardContent, CardMedia, Typography, Button, Container } from '@mui/material';
import { styled } from '@mui/system';
import Link from 'next/link';
import { Wifi as WifiIcon, KingBed as KingBedIcon, AttachMoney as AttachMoneyIcon } from '@mui/icons-material';

const RootCard = styled(Card)({
  maxWidth: 345,
  margin: '16px',
  cursor: 'default',
});

const Media = styled(CardMedia)({
  height: 200,
});

const ViewDetailsLink = styled('a')({
  color: '#1976d2',
  textDecoration: 'underline',
  '&:hover': {
    textDecoration: 'none',
  },
  marginLeft: '5%',
  display: 'block',
  marginTop: '8px'
});

const ReserveButton = styled(Button)({
  marginTop: '8px',
  backgroundColor: '#1976d2', 
  color: '#fff', 
  '&:hover': {
    backgroundColor: '#1565c0', 
  },
});

const FeaturesList = styled('ul')({
  paddingLeft: 0,
  listStyleType: 'none',
});

const FeatureItem = styled('li')({
  display: 'flex',
  alignItems: 'center',
  marginBottom: '8px',
});

interface Room {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  price: string;
  features: { icon: JSX.Element | null; text: string }[];
}
interface RoomsProps {
  isLoading: boolean;
  setIsLoading: React.Dispatch<SetStateAction<boolean>>;
}

const rooms: Room[] = [
  {
    id: 1,
    title: 'Deluxe Room',
    description: 'Spacious room with a view. Perfect for a luxurious stay.',
    imageUrl: 'https://cdn-prod.travelfuse.ro/images/_top_323fce7a9d6cbbfe747e276b3276e313.jpg',
    price: '$150/night',
    features: [
      { icon: <KingBedIcon />, text: 'King-size bed' },
      { icon: <WifiIcon />, text: 'Free WiFi' },
      { icon: <AttachMoneyIcon />, text: 'Luxury amenities' },
    ],
  },
  {
    id: 2,
    title: 'Standard Room',
    description: 'Comfortable room for your stay. Ideal for business travelers.',
    imageUrl: 'https://www.granada.com.tr/images/details/b/konaklama-aile-odalari-071.jpg',
    price: '$100/night',
    features: [
      { icon: <KingBedIcon />, text: 'Queen-size bed' },
      { icon: <WifiIcon />, text: 'City view' },
      { icon: <AttachMoneyIcon />, text: 'Workspace' },
    ],
  },
  {
    id: 3,
    title: 'Family Room',
    description: 'Comfortable room for your stay. Ideal for business travelers.',
    imageUrl: 'https://i.neredekal.com/i/neredekal/75/585x300/60256b74ff3ffdca374aa015',
    price: '$100/night',
    features: [
      { icon: <KingBedIcon />, text: 'Queen-size bed' },
      { icon: <WifiIcon />, text: 'City view' },
      { icon: <AttachMoneyIcon />, text: 'Workspace' },
    ],
  },
];

const Rooms: React.FC<RoomsProps> = ({isLoading , setIsLoading}) => {

  const handleReserve = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }
  return (
    <Container>
      <Grid container spacing={3}>
        {rooms.map((room) => (
          <Grid item xs={12} sm={6} md={4} key={room.id}>
            <RootCard>
              <Media
                image={room.imageUrl}
                title={room.title}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {room.title}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {room.description}
                </Typography>
                <Typography variant="body1" color="textPrimary" sx={{ marginTop: '10px' }}>
                  Price: {room.price}
                </Typography>
                <Typography variant="body2" color="textPrimary">
                  Features:
                </Typography>
                <FeaturesList>
                  {room.features.map((feature, index) => (
                    <FeatureItem key={index}>
                      {feature.icon && React.cloneElement(feature.icon, { style: { marginRight: '8px' } })}
                      <Typography variant="body2" color="textPrimary" sx={{ marginLeft: '5px' }}>
                        {feature.text}
                      </Typography>
                    </FeatureItem>
                  ))}
                </FeaturesList>
              </CardContent>
              <Link href={`/rooms/${room.id}`} passHref>
                <ViewDetailsLink>
                  View Details
                </ViewDetailsLink>
              </Link>
              <Link href={`/reservation/${room.id}`} passHref>
                <ReserveButton variant="contained" fullWidth onClick={handleReserve} disabled={isLoading}>
                  Reserve
                </ReserveButton>
              </Link>
            </RootCard>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default Rooms;
