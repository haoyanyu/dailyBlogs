import {describe, expect, test} from '@jest/globals';

import schema from '../src/constants/schema';

import { getAvailableSchema } from '../src/utils/flat-schema';


describe('available schema length', () => {
  test("available schema's length is 2", () => {
    expect(getAvailableSchema(schema).length).toBe(2);
  })
})