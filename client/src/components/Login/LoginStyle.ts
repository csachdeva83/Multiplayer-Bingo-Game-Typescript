import styled from "styled-components";

export const Container = styled.div`
    width: 100vw;
    height: 100vh;
    display: flex;

    @media (max-width: 650px) {
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }
`;

export const BgImage = styled.img`
    width: 70%;
    min-width: 300px;
`;

export const LeftContainer = styled.div`
    flex: 1 20 auto;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    @media (max-width: 650px) {
        display: none;
    }
`;
    
    export const RightContainer = styled.div`
    width: 45%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    @media (max-width: 650px) {
        width: 100%;
    }
`;

export const Content = styled.div`
    width: fit-content;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 0 15px 0 0;
    @media (max-width: 650px) {
        padding: 0 15px;
    }
`;

export const Title = styled.p`
    font-size: 3vw;
    font-weight: 500;
    color: red;
    margin-bottom: 30px;
    @media (max-width: 650px) {
        font-size: 6.7vw;
    }
`;

export const Description = styled.p`
    font-size: 1.5rem;
    color: #fff;
    margin-bottom: 30px;
    text-align: center;
    @media (max-width: 650px) {
        font-size: 1.4rem;
    }
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
