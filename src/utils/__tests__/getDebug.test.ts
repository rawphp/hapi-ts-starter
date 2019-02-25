import { getDebug } from '../getDebug';

describe('getDebug', () => {
  it('is a function', () => {
    expect(typeof getDebug).toEqual('function');
  });

  it('returns a debug function', () => {
    expect(typeof getDebug()).toEqual('function');
  });
});
