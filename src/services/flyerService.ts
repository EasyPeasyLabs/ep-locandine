import { db } from '../firebase';
import { collection, addDoc, getDocs, doc, getDoc, updateDoc } from 'firebase/firestore';
import { FlyerData, LayoutType } from '../context/FlyerContext';

const COLLECTION_NAME = 'flyers';

export interface SavedFlyer {
  id: string;
  data: FlyerData;
  layout: LayoutType;
  createdAt: string;
}

export const saveFlyer = async (data: FlyerData, layout: LayoutType) => {
  try {
    const docRef = await addDoc(collection(db, COLLECTION_NAME), {
      data,
      layout,
      createdAt: new Date().toISOString(),
    });
    return docRef.id;
  } catch (e) {
    console.error("Error adding document: ", e);
    throw e;
  }
};

export const loadFlyers = async (): Promise<SavedFlyer[]> => {
  const querySnapshot = await getDocs(collection(db, COLLECTION_NAME));
  return querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  } as SavedFlyer));
};

export const loadFlyerById = async (id: string): Promise<SavedFlyer | null> => {
    const docRef = doc(db, COLLECTION_NAME, id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        return { id: docSnap.id, ...docSnap.data() } as SavedFlyer;
    } else {
        return null;
    }
}
