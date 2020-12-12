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

    .react-resizable {
        position: relative;
    }

    .react-resizable-handle {
        display: flex;
        justify-content: center;
        user-select: none;
        cursor: ew-resize;
        position: absolute;
        background-color: #000;
        font-size: 24px;
        border-radius: 4px;
        border: 1px solid #000;
        &::before {
            width: 1px;
            height: 32px;
            background: rgba(255, 255, 255, 0.1);
            content: '';
        }
    }

    .react-resizable-handle-e {
        right: -4px;
        padding-right: 5px;
        top: 50%;
        transform: translateY(-50%);
    }

    /* SCROLLBAR */

    ::-webkit-scrollbar {
    width: 6px;
    height: 6px;
    }
    ::-webkit-scrollbar-button {
    width: 0px;
    height: 0px;
    }
    ::-webkit-scrollbar-thumb {
    background: #999;
    border: 1px none #ffffff;
    border-radius: 50px;
    }
    ::-webkit-scrollbar-thumb:hover {
    background: #999;
    }
    ::-webkit-scrollbar-thumb:active {
    background: #666;
    }
    ::-webkit-scrollbar-track {
    background: #ffffff;
    border: 0px none #ffffff;
    border-radius: 50px;
    }
    ::-webkit-scrollbar-track:hover {
    background: #ffffff;
    }
    ::-webkit-scrollbar-track:active {
    background: #d1d1d1;
    }
    ::-webkit-scrollbar-corner {
    background: transparent;
    }

    .scrollbarHide::-webkit-scrollbar {
    display: none;
    }

    /* Hide scrollbar for IE, Edge and Firefox */
    .scrollbarHide {
    -ms-overflow-style: none;  /* IE and Edge */
    scrollbar-width: none;  /* Firefox */
    }
`;

export default GlobalStyles;
