import { Box, Typography, Paper } from '@mui/material';
import React from 'react';
import { text } from 'stream/consumers';


type TextCategory = {
  name?:string;
  presentations?:{
    text:string;
  }[];
}[];

interface OverviewProps{
  textCategories: (TextCategory | null);
}

const Overview: React.FC<OverviewProps> = ({ textCategories }) => {
  if (!textCategories || textCategories.length === 0) {
    return ( 
      <Paper elevation={3} sx={{ padding: 2 }}>
        <Typography variant="body1" paragraph>No overview available</Typography> 
      </Paper>
    ); 
  }

  return (
    <Paper elevation={3} sx={{ padding: 2 }}>
      {textCategories.map((textCategory, index) => (
        <div key={index}>
          <Typography variant="h6" component="h2" gutterBottom>
            {textCategory.name}
          </Typography>
          {textCategory.presentations?.[0] && (
            <Typography variant="body1" paragraph>
              {textCategory.presentations[0].text}
            </Typography>
          )}
        </div>
      ))}
    </Paper>
  );
};

export default Overview;
