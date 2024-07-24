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
  textCategories: TextCategory;
}

const Overview : React.FC<OverviewProps> = ({textCategories}) => {

  console.log(textCategories)

  if (!textCategories) {
    return null; // Don't render anything if textCategories is null
  }
  const presentation = textCategories[0]?.presentations?.[0];
  return (
      <Paper elevation={3} sx={{ padding: 2 }}>
      {textCategories.map((textCategory, index) => ( // Map over textCategories
        <div key={index}> 
          <Typography variant="h6" component="h2" gutterBottom>
            {textCategory.name}
          </Typography>
          {textCategory.presentations?.[0] && ( // Conditional rendering
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
