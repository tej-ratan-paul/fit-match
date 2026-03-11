import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Switch } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../context/AuthContext';
import { colors, spacing, borderRadius, typography } from '../theme';
import { experienceLevelLabels, workoutTypeLabels } from '../data/mockData';

interface ProfileScreenProps {
  navigation: any;
}

const ProfileScreen: React.FC<ProfileScreenProps> = ({ navigation }) => {
  const { user, logout } = useAuth();

  const menuItems = [
    { icon: 'person-outline', title: 'Edit Profile', onPress: () => {} },
    { icon: 'fitness-outline', title: 'Fitness Goals', onPress: () => {} },
    { icon: 'calendar-outline', title: 'Training Schedule', onPress: () => {} },
    { icon: 'notifications-outline', title: 'Notifications', onPress: () => {} },
    { icon: 'card-outline', title: 'Payment Methods', onPress: () => {} },
    { icon: 'settings-outline', title: 'Settings', onPress: () => {} },
    { icon: 'help-circle-outline', title: 'Help & Support', onPress: () => {} },
    { icon: 'shield-checkmark-outline', title: 'Privacy Policy', onPress: () => {} },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Profile</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Settings')}>
            <Ionicons name="settings-outline" size={24} color={colors.text} />
          </TouchableOpacity>
        </View>

        {/* Profile Card */}
        <View style={styles.profileCard}>
          <Image source={{ uri: user?.photo || 'https://via.placeholder.com/100' }} style={styles.profileImage} />
          <Text style={styles.profileName}>{user?.name || 'User'}</Text>
          <Text style={styles.profileEmail}>{user?.email}</Text>
          <View style={styles.levelBadge}>
            <Text style={styles.levelText}>{experienceLevelLabels[user?.experienceLevel || 'beginner']}</Text>
          </View>
        </View>

        {/* Stats */}
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>12</Text>
            <Text style={styles.statLabel}>Sessions</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statValue}>8h</Text>
            <Text style={styles.statLabel}>Total Time</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statValue}>$640</Text>
            <Text style={styles.statLabel}>Spent</Text>
          </View>
        </View>

        {/* Fitness Goals */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Fitness Goals</Text>
          <View style={styles.goalsContainer}>
            {user?.fitnessGoals.map((goal, index) => (
              <View key={index} style={styles.goalTag}>
                <Text style={styles.goalText}>{goal}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Preferred Workouts */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Preferred Workouts</Text>
          <View style={styles.goalsContainer}>
            {user?.preferredWorkoutTypes.map((type, index) => (
              <View key={index} style={[styles.goalTag, styles.workoutTag]}>
                <Text style={[styles.goalText, styles.workoutText]}>{workoutTypeLabels[type]}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Menu Items */}
        <View style={styles.menuSection}>
          {menuItems.map((item, index) => (
            <TouchableOpacity key={index} style={styles.menuItem} onPress={item.onPress}>
              <View style={styles.menuIcon}>
                <Ionicons name={item.icon as any} size={20} color={colors.primary} />
              </View>
              <Text style={styles.menuTitle}>{item.title}</Text>
              <Ionicons name="chevron-forward" size={20} color={colors.textSecondary} />
            </TouchableOpacity>
          ))}
        </View>

        {/* Logout Button */}
        <TouchableOpacity style={styles.logoutButton} onPress={logout}>
          <Ionicons name="log-out-outline" size={20} color={colors.error} />
          <Text style={styles.logoutText}>Log Out</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: spacing.md },
  headerTitle: { fontSize: typography.h3, fontWeight: typography.bold, color: colors.text },
  profileCard: { alignItems: 'center', padding: spacing.lg },
  profileImage: { width: 100, height: 100, borderRadius: 50, marginBottom: spacing.md },
  profileName: { fontSize: typography.h4, fontWeight: typography.bold, color: colors.text },
  profileEmail: { fontSize: typography.body, color: colors.textSecondary, marginTop: spacing.xs },
  levelBadge: { backgroundColor: colors.primaryLight + '30', paddingHorizontal: spacing.md, paddingVertical: spacing.xs, borderRadius: borderRadius.full, marginTop: spacing.sm },
  levelText: { fontSize: typography.bodySmall, color: colors.primary, fontWeight: typography.medium },
  statsContainer: { flexDirection: 'row', backgroundColor: colors.white, marginHorizontal: spacing.md, borderRadius: borderRadius.lg, padding: spacing.md },
  statItem: { flex: 1, alignItems: 'center' },
  statValue: { fontSize: typography.h4, fontWeight: typography.bold, color: colors.text },
  statLabel: { fontSize: typography.caption, color: colors.textSecondary, marginTop: 2 },
  statDivider: { width: 1, backgroundColor: colors.border },
  section: { padding: spacing.md },
  sectionTitle: { fontSize: typography.h5, fontWeight: typography.bold, color: colors.text, marginBottom: spacing.md },
  goalsContainer: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm },
  goalTag: { backgroundColor: colors.primary + '20', paddingHorizontal: spacing.md, paddingVertical: spacing.sm, borderRadius: borderRadius.full },
  goalText: { fontSize: typography.bodySmall, color: colors.primary, fontWeight: typography.medium },
  workoutTag: { backgroundColor: colors.secondary + '20' },
  workoutText: { color: colors.secondary },
  menuSection: { paddingHorizontal: spacing.md },
  menuItem: { flexDirection: 'row', alignItems: 'center', backgroundColor: colors.white, padding: spacing.md, borderRadius: borderRadius.md, marginBottom: spacing.sm },
  menuIcon: { width: 36, height: 36, backgroundColor: colors.primary + '10', borderRadius: 18, justifyContent: 'center', alignItems: 'center', marginRight: spacing.md },
  menuTitle: { flex: 1, fontSize: typography.body, color: colors.text },
  logoutButton: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', margin: spacing.md, padding: spacing.md, backgroundColor: colors.error + '10', borderRadius: borderRadius.md },
  logoutText: { fontSize: typography.body, color: colors.error, fontWeight: typography.medium, marginLeft: spacing.sm },
});

export default ProfileScreen;
