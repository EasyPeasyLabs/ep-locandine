import { db } from '../firebase';
import { collection, addDoc, getDocs, query, orderBy } from 'firebase/firestore';

export interface LocationData {
  id?: string;
  name: string;
  address: string;
  logo?: string | null;
  createdAt?: number;
}

const LOCATION_COLLECTION = 'location';

export const saveLocation = async (data: Omit<LocationData, 'id'>) => {
  try {
    const docRef = await addDoc(collection(db, LOCATION_COLLECTION), {
      ...data,
      createdAt: Date.now()
    });
    console.log('Location saved successfully with ID:', docRef.id);
    return docRef.id;
  } catch (error) {
    console.error('Error saving location:', error);
    return null;
  }
};

export const loadLocations = async (): Promise<LocationData[]> => {
  try {
    const q = query(collection(db, LOCATION_COLLECTION), orderBy('createdAt', 'desc'));
    const querySnapshot = await getDocs(q);
    
    const locations: LocationData[] = [];
    querySnapshot.forEach((doc) => {
      locations.push({ id: doc.id, ...doc.data() } as LocationData);
    });
    
    return locations;
  } catch (error) {
    console.error('Error loading locations:', error);
    return [];
  }
};
