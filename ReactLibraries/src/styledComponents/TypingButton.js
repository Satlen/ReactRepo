import styled from "styled-components";

export const TypingButton = styled.button`
  display: inline-block;
  padding: 1.5vw;
  font-size: 1.5rem;
  font-weight: bold;
  color: black;
  background: transparent;
  border: 1px solid black;
  cursor: pointer;
  border-radius: 10px;
  transition: color 0.2 ease-out;

  &:hover {
    border-color: coral;
    color: coral;
  }
  &:disabled{
    cursor: not-allowed;
    color: inherit;
    border-color: inherit;
    opacity: 0.4;
  }
`;
