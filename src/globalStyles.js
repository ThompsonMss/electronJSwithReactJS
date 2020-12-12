import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
    html, body, #root {
        margin: 0;
        padding: 0;
        height: 100%;
        overflow: hidden;
        font-family: Arial, Helvetica, sans-serif;
        font-smoothing: antialiased;
    }
`;

export default GlobalStyles;
