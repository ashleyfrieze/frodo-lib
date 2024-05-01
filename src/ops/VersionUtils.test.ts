import { state } from '../index';
import { getVersion } from './VersionUtils';

import pkg from '../../package.json';

describe('index', () => {
  test('get library version', () => {
    const result = getVersion({ state });
    expect(result).toEqual(`${pkg.version}`);
  });
});
