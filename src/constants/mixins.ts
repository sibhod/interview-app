import { css } from '@emotion/react';

export const transparentScrollBarStyle = css`
  ::-webkit-scrollbar {
    width: inherit;
  }

  ::-webkit-scrollbar-track {
    background: transparent;
  }

  ::-webkit-scrollbar-thumb {
    background: transparent;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: transparent;
  }
`;

export const tracklessScrollBarStyle = css`
  ::-webkit-scrollbar {
    width: 10px;
  }

  ::-webkit-scrollbar-track {
    background: transparent;
  }

  ::-webkit-scrollbar-thumb {
    border: solid 2px white;
    border-radius: 60px;
    background: grey;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: #333;
  }
`;
