import { mockFetch, mockFetchError } from 'util/mockFetch';
import mockTipsPayload from 'util/mockTipsPayload.json';
import { TipResponse } from 'types/TipResponse';
import { clamp } from 'util/clamp';
import { randomBoolean, randomRange } from 'util/random';

const errorRatio = 0.25;
let threwErrorPreviously = false;

export const mockFetchTips = (index: number) => {
  const delay = randomRange(300, 1200);

  if (index && !threwErrorPreviously && randomBoolean(errorRatio)) {
    threwErrorPreviously = true;
    return mockFetchError(`Error fetching Tip #${index + 1}!`, delay);
  }

  threwErrorPreviously = false;
  const tipIndex = clamp(index, 0, mockTipsPayload.length - 1);
  const response: TipResponse = {
    count: mockTipsPayload.length,
    index: tipIndex,
    message: `Tip ${tipIndex + 1}: ${mockTipsPayload[tipIndex]}`,
  };
  return mockFetch(response, delay);
};
