'use client';

import React from 'react';
import styled from 'styled-components';
import SearchBar from '../components/SearchBar';


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

const Page: React.FC = () => {
  return (

      <PageContainer>
        <SearchBar/>
      </PageContainer>
  );
};

export default Page;
