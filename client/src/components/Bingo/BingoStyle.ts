import styled from "styled-components";

export const Container = styled.div`
    width: 100vw;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 2px solid green;
    flex-direction: column;
`;

export const Button = styled.button`
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

export const Grid = styled.div`
    margin
    border: 2px solid green;
    display: grid;
    grid-template-columns: repeat(5,1fr);
    grid-template-rows: repeat(5,1fr);
    margin: 20px;
`;

interface CellProps {
    gameStart: boolean;
}

export const Cell = styled.input<CellProps>`
    border: 2px solid pink;
    background: none;
    width: 130px;
    height: 130px;
    text-align: center;
    color: #fff;
    font-size: 4rem;
    background-color: ${props => props.gameStart ? '#ef4923' : null};
`;

export const Text = styled.span`
    font-size: 5vw;
    color: #fff;
`;