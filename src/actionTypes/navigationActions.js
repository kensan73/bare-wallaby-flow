// @flow

// action types
export const NAVIGATION_SET_NEXT_URL: string = 'NAVIGATION_SET_NEXT_URL';

// action creators
export const navigationPush = (path: string, viewId: ?string): mixed => (
  {
    hello: 'hi',
  }
);

export const setNextUrl = (args: string): mixed => ({
  type: NAVIGATION_SET_NEXT_URL,
  args,
});
