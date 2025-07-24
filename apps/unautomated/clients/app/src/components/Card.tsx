import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Platform,
  Dimensions,
  ImageSourcePropType,
} from 'react-native';
import { colors } from '../theme';

const { width } = Dimensions.get('window');

interface CardProps {
  title: string;
  subtitle?: string;
  imageSource: ImageSourcePropType | string;
  imageStyle?: object;
  cardWidth?: number | string;
  onPress?: () => void;
  additionalInfo?: React.ReactNode;
  style?: object;
}

export const Card: React.FC<CardProps> = ({
  title,
  subtitle,
  imageSource,
  imageStyle,
  cardWidth = '100%',
  onPress,
  additionalInfo,
  style,
}) => {
  const cardContent = (
    <View style={[styles.card, { width: cardWidth }, style]}>
      <Image
        source={typeof imageSource === 'string' ? { uri: imageSource } : imageSource}
        style={[styles.image, imageStyle]}
      />
      <View style={styles.info}>
        <Text style={styles.title} numberOfLines={2}>{title}</Text>
        {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
        {additionalInfo}
      </View>
    </View>
  );

  if (onPress) {
    return (
      <TouchableOpacity onPress={onPress}>
        {cardContent}
      </TouchableOpacity>
    );
  }

  return cardContent;
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.background,
    borderRadius: 16,
    overflow: 'hidden',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  image: {
    width: '100%',
    height: 200,
    backgroundColor: colors.background,
  },
  info: {
    padding: 16,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: colors.textSecondary,
  },
});

export default Card;
