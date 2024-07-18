'use client'
import React from 'react';
import { Grid, Card, CardContent, CardMedia, Typography, Button, makeStyles, Container } from '@material-ui/core';
import Link from 'next/link';
import { Room as RoomIcon, Wifi as WifiIcon, KingBed as KingBedIcon, AttachMoney as AttachMoneyIcon } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
    margin: theme.spacing(2),
    cursor: 'default', 
  },
  media: {
    height: 200,
  },
  icon: {
    marginRight: theme.spacing(1),
  },
  viewDetailsLink: {
    color: theme.palette.primary.main,
    textDecoration: 'underline',
    '&:hover': {
      textDecoration: 'none',
    },
    marginLeft: '5%', 
  },
  reserveButton: {
    marginTop: theme.spacing(1),
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    '&:hover': {
      backgroundColor: theme.palette.primary.dark,
    },
  },
  featuresList: {
    paddingLeft: 0,
    listStyleType: 'none',
  },
  featureItem: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: theme.spacing(1),
  },
}));

interface Room {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  price: string;
  features: { icon: JSX.Element | null; text: string }[];
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

const Rooms: React.FC = () => {
  const classes = useStyles();

  return (
    <Container>
      <Grid container spacing={3}>
        {rooms.map((room) => (
          <Grid item xs={12} sm={6} md={4} key={room.id}>
            <Card className={classes.root}>
              <CardMedia
                className={classes.media}
                image={room.imageUrl}
                title={room.title}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  {room.title}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  {room.description}
                </Typography>
                <Typography variant="body1" color="textPrimary" component="p" style={{ marginTop: '10px' }}>
                  Price: {room.price}
                </Typography>
                <Typography variant="body2" color="textPrimary" component="p">
                  Features:
                </Typography>
                <ul className={classes.featuresList}>
                  {room.features.map((feature, index) => (
                    <li key={index} className={classes.featureItem}>
                      {feature.icon && React.cloneElement(feature.icon, { className: classes.icon })}
                      <Typography variant="body2" color="textPrimary" component="span" style={{ marginLeft: '5px' }}>
                        {feature.text}
                      </Typography>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <Link href={`/rooms/${room.id}`} passHref>
                <Typography className={classes.viewDetailsLink} variant="body1" component="a">
                  View Details
                </Typography>
              </Link>
              <Link href={`/reservation/${room.id}`} passHref>
                <Button className={classes.reserveButton} variant="contained" fullWidth>
                  Reserve
                </Button>
              </Link>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default Rooms;
