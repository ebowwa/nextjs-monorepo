/**  TODO modularize:
- Settings
  - 
- profile

*/
import React, { useEffect, useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  SafeAreaView, 
  Alert, 
  ScrollView, 
  Image,
  TouchableOpacity,
  Dimensions,
  Platform,
  ActionSheetIOS,
  Modal,
  Pressable,
  Settings,
  ActivityIndicator,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { colors, spacing, typography } from '../theme';
import { supabase } from '../lib/supabase';
import { RootStackParamList } from '../../App';
import TrendsScreen from './TrendsScreen';
import Card from '../components/Card';
import ImageDetailModal from '../components/ImageDetailModal';
import { StorageService, Design } from '../services/storage';
import { Ionicons } from '@expo/vector-icons';
import { DatabaseService, PublicDesign, Post } from '../services/database';

const { width } = Dimensions.get('window');

type DashboardScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Dashboard'>;

interface Props {
  navigation: DashboardScreenNavigationProp;
}

export default function DashboardScreen({ navigation }: Props) {
  const [userName, setUserName] = useState<string>('');
  const [imageDetailModalVisible, setImageDetailModalVisible] = useState(false);
  const [designsCount, setDesignsCount] = useState(0);
  const [myDesigns, setMyDesigns] = useState<Design[]>([]);
  const [trendingPosts, setTrendingPosts] = useState<Post[]>([]);
  const [isLoadingTrending, setIsLoadingTrending] = useState(true);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  useEffect(() => {
    getUserProfile();
    loadDesigns();
    loadTrendingPosts();
  }, []);

  const getUserProfile = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (user?.email) {
        const name = user.user_metadata?.full_name || user.email.split('@')[0];
        setUserName(name);
      }
    } catch (error) {
      console.error('Error fetching user:', error);
    }
  };

  const loadDesigns = async () => {
    const designs = await StorageService.getDesigns();
    setMyDesigns(designs);
    setDesignsCount(designs.length + 1);
  };

  const placeholderPosts = [
    {
      id: 'placeholder1',
      title: 'Autumn Nature Print',
      imageUrl: 'https://picsum.photos/400/500?random=1',
      created_at: new Date().toISOString(),
      description: 'Beautiful autumn scene with vibrant colors',
      brand_name: 'Nature Gallery',
      views_count: 2300,
      likes_count: 89,
    },
    {
      id: 'placeholder2',
      title: 'Urban Photography',
      imageUrl: 'https://picsum.photos/400/500?random=2',
      created_at: new Date().toISOString(),
      description: 'Modern city architecture',
      brand_name: 'Urban Prints',
      views_count: 1800,
      likes_count: 76,
    },
    {
      id: 'placeholder3',
      title: 'Abstract Art Print',
      imageUrl: 'https://picsum.photos/400/500?random=3',
      created_at: new Date().toISOString(),
      description: 'Contemporary abstract design',
      brand_name: 'Modern Art Collection',
      views_count: 1500,
      likes_count: 65,
    },
  ];

  const loadTrendingPosts = async () => {
    setIsLoadingTrending(true);
    try {
      const posts = await DatabaseService.getPublicPosts();
      setTrendingPosts(posts.length > 0 ? posts : placeholderPosts);
    } catch (error) {
      console.error('Error loading trending posts:', error);
      setTrendingPosts(placeholderPosts);
    } finally {
      setIsLoadingTrending(false);
    }
  };

  const handleSignOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      navigation.replace('Splash');
    } catch (error) {
      Alert.alert('Error signing out', error.message);
      // TODO: Handle sign out error by showing an alert that defines the errors
    }
  };

  const handleProfilePress = () => {
    ActionSheetIOS.showActionSheetWithOptions(
      {
        options: ['Cancel', 'View Profile', 'Settings', 'Sign Out'],
        cancelButtonIndex: 0,
        destructiveButtonIndex: 3,
        title: userName,
        message: 'Profile Options',
      },
      (buttonIndex) => {
        switch (buttonIndex) {
          case 1:
            Alert.alert('Coming Soon', 'Profile view will be available soon!');
            break;
          case 2:
            Alert.alert('Coming Soon', 'Settings will be available soon!');
            break;
          case 3:
            Alert.alert(
              'Sign Out',
              'Are you sure you want to sign out?',
              [
                {
                  text: 'Cancel',
                  style: 'cancel',
                },
                {
                  text: 'Sign Out',
                  style: 'destructive',
                  onPress: handleSignOut,
                },
              ]
            );
            break;
        }
      }
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Good afternoon</Text>
          <Text style={styles.name}>{userName}</Text>
        </View>
        <TouchableOpacity onPress={handleProfilePress}>
          <Image 
            source={{ uri: `https://ui-avatars.com/api/?name=${encodeURIComponent(userName)}&background=0D8ABC&color=fff` }}
            style={styles.avatar}
          />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>{designsCount}</Text>
            <Text style={styles.statLabel}>Total Designs</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>$0k</Text>
            <Text style={styles.statLabel}>Revenue</Text>
          </View>
        </View>

        <View style={styles.quickActions}>
          <TouchableOpacity 
            style={styles.actionButton}
            onPress={() => Alert.alert('Coming Soon', 'AI Design generation coming soon!')}
          >
            <View style={[styles.actionIcon, { backgroundColor: '#E8F3FF' }]}>
              <Text style={{ fontSize: 24 }}>🎨</Text>
            </View>
            <Text style={styles.actionText}>Create Design</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.actionButton}
            onPress={() => navigation.navigate('MarketResearch')}
          >
            <View style={[styles.actionIcon, { backgroundColor: '#FFE8F3' }]}>
              <Text style={{ fontSize: 24 }}>📊</Text>
            </View>
            <Text style={styles.actionText}>Research</Text>
          </TouchableOpacity>

          {/* Temporarily commented out My Gallery section
          <TouchableOpacity 
            style={styles.actionButton}
            onPress={() => Alert.alert('Coming Soon', 'Gallery feature coming soon!')}
          >
            <View style={[styles.actionIcon, { backgroundColor: '#FFF3E8' }]}>
              <Text style={{ fontSize: 24 }}>🖼️</Text>
            </View>
            <Text style={styles.actionText}>My Gallery</Text>
          </TouchableOpacity>
          */}

          <TouchableOpacity 
            style={styles.actionButton}
            onPress={() => Alert.alert('Coming Soon', 'Store integration coming soon!')}
          >
            <View style={[styles.actionIcon, { backgroundColor: '#E8FFE9' }]}>
              <Text style={{ fontSize: 24 }}>🛍️</Text>
            </View>
            <Text style={styles.actionText}>My Store</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.trendingSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Trending Posts</Text>
            <TouchableOpacity onPress={loadTrendingPosts}>
              <Text style={styles.seeAll}>Refresh</Text>
            </TouchableOpacity>
          </View>
          
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.trendingScroll}
          >
            {isLoadingTrending ? (
              <ActivityIndicator size="large" color={colors.primary} />
            ) : trendingPosts.length > 0 ? (
              trendingPosts.map((post) => (
                <Card
                  key={post.id}
                  title={post.title}
                  subtitle={`${post.views_count || 0} views • ${post.likes_count || 0} likes`}
                  imageSource={post.imageUrl}
                  cardWidth={width * 0.7}
                  style={{ marginRight: 16 }}
                  onPress={() => {
                    setSelectedPost(post);
                    setImageDetailModalVisible(true);
                  }}
                />
              ))
            ) : (
              <Text style={styles.noDesignsText}>No trending posts yet</Text>
            )}
          </ScrollView>
        </View>

        <View style={styles.myCreationsSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>My Creations</Text>
          </View>
          
          <View style={styles.creationsGrid}>
            {/* Example design - always show this */}
            <Card
              title="Getting Started: Your First Print"
              subtitle="Created Dec 25"
              imageSource="https://picsum.photos/400/500?random=1"
              onPress={() => setImageDetailModalVisible(true)}
            />
            
            {/* User's local designs */}
            {myDesigns.map((design) => (
              <Card
                key={design.id}
                title={design.title}
                subtitle={`Created ${new Date(design.createdAt).toLocaleDateString()}`}
                imageSource={design.imageUrl}
                onPress={() => {
                  setImageDetailModalVisible(true);
                }}
              />
            ))}
          </View>
          <TouchableOpacity 
            style={styles.addButton}
            onPress={() => navigation.navigate('MarketResearch')}
          >
            <Ionicons name="add" size={24} color="white" />
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Image Detail Modal 
      - these should be like user creations and be able to have new ones added
      - visually; i want to add a plus sign below the my creations
      - i would like to modularize the my creations and the public creations with each having its own script and used here.

       User's local designs 

      */}
      
      <ImageDetailModal
        visible={imageDetailModalVisible}
        onClose={() => setImageDetailModalVisible(false)}
        imageUrl={selectedPost ? selectedPost.imageUrl : "https://picsum.photos/800/800?random=1"}
        title={selectedPost ? selectedPost.title : "Autumn Park Bench Photography Wall Art - Nature Landscape Canvas Print - Fall Season Home Decor"}
        date={selectedPost ? selectedPost.created_at : "Created Dec 25"}
        brandName={selectedPost ? selectedPost.brand_name : "Urban Nature Gallery Collection"}
        postId={selectedPost?.id}
        features={[
          { text: " PREMIUM QUALITY: Museum-grade canvas print with fade-resistant inks, gallery-wrapped edges, and ready-to-hang hardware included. Available in multiple sizes to perfectly fit your space. Each print is carefully inspected for quality assurance." },
          { text: " VERSATILE DECOR: Perfect wall art for living room, bedroom, office, hotel, dining room, kitchen, bathroom. This stunning autumn scene creates a warm, inviting atmosphere in any room. Makes an excellent housewarming, wedding, or holiday gift." },
          { text: " UNIQUE DESIGN: Professionally photographed park bench surrounded by vibrant fall foliage captures the essence of autumn. Rich golden colors and crisp details create a focal point that brings nature's beauty indoors." },
          { text: " PERFECT SIZE: Available in 16x20 inches, 20x24 inches, 24x36 inches, and 30x40 inches. Landscape orientation. Please measure your wall space carefully before ordering to ensure the perfect fit for your room." },
          { text: " SATISFACTION GUARANTEED: We stand behind our products 100%. If you're not completely satisfied with your purchase, contact us for a replacement or refund. Proudly printed and shipped from the USA." }
        ]}
        description="Transform your living space with this stunning Autumn Park Bench Photography Wall Art from Urban Nature Gallery Collection. This professionally captured landscape print showcases a serene park bench framed by a breathtaking carpet of golden autumn leaves, creating the perfect balance of man-made elegance and natural beauty.

PREMIUM MATERIALS & CRAFTSMANSHIP:
• Museum-grade canvas with archival-quality inks
• Gallery-wrapped edges for a modern, frameless look
• Sturdy wooden frame with reinforced corners
• UV-protective coating prevents fading
• Ready-to-hang with pre-installed hardware

PERFECT FOR ANY ROOM:
• Living Room: Create a stunning focal point above your sofa
• Bedroom: Add a peaceful nature scene to your sanctuary
• Office: Bring the calming effects of nature indoors
• Dining Room: Set an elegant mood for entertaining
• Hotel or Restaurant: Add sophisticated ambiance to commercial spaces

DESIGN FEATURES:
• Rich autumn colors: Golden yellows, warm oranges, and deep browns
• High-resolution photography captures every detail
• Peaceful composition draws viewers into the scene
• Available in multiple sizes to suit your space
• Landscape orientation works well over furniture

IDEAL GIFT FOR:
• Housewarming celebrations
• Wedding presents
• Holiday gifts
• Office decorating
• Interior design projects

SIZING GUIDE:
• Small (16x20 inches): Perfect for smaller walls or as part of a gallery wall
• Medium (20x24 inches): Ideal above side tables or in hallways
• Large (24x36 inches): Makes a statement above sofas or beds
• Extra Large (30x40 inches): Creates dramatic impact in larger spaces

Care Instructions: Dust with a soft, dry cloth. Avoid direct sunlight and high humidity areas to maintain print quality.

Made in the USA | Fast Shipping | 100% Satisfaction Guaranteed

Click 'Add to Cart' now to bring the peaceful beauty of autumn into your space!"
        isNewDesign={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  greeting: {
    fontSize: 16,
    color: '#666666',
    marginBottom: 4,
  },
  name: {
    fontSize: 24,
    fontWeight: '700',
    color: '#000000',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  content: {
    flex: 1,
  },
  statsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    gap: 12,
    marginBottom: 24,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#F8F9FA',
    borderRadius: 16,
    padding: 16,
  },
  statValue: {
    fontSize: 24,
    fontWeight: '700',
    color: '#000000',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 14,
    color: '#666666',
  },
  quickActions: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    justifyContent: 'space-between',
    marginBottom: 32,
  },
  actionButton: {
    alignItems: 'center',
  },
  actionIcon: {
    width: 56,
    height: 56,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  actionText: {
    fontSize: 14,
    color: '#000000',
    fontWeight: '500',
  },
  trendingSection: {
    paddingLeft: 20,
    marginBottom: 32,
  },
  myCreationsSection: {
    paddingHorizontal: 20,
    marginBottom: 32,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#000000',
  },
  seeAll: {
    fontSize: 14,
    color: '#007AFF',
    fontWeight: '600',
  },
  trendingScroll: {
    paddingRight: 20,
    gap: 16,
  },
  creationsGrid: {
    gap: 16,
    position: 'relative',
  },
  addButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  noDesignsText: {
    fontSize: 16,
    color: '#666666',
    textAlign: 'center',
    padding: 20,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    flex: 1,
    backgroundColor: colors.background,
    padding: 20,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: 20,
  },
  closeButton: {
    padding: 8,
  },
  closeButtonText: {
    fontSize: 20,
    color: colors.text,
  },
});
