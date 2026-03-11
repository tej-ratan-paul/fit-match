import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, borderRadius, typography } from '../theme';
import { mockTrainers, workoutTypeLabels } from '../data/mockData';
import { Trainer } from '../types';

interface MapScreenProps {
  navigation: any;
}

const { width, height } = Dimensions.get('window');

const MapScreen: React.FC<MapScreenProps> = ({ navigation }) => {
  const [selectedTrainer, setSelectedTrainer] = useState<Trainer | null>(null);

  // Default region (New York City)
  const defaultRegion = {
    latitude: 40.7128,
    longitude: -74.006,
    latitudeDelta: 0.05,
    longitudeDelta: 0.05,
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Trainers Near You</Text>
        <TouchableOpacity>
          <Ionicons name="options" size={24} color={colors.text} />
        </TouchableOpacity>
      </View>

      {/* Map Placeholder */}
      <View style={styles.mapContainer}>
        <View style={styles.mapPlaceholder}>
          <Ionicons name="map" size={80} color={colors.primary} />
          <Text style={styles.mapText}>Map View</Text>
          <Text style={styles.mapSubtext}>Google Maps integration ready</Text>
          <Text style={styles.coordText}>{defaultRegion.latitude.toFixed(4)}, {defaultRegion.longitude.toFixed(4)}</Text>
        </View>

        {/* Trainer Markers */}
        {mockTrainers.map(trainer => (
          <TouchableOpacity
            key={trainer.id}
            style={[
              styles.marker,
              { left: 50 + Math.random() * (width - 100), top: 50 + Math.random() * (height - 300) },
              selectedTrainer?.id === trainer.id && styles.markerSelected
            ]}
            onPress={() => setSelectedTrainer(trainer)}
          >
            <View style={styles.markerInner}>
              <Text style={styles.markerText}>${trainer.pricePerSession}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>

      {/* Trainer List */}
      <View style={styles.listContainer}>
        <Text style={styles.listTitle}>Nearby Trainers ({mockTrainers.length})</Text>
        <View style={styles.trainerList}>
          {mockTrainers.map(trainer => (
            <TouchableOpacity
              key={trainer.id}
              style={[styles.trainerCard, selectedTrainer?.id === trainer.id && styles.trainerCardSelected]}
              onPress={() => setSelectedTrainer(trainer)}
            >
              <View style={styles.trainerInfo}>
                <Text style={styles.trainerName}>{trainer.name}</Text>
                <Text style={styles.trainerGym}>{trainer.gymName}</Text>
                <View style={styles.trainerMeta}>
                  <View style={styles.ratingContainer}>
                    <Ionicons name="star" size={12} color="#FFD700" />
                    <Text style={styles.ratingText}>{trainer.rating.toFixed(1)}</Text>
                  </View>
                  <Text style={styles.distanceText}>0.5 mi</Text>
                </View>
              </View>
              <View style={styles.priceContainer}>
                <Text style={styles.priceText}>${trainer.pricePerSession}</Text>
                <Text style={styles.priceLabel}>/session</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Selected Trainer Details */}
      {selectedTrainer && (
        <View style={styles.detailsContainer}>
          <TouchableOpacity style={styles.detailsCard} onPress={() => navigation.navigate('TrainerDetail', { trainer: selectedTrainer })}>
            <View style={styles.detailsContent}>
              <Text style={styles.detailsName}>{selectedTrainer.name}</Text>
              <Text style={styles.detailsGym}>{selectedTrainer.gymName}</Text>
              <View style={styles.detailsMeta}>
                <View style={styles.detailsRating}>
                  <Ionicons name="star" size={14} color="#FFD700" />
                  <Text style={styles.detailsRatingText}>{selectedTrainer.rating.toFixed(1)} ({selectedTrainer.reviewCount})</Text>
                </View>
                <Text style={styles.detailsPrice}>${selectedTrainer.pricePerSession}/session</Text>
              </View>
            </View>
            <TouchableOpacity style={styles.bookButton}>
              <Text style={styles.bookButtonText}>Book</Text>
            </TouchableOpacity>
          </TouchableOpacity>
          <TouchableOpacity style={styles.closeButton} onPress={() => setSelectedTrainer(null)}>
            <Ionicons name="close" size={20} color={colors.text} />
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: spacing.md, backgroundColor: colors.white },
  headerTitle: { fontSize: typography.h5, fontWeight: typography.bold, color: colors.text },
  mapContainer: { flex: 1, position: 'relative', backgroundColor: colors.surface },
  mapPlaceholder: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#E8F5E9' },
  mapText: { fontSize: typography.h4, fontWeight: typography.bold, color: colors.text, marginTop: spacing.md },
  mapSubtext: { fontSize: typography.body, color: colors.textSecondary, marginTop: spacing.xs },
  coordText: { fontSize: typography.caption, color: colors.textSecondary, marginTop: spacing.xs, fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace' },
  marker: { position: 'absolute', zIndex: 10 },
  markerInner: { backgroundColor: colors.primary, paddingHorizontal: spacing.sm, paddingVertical: spacing.xs, borderRadius: borderRadius.full, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.2, shadowRadius: 4, elevation: 4 },
  markerText: { color: colors.white, fontSize: typography.caption, fontWeight: typography.bold },
  markerSelected: { zIndex: 20 },
  listContainer: { backgroundColor: colors.white, paddingTop: spacing.md },
  listTitle: { fontSize: typography.h5, fontWeight: typography.bold, color: colors.text, paddingHorizontal: spacing.md, marginBottom: spacing.sm },
  trainerList: { paddingHorizontal: spacing.md, gap: spacing.sm },
  trainerCard: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: colors.surface, padding: spacing.md, borderRadius: borderRadius.md, borderWidth: 1, borderColor: colors.border },
  trainerCardSelected: { borderColor: colors.primary, backgroundColor: colors.primaryLight + '10' },
  trainerInfo: { flex: 1 },
  trainerName: { fontSize: typography.body, fontWeight: typography.bold, color: colors.text },
  trainerGym: { fontSize: typography.caption, color: colors.textSecondary, marginTop: 2 },
  trainerMeta: { flexDirection: 'row', alignItems: 'center', marginTop: spacing.xs, gap: spacing.sm },
  ratingContainer: { flexDirection: 'row', alignItems: 'center', gap: 2 },
  ratingText: { fontSize: typography.caption, fontWeight: typography.medium, color: colors.text },
  distanceText: { fontSize: typography.caption, color: colors.textSecondary },
  priceContainer: { alignItems: 'flex-end' },
  priceText: { fontSize: typography.h5, fontWeight: typography.bold, color: colors.primary },
  priceLabel: { fontSize: typography.caption, color: colors.textSecondary },
  detailsContainer: { position: 'absolute', bottom: spacing.lg, left: spacing.md, right: spacing.md },
  detailsCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: colors.white, borderRadius: borderRadius.lg, padding: spacing.md, shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.15, shadowRadius: 8, elevation: 8 },
  detailsContent: { flex: 1 },
  detailsName: { fontSize: typography.h6, fontWeight: typography.bold, color: colors.text },
  detailsGym: { fontSize: typography.bodySmall, color: colors.textSecondary },
  detailsMeta: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: spacing.sm },
  detailsRating: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  detailsRatingText: { fontSize: typography.caption, color: colors.textSecondary },
  detailsPrice: { fontSize: typography.body, fontWeight: typography.bold, color: colors.primary },
  bookButton: { backgroundColor: colors.primary, paddingHorizontal: spacing.lg, paddingVertical: spacing.sm, borderRadius: borderRadius.md, marginLeft: spacing.md },
  bookButtonText: { color: colors.white, fontSize: typography.body, fontWeight: typography.semiBold },
  closeButton: { position: 'absolute', top: -10, right: -10, width: 28, height: 28, borderRadius: 14, backgroundColor: colors.white, justifyContent: 'center', alignItems: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4, elevation: 4 },
});

export default MapScreen;
