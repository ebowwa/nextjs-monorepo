import AsyncStorage from '@react-native-async-storage/async-storage';

export interface Design {
  id: string;
  title: string;
  imageUrl: string;
  createdAt: string;
  description?: string;
  features?: Array<{ text: string }>;
  brandName?: string;
}

const DESIGNS_STORAGE_KEY = '@local_designs';

export class StorageService {
  static async getDesigns(): Promise<Design[]> {
    try {
      const designsJson = await AsyncStorage.getItem(DESIGNS_STORAGE_KEY);
      return designsJson ? JSON.parse(designsJson) : [];
    } catch (error) {
      console.error('Error fetching designs:', error);
      return [];
    }
  }

  static async addDesign(design: Design): Promise<void> {
    try {
      const designs = await this.getDesigns();
      designs.push(design);
      await AsyncStorage.setItem(DESIGNS_STORAGE_KEY, JSON.stringify(designs));
    } catch (error) {
      console.error('Error adding design:', error);
    }
  }

  static async removeDesign(designId: string): Promise<void> {
    try {
      const designs = await this.getDesigns();
      const filteredDesigns = designs.filter(design => design.id !== designId);
      await AsyncStorage.setItem(DESIGNS_STORAGE_KEY, JSON.stringify(filteredDesigns));
    } catch (error) {
      console.error('Error removing design:', error);
    }
  }

  static async getDesignsCount(): Promise<number> {
    try {
      const designs = await this.getDesigns();
      return designs.length;
    } catch (error) {
      console.error('Error getting designs count:', error);
      return 0;
    }
  }
}
