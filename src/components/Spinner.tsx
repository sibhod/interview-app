import { css, keyframes } from '@emotion/react';
import { TEAL } from 'constants/colors';

const spinAnimation = keyframes`
  0% {
    transform: rotateZ(0deg);
  }

  100% {
    transform: rotateZ(360deg);
  }
`;

export type SpinnerProps = {
  borderWidth?: number;
  color?: string;
  size?: number;
};

export const Spinner = ({
  borderWidth = 2,
  color = TEAL,
  size = 16,
}: Props) => {
  return (
    <div style={{ width: size, height: size }}>
      <div
        css={css`
          width: 100%;
          height: 100%;
          border-radius: 50%;
          box-sizing: border-box;
          border: solid ${borderWidth}px ${color};
          border-top-color: transparent;
          border-right-color: transparent;
          animation: ${spinAnimation} 0.5s linear infinite;
        `}
      />
    </div>
  );
};
