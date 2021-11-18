import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { BLUE } from 'constants/colors';
import { BORDER_RADIUS } from 'constants/layout';
import { MouseEventHandler, ReactNode } from 'react';

const ButtonElement = styled.button<{
  color: string;
  disabled: boolean;
  outline: boolean;
}>(
  (props) => `
  --color: ${props.color};
  
  appearance: none;
  display: flex;
  opacity: ${props.disabled ? 0.5 : 1};
  cursor: ${props.disabled ? 'not-allowed' : 'pointer'};
  align-items: center;
  justify-content: center;
  padding: 8px 16px;
  border-radius: ${BORDER_RADIUS};
  min-height: 32px;


  ${
    props.outline
      ? `
      background-color: transparent;
      border: solid 1px var(--color);
      color: var(--color);
    `
      : `
    border: 0;
    color: white;
    background-color: var(--color);
    `
  }
`
);

// const baseButtonStyle = css`
//   appearance: none;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   padding: 8px 16px;
//   border-radius: ${BORDER_RADIUS};
//   transition: filter 0.15s ease;
//   min-height: 32px;

//   &:hover {
//     filter: brightness(1.15);
//   }

//   &:active {
//     filter: brightness(0.9);
//   }
// `;

// const buttonStyle = css`
//   border: 0;
//   color: white;
//   background-color: var(--color);
// `;

// const outlineButtonStyle = css`
//   background-color: transparent;
//   border: solid 1px var(--color);
//   color: var(--color);
// `;

type ButtonProps = {
  color?: string;
  disabled?: boolean;
  outline?: boolean;
} & JSX.IntrinsicElements['button'];

export const Button = ({
  color = BLUE,
  disabled,
  outline,
  ...props
}: ButtonProps) => {
  // return (
  //   <button
  //     css={[
  //       css`
  //         --color: ${color};
  //         opacity: ${disabled ? 0.5 : 1};
  //         cursor: ${disabled ? 'not-allowed' : 'pointer'};
  //       `,
  //       baseButtonStyle,
  //       outline ? outlineButtonStyle : buttonStyle,
  //     ]}
  //     onClick={disabled ? undefined : onClick}
  //   >
  //     {children}
  //   </button>
  // );

  return (
    <ButtonElement
      color={color}
      disabled={disabled ?? false}
      outline={outline ?? false}
      {...props}
    />
  );
};
