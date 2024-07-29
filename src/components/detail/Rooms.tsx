"use client";
import React, { SetStateAction, useState } from "react";
import {
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Container,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { styled } from "@mui/system";
import { useRouter } from "next/navigation";
import { getOffersBody } from "@/app/responsemodel/getOffersModel";
import { getOfferDetailsBody } from "@/app/responsemodel/getOfferDetailModel";

const RootCard = styled(Card)({
  maxWidth: 345,
  margin: "16px",
  cursor: "default",
});

const Media = styled(CardMedia)({
  height: 200,
});

const ViewDetailsLink = styled("a")({
  color: "#1976d2",
  textDecoration: "underline",
  "&:hover": {
    textDecoration: "none",
  },
  marginLeft: "5%",
  display: "block",
  marginTop: "8px",
});

const ReserveButton = styled(Button)({
  marginTop: "8px",
  backgroundColor: "#1976d2",
  color: "#fff",
  "&:hover": {
    backgroundColor: "#1565c0",
  },
});

const FeaturesList = styled("ul")({
  paddingLeft: 0,
  listStyleType: "none",
});

const FeatureItem = styled("li")({
  display: "flex",
  alignItems: "center",
  marginBottom: "8px",
});

interface Room {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  price: string;
}
interface RoomsProps {
  isLoading: boolean;
  setIsLoading: React.Dispatch<SetStateAction<boolean>>;
  offers:getOffersBody | null;
  //offerDetails: getOfferDetailsBody | null;
}

const rooms: Room[] = [
  {
    id: 1,
    title: "Deluxe Room",
    description: "Spacious room with a view. Perfect for a luxurious stay.",
    imageUrl:
      "https://cdn-prod.travelfuse.ro/images/_top_323fce7a9d6cbbfe747e276b3276e313.jpg",
    price: "$150/night",
  },
  {
    id: 2,
    title: "Standard Room",
    description:
      "Comfortable room for your stay. Ideal for business travelers.",
    imageUrl:
      "https://www.granada.com.tr/images/details/b/konaklama-aile-odalari-071.jpg",
    price: "$100/night",
  },
  {
    id: 3,
    title: "Family Room",
    description:
      "Comfortable room for your stay. Ideal for business travelers.",
    imageUrl:
      "https://i.neredekal.com/i/neredekal/75/585x300/60256b74ff3ffdca374aa015",
    price: "$100/night",
  },
];

const Rooms: React.FC<RoomsProps> = ({ isLoading, setIsLoading , offers}) => {
  const router = useRouter();
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const [openDialog, setOpenDialog] = useState(false);
  
  const handleViewDetails = (room: Room) => {
    setSelectedRoom(room);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => setOpenDialog(false);

  const handleReserve = () => {
    setIsLoading(true);
    setTimeout(() => {
      router.push(`/reservation`);
      setIsLoading(false);
    }, 2000);
  };

  //TODO:for test will be deleted
  console.log("recieved offers:",offers);
  //console.log("Recieved details:",offerDetails);
  


  return (
    <Container>
      <Grid container spacing={3}>
        {rooms.map((room) => (
          <Grid item xs={12} sm={6} md={4} key={room.id}>
            <RootCard>
              
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {room.title}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {room.description}
                </Typography>
                <Typography
                  variant="body1"
                  color="textPrimary"
                  sx={{ marginTop: "10px" }}
                >
                  Price: {room.price}
                </Typography>
                <Typography variant="body2" color="textPrimary">
                  Features:
                </Typography>     
      
              </CardContent>
              <ViewDetailsLink onClick={() => handleViewDetails(room)}>
                View Details
              </ViewDetailsLink>
              <ReserveButton
                variant="contained"
                fullWidth
                onClick={handleReserve}
                disabled={isLoading}
              >
                Reserve
              </ReserveButton>
            </RootCard>
          </Grid>
        ))}

        <Dialog open={openDialog} onClose={handleCloseDialog}>
          <DialogTitle>{selectedRoom?.title}</DialogTitle>
          <DialogContent>
            <img
              src={selectedRoom?.imageUrl}
              alt={selectedRoom?.title}
              style={{ width: "100%", marginBottom: "16px" }}
            />
            <Typography gutterBottom>{selectedRoom?.description}</Typography>
            {/* You can add more details about the room here */}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog}>Close</Button>
            <Button onClick={handleReserve} disabled={isLoading}>
              Reserve
            </Button>
          </DialogActions>
        </Dialog>
      </Grid>
    </Container>
  );
};

export default Rooms;
