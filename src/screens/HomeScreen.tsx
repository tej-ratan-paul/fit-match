import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, TouchableOpacity, Image, Dimensions, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { mockTrainers, workoutTypeLabels } from '../data/mockData';
import { colors, spacing, borderRadius, typography } from '../theme';
import { Trainer, WorkoutType } from '../types';

interface HomeScreenProps {
  navigation: any;
}

const { width } = Dimensions.get('window');

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<string | null>(null);
  const [showFilters, setShowFilters] = useState(false);

  const filters: { key: WorkoutType | 'all'; label: string }[] = [
    { key: 'all', label: 'All' },
    { key: 'strength_training', label: 'Strength' },
    { key: 'bodybuilding', label: 'Bodybuilding' },
    { key: 'fat_loss', label: 'Fat Loss' },
    { key: 'powerlifting', label: 'Powerlifting' },
    { key: 'crossfit', label: 'CrossFit' },
    { key: 'hiit', label: 'HIIT' },
    { key: 'yoga', label: 'Yoga' },
  ];

  const filteredTrainers = mockTrainers.filter(trainer => {
    const matchesSearch = trainer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      trainer.gymName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = selectedFilter === null || selectedFilter === 'all' ||
      trainer.specializations.includes(selectedFilter as WorkoutType);
    return matchesSearch && matchesFilter;
  });

  const renderTrainerCard = ({ item }: { item: Trainer }) => (
    <TouchableOpacity style={styles.trainerCard} onPress={() => navigation.navigate('TrainerDetail', { trainer: item })}>
      <Image source={{ uri: item.photo }} style={styles.trainerImage} />
      <View style={styles.trainerInfo}>
        <View style={styles.trainerHeader}>
          <Text style={styles.trainerName}>{item.name}</Text>
          <View style={styles.ratingContainer}>
            <Ionicons name="star" size={14} color="#FFD700" />
            <Text style={styles.ratingText}>{item.rating.toFixed(1)}</Text>
          </View>
        </View>
        <Text style={styles.trainerGym}>{item.gymName}</Text>
        <View style={styles.specializationsContainer}>
          {item.specializations.slice(0, 2).map((spec, index) => (
            <View key={index} style={styles.specTag}>
              <Text style={styles.specText}>{workoutTypeLabels[spec]}</Text>
            </View>
          ))}
        </View>
        <View style={styles.priceContainer}>
          <Text style={styles.priceText}>${item.pricePerSession}</Text>
          <Text style={styles.priceLabel}>/ session</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Hello, Gym Rat! 💪</Text>
            <Text style={styles.subtitle}>Find your perfect trainer</Text>
          </View>
          <TouchableOpacity style={styles.notificationButton}>
            <Ionicons name="notifications-outline" size={24} color={colors.text} />
            <View style={styles.notificationBadge} />
          </TouchableOpacity>
        </View>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <View style={styles.searchBar}>
            <Ionicons name="search" size={20} color={colors.textSecondary} />
            <TextInput
              style={styles.searchInput}
              placeholder="Search trainers, gyms..."
              placeholderTextColor={colors.textSecondary}
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
            {searchQuery.length > 0 && (
              <TouchableOpacity onPress={() => setSearchQuery('')}>
                <Ionicons name="close-circle" size={20} color={colors.textSecondary} />
              </TouchableOpacity>
            )}
          </View>
          <TouchableOpacity style={styles.filterButton} onPress={() => setShowFilters(!showFilters)}>
            <Ionicons name="options" size={24} color={colors.primary} />
          </TouchableOpacity>
        </View>

        {/* Filter Pills */}
        {showFilters && (
          <View style={styles.filtersContainer}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {filters.map(filter => (
                <TouchableOpacity
                  key={filter.key}
                  style={[styles.filterPill, (selectedFilter === filter.key || (selectedFilter === null && filter.key === 'all')) && styles.filterPillActive]}
                  onPress={() => setSelectedFilter(filter.key === 'all' ? null : filter.key)}
                >
                  <Text style={[styles.filterPillText, (selectedFilter === filter.key || (selectedFilter === null && filter.key === 'all')) && styles.filterPillTextActive]}>
                    {filter.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        )}

        {/* Quick Actions */}
        <View style={styles.quickActions}>
          <TouchableOpacity style={styles.quickActionCard} onPress={() => navigation.navigate('Map')}>
            <View style={[styles.quickActionIcon, { backgroundColor: '#E8F5E9' }]}>
              <Ionicons name="map" size={24} color="#4CAF50" />
            </View>
            <Text style={styles.quickActionText}>Find Nearby</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.quickActionCard} onPress={() => navigation.navigate('Bookings')}>
            <View style={[styles.quickActionIcon, { backgroundColor: '#E3F2FD' }]}>
              <Ionicons name="calendar" size={24} color="#2196F3" />
            </View>
            <Text style={styles.quickActionText}>My Bookings</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.quickActionCard} onPress={() => navigation.navigate('Profile')}>
            <View style={[styles.quickActionIcon, { backgroundColor: '#FFF3E0' }]}>
              <Ionicons name="person" size={24} color="#FF9800" />
            </View>
            <Text style={styles.quickActionText}>Profile</Text>
          </TouchableOpacity>
        </View>

        {/* Featured Section */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Top Trainers</Text>
          <TouchableOpacity>
            <Text style={styles.seeAllText}>See All</Text>
          </TouchableOpacity>
        </View>

        {/* Trainer List */}
        <FlatList
          data={filteredTrainers}
          renderItem={renderTrainerCard}
          keyExtractor={item => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.trainerList}
        />

        {/* Available Now Section */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Available Now</Text>
        </View>

        {filteredTrainers.filter(t => t.isAvailable).slice(0, 3).map(trainer => (
          <TouchableOpacity key={trainer.id} style={styles.availableCard} onPress={() => navigation.navigate('TrainerDetail', { trainer })}>
            <Image source={{ uri: trainer.photo }} style={styles.availableImage} />
            <View style={styles.availableInfo}>
              <Text style={styles.availableName}>{trainer.name}</Text>
              <Text style={styles.availableGym}>{trainer.gymName}</Text>
              <View style={styles.availableFooter}>
                <Text style={styles.availablePrice}>${trainer.pricePerSession}/session</Text>
                <View style={styles.availableBadge}>
                  <Text style={styles.availableBadgeText}>Available</Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: spacing.lg },
  greeting: { fontSize: typography.h4, fontWeight: typography.bold, color: colors.text },
  subtitle: { fontSize: typography.body, color: colors.textSecondary, marginTop: spacing.xs },
  notificationButton: { position: 'relative', padding: spacing.sm },
  notificationBadge: { position: 'absolute', top: 8, right: 8, width: 8, height: 8, borderRadius: 4, backgroundColor: colors.primary },
  searchContainer: { flexDirection: 'row', paddingHorizontal: spacing.lg, gap: spacing.sm },
  searchBar: { flex: 1, flexDirection: 'row', alignItems: 'center', backgroundColor: colors.surface, borderRadius: borderRadius.md, paddingHorizontal: spacing.md },
  searchInput: { flex: 1, paddingVertical: spacing.md, paddingHorizontal: spacing.sm, fontSize: typography.body, color: colors.text },
  filterButton: { width: 48, height: 48, backgroundColor: colors.surface, borderRadius: borderRadius.md, justifyContent: 'center', alignItems: 'center' },
  filtersContainer: { paddingHorizontal: spacing.lg, paddingVertical: spacing.md },
  filterPill: { paddingHorizontal: spacing.md, paddingVertical: spacing.sm, borderRadius: borderRadius.full, backgroundColor: colors.surface, marginRight: spacing.sm, borderWidth: 1, borderColor: colors.border },
  filterPillActive: { backgroundColor: colors.primary, borderColor: colors.primary },
  filterPillText: { fontSize: typography.bodySmall, color: colors.textSecondary },
  filterPillTextActive: { color: colors.white },
  quickActions: { flexDirection: 'row', paddingHorizontal: spacing.lg, gap: spacing.md },
  quickActionCard: { flex: 1, backgroundColor: colors.white, borderRadius: borderRadius.lg, padding: spacing.md, alignItems: 'center' },
  quickActionIcon: { width: 48, height: 48, borderRadius: 24, justifyContent: 'center', alignItems: 'center', marginBottom: spacing.sm },
  quickActionText: { fontSize: typography.bodySmall, color: colors.text, fontWeight: typography.medium },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: spacing.lg, paddingVertical: spacing.md },
  sectionTitle: { fontSize: typography.h5, fontWeight: typography.bold, color: colors.text },
  seeAllText: { fontSize: typography.bodySmall, color: colors.primary, fontWeight: typography.medium },
  trainerList: { paddingHorizontal: spacing.lg },
  trainerCard: { width: width * 0.7, backgroundColor: colors.white, borderRadius: borderRadius.lg, marginRight: spacing.md, overflow: 'hidden' },
  trainerImage: { width: '100%', height: 160 },
  trainerInfo: { padding: spacing.md },
  trainerHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  trainerName: { fontSize: typography.h6, fontWeight: typography.bold, color: colors.text },
  ratingContainer: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  ratingText: { fontSize: typography.bodySmall, fontWeight: typography.medium, color: colors.text },
  trainerGym: { fontSize: typography.bodySmall, color: colors.textSecondary, marginTop: spacing.xs },
  specializationsContainer: { flexDirection: 'row', gap: spacing.xs, marginTop: spacing.sm },
  specTag: { backgroundColor: colors.surface, paddingHorizontal: spacing.sm, paddingVertical: 2, borderRadius: borderRadius.sm },
  specText: { fontSize: typography.caption, color: colors.textSecondary },
  priceContainer: { flexDirection: 'row', alignItems: 'baseline', marginTop: spacing.sm },
  priceText: { fontSize: typography.h5, fontWeight: typography.bold, color: colors.primary },
  priceLabel: { fontSize: typography.caption, color: colors.textSecondary, marginLeft: 2 },
  availableCard: { flexDirection: 'row', backgroundColor: colors.white, marginHorizontal: spacing.lg, marginBottom: spacing.md, borderRadius: borderRadius.lg, overflow: 'hidden' },
  availableImage: { width: 80, height: 80 },
  availableInfo: { flex: 1, padding: spacing.md },
  availableName: { fontSize: typography.h6, fontWeight: typography.bold, color: colors.text },
  availableGym: { fontSize: typography.bodySmall, color: colors.textSecondary, marginTop: 2 },
  availableFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: spacing.sm },
  availablePrice: { fontSize: typography.body, fontWeight: typography.semiBold, color: colors.primary },
  availableBadge: { backgroundColor: '#E8F5E9', paddingHorizontal: spacing.sm, paddingVertical: 2, borderRadius: borderRadius.sm },
  availableBadgeText: { fontSize: typography.caption, color: '#4CAF50', fontWeight: typography.medium },
});

export default HomeScreen;
