'use client';

import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import SearchBar from '../components/SearchBar';
import LoadingCircle from "@/components/shared/LoadingCircle";



const PageContainer = styled.div`
   
    position: fixed;
    width: 100%;
    height: 100vh;
    display: flex; /* Keep flexbox for overall layout */
    align-items: center; /* Center videos vertically */
    justify-content: center; /* Center videos horizontally */
    overflow: hidden;
    margin: 0;
    padding-bottom: 18vh;
`;


const VideoOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  display: flex; /* Keep flexbox for overall layout */
  align-items: end; /* Center videos vertically */
  justify-content: center;
  z-index: -1;
`;

const LoadingContainer = styled.div`
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    right: 10px;
    left: 10px;
    bottom: 30vh;
`;

const Page: React.FC = () => {
    const [isLoading , setIsLoading] = React.useState(false);
    const [videoUrl, setVideoUrl] = useState(null);

    useEffect(() => {
        const fetchVideoUrl = async () => {
            setIsLoading(true);
            const url = '/1890-151167947_medium.mp4'; // Or fetch from an API
            setVideoUrl(url);
            setIsLoading(false);
        };
        fetchVideoUrl();
    }, []);
  return (

      <PageContainer>
          {videoUrl && (
              <VideoOverlay>
                  <video src={videoUrl} autoPlay loop muted></video>
              </VideoOverlay>
          )}
        <SearchBar isLoading={isLoading} setIsLoading={setIsLoading} sx={{ backgroundColor:'rgba(255,255,255,0)'}}/>
          {isLoading && (
                <LoadingContainer>
                    <LoadingCircle/>
                </LoadingContainer>
          ) }
      </PageContainer>
  );
};

export default Page;
