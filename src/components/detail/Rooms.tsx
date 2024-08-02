import React, { SetStateAction, useState } from "react";
import {
  Grid,
  Card,
  CardContent,
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
import { formatCheckInDate, getOffersBody } from "@/app/responsemodel/getOffersModel";
import BedIcon from '@mui/icons-material/Bed';
import useOfferStore from "@/stores/useOfferStore";
import usePriceSearchStore from "@/stores/usePriceSearch";

const RootCard = styled(Card)({
  maxWidth: 350,
  width: "auto",
  margin: "16px",
  cursor: "pointer",
  transition: "transform 0.2s",
  boxSizing: 'border-box',
  border: '2px solid #ccc',
  borderRadius: '8px',
  padding: '10px',
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
  "&:hover": {
    transform: "scale(1.05)",
  },
});

const CardContentStyled = styled(CardContent)({
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
});

const RoomsContainer = styled(Container)({
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'center',
});

const ViewDetailsLink = styled("a")({
  color: "#1976d2",
  flexDirection:"column",
  textDecoration: "underline",
  "&:hover": {
    textDecoration: "none",
  },
  marginLeft: "5%",
  display: "block",
  marginTop: "8px",
  textAlign: "right",
});

const ReserveButton = styled(Button)({
  marginTop: "8px",
  backgroundColor: '#ff8737',
  '&:hover': {
    backgroundColor: '#d45500'
  }
});

const FeaturesList = styled("ul")({
  paddingLeft: 0,
  listStyleType: "none",
  marginTop: "10px",
});

const FeatureItem = styled("li")({
  display: "flex",
  alignItems: "center",
  marginBottom: "8px",
});

interface RoomFeature {
  icon: React.ReactElement | null;
  text: string;
}

interface Room {
  id: number;
  title: string;
  description: string;
  price: string;
  features: RoomFeature[];
}

interface RoomsProps {
  isLoading: boolean;
  setIsLoading: React.Dispatch<SetStateAction<boolean>>;
  offers: getOffersBody | null;
}

const Rooms: React.FC<RoomsProps> = ({ isLoading, setIsLoading, offers }) => {
  const router = useRouter();
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const [openDialog, setOpenDialog] = useState(false);

  const setOfferIds = useOfferStore(state => state.setOfferIds);
  const setCurrency = useOfferStore(state => state.setCurrency); 
  const currency = usePriceSearchStore(state => state.currency);

  const handleViewDetails = (offer: any) => {
    const formattedCancellationPolicies = offer.cancellationPolicies.map((policy: any) => {
      const dueDate = new Date(policy.dueDate).toLocaleDateString();
      const percent = policy.price.percent || policy.price.amount;
      const isPercent = !!policy.price.percent
      return `Due date: ${dueDate}\nPrice: ${isPercent? `${percent}%` : percent}`;
    }).join(",\n"); 
  
    setSelectedRoom({
      id: parseInt(offer.offerID),
      title: offer.rooms.map((room: { roomName: any; }) => room.roomName).join(", "),
      description: `Cancellation Policies:\n${formattedCancellationPolicies}`,
      price: `${formatPrice(offer.price.amount)} ${offer.price.currency}`,
      features: offer.rooms.map((room: { roomName: any; boardGroups: any[]; }) => ({
        icon: null,
        text: `${room.roomName} - ${room.boardGroups.map((bg: { name: any; }) => bg.name).join(', ')}`
      }))
    });
    setOpenDialog(true);
  };

  const handleCloseDialog = () => setOpenDialog(false);

  const handleReserve = (offerId: string) => {
    setIsLoading(true);
    setOfferIds([offerId]);
    setTimeout(() => {
      router.push(`/reservation`);
      setIsLoading(false);
    }, 2000);
  };

  const formatPrice = (price: number) => {
    return price.toFixed(2);
  };

  //TODO:for test will be deleted
  console.log("recieved offers:", offers);
  //console.log("Recieved details:",offerDetails);

  if (!offers || !offers.offers || !Array.isArray(offers.offers) || offers.offers.length === 0) {
    return (
      <Container>
        <Typography variant="h6">No offers available.</Typography>
      </Container>
    );
  }

  return (
    <RoomsContainer>
      <Grid container spacing={3}>
        {offers.offers.map((offer) => (
          <Grid item xs={12} sm={6} md={4} key={offer.offerID}>
            <RootCard>
              <CardContentStyled>
                <Typography gutterBottom variant="h5" component="div">
                  <BedIcon /> {offer.rooms.map((room) => room.roomName).join(", ")}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Check-in: {formatCheckInDate(offer)}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Nights: {offer.night}
                </Typography>
                {offer.price && (
                  <Typography variant="body1" color="textPrimary" sx={{ marginTop: "10px" }}>
                    Price: {formatPrice(offer.price.amount)} {offer.price.currency}
                  </Typography>
                )}
                <Typography variant="body2" color="textPrimary" mt={2}>
                  Features:
                </Typography>
                <FeaturesList>
                  {offer.rooms.map((room, index) => (
                    <FeatureItem key={index} sx={{ mb: 0 }}>
                      <Typography variant="body2" color="textPrimary">
                        {room.roomName} - {room.boardGroups.map(bg => bg.name).join(', ')}
                      </Typography>
                    </FeatureItem>
                  ))}
                </FeaturesList>
              </CardContentStyled>
              <ViewDetailsLink sx={{ mr: 2 }} onClick={() => handleViewDetails(offer)}>
                View Detail
              </ViewDetailsLink>
              <ReserveButton
                variant="contained"
                fullWidth
                onClick={() => handleReserve(offer.offerID)}
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
            <Typography gutterBottom>{selectedRoom?.description}</Typography>
            <Typography variant="body1">Price: {selectedRoom?.price}</Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog}>Close</Button>
          </DialogActions>
        </Dialog>
      </Grid>
    </RoomsContainer>
  );
};

export default Rooms;
