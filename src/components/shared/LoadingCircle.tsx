import styled, {keyframes} from "styled-components";
import {CircularProgress} from "@mui/material";

const colorChange = keyframes`
    0% {
        color: #0347a8;
    }
    20% {
        color: #0347a8;
    }
    40% {
        color: rgb(237, 123, 19);
    }
    60% {
        color: rgb(237, 123, 19);
    }
    80% {
        color: #0347a8;
    }
    100% {
        color: #0347a8;
    }
`;

const StyledCircularProgress = styled(CircularProgress)`
    && {
        animation: ${colorChange} 1s infinite;
    }
`;

export default function LoadingCircle() {
    return (
        <StyledCircularProgress size={60} thickness={15}/>
    );
}