import { db } from '../firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';

export interface EnterpriseData {
  name: string;
  subtitle: string;
  claim: string;
  logoUrl?: string;
  phone?: string;
  instagram?: string;
  facebook?: string;
  address?: string;
}

const ENTERPRISE_COLLECTION = 'enterprise_name';
const DEFAULT_ID = 'default_enterprise'; // In a multi-tenant app, this would be the user's ID or org ID

export const saveEnterpriseData = async (data: EnterpriseData) => {
  try {
    const docRef = doc(db, ENTERPRISE_COLLECTION, DEFAULT_ID);
    await setDoc(docRef, data, { merge: true });
    console.log('Enterprise data saved successfully');
    return true;
  } catch (error) {
    console.error('Error saving enterprise data:', error);
    return false;
  }
};

export const loadEnterpriseData = async (): Promise<EnterpriseData | null> => {
  try {
    const docRef = doc(db, ENTERPRISE_COLLECTION, DEFAULT_ID);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return docSnap.data() as EnterpriseData;
    } else {
      console.log('No enterprise data found');
      return null;
    }
  } catch (error) {
    console.error('Error loading enterprise data:', error);
    return null;
  }
};
