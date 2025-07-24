import { supabase } from '../lib/supabase';
import { Design } from './storage';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CACHE_KEYS = {
  PUBLIC_POSTS: '@cache_public_posts',
  USER_POSTS: '@cache_user_posts_',
  CACHE_DURATION: 1000 * 60 * 5, // 5 minutes
};

export interface Post extends Design {
  user_id: string;
  is_public: boolean;
  brand_name: string;
  product_features: Array<{ text: string }>;
  updated_at: string;
}

export class DatabaseService {
  static async savePost(design: Design, isPublic: boolean = false): Promise<void> {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('User not authenticated');

      const post = {
        title: design.title,
        image_uri: design.imageUrl,
        description: design.description,
        is_public: isPublic,
        brand_name: design.brandName,
        product_features: design.features,
        user_id: user.id,
      };

      const { error } = await supabase
        .from('posts')
        .insert([post]);

      if (error) throw error;

      // Invalidate relevant caches
      await this.invalidateCache(isPublic ? CACHE_KEYS.PUBLIC_POSTS : CACHE_KEYS.USER_POSTS + user.id);
    } catch (error) {
      console.error('Error saving post:', error);
      throw error;
    }
  }

  static async getPublicPosts(): Promise<Post[]> {
    try {
      // Try to get from cache first
      const cachedData = await this.getFromCache(CACHE_KEYS.PUBLIC_POSTS);
      if (cachedData) return cachedData;

      const { data, error } = await supabase
        .from('posts')
        .select('*')
        .eq('is_public', true)
        .order('created_at', { ascending: false });

      if (error) throw error;

      const posts = data.map(post => ({
        ...post,
        imageUrl: post.image_uri,
        brandName: post.brand_name,
        features: post.product_features,
      }));

      // Save to cache
      await this.saveToCache(CACHE_KEYS.PUBLIC_POSTS, posts);
      return posts;
    } catch (error) {
      console.error('Error fetching public posts:', error);
      return [];
    }
  }

  static async getUserPosts(userId: string): Promise<Post[]> {
    try {
      // Try to get from cache first
      const cacheKey = CACHE_KEYS.USER_POSTS + userId;
      const cachedData = await this.getFromCache(cacheKey);
      if (cachedData) return cachedData;

      const { data, error } = await supabase
        .from('posts')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false });

      if (error) throw error;

      const posts = data.map(post => ({
        ...post,
        imageUrl: post.image_uri,
        brandName: post.brand_name,
        features: post.product_features,
      }));

      // Save to cache
      await this.saveToCache(cacheKey, posts);
      return posts;
    } catch (error) {
      console.error('Error fetching user posts:', error);
      return [];
    }
  }

  private static async saveToCache(key: string, data: any): Promise<void> {
    try {
      const cacheData = {
        data,
        timestamp: Date.now(),
      };
      await AsyncStorage.setItem(key, JSON.stringify(cacheData));
    } catch (error) {
      console.error('Error saving to cache:', error);
    }
  }

  private static async getFromCache(key: string): Promise<any | null> {
    try {
      const cachedItem = await AsyncStorage.getItem(key);
      if (!cachedItem) return null;

      const { data, timestamp } = JSON.parse(cachedItem);
      const isExpired = Date.now() - timestamp > CACHE_KEYS.CACHE_DURATION;

      if (isExpired) {
        await AsyncStorage.removeItem(key);
        return null;
      }

      return data;
    } catch (error) {
      console.error('Error reading from cache:', error);
      return null;
    }
  }

  private static async invalidateCache(key: string): Promise<void> {
    try {
      await AsyncStorage.removeItem(key);
    } catch (error) {
      console.error('Error invalidating cache:', error);
    }
  }
}
