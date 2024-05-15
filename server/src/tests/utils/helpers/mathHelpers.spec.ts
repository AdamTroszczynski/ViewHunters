import { toRadians } from '@/utils/helpers/mathHelpers';

describe('mathHelpers', (): void => {
  describe('toRadians', (): void => {
    it('should convert degrees value to radians correctly', (): void => {
      // GIVEN
      const degrees = 44.5;
      const expectDegrees = 0.7766715171374766;

      // WHEN
      const radians = toRadians(degrees);

      // THEN
      expect(radians).toEqual(expectDegrees);
    });
  });
});
