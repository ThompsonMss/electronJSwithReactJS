import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
    html, body, #root {
        margin: 0;
        padding: 0;
        height: 100%;
        /* overflow: hidden; */
        font-family: Arial, Helvetica, sans-serif;
        font-smoothing: antialiased;
    }

    .react-resizable {
        position: relative;
    }

    .react-resizable-handle {
        display: flex;
        justify-content: center;
        user-select: none;
        cursor: ew-resize;
        position: absolute;
        background-color: #999;
        font-size: 24px;
        border-radius: 4px;
        border: 1px solid #666;
        &::before {
            width: 1px;
            height: 32px;
            background: rgba(255, 255, 255, 0.1);
            content: '';
        }
    }

    .react-resizable-handle-e {
        right: -5px;
        padding-right: 5px;
        top: 50%;
        transform: translateY(-50%);
    }
`;

export default GlobalStyles;
