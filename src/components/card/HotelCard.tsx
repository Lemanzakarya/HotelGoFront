import * as React from 'react';
import { useEffect } from 'react';
import AspectRatio from '@mui/joy/AspectRatio';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import CardOverflow from '@mui/joy/CardOverflow';
import Typography from '@mui/joy/Typography';
import Button from '@mui/joy/Button';

interface HotelCardProps {
  title: string;
  location: string;
  apiEndpoint: string;
  price: string;
}

const HotelCard: React.FC<HotelCardProps> = ({
  title,
  location,
  apiEndpoint,
  price,
}: HotelCardProps) => {
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(apiEndpoint);
        if (!response.ok) {
          throw new Error('Veri getirilemedi');
        }
        const data = await response.json();
        setPrice(data.price); // API'den dönen JSON nesnesinde 'price' alanını varsayalım
        // Konum, özellikler gibi diğer verileri burada ekleyebilirsiniz
      } catch (error) {
        console.error('Veri getirme hatası:', error);
      }
    };

    fetchData();
  }, [apiEndpoint]);

  return (
    <Card orientation="horizontal" variant="outlined" sx={{ width: 350, m: 2 }}>
      <CardOverflow>
        <AspectRatio ratio="1" sx={{ width: 120 }}>
          <img
            src={"https://source.unsplash.com/720x400/?nature,water"}
            alt={title}
            loading="lazy"
            style={{ borderRadius: '4px 0 0 4px' }}
          />
        </AspectRatio>
      </CardOverflow>
      <CardContent>
        <Typography fontWeight="bold" textColor="text.primary">
          {title}
        </Typography>
        <Typography textColor="text.secondary">
          {location}
        </Typography>
        <Typography fontWeight="bold" textColor="success.plainColor" sx={{ mt: 1 }}>
          {price} $
        </Typography>
        <Button
          variant="solid"
          color="primary"
          size="sm"
          sx={{ mt: 1 }}
        >
          Look Through
        </Button>
      </CardContent>
    </Card>
  );
};

export default HotelCard;
function setPrice(price: any) {
  throw new Error('Function not implemented.');
}

