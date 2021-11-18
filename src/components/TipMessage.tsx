import { useMemo } from 'react';
import { css } from '@emotion/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faExclamationTriangle,
  faCommentAlt,
} from '@fortawesome/free-solid-svg-icons';
import { Spinner } from 'components/Spinner';
import { P } from 'components/P';
import { KHAKI_BLUE, RED } from 'constants/colors';

const tipStyle = css`
  color: ${KHAKI_BLUE};

  display: flex;
  border: solid 1px currentColor;
  border-radius: 12px;
  overflow: hidden;
`;

const tipErrorStyle = css`
  color: RED;
`;

const iconColumnStyle = css`
  padding: 16px;
  background-color: currentColor;
`;

const messageColumnStyle = css`
  white-space: pre-wrap;
  padding: 16px;
`;

type Props = {
  message?: string;
  isLoading?: boolean;
  hasError?: boolean;
};

const defaultErrorMessage = 'Something went wrong loading the tip.';

export const TipMessage = ({ message, isLoading, hasError }: Props) => {
  const content = useMemo(() => {
    if (hasError) {
      return message ?? defaultErrorMessage;
    }

    return isLoading ? <Spinner /> : <P>{message ?? ''}</P>;
  }, [message, isLoading, hasError]);

  return (
    <div css={[tipStyle, hasError && tipErrorStyle]}>
      <div css={iconColumnStyle}>
        <FontAwesomeIcon
          style={{ color: 'white', width: 16 }}
          icon={hasError ? faExclamationTriangle : faCommentAlt}
        />
      </div>
      <div css={messageColumnStyle}>{content}</div>
    </div>
  );
};
