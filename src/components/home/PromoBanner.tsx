import React, { useRef, useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { PromoBanner as PromoBannerType } from '../../types';
import { typography, borderRadius, spacing } from '../../theme';

const { width } = Dimensions.get('window');
const ITEM_SPACING = 12;
const BANNER_WIDTH = width - (spacing.lg * 2);
const BANNER_HEIGHT = 180;

interface PromoBannerProps {
  banners: PromoBannerType[];
  onBannerPress?: (id: string) => void;
}

const PromoBanner: React.FC<PromoBannerProps> = ({ banners, onBannerPress }) => {
  const flatListRef = useRef<FlatList>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const isAutoScrollingRef = useRef(false);
  const lastIndexRef = useRef(0);

  // Handle infinite scroll - remove manual scroll detection
  const handleScroll = (event: any) => {
    // Handled by onViewableItemsChanged for smooth transitions
  };

  // Auto-scroll functionality
  useEffect(() => {
    if (banners.length <= 1) return;

    scrollIntervalRef.current = setInterval(() => {
      if (isAutoScrollingRef.current) return;
      
      setCurrentIndex((prevIndex) => {
        const nextIndex = (prevIndex + 1) % banners.length;
        isAutoScrollingRef.current = true;
        flatListRef.current?.scrollToIndex({
          index: nextIndex,
          animated: true,
          viewPosition: 0,
        });
        isAutoScrollingRef.current = false;
        return nextIndex;
      });
    }, 3500); // Auto-scroll every 3.5 seconds

    return () => {
      if (scrollIntervalRef.current) {
        clearInterval(scrollIntervalRef.current);
      }
    };
  }, [banners.length]);

  const onViewableItemsChanged = useRef(({ viewableItems }: any) => {
    if (viewableItems.length > 0) {
      const newIndex = viewableItems[0].index || 0;
      setCurrentIndex(newIndex);
      lastIndexRef.current = newIndex;
      
      // When reaching the last slide, smoothly loop to first
      if (newIndex === banners.length - 1) {
        setTimeout(() => {
          if (isAutoScrollingRef.current) return;
          isAutoScrollingRef.current = true;
          flatListRef.current?.scrollToIndex({
            index: 0,
            animated: true,
            viewPosition: 0,
          });
          setCurrentIndex(0);
          lastIndexRef.current = 0;
          isAutoScrollingRef.current = false;
        }, 500);
      }
    }
  }).current;

  const viewabilityConfig = useRef({
    itemVisiblePercentThreshold: 50,
  }).current;

  const renderItem = ({ item, index }: { item: PromoBannerType; index: number }) => (
    <View style={styles.bannerWrapper}>
      <TouchableOpacity
        style={[styles.banner, { backgroundColor: item.backgroundColor }]}
        onPress={() => onBannerPress?.(item.id)}
        activeOpacity={0.9}
      >
        <View style={styles.bannerContent}>
          <View style={styles.textSection}>
            <View style={styles.brandTag}>
              <Text style={[styles.brandText, { color: item.textColor }]}>
                {item.brand}
              </Text>
            </View>
            <Text
              style={[styles.title, { color: item.textColor }]}
              numberOfLines={2}
            >
              {item.title}
            </Text>
            <Text
              style={[styles.subtitle, { color: item.textColor, opacity: 0.8 }]}
              numberOfLines={2}
            >
              {item.subtitle}
            </Text>
            <View style={styles.discountTag}>
              <Text style={styles.discountText}>{item.discount}</Text>
            </View>
          </View>
          <Image
            source={{ uri: item.image }}
            style={styles.bannerImage}
            resizeMode="cover"
          />
        </View>
      </TouchableOpacity>
    </View>
  );

  return (
    <View>
      <FlatList
        ref={flatListRef}
        data={banners}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        snapToInterval={BANNER_WIDTH + ITEM_SPACING}
        snapToAlignment="start"
        decelerationRate="fast"
        contentContainerStyle={[styles.listContainer, { paddingRight: spacing.lg }]}
        scrollEventThrottle={16}
        onScroll={handleScroll}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={viewabilityConfig}
        getItemLayout={(data, index) => ({
          length: BANNER_WIDTH + ITEM_SPACING,
          offset: (BANNER_WIDTH + ITEM_SPACING) * index,
          index,
        })}
        onScrollToIndexFailed={(info) => {
          const wait = new Promise((resolve) => setTimeout(resolve, 500));
          wait.then(() => {
            flatListRef.current?.scrollToIndex({ index: info.index, animated: true });
          });
        }}
      />
      {/* Pagination dots */}
      <View style={styles.pagination}>
        {banners.map((_, index) => (
          <View
            key={index}
            style={[
              styles.dot,
              index === currentIndex && styles.activeDot,
            ]}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  listContainer: {
    paddingHorizontal: spacing.lg,
    paddingVertical: 0,
  },
  bannerWrapper: {
    width: BANNER_WIDTH,
    marginRight: ITEM_SPACING,
  },
  banner: {
    width: BANNER_WIDTH,
    height: BANNER_HEIGHT,
    borderRadius: borderRadius.lg,
    overflow: 'hidden',
  },
  bannerContent: {
    flex: 1,
    flexDirection: 'row',
    padding: spacing.lg,
  },
  textSection: {
    flex: 1,
    justifyContent: 'space-between',
    paddingRight: spacing.md,
  },
  brandTag: {
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: spacing.sm,
    paddingVertical: 2,
    borderRadius: borderRadius.sm,
    marginBottom: spacing.xs,
  },
  brandText: {
    ...typography.small,
    fontWeight: '600',
  },
  title: {
    ...typography.h3,
    marginBottom: spacing.xs,
  },
  subtitle: {
    ...typography.small,
    lineHeight: 14,
  },
  discountTag: {
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(255,255,255,0.3)',
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.sm,
    marginTop: spacing.sm,
  },
  discountText: {
    fontSize: 9,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  bannerImage: {
    width: 100,
    height: '100%',
    borderRadius: borderRadius.md,
  },
  /* Pagination dots */
  pagination: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: spacing.sm,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#C4C4C4',
    marginHorizontal: 3,
  },
  activeDot: {
    width: 20,
    backgroundColor: '#2196F3',
  },
});

export default PromoBanner;
