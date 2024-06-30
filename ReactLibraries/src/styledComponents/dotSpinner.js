
import styled, { keyframes } from 'styled-components'

const dotSpinner = keyframes`
to{
    transform: translateY(-10px);
}
`

export const DotSpinner = styled.div`
display: inline-block;
width: 20px;
height: 20px;
border-radius: 50%;
background-color: black;
animation: ${dotSpinner} .6s infinite alternate ease-in-out;
margin-right: 3px;
transition: transform 3s ease-out;
animation-delay: ${ ({dot}) => {
    if(dot === 2){
        return '0.1s';
    }
    if(dot === 3){
        return '0.2s';
        //Ici, je pense qu' on utilise la syntaxe JS raison pour laquelle on retourne des strings
    }
} };
`