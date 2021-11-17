export type RecordValues<R extends Record<any, string | number>> = R[keyof R];
