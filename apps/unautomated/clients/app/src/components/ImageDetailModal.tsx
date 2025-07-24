import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Modal,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Dimensions,
  ActivityIndicator,
  Switch,
  Alert,
  Share,
} from 'react-native';
import { colors } from '../theme';
import { DatabaseService } from '../services/database';
import { Ionicons } from '@expo/vector-icons';
import { CONFIG } from '../config/constants';
import * as ImagePicker from 'expo-image-picker';
import { Platform } from 'react-native';
import { supabase } from '../lib/supabase';

const { width } = Dimensions.get('window');

interface ProductFeature {
  text: string;
}

interface ProductDetails {
  design_title: string;
  brand: string;
  feature_bullet1: string;
  feature_bullet2: string;
  product_description: string;
}

interface Design {
  // Add design properties here
}

interface ImageDetailModalProps {
  visible: boolean;
  onClose: () => void;
  imageUrl: string;
  title: string;
  date: string;
  brandName: string;
  features: ProductFeature[];
  description: string;
  isNewDesign?: boolean;
  design?: Design;
  postId?: string;
}

const ImageDetailModal: React.FC<ImageDetailModalProps> = ({
  visible,
  onClose,
  imageUrl,
  title,
  date,
  brandName,
  features,
  description,
  isNewDesign = false,
  design,
  postId,
}) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [productDetails, setProductDetails] = useState<ProductDetails | null>(null);
  const [isPublic, setIsPublic] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
    if (status !== 'granted') {
      Alert.alert('Permission needed', 'Please grant permission to access your photos');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled) {
      const { uri } = result.assets[0];
      uploadImage(uri);
    }
  };

  const uploadImage = async (uri: string) => {
    try {
      setIsGenerating(true);
      setUploadProgress(0);

      // Get the filename from the uri
      const filename = uri.split('/').pop() || 'upload.jpg';

      // Create form data
      const formData = new FormData();
      formData.append('file', {
        uri,
        name: filename,
        type: 'image/jpeg',
      });
      formData.append('title', title);
      formData.append('username', 'ebowwa'); // Using your username

      // Upload to our backend
      const response = await fetch('http://localhost:8000/api/upload/image', {
        method: 'POST',
        body: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to upload image');
      }

      const data = await response.json();
      setProductDetails(data.product_details);
      
      Alert.alert(
        'Success',
        'Image uploaded and product details generated!',
        [{ text: 'OK' }]
      );

    } catch (error) {
      console.error('Error uploading image:', error);
      Alert.alert('Error', 'Failed to upload image. Please try again.');
    } finally {
      setIsGenerating(false);
      setUploadProgress(0);
    }
  };

  const generateProductDetails = async () => {
    setIsGenerating(true);
    try {
      const response = await fetch('http://localhost:8000/api/product/generate-details', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          design_concept: title,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate product details');
      }

      const data = await response.json();
      setProductDetails(data);
    } catch (error) {
      console.error('Error generating product details:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleShare = async () => {
    try {
      let shareUrl = CONFIG.WEBSITE_URL;
      
      if (postId) {
        shareUrl = CONFIG.SHARE_ROUTES.POST(postId);
      }

      const result = await Share.share({
        message: `Check out this amazing design on Print On Demand Assistant`,
        url: shareUrl,
      });

      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          console.log('Shared with activity type:', result.activityType);
        } else {
          console.log('Shared');
        }
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to share design');
    }
  };

  const handleSaveDesign = async () => {
    if (!design) return;
    
    setIsSaving(true);
    try {
      await DatabaseService.savePost(design, isPublic);
      Alert.alert(
        'Success',
        `Post saved ${isPublic ? 'publicly' : 'privately'}!`,
        [{ text: 'OK', onPress: onClose }]
      );
    } catch (error) {
      Alert.alert('Error', 'Failed to save post. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Modal
      animationType="slide"
      transparent={false}
      visible={visible}
      onRequestClose={onClose}
    >
      <SafeAreaView style={[styles.modalContainer, { backgroundColor: colors.background }]}>
        <ScrollView style={[styles.modalScroll, { backgroundColor: colors.background }]} bounces={false}>
          <View style={styles.modalHeader}>
            <View style={styles.headerActions}>
              <TouchableOpacity onPress={handleShare} style={styles.actionButton}>
                <Ionicons name="share-outline" size={24} color={colors.text} />
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.closeButton, { backgroundColor: colors.background }]}
                onPress={onClose}
              >
                <Text style={[styles.closeButtonText, { color: colors.text }]}>✕</Text>
              </TouchableOpacity>
            </View>
          </View>
          
          <View style={[styles.imageContainer, { backgroundColor: colors.background }]}>
            {imageUrl && (
              <Image
                source={{ uri: imageUrl }}
                style={styles.modalImage}
                resizeMode="cover"
              />
            )}
          </View>
          
          <View style={styles.modalInfo}>
            <Text style={[styles.modalTitle, { color: colors.text }]}>{productDetails?.design_title || title}</Text>
            <Text style={[styles.modalDate, { color: colors.textSecondary }]}>{date}</Text>
            
            <View style={styles.modalSection}>
              <Text style={[styles.sectionTitle, { color: colors.text }]}>Brand Name</Text>
              <Text style={[styles.sectionContent, { color: colors.textSecondary }]}>
                {productDetails?.brand || brandName}
              </Text>
            </View>
            
            <View style={styles.modalSection}>
              <Text style={[styles.sectionTitle, { color: colors.text }]}>Product Features</Text>
              {productDetails ? (
                <>
                  <Text style={[styles.sectionContent, { color: colors.textSecondary }]}>
                    • {productDetails.feature_bullet1}
                  </Text>
                  <Text style={[styles.sectionContent, { color: colors.textSecondary }]}>
                    • {productDetails.feature_bullet2}
                  </Text>
                </>
              ) : (
                features.map((feature, index) => (
                  <Text 
                    key={index} 
                    style={[styles.sectionContent, { color: colors.textSecondary }]}
                  >
                    • {feature.text}
                  </Text>
                ))
              )}
            </View>
            
            <View style={styles.modalSection}>
              <Text style={[styles.sectionTitle, { color: colors.text }]}>Description</Text>
              <Text style={[styles.sectionContent, { color: colors.textSecondary }]}>
                {productDetails?.product_description || description}
              </Text>
            </View>

            {isNewDesign && !productDetails && (
              <TouchableOpacity
                style={styles.generateButton}
                onPress={generateProductDetails}
                disabled={isGenerating}
              >
                {isGenerating ? (
                  <ActivityIndicator color={colors.background} />
                ) : (
                  <Text style={styles.generateButtonText}>Generate Product Details</Text>
                )}
              </TouchableOpacity>
            )}

            {isNewDesign && !imageUrl && (
              <TouchableOpacity
                style={styles.uploadButton}
                onPress={pickImage}
                disabled={isGenerating}
              >
                <Text style={styles.uploadButtonText}>
                  {isGenerating ? 'Uploading...' : 'Pick an Image'}
                </Text>
                {isGenerating && uploadProgress > 0 && (
                  <Text style={styles.progressText}>{Math.round(uploadProgress)}%</Text>
                )}
              </TouchableOpacity>
            )}

            {isNewDesign && (
              <View style={styles.shareSection}>
                <View style={styles.shareOption}>
                  <Text style={[styles.sectionTitle, { color: colors.text }]}>Make Public</Text>
                  <Switch
                    value={isPublic}
                    onValueChange={setIsPublic}
                    trackColor={{ false: colors.textSecondary, true: colors.primary }}
                  />
                </View>
                <TouchableOpacity
                  style={[styles.saveButton, isSaving && styles.savingButton]}
                  onPress={handleSaveDesign}
                  disabled={isSaving}
                >
                  <Text style={styles.saveButtonText}>
                    {isSaving ? 'Saving...' : 'Save Post'}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.shareButton]}
                  onPress={handleShare}
                >
                  <Text style={styles.shareButtonText}>Share</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </ScrollView>
      </SafeAreaView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
  },
  modalScroll: {
    flex: 1,
  },
  modalHeader: {
    position: 'absolute',
    top: 0,
    right: 0,
    zIndex: 1,
    padding: 16,
  },
  closeButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
  },
  closeButtonText: {
    fontSize: 20,
  },
  imageContainer: {
    width: width,
    height: width * 1.2,
  },
  modalImage: {
    width: '100%',
    height: '100%',
  },
  modalInfo: {
    padding: 20,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  modalDate: {
    fontSize: 16,
    marginBottom: 24,
  },
  modalSection: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
  },
  sectionContent: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 8,
  },
  generateButton: {
    backgroundColor: colors.primary,
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 16,
  },
  generateButtonText: {
    color: colors.background,
    fontSize: 16,
    fontWeight: '600',
  },
  shareSection: {
    marginTop: 24,
    marginBottom: 16,
  },
  shareOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  saveButton: {
    backgroundColor: colors.primary,
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  savingButton: {
    opacity: 0.7,
  },
  saveButtonText: {
    color: colors.background,
    fontSize: 16,
    fontWeight: '600',
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  actionButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
  },
  shareButton: {
    backgroundColor: colors.secondary,
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 12,
  },
  shareButtonText: {
    color: colors.background,
    fontSize: 16,
    fontWeight: '600',
  },
  uploadButton: {
    backgroundColor: colors.primary,
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 16,
  },
  uploadButtonText: {
    color: colors.background,
    fontSize: 16,
    fontWeight: '600',
  },
  progressText: {
    color: colors.background,
    fontSize: 14,
    marginTop: 8,
  },
});

export default ImageDetailModal;
