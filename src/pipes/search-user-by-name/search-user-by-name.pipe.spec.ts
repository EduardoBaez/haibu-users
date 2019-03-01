import { SearchUserByNamePipe } from './search-user-by-name.pipe';

describe('SearchUserByNamePipe', () => {
  it('create an instance', () => {
    const pipe = new SearchUserByNamePipe();
    expect(pipe).toBeTruthy();
  });
});
