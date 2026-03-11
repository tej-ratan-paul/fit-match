import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Alert, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, borderRadius, typography } from '../theme';
import { Trainer, TimeSlot } from '../types';

interface BookingScreenProps {
  route: { params: { trainer: Trainer; date: string; slot: TimeSlot } };
  navigation: any;
}

const BookingScreen: React.FC<BookingScreenProps> = ({ route, navigation }) => {
  const { trainer, date, slot } = route.params;
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('card');

  const handleConfirmBooking = async () => {
    setIsProcessing(true);
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsProcessing(false);
    
    Alert.alert(
      'Booking Confirmed! 🎉',
      `Your session with ${trainer.name} on ${new Date(date).toLocaleDateString()} at ${slot.startTime} has been confirmed.`,
      [
        { text: 'View Bookings', onPress: () => navigation.navigate('MainTabs', { screen: 'Bookings' }) },
      ]
    );
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color={colors.text} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Confirm Booking</Text>
          <View style={{ width: 24 }} />
        </View>

        {/* Trainer Card */}
        <View style={styles.trainerCard}>
          <Image source={{ uri: trainer.photo }} style={styles.trainerImage} />
          <View style={styles.trainerInfo}>
            <Text style={styles.trainerName}>{trainer.name}</Text>
            <Text style={styles.trainerGym}>{trainer.gymName}</Text>
            <View style={styles.ratingRow}>
              <Ionicons name="star" size={14} color="#FFD700" />
              <Text style={styles.ratingText}>{trainer.rating.toFixed(1)}</Text>
            </View>
          </View>
        </View>

        {/* Session Details */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Session Details</Text>
          <View style={styles.detailCard}>
            <View style={styles.detailRow}>
              <View style={styles.detailIcon}>
                <Ionicons name="calendar" size={20} color={colors.primary} />
              </View>
              <View>
                <Text style={styles.detailLabel}>Date</Text>
                <Text style={styles.detailValue}>{formatDate(date)}</Text>
              </View>
            </View>
            <View style={styles.detailDivider} />
            <View style={styles.detailRow}>
              <View style={styles.detailIcon}>
                <Ionicons name="time" size={20} color={colors.primary} />
              </View>
              <View>
                <Text style={styles.detailLabel}>Time</Text>
                <Text style={styles.detailValue}>{slot.startTime} - {slot.endTime}</Text>
              </View>
            </View>
            <View style={styles.detailDivider} />
            <View style={styles.detailRow}>
              <View style={styles.detailIcon}>
                <Ionicons name="location" size={20} color={colors.primary} />
              </View>
              <View>
                <Text style={styles.detailLabel}>Location</Text>
                <Text style={styles.detailValue}>{trainer.gymAddress}</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Payment Method */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Payment Method</Text>
          <TouchableOpacity
            style={[styles.paymentOption, paymentMethod === 'card' && styles.paymentOptionSelected]}
            onPress={() => setPaymentMethod('card')}
          >
            <View style={styles.paymentLeft}>
              <Ionicons name="card" size={24} color={paymentMethod === 'card' ? colors.primary : colors.textSecondary} />
              <Text style={[styles.paymentText, paymentMethod === 'card' && styles.paymentTextSelected]}>Credit/Debit Card</Text>
            </View>
            {paymentMethod === 'card' && <Ionicons name="checkmark-circle" size={24} color={colors.primary} />}
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.paymentOption, paymentMethod === 'wallet' && styles.paymentOptionSelected]}
            onPress={() => setPaymentMethod('wallet')}
          >
            <View style={styles.paymentLeft}>
              <Ionicons name="wallet" size={24} color={paymentMethod === 'wallet' ? colors.primary : colors.textSecondary} />
              <Text style={[styles.paymentText, paymentMethod === 'wallet' && styles.paymentTextSelected]}>Digital Wallet</Text>
            </View>
            {paymentMethod === 'wallet' && <Ionicons name="checkmark-circle" size={24} color={colors.primary} />}
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.paymentOption, paymentMethod === 'gym' && styles.paymentOptionSelected]}
            onPress={() => setPaymentMethod('gym')}
          >
            <View style={styles.paymentLeft}>
              <Ionicons name="business" size={24} color={paymentMethod === 'gym' ? colors.primary : colors.textSecondary} />
              <Text style={[styles.paymentText, paymentMethod === 'gym' && styles.paymentTextSelected]}>Pay at Gym</Text>
            </View>
            {paymentMethod === 'gym' && <Ionicons name="checkmark-circle" size={24} color={colors.primary} />}
          </TouchableOpacity>
        </View>

        {/* Price Summary */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Price Summary</Text>
          <View style={styles.summaryCard}>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Session Fee</Text>
              <Text style={styles.summaryValue}>${trainer.pricePerSession}.00</Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Service Fee</Text>
              <Text style={styles.summaryValue}>$5.00</Text>
            </View>
            <View style={styles.summaryDivider} />
            <View style={styles.summaryRow}>
              <Text style={styles.totalLabel}>Total</Text>
              <Text style={styles.totalValue}>${trainer.pricePerSession + 5}.00</Text>
            </View>
          </View>
        </View>

        {/* Notes */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Notes (Optional)</Text>
          <View style={styles.notesInput}>
            <Ionicons name="chatbubble-outline" size={20} color={colors.textSecondary} />
            <Text style={styles.notesPlaceholder}>Add any special requests or notes for the trainer...</Text>
          </View>
        </View>
      </ScrollView>

      {/* Bottom Bar */}
      <View style={styles.bottomBar}>
        <View style={styles.totalContainer}>
          <Text style={styles.totalLabelSmall}>Total Amount</Text>
          <Text style={styles.totalValueSmall}>${trainer.pricePerSession + 5}.00</Text>
        </View>
        <TouchableOpacity
          style={[styles.confirmButton, isProcessing && styles.confirmButtonDisabled]}
          onPress={handleConfirmBooking}
          disabled={isProcessing}
        >
          {isProcessing ? (
            <ActivityIndicator color={colors.white} />
          ) : (
            <Text style={styles.confirmButtonText}>Confirm & Pay</Text>
          )}
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: spacing.md, borderBottomWidth: 1, borderBottomColor: colors.border },
  headerTitle: { fontSize: typography.h5, fontWeight: typography.bold, color: colors.text },
  trainerCard: { flexDirection: 'row', backgroundColor: colors.white, margin: spacing.md, borderRadius: borderRadius.lg, padding: spacing.md },
  trainerImage: { width: 80, height: 80, borderRadius: borderRadius.md },
  trainerInfo: { flex: 1, marginLeft: spacing.md, justifyContent: 'center' },
  trainerName: { fontSize: typography.h5, fontWeight: typography.bold, color: colors.text },
  trainerGym: { fontSize: typography.bodySmall, color: colors.textSecondary, marginTop: 2 },
  ratingRow: { flexDirection: 'row', alignItems: 'center', marginTop: spacing.xs, gap: 4 },
  ratingText: { fontSize: typography.bodySmall, fontWeight: typography.medium, color: colors.text },
  section: { padding: spacing.md },
  sectionTitle: { fontSize: typography.h5, fontWeight: typography.bold, color: colors.text, marginBottom: spacing.md },
  detailCard: { backgroundColor: colors.white, borderRadius: borderRadius.lg, padding: spacing.md },
  detailRow: { flexDirection: 'row', alignItems: 'center' },
  detailIcon: { width: 40, height: 40, backgroundColor: colors.primaryLight + '20', borderRadius: 20, justifyContent: 'center', alignItems: 'center', marginRight: spacing.md },
  detailLabel: { fontSize: typography.caption, color: colors.textSecondary },
  detailValue: { fontSize: typography.body, fontWeight: typography.medium, color: colors.text, marginTop: 2 },
  detailDivider: { height: 1, backgroundColor: colors.border, marginVertical: spacing.md },
  paymentOption: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: colors.white, borderRadius: borderRadius.md, padding: spacing.md, marginBottom: spacing.sm, borderWidth: 1, borderColor: colors.border },
  paymentOptionSelected: { borderColor: colors.primary, backgroundColor: colors.primaryLight + '10' },
  paymentLeft: { flexDirection: 'row', alignItems: 'center', gap: spacing.md },
  paymentText: { fontSize: typography.body, color: colors.textSecondary },
  paymentTextSelected: { color: colors.text, fontWeight: typography.medium },
  summaryCard: { backgroundColor: colors.white, borderRadius: borderRadius.lg, padding: spacing.md },
  summaryRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: spacing.sm },
  summaryLabel: { fontSize: typography.body, color: colors.textSecondary },
  summaryValue: { fontSize: typography.body, color: colors.text },
  summaryDivider: { height: 1, backgroundColor: colors.border, marginVertical: spacing.sm },
  totalLabel: { fontSize: typography.h5, fontWeight: typography.bold, color: colors.text },
  totalValue: { fontSize: typography.h4, fontWeight: typography.bold, color: colors.primary },
  notesInput: { flexDirection: 'row', alignItems: 'center', backgroundColor: colors.white, borderRadius: borderRadius.md, padding: spacing.md, borderWidth: 1, borderColor: colors.border },
  notesPlaceholder: { flex: 1, marginLeft: spacing.sm, fontSize: typography.body, color: colors.textSecondary },
  bottomBar: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: colors.white, padding: spacing.md, borderTopWidth: 1, borderTopColor: colors.border },
  totalContainer: {},
  totalLabelSmall: { fontSize: typography.caption, color: colors.textSecondary },
  totalValueSmall: { fontSize: typography.h4, fontWeight: typography.bold, color: colors.primary },
  confirmButton: { backgroundColor: colors.primary, paddingHorizontal: spacing.xl, paddingVertical: spacing.md, borderRadius: borderRadius.md },
  confirmButtonDisabled: { opacity: 0.7 },
  confirmButtonText: { color: colors.white, fontSize: typography.body, fontWeight: typography.semiBold },
});

export default BookingScreen;
