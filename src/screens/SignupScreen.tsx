import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, KeyboardAvoidingView, Platform, Alert, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../context/AuthContext';
import { colors, spacing, borderRadius, typography } from '../theme';

interface SignupScreenProps {
  navigation: any;
}

const SignupScreen: React.FC<SignupScreenProps> = ({ navigation }) => {
  const { signup, isLoading, error } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);

  const handleSignup = async () => {
    if (!name.trim() || !email.trim() || !password.trim() || !confirmPassword.trim()) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }
    if (!acceptTerms) {
      Alert.alert('Error', 'Please accept the terms and conditions');
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }
    if (password.length < 6) {
      Alert.alert('Error', 'Password must be at least 6 characters');
      return;
    }
    try {
      await signup(email.trim(), password, name.trim());
    } catch (err) {
      Alert.alert('Signup Failed', 'Please try again');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.keyboardView}>
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          <View style={styles.headerContainer}>
            <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
              <Ionicons name="arrow-back" size={24} color={colors.text} />
            </TouchableOpacity>
          </View>
          <View style={styles.logoContainer}>
            <View style={styles.logoIcon}>
              <Ionicons name="fitness" size={40} color={colors.white} />
            </View>
            <Text style={styles.appName}>Fitmatch</Text>
          </View>
          <View style={styles.formContainer}>
            <Text style={styles.welcomeText}>Create Account</Text>
            <Text style={styles.subtitleText}>Start your fitness journey today</Text>
            {error && (
              <View style={styles.errorContainer}>
                <Ionicons name="alert-circle" size={20} color={colors.error} />
                <Text style={styles.errorText}>{error}</Text>
              </View>
            )}
            <View style={styles.inputContainer}>
              <View style={styles.inputIcon}>
                <Ionicons name="person-outline" size={20} color={colors.textSecondary} />
              </View>
              <TextInput style={styles.input} placeholder="Full Name" placeholderTextColor={colors.textSecondary} value={name} onChangeText={setName} autoCapitalize="words" />
            </View>
            <View style={styles.inputContainer}>
              <View style={styles.inputIcon}>
                <Ionicons name="mail-outline" size={20} color={colors.textSecondary} />
              </View>
              <TextInput style={styles.input} placeholder="Email" placeholderTextColor={colors.textSecondary} value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none" autoCorrect={false} />
            </View>
            <View style={styles.inputContainer}>
              <View style={styles.inputIcon}>
                <Ionicons name="lock-closed-outline" size={20} color={colors.textSecondary} />
              </View>
              <TextInput style={styles.input} placeholder="Password" placeholderTextColor={colors.textSecondary} value={password} onChangeText={setPassword} secureTextEntry={!showPassword} autoCapitalize="none" />
              <TouchableOpacity style={styles.eyeIcon} onPress={() => setShowPassword(!showPassword)}>
                <Ionicons name={showPassword ? 'eye-off-outline' : 'eye-outline'} size={20} color={colors.textSecondary} />
              </TouchableOpacity>
            </View>
            <View style={styles.inputContainer}>
              <View style={styles.inputIcon}>
                <Ionicons name="lock-closed-outline" size={20} color={colors.textSecondary} />
              </View>
              <TextInput style={styles.input} placeholder="Confirm Password" placeholderTextColor={colors.textSecondary} value={confirmPassword} onChangeText={setConfirmPassword} secureTextEntry={!showPassword} autoCapitalize="none" />
            </View>
            <TouchableOpacity style={styles.termsContainer} onPress={() => setAcceptTerms(!acceptTerms)}>
              <View style={[styles.checkbox, acceptTerms && styles.checkboxChecked]}>
                {acceptTerms && <Ionicons name="checkmark" size={16} color={colors.white} />}
              </View>
              <Text style={styles.termsText}>I agree to the <Text style={styles.termsLink}>Terms of Service</Text> and <Text style={styles.termsLink}>Privacy Policy</Text></Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.signupButton, isLoading && styles.signupButtonDisabled]} onPress={handleSignup} disabled={isLoading}>
              {isLoading ? <ActivityIndicator color={colors.white} /> : <Text style={styles.signupButtonText}>Create Account</Text>}
            </TouchableOpacity>
            <View style={styles.dividerContainer}>
              <View style={styles.dividerLine} />
              <Text style={styles.dividerText}>or continue with</Text>
              <View style={styles.dividerLine} />
            </View>
            <View style={styles.socialContainer}>
              <TouchableOpacity style={styles.socialButton}><Ionicons name="logo-google" size={24} color={colors.text} /></TouchableOpacity>
              <TouchableOpacity style={styles.socialButton}><Ionicons name="logo-apple" size={24} color={colors.text} /></TouchableOpacity>
              <TouchableOpacity style={styles.socialButton}><Ionicons name="logo-facebook" size={24} color={colors.text} /></TouchableOpacity>
            </View>
          </View>
          <View style={styles.signinContainer}>
            <Text style={styles.signinText}>Already have an account? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text style={styles.signinLink}>Sign In</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  keyboardView: { flex: 1 },
  scrollContent: { flexGrow: 1, paddingHorizontal: spacing.lg, paddingBottom: spacing.xl },
  headerContainer: { flexDirection: 'row', alignItems: 'center', marginBottom: spacing.md },
  backButton: { padding: spacing.sm },
  logoContainer: { alignItems: 'center', marginBottom: spacing.lg },
  logoIcon: { width: 64, height: 64, borderRadius: 32, backgroundColor: colors.primary, justifyContent: 'center', alignItems: 'center', marginBottom: spacing.sm },
  appName: { fontSize: typography.h2, fontWeight: typography.bold, color: colors.primary },
  formContainer: { backgroundColor: colors.white, borderRadius: borderRadius.lg, padding: spacing.lg, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4, elevation: 4 },
  welcomeText: { fontSize: typography.h3, fontWeight: typography.bold, color: colors.text, marginBottom: spacing.xs },
  subtitleText: { fontSize: typography.body, color: colors.textSecondary, marginBottom: spacing.lg },
  errorContainer: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFEBEE', padding: spacing.md, borderRadius: borderRadius.md, marginBottom: spacing.md },
  errorText: { color: colors.error, marginLeft: spacing.sm, flex: 1 },
  inputContainer: { flexDirection: 'row', alignItems: 'center', backgroundColor: colors.surface, borderRadius: borderRadius.md, marginBottom: spacing.md, borderWidth: 1, borderColor: colors.border },
  inputIcon: { padding: spacing.md },
  input: { flex: 1, paddingVertical: spacing.md, paddingRight: spacing.md, fontSize: typography.body, color: colors.text },
  eyeIcon: { padding: spacing.md },
  termsContainer: { flexDirection: 'row', alignItems: 'center', marginBottom: spacing.lg },
  checkbox: { width: 24, height: 24, borderRadius: borderRadius.sm, borderWidth: 2, borderColor: colors.border, justifyContent: 'center', alignItems: 'center', marginRight: spacing.sm },
  checkboxChecked: { backgroundColor: colors.primary, borderColor: colors.primary },
  termsText: { flex: 1, fontSize: typography.bodySmall, color: colors.textSecondary, lineHeight: 20 },
  termsLink: { color: colors.primary, fontWeight: typography.medium },
  signupButton: { backgroundColor: colors.primary, paddingVertical: spacing.md, borderRadius: borderRadius.md, alignItems: 'center' },
  signupButtonDisabled: { opacity: 0.7 },
  signupButtonText: { color: colors.white, fontSize: typography.h6, fontWeight: typography.semiBold },
  dividerContainer: { flexDirection: 'row', alignItems: 'center', marginVertical: spacing.lg },
  dividerLine: { flex: 1, height: 1, backgroundColor: colors.border },
  dividerText: { marginHorizontal: spacing.md, color: colors.textSecondary, fontSize: typography.bodySmall },
  socialContainer: { flexDirection: 'row', justifyContent: 'center', gap: spacing.md },
  socialButton: { width: 56, height: 56, borderRadius: borderRadius.md, backgroundColor: colors.surface, justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: colors.border },
  signinContainer: { flexDirection: 'row', justifyContent: 'center', marginTop: spacing.xl },
  signinText: { color: colors.textSecondary, fontSize: typography.body },
  signinLink: { color: colors.primary, fontSize: typography.body, fontWeight: typography.semiBold },
});

export default SignupScreen;
