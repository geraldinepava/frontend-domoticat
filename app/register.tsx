import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

export default function RegisterScreen() {
  const router = useRouter();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState('ESTUDIANTE');
  const [isRolePickerVisible, setRolePickerVisible] = useState(false);

  const ROLES: { value: string; label: string }[] = [
    { value: 'ESTUDIANTE', label: 'Estudiante' },
    { value: 'MIEMBRO', label: 'Miembro' },
    { value: 'VETERINARIO', label: 'Veterinario' },
    { value: 'ADMINISTRADOR', label: 'Administrador' },
  ];

  const selectedLabel = ROLES.find((r) => r.value === role)?.label ?? role;

  const handleRegister = () => {
    console.log('Register attempt with', fullName, email, password, role);
    router.replace('/(tabs)');
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer} bounces={false} showsVerticalScrollIndicator={false}>

        {/* Header / Navigation Bar */}
        <View style={styles.navBar}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <MaterialIcons name="arrow-back" size={24} color="#0f172a" />
          </TouchableOpacity>
          <Text style={styles.navTitle}>Create Account</Text>
          <View style={styles.placeholder} />
        </View>

        {/* Hero Branding Section */}
        <View style={styles.heroContainer}>
          <View style={styles.iconContainer}>
            <MaterialIcons name="pets" size={48} color="#11d4b4" />
          </View>
          <Text style={styles.title}>Join Domoticat</Text>
          <Text style={styles.subtitle}>
            Register your profile to start managing your feline friends and campus life.
          </Text>
        </View>

        {/* Form Section */}
        <View style={styles.formContainer}>

          {/* Full Name */}
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Full Name</Text>
            <View style={styles.inputWrapper}>
              <MaterialIcons name="person-outline" size={22} color="#94a3b8" style={styles.inputIconLeft} />
              <TextInput
                style={styles.input}
                placeholder="Enter your full name"
                placeholderTextColor="#94a3b8"
                value={fullName}
                onChangeText={setFullName}
                autoCapitalize="words"
              />
            </View>
          </View>

          {/* Email Address */}
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Email Address</Text>
            <View style={styles.inputWrapper}>
              <MaterialIcons name="mail-outline" size={22} color="#94a3b8" style={styles.inputIconLeft} />
              <TextInput
                style={styles.input}
                placeholder="name@example.com"
                placeholderTextColor="#94a3b8"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
              />
            </View>
          </View>

          {/* Password */}
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Password</Text>
            <View style={styles.inputWrapper}>
              <MaterialIcons name="lock-outline" size={22} color="#94a3b8" style={styles.inputIconLeft} />
              <TextInput
                style={styles.inputWithRightIcon}
                placeholder="Create a strong password"
                placeholderTextColor="#94a3b8"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
              />
              <TouchableOpacity
                onPress={() => setShowPassword(!showPassword)}
                style={styles.inputIconRight}
              >
                <MaterialIcons name={showPassword ? 'visibility-off' : 'visibility'} size={22} color="#94a3b8" />
              </TouchableOpacity>
            </View>
          </View>

          {/* Role Selector */}
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>I am a...</Text>
            <TouchableOpacity
              style={[styles.inputWrapper, isRolePickerVisible && styles.inputWrapperActive]}
              activeOpacity={0.8}
              onPress={() => setRolePickerVisible(!isRolePickerVisible)}
            >
              <MaterialIcons name="badge" size={22} color="#94a3b8" style={styles.inputIconLeft} />
              <Text style={styles.selectorText}>{selectedLabel}</Text>
              <MaterialIcons
                name={isRolePickerVisible ? 'expand-less' : 'expand-more'}
                size={22}
                color="#94a3b8"
                style={styles.inputIconRight}
              />
            </TouchableOpacity>

            {/* Dropdown */}
            {isRolePickerVisible && (
              <View style={styles.dropdownContainer}>
                {ROLES.map((r, index) => (
                  <TouchableOpacity
                    key={r.value}
                    style={[
                      styles.dropdownItem,
                      index === ROLES.length - 1 ? styles.dropdownItemLast : null,
                    ]}
                    onPress={() => {
                      setRole(r.value);
                      setRolePickerVisible(false);
                    }}
                  >
                    <Text style={[
                      styles.dropdownItemText,
                      role === r.value && styles.dropdownItemTextSelected,
                    ]}>
                      {r.label}
                    </Text>
                    {role === r.value && (
                      <MaterialIcons name="check" size={18} color="#11d4b4" />
                    )}
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>

          {/* Register Button */}
          <TouchableOpacity
            style={styles.primaryButton}
            onPress={handleRegister}
            activeOpacity={0.85}
          >
            <Text style={styles.primaryButtonText}>Create Account</Text>
          </TouchableOpacity>
        </View>

        {/* Footer Link */}
        <View style={styles.footerContainer}>
          <Text style={styles.footerText}>Already have an account? </Text>
          <TouchableOpacity onPress={() => router.push('/login')}>
            <Text style={styles.footerLink}>Log in</Text>
          </TouchableOpacity>
        </View>

        <View style={{ height: 60 }} />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  scrollContainer: {
    flexGrow: 1,
  },
  navBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 52,
    paddingBottom: 12,
  },
  backButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    backgroundColor: 'rgba(17, 212, 180, 0.1)',
  },
  navTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#0f172a',
    flex: 1,
    textAlign: 'center',
  },
  placeholder: {
    width: 40,
  },
  heroContainer: {
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 12,
    paddingBottom: 8,
  },
  iconContainer: {
    backgroundColor: 'rgba(17, 212, 180, 0.2)',
    padding: 16,
    borderRadius: 16,
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#0f172a',
    textAlign: 'center',
    marginBottom: 8,
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 15,
    color: '#64748b',
    textAlign: 'center',
    lineHeight: 22,
    maxWidth: 300,
  },
  formContainer: {
    paddingHorizontal: 24,
    paddingTop: 20,
    maxWidth: 500,
    alignSelf: 'center',
    width: '100%',
  },
  inputGroup: {
    width: '100%',
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#334155',
    marginBottom: 8,
    marginLeft: 2,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: '#e2e8f0',
    borderRadius: 14,
    backgroundColor: '#ffffff',
    height: 52,
  },
  inputWrapperActive: {
    borderColor: '#11d4b4',
  },
  inputIconLeft: {
    marginLeft: 14,
    marginRight: 2,
  },
  input: {
    flex: 1,
    height: '100%',
    paddingHorizontal: 12,
    fontSize: 15,
    color: '#0f172a',
  },
  inputWithRightIcon: {
    flex: 1,
    height: '100%',
    paddingLeft: 12,
    paddingRight: 48,
    fontSize: 15,
    color: '#0f172a',
  },
  inputIconRight: {
    position: 'absolute',
    right: 14,
    padding: 4,
  },
  selectorText: {
    flex: 1,
    fontSize: 15,
    color: '#0f172a',
    paddingLeft: 12,
  },
  dropdownContainer: {
    backgroundColor: '#ffffff',
    borderWidth: 1.5,
    borderColor: '#e2e8f0',
    borderRadius: 14,
    marginTop: 6,
    overflow: 'hidden',
    shadowColor: '#0f172a',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
  },
  dropdownItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 15,
    paddingHorizontal: 18,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },
  dropdownItemLast: {
    borderBottomWidth: 0,
  },
  dropdownItemText: {
    fontSize: 15,
    color: '#334155',
  },
  dropdownItemTextSelected: {
    fontWeight: '700',
    color: '#11d4b4',
  },
  primaryButton: {
    backgroundColor: '#11d4b4',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 14,
    shadowColor: '#11d4b4',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
    marginTop: 8,
  },
  primaryButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#0f172a',
  },
  footerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 24,
  },
  footerText: {
    fontSize: 14,
    color: '#64748b',
  },
  footerLink: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#11d4b4',
  },
});
