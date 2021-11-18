import { useCallback, useEffect, useRef, useState } from 'react';
import { css } from '@emotion/react';
import { BlueButton } from 'components/BlueButton';
import { FlexSection } from 'containers/FlexSection';
import { TipMessage } from 'components/TipMessage';
import { Note } from 'components/Note';
import { mockFetchTips } from 'util/mockFetchTips';
import Bluebird from 'bluebird';
import { RED } from 'constants/colors';

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
      <div
        style={{
          height: 300,
          display: 'flex',
          flexDirection: 'column',
          gridGap: '1em',
          padding: '0 8em',
        }}
      >
        <TipMessage hasError={hasError} isLoading={isLoading} message={tip} />
        <div
          css={css`
            display: flex;
            justify-content: flex-end;
          `}
        >
          <BlueButton disabled={isLoading} onClick={getNextTooltip}>
            {hasError ? 'Try Again' : 'Next'}
          </BlueButton>
        </div>
      </div>
      <Note
        header={
          <>
            Promises, hooks, and <span style={{ color: RED }}>error</span>{' '}
            handling
          </>
        }
        body={
          <>
            <p>
              On this page I wanted to test for knowledge of fetching from an
              API, handling promises, and working with React hooks.
            </p>

            <p>
              I created a mock <code>fetch</code>, that returns data from a
              local JSON through a Promise. The <code>mockFetch</code> will
              randomly reject with an error about every 1 in 5 requests, so
              error handling is required.
            </p>
          </>
        }
      />
    </FlexSection>
  );
};
