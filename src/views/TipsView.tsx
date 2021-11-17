import { useCallback, useEffect, useRef, useState } from 'react';
import { css } from '@emotion/react';
import { Button } from 'components/Button';
import { FlexSection } from 'containers/FlexSection';
import { TipMessage } from 'components/TipMessage';
import { mockFetchTips } from 'util/mockFetchTips';
import Bluebird from 'bluebird';

type TipViewState = {
  tip: string;
  nextTipIndex: number;
  isLoading: boolean;
  hasError: boolean;
};

const initialTipViewState: TipViewState = {
  hasError: false,
  isLoading: true,
  nextTipIndex: 0,
  tip: '',
};

export const TipsView = () => {
  const [{ tip, nextTipIndex, isLoading, hasError }, setTipViewState] =
    useState<TipViewState>(initialTipViewState);
  const promiseRef = useRef<Bluebird<any> | null>(null);

  const getNextTooltip = useCallback(() => {
    setTipViewState((state) => ({
      ...state,
      isLoading: true,
      hasError: false,
    }));

    promiseRef.current = mockFetchTips(nextTipIndex)
      .then(({ message, index, count }) => {
        setTipViewState((state) => ({
          ...state,
          isLoading: false,
          tip: message,
          nextTipIndex: (index + 1) % count,
        }));
      })
      .catch((error) => {
        setTipViewState((state) => ({
          ...state,
          isLoading: false,
          hasError: true,
          tip: `${error.toString()}\nClick the button to try again.`,
        }));
      });
  }, [nextTipIndex]);

  useEffect(() => {
    getNextTooltip();
    return () => promiseRef.current?.cancel();
  }, []);

  return (
    <FlexSection>
      {/*       
      <TipMessage isLoading={true} />
      <TipMessage
        message={
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum varius tortor quis malesuada semper. Fusce at faucibus lacus. Donec sed massa nec diam aliquet iaculis vel efficitur magna. Proin malesuada nisl quis lacinia posuere. Aenean ipsum odio, aliquet ac massa vitae, laoreet iaculis massa. Sed dignissim placerat lectus gravida egestas. Nullam nisi lectus, pulvinar eget venenatis eu, fringilla sed quam. Duis nec fermentum neque.'
        }
      />
      <TipMessage hasError={true} />
      <div
        css={css`
        display: flex;
        justify-content: flex-end;
      `}
      >
        <Button>Next</Button>
      </div>
      <hr /> */}
      <TipMessage hasError={hasError} isLoading={isLoading} message={tip} />
      <div
        css={css`
        display: flex;
        justify-content: flex-end;
      `}
      >
        <Button disabled={isLoading} onClick={getNextTooltip}>
          {hasError ? 'Try Again' : 'Next'}
        </Button>
      </div>
    </FlexSection>
  );
};
