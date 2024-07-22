'use client';

import React from 'react';
import styled from 'styled-components';
import SearchBar from '../components/SearchBar';
import LoadingCircle from "@/components/shared/LoadingCircle";


const PageContainer = styled.div`
    font-family: 'Arial, sans-serif',serif;
    background-image: url('https://wallpapercave.com/wp/wp4557646.jpg'); 
    background-size: cover;
    background-position: center; 
    position: fixed;
    padding-bottom: 8vh;
    background-repeat: no-repeat;
    background-color: blueviolet;
    width: 100%;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
`;
const LoadingContainer = styled.div`
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    bottom: 30vh;
`;

const Page: React.FC = () => {
    const [isLoading , setIsLoading] = React.useState(false);

  return (

      <PageContainer>
        <SearchBar isLoading={isLoading} setIsLoading={setIsLoading}/>
          {isLoading && (
                <LoadingContainer>
                    <LoadingCircle/>
                </LoadingContainer>
          ) }
      </PageContainer>
  );
};

export default Page;
