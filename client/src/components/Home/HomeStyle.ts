import styled from "styled-components";

export const Container = styled.div`
    width: 100vw;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
`;

export const ModalContainer = styled.div`
    width: 50%;
    height: 30%;
    display: flex;
    border: 10px solid;
    border-image-slice: 1;
    border-width: 5px;
    border-image-source: linear-gradient(to left, #743ad5, #d53a9d);
    align-items: center;
    justify-content: center;
    flex-direction: column;    
`;

export const Title = styled.span`
    color: #fff;
    margin-bottom: 30px;
    font-weight: 600;
    font-size: 1.5rem;
`;


export const InputBox = styled.input`
    width: 80%;
    height: 40px;
    padding: 10px;
    outline: none;
    font-weight: 400;
    font-size: 1rem;
    margin-bottom: 30px;
    text-align: center;
`;

export const SubmitButton = styled.button`

    width: 90px;
    height: 40px;
    font-weight: 600;
    font-family: 'Nunito', sans-serif;
    color: #fff;
    background-color: rgb(239, 73, 35);
    border: 0;
    cursor: pointer;
    border-radius: 5px;

    &:hover{
        background-color: rgb(239, 73, 35, 0.7);
    }
`;