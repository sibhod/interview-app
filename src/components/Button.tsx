import { css } from '@emotion/react';
import { TEAL } from 'constants/colors';
import { MouseEventHandler, ReactNode } from 'react';

const baseButtonStyle = css`
  appearance: none;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 12px 24px;
  border-radius: 12px;
  transition: filter 0.15s ease;
  
  &:hover {
    filter: brightness(1.15);
  }

  &:active {
    filter: brightness(0.9);
  }
`;

const buttonStyle = css`
  border: 0;
  color: white;
  background-color: var(--color);
`;

const outlineButtonStyle = css`
  background-color: transparent;
  border: solid 1px var(--color);
  color: var(--color);
`;

type ButtonProps = {
  children: ReactNode;
  color?: string;
  disabled?: boolean;
  onClick?: MouseEventHandler;
  outline?: boolean;
};

export const Button = ({
  children,
  color = TEAL,
  disabled,
  onClick,
  outline,
}: ButtonProps) => {
  return (
    <button
      css={[
        css` 
        --color: ${color};
        opacity: ${disabled ? 0.5 : 1};
        cursor: ${disabled ? 'not-allowed' : 'pointer'};
      `,
        baseButtonStyle,
        outline ? outlineButtonStyle : buttonStyle,
      ]}
      onClick={disabled ? undefined : onClick}
    >
      {children}
    </button>
  );
};
