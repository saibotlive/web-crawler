import styled, { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
  }

  html,
  body {
    background-color: #282c34;
    height: 100%;
    width: 100%;
  }
`;

export const Form = styled.form`
  align-items: center;
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: center;
  margin: auto;
  padding: 10px;
  position: absolute;
  width:100%;
`;

export const Text = styled.input`
  display: block;
  font-size: 14px;
  margin-bottom: 2px;
  padding: 0;
  width: 300px;
`;

export const Button = styled.button`
  font-size: 14px;
  width: 300px;
`;

export const Status = styled.p`
  color: #fff;
  font-size: 14px;
  width: 300px;
`;
