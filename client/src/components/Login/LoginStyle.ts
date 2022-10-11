import styled from "styled-components";

export const Container = styled.div`
    width: 100vw;
    height: 100vh;
    border: 2px solid black;
    display: flex;
`;

export const BgImage = styled.img`
    width: 70%;
    min-width: 400px;
`;

export const LeftContainer = styled.div`
    flex: 1 1 auto;
    height: 100%;
    border: 2px solid green;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    `;
    
    export const RightContainer = styled.div`
    width: 45%;
    border: 4px solid pink;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

export const Content = styled.div`
    width: fit-content;
    border: 2px solid blue;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 0 15px;
`;

export const Title = styled.p`
    font-size: 3vw;
    font-weight: 500;
    color: red;
    margin-bottom: 30px;
`;

export const Description = styled.p`
    font-size: 1.5rem;
    color: #fff;
    margin-bottom: 30px;
`;

export const LoginButton = styled.button`
    width: 100px;
    height: 50px;
    font-weight: 600;
    background-color: rgb(239, 73, 35);
    color: #fff;
    border: 0;
    cursor: pointer;
    border-radius: 5px;

    &:hover{
        background-color: rgb(239, 73, 35, 0.7);
    }
`;
