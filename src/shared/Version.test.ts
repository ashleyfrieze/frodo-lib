import { getUserAgent } from './Version';

describe('Versions', () => {
    test('user agent is compiled from package', () => {
        expect(getUserAgent()).toMatch(/foo/);
    });
});