import dbClient from '@/services/dbClient'; 
import { 
  getNearestPlacesDAO, 
  deleteAllPlacesDAO 
} from '@/services/placeService/placeDAO'; 
import { createTestData } from './placeDAOHelpers';

    
describe('placeDAO.ts', (): void => {
  beforeAll(async (): Promise<void> => {
    await createTestData();
  });

  afterAll(async (): Promise<void> => {
    await deleteAllPlacesDAO();
  });

  afterEach(async (): Promise<void> => {
    await dbClient.$disconnect();
  });

  describe('getNearestPlacesDAO', (): void => {
    it('should return an array of places', async (): Promise<void> => {
      // GIVEN

      // WHEN
      const result = await getNearestPlacesDAO();

      // THEN
      expect(result.length).toBe(35);
    });
  });
});

