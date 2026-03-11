import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, borderRadius, typography } from '../theme';
import { mockBookings, mockTrainers } from '../data/mockData';

interface BookingsScreenProps {
  navigation: any;
}

const BookingsScreen: React.FC<BookingsScreenProps> = ({ navigation }) => {
  const [activeTab, setActiveTab] = useState<'upcoming' | 'completed' | 'cancelled'>('upcoming');

  const bookings = mockBookings;

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return colors.secondary;
      case 'completed': return colors.info;
      case 'cancelled': return colors.error;
      default: return colors.warning;
    }
  };

  const tabs = [
    { key: 'upcoming', label: 'Upcoming' },
    { key: 'completed', label: 'Completed' },
    { key: 'cancelled', label: 'Cancelled' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Bookings</Text>
      </View>

      {/* Tabs */}
      <View style={styles.tabsContainer}>
        {tabs.map(tab => (
          <TouchableOpacity
            key={tab.key}
            style={[styles.tab, activeTab === tab.key && styles.tabActive]}
            onPress={() => setActiveTab(tab.key as any)}
          >
            <Text style={[styles.tabText, activeTab === tab.key && styles.tabTextActive]}>
              {tab.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {bookings.map(booking => (
          <TouchableOpacity key={booking.id} style={styles.bookingCard} onPress={() => navigation.navigate('TrainerDetail', { trainer: booking.trainer })}>
            <View style={styles.bookingHeader}>
              <View style={[styles.statusBadge, { backgroundColor: getStatusColor(booking.status) + '20' }]}>
                <Text style={[styles.statusText, { color: getStatusColor(booking.status) }]}>
                  {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                </Text>
              </View>
              <Text style={styles.bookingDate}>{formatDate(booking.date)}</Text>
            </View>

            <View style={styles.bookingContent}>
              <Image source={{ uri: booking.trainer.photo }} style={styles.trainerImage} />
              <View style={styles.bookingInfo}>
                <Text style={styles.trainerName}>{booking.trainer.name}</Text>
                <Text style={styles.trainerGym}>{booking.trainer.gymName}</Text>
                <View style={styles.timeContainer}>
                  <Ionicons name="time-outline" size={14} color={colors.textSecondary} />
                  <Text style={styles.timeText}>{booking.timeSlot.startTime} - {booking.timeSlot.endTime}</Text>
                </View>
              </View>
              <View style={styles.priceContainer}>
                <Text style={styles.priceText}>${booking.amount}</Text>
              </View>
            </View>

            <View style={styles.bookingActions}>
              <TouchableOpacity style={styles.actionButton}>
                <Ionicons name="chatbubble-outline" size={18} color={colors.primary} />
                <Text style={styles.actionText}>Message</Text>
              </TouchableOpacity>
              {booking.status === 'completed' && (
                <TouchableOpacity style={styles.actionButton}>
                  <Ionicons name="star-outline" size={18} color={colors.primary} />
                  <Text style={styles.actionText}>Review</Text>
                </TouchableOpacity>
              )}
              {booking.status === 'confirmed' && (
                <TouchableOpacity style={[styles.actionButton, styles.cancelButton]}>
                  <Ionicons name="close-circle-outline" size={18} color={colors.error} />
                  <Text style={[styles.actionText, styles.cancelText]}>Cancel</Text>
                </TouchableOpacity>
              )}
            </View>
          </TouchableOpacity>
        ))}

        {bookings.length === 0 && (
          <View style={styles.emptyState}>
            <Ionicons name="calendar-outline" size={64} color={colors.border} />
            <Text style={styles.emptyTitle}>No bookings yet</Text>
            <Text style={styles.emptyText}>Book your first session with a trainer!</Text>
            <TouchableOpacity style={styles.exploreButton} onPress={() => navigation.navigate('Home')}>
              <Text style={styles.exploreButtonText}>Explore Trainers</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  header: { padding: spacing.md },
  headerTitle: { fontSize: typography.h3, fontWeight: typography.bold, color: colors.text },
  tabsContainer: { flexDirection: 'row', paddingHorizontal: spacing.md, gap: spacing.sm },
  tab: { flex: 1, paddingVertical: spacing.sm, alignItems: 'center', borderBottomWidth: 2, borderBottomColor: 'transparent' },
  tabActive: { borderBottomColor: colors.primary },
  tabText: { fontSize: typography.body, color: colors.textSecondary },
  tabTextActive: { color: colors.primary, fontWeight: typography.medium },
  bookingCard: { backgroundColor: colors.white, marginHorizontal: spacing.md, marginTop: spacing.md, borderRadius: borderRadius.lg, padding: spacing.md },
  bookingHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: spacing.md },
  statusBadge: { paddingHorizontal: spacing.sm, paddingVertical: spacing.xs, borderRadius: borderRadius.sm },
  statusText: { fontSize: typography.caption, fontWeight: typography.medium },
  bookingDate: { fontSize: typography.bodySmall, color: colors.textSecondary },
  bookingContent: { flexDirection: 'row' },
  trainerImage: { width: 60, height: 60, borderRadius: borderRadius.md },
  bookingInfo: { flex: 1, marginLeft: spacing.md },
  trainerName: { fontSize: typography.h6, fontWeight: typography.bold, color: colors.text },
  trainerGym: { fontSize: typography.bodySmall, color: colors.textSecondary, marginTop: 2 },
  timeContainer: { flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: spacing.xs },
  timeText: { fontSize: typography.caption, color: colors.textSecondary },
  priceContainer: { justifyContent: 'center' },
  priceText: { fontSize: typography.h5, fontWeight: typography.bold, color: colors.primary },
  bookingActions: { flexDirection: 'row', marginTop: spacing.md, paddingTop: spacing.md, borderTopWidth: 1, borderTopColor: colors.border, gap: spacing.md },
  actionButton: { flexDirection: 'row', alignItems: 'center', gap: spacing.xs },
  actionText: { fontSize: typography.bodySmall, color: colors.primary, fontWeight: typography.medium },
  cancelButton: {},
  cancelText: { color: colors.error },
  emptyState: { alignItems: 'center', justifyContent: 'center', paddingVertical: spacing.xxl },
  emptyTitle: { fontSize: typography.h5, fontWeight: typography.bold, color: colors.text, marginTop: spacing.md },
  emptyText: { fontSize: typography.body, color: colors.textSecondary, marginTop: spacing.xs },
  exploreButton: { backgroundColor: colors.primary, paddingHorizontal: spacing.lg, paddingVertical: spacing.md, borderRadius: borderRadius.md, marginTop: spacing.lg },
  exploreButtonText: { color: colors.white, fontSize: typography.body, fontWeight: typography.medium },
});

export default BookingsScreen;
