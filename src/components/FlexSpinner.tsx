import { css } from '@emotion/react';
import { Spinner, SpinnerProps } from 'components/Spinner';

type Props = SpinnerProps & {
  padding?: number;
};

export const FlexSpinner = ({ padding = 32, ...props }: Props) => {
  props = Object.assign({}, { size: 32, borderWidth: 4 }, props);
  return (
    <div
      css={css`
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: ${padding}px;
      `}
    >
      <Spinner {...props} />
    </div>
  );
};
