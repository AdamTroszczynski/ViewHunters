import dbClient from '@/services/dbClient';
import type Place from '@/types/Place';
import { createPlaceDAO, deleteAllPlacesDAO } from '@/services/placeService/placeDAO';

export const createTestData = async (): Promise<void> => {
    await deleteAllPlacesDAO();
    
    for (let i = 0; i < 7; i++) {
        for (let j = 0; j < 5; j++) {
        const place: Place = {
            id: i * 5 + j,
            name: `Place ${i} ${j}`,
            geoWidth: i * 5 + j,
            geoHeight: i * 5 + j,
            photo: `photo ${i} ${j}`,
            category: `category ${i} ${j}`,
            description: `desc ${i} ${j}`,
        };
        await createPlaceDAO(place);
        }
    }
    await dbClient.$disconnect();
};
