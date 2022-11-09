import styled from "styled-components";

interface ContainerProps {
    openModal: boolean;
}

export const Container = styled.div<ContainerProps>`
    width: 100vw;
    height: calc(100vh - 70px);
    margin-top: 70px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    background-color: ${props => props.openModal ? '#111' : null};
    opacity: ${props => props.openModal ? 0.25 : null};
`;

export const ButtonContainer = styled.div`
    width: 200px;
    justify-content: center;
    align-items: center;
    display: flex;
    margin-top: 20px;
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
    border: 2px solid green;
    display: grid;
    grid-template-columns: repeat(5,1fr);
    grid-template-rows: repeat(5,1fr);
    margin: 20px 20px 0 20px;
`;

interface CellProps {
    gameStart: boolean;
    cursorPointer: boolean;
}

export const Cell = styled.input<CellProps>`
    border: 2px solid pink;
    background: none;
    text-align: center;
    color: #fff;
    font-size: 4rem;
    background-color: ${props => props.gameStart ? '#ef4923' : null};
    cursor: ${ props => props.cursorPointer ? 'pointer': null };

    @media (min-width: 1200px) {
        width: 15vh;
        height: 15vh;
    }

    @media (min-width: 901px) and (max-width: 1999px) {
        width: 15vh;
        height: 15vh;
    }

    @media (min-width: 651px) and (max-width: 900px) {
        width: 14vh;
        height: 14vh;
    }

    @media (max-width: 650px) {
        width: 18vw;
        height: 18vw;
    }
`;

interface BingoTextProps {
    show: boolean;
};

export const BingoText = styled.div<BingoTextProps>`
    color: white;
    writing-mode: vertical-lr;
    text-orientation: upright;
    letter-spacing: 7px;
    text-transform: uppercase;
    border: 10px solid;
    border-image-slice: 1;
    border-width: 5px;
    border-image-source: linear-gradient(to left, #743ad5, #d53a9d);
    border-radius: 50%;
    padding: 10px;
    display: ${props => props.show ? 'block' : 'none'};
`;

export const GridContainer = styled.div`
    display: flex;
    align-items: center;
`;

export const Text = styled.span`
    font-size: 6vw;
    color: #fff;
`;

interface BingoRowProps {
    marginLeft: boolean;
};

export const BingoRow = styled.div<BingoRowProps>`
    display: flex;
    margin-top: 20px;
    align-items: center;
    margin-left: ${props => props.marginLeft ? '-45px' : '0'};
`;

interface BingoCellProps {
    changeColor: boolean;
}

export const BingoCell = styled.div<BingoCellProps>`
    border: 2px solid #E1FFB1;
    background: none;
    @media (min-width: 1200px) {
        width: 15vh;
        height: 15vh;
    }

    @media (min-width: 901px) and (max-width: 1999px) {
        width: 15vh;
        height: 15vh;
    }

    @media (min-width: 651px) and (max-width: 900px) {
        width: 14vh;
        height: 14vh;
    }

    @media (max-width: 650px) {
        width: 18vw;
        height: 18vw;
    }
    display: ${props => props.changeColor ? 'none' : 'flex'};
    align-items: center;
    justify-content: center;
    color: #fff;
    font-size: 5rem;
    background-color: #ef4923;
`;

export const Modal = styled.div`
    position: fixed;
    top: 35%;
    left: 10%;
    width: 80%;
    height: 300px;
    border: 10px solid;
    border-image-slice: 1;
    border-width: 5px;
    border-image-source: linear-gradient(to left, #743ad5, #d53a9d);
    color: white;
    z-index: 2;
    background-color: #040714;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    font-size: 5vw;
`;