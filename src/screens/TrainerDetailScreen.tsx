import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Dimensions, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, borderRadius, typography } from '../theme';
import { Trainer, TimeSlot } from '../types';
import { workoutTypeLabels, mockReviews } from '../data/mockData';

interface TrainerDetailScreenProps {
  route: { params: { trainer: Trainer } };
  navigation: any;
}

const { width } = Dimensions.get('window');

const TrainerDetailScreen: React.FC<TrainerDetailScreenProps> = ({ route, navigation }) => {
  const { trainer } = route.params;
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<TimeSlot | null>(null);

  const trainerReviews = mockReviews.filter(r => r.trainerId === trainer.id);

  const availableDates = [...new Set(trainer.availableSlots.map(slot => slot.date))];

  const getSlotsForDate = (date: string) => {
    return trainer.availableSlots.filter(slot => slot.date === date && !slot.isBooked);
  };

  const handleBookSession = () => {
    if (!selectedDate || !selectedSlot) {
      Alert.alert('Select Time', 'Please select a date and time slot');
      return;
    }
    navigation.navigate('Booking', { trainer, date: selectedDate, slot: selectedSlot });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header Image */}
        <View style={styles.imageContainer}>
          <Image source={{ uri: trainer.photo }} style={styles.trainerImage} />
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color={colors.white} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.favoriteButton}>
            <Ionicons name="heart-outline" size={24} color={colors.white} />
          </TouchableOpacity>
        </View>

        {/* Trainer Info */}
        <View style={styles.content}>
          <View style={styles.nameRow}>
            <Text style={styles.trainerName}>{trainer.name}</Text>
            <View style={styles.ratingBadge}>
              <Ionicons name="star" size={16} color="#FFD700" />
              <Text style={styles.ratingText}>{trainer.rating.toFixed(1)}</Text>
              <Text style={styles.reviewCount}>({trainer.reviewCount})</Text>
            </View>
          </View>

          <View style={styles.locationRow}>
            <Ionicons name="location" size={16} color={colors.textSecondary} />
            <Text style={styles.locationText}>{trainer.gymName} • {trainer.gymAddress}</Text>
          </View>

          {/* Specializations */}
          <View style={styles.specializationsContainer}>
            {trainer.specializations.map((spec, index) => (
              <View key={index} style={styles.specTag}>
                <Text style={styles.specText}>{workoutTypeLabels[spec]}</Text>
              </View>
            ))}
          </View>

          {/* Stats */}
          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{trainer.yearsOfExperience}+</Text>
              <Text style={styles.statLabel}>Years Exp.</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{trainer.reviewCount}</Text>
              <Text style={styles.statLabel}>Reviews</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{trainer.availableSlots.length}</Text>
              <Text style={styles.statLabel}>Slots</Text>
            </View>
          </View>

          {/* Bio */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>About</Text>
            <Text style={styles.bioText}>{trainer.bio}</Text>
          </View>

          {/* Certifications */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Certifications</Text>
            <View style={styles.certificationsContainer}>
              {trainer.certifications.map((cert, index) => (
                <View key={index} style={styles.certBadge}>
                  <Ionicons name="checkmark-circle" size={16} color={colors.secondary} />
                  <Text style={styles.certText}>{cert}</Text>
                </View>
              ))}
            </View>
          </View>

          {/* Availability */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Select Date & Time</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.datesContainer}>
              {availableDates.map(date => (
                <TouchableOpacity
                  key={date}
                  style={[styles.dateCard, selectedDate === date && styles.dateCardSelected]}
                  onPress={() => { setSelectedDate(date); setSelectedSlot(null); }}
                >
                  <Text style={[styles.dateDay, selectedDate === date && styles.dateTextSelected]}>
                    {new Date(date).toLocaleDateString('en-US', { weekday: 'short' })}
                  </Text>
                  <Text style={[styles.dateNumber, selectedDate === date && styles.dateTextSelected]}>
                    {new Date(date).getDate()}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>

            {selectedDate && (
              <View style={styles.slotsContainer}>
                {getSlotsForDate(selectedDate).map(slot => (
                  <TouchableOpacity
                    key={slot.id}
                    style={[styles.slotButton, selectedSlot?.id === slot.id && styles.slotButtonSelected]}
                    onPress={() => setSelectedSlot(slot)}
                  >
                    <Text style={[styles.slotText, selectedSlot?.id === slot.id && styles.slotTextSelected]}>
                      {slot.startTime} - {slot.endTime}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>

          {/* Reviews */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Reviews</Text>
            {trainerReviews.map(review => (
              <View key={review.id} style={styles.reviewCard}>
                <View style={styles.reviewHeader}>
                  <Image source={{ uri: review.userPhoto }} style={styles.reviewAvatar} />
                  <View>
                    <Text style={styles.reviewName}>{review.userName}</Text>
                    <View style={styles.reviewRating}>
                      {[...Array(5)].map((_, i) => (
                        <Ionicons key={i} name="star" size={12} color={i < review.rating ? '#FFD700' : colors.border} />
                      ))}
                    </View>
                  </View>
                  <Text style={styles.reviewDate}>
                    {new Date(review.createdAt).toLocaleDateString()}
                  </Text>
                </View>
                <Text style={styles.reviewComment}>{review.comment}</Text>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>

      {/* Bottom Booking Bar */}
      <View style={styles.bookingBar}>
        <View style={styles.priceContainer}>
          <Text style={styles.priceLabel}>Price per session</Text>
          <Text style={styles.priceValue}>${trainer.pricePerSession}</Text>
        </View>
        <TouchableOpacity style={styles.bookButton} onPress={handleBookSession}>
          <Text style={styles.bookButtonText}>Book Session</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  imageContainer: { position: 'relative' },
  trainerImage: { width: width, height: 300 },
  backButton: { position: 'absolute', top: 50, left: spacing.md, width: 40, height: 40, borderRadius: 20, backgroundColor: 'rgba(0,0,0,0.3)', justifyContent: 'center', alignItems: 'center' },
  favoriteButton: { position: 'absolute', top: 50, right: spacing.md, width: 40, height: 40, borderRadius: 20, backgroundColor: 'rgba(0,0,0,0.3)', justifyContent: 'center', alignItems: 'center' },
  content: { padding: spacing.lg, marginTop: -30, backgroundColor: colors.background, borderTopLeftRadius: 30, borderTopRightRadius: 30 },
  nameRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  trainerName: { fontSize: typography.h3, fontWeight: typography.bold, color: colors.text },
  ratingBadge: { flexDirection: 'row', alignItems: 'center', backgroundColor: colors.white, paddingHorizontal: spacing.sm, paddingVertical: spacing.xs, borderRadius: borderRadius.full, gap: 4 },
  ratingText: { fontSize: typography.bodySmall, fontWeight: typography.bold, color: colors.text },
  reviewCount: { fontSize: typography.caption, color: colors.textSecondary },
  locationRow: { flexDirection: 'row', alignItems: 'center', marginTop: spacing.sm, gap: 4 },
  locationText: { fontSize: typography.bodySmall, color: colors.textSecondary },
  specializationsContainer: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm, marginTop: spacing.md },
  specTag: { backgroundColor: colors.primaryLight + '20', paddingHorizontal: spacing.md, paddingVertical: spacing.xs, borderRadius: borderRadius.full },
  specText: { fontSize: typography.bodySmall, color: colors.primary, fontWeight: typography.medium },
  statsContainer: { flexDirection: 'row', backgroundColor: colors.white, borderRadius: borderRadius.lg, padding: spacing.md, marginTop: spacing.lg },
  statItem: { flex: 1, alignItems: 'center' },
  statValue: { fontSize: typography.h4, fontWeight: typography.bold, color: colors.text },
  statLabel: { fontSize: typography.caption, color: colors.textSecondary, marginTop: 2 },
  statDivider: { width: 1, backgroundColor: colors.border },
  section: { marginTop: spacing.lg },
  sectionTitle: { fontSize: typography.h5, fontWeight: typography.bold, color: colors.text, marginBottom: spacing.md },
  bioText: { fontSize: typography.body, color: colors.textSecondary, lineHeight: 24 },
  certificationsContainer: { gap: spacing.sm },
  certBadge: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
  certText: { fontSize: typography.body, color: colors.text },
  datesContainer: { marginBottom: spacing.md },
  dateCard: { width: 60, height: 70, backgroundColor: colors.white, borderRadius: borderRadius.md, justifyContent: 'center', alignItems: 'center', marginRight: spacing.sm, borderWidth: 1, borderColor: colors.border },
  dateCardSelected: { backgroundColor: colors.primary, borderColor: colors.primary },
  dateDay: { fontSize: typography.caption, color: colors.textSecondary },
  dateNumber: { fontSize: typography.h5, fontWeight: typography.bold, color: colors.text },
  dateTextSelected: { color: colors.white },
  slotsContainer: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm },
  slotButton: { paddingHorizontal: spacing.md, paddingVertical: spacing.sm, backgroundColor: colors.white, borderRadius: borderRadius.md, borderWidth: 1, borderColor: colors.border },
  slotButtonSelected: { backgroundColor: colors.primary, borderColor: colors.primary },
  slotText: { fontSize: typography.bodySmall, color: colors.text },
  slotTextSelected: { color: colors.white },
  reviewCard: { backgroundColor: colors.white, borderRadius: borderRadius.md, padding: spacing.md, marginBottom: spacing.md },
  reviewHeader: { flexDirection: 'row', alignItems: 'center' },
  reviewAvatar: { width: 40, height: 40, borderRadius: 20, marginRight: spacing.sm },
  reviewName: { fontSize: typography.bodySmall, fontWeight: typography.semiBold, color: colors.text },
  reviewRating: { flexDirection: 'row', marginTop: 2 },
  reviewDate: { marginLeft: 'auto', fontSize: typography.caption, color: colors.textSecondary },
  reviewComment: { fontSize: typography.bodySmall, color: colors.textSecondary, marginTop: spacing.sm, lineHeight: 20 },
  bookingBar: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: colors.white, padding: spacing.md, borderTopWidth: 1, borderTopColor: colors.border },
  priceContainer: {},
  priceLabel: { fontSize: typography.caption, color: colors.textSecondary },
  priceValue: { fontSize: typography.h4, fontWeight: typography.bold, color: colors.primary },
  bookButton: { backgroundColor: colors.primary, paddingHorizontal: spacing.xl, paddingVertical: spacing.md, borderRadius: borderRadius.md },
  bookButtonText: { color: colors.white, fontSize: typography.body, fontWeight: typography.semiBold },
});

export default TrainerDetailScreen;
