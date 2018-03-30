import { Block, Blockchain } from './coin';

describe('Block', () => {
  it('should create an instance', () => {
    expect(new Blockchain()).toBeTruthy();
  });
});
