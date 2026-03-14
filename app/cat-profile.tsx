import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const PRIMARY = '#11d4b4';

export default function CatProfileScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <MaterialIcons name="arrow-back" size={22} color="#0f172a" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Cat Profile</Text>
        <TouchableOpacity>
          <MaterialIcons name="more-vert" size={22} color="#0f172a" />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Profile Hero */}
        <View style={styles.heroSection}>
          <View style={styles.avatarWrapper}>
            <Image
              source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBoSokKwY9bJeFepipST5oHsgmnQ6JISMn3ASmR3NyuEljrRipQGb7BqpSFtxcW_b3KHy274fHpUFf6c_UBcYbDJ1X2DfJyWnb7DwIc9Lp0ZiYYPRFIoF3ExeuRuKuIoabeboEQYdBUkEg2ivXnYBNldkayw2t7uQkd64H-_GebYcNUqIIqOLoSeGLj7YdoKRy8Pf0b4oSN5gA8jFpJOnMBOOhAR899E0bdR7JQBU2LAw_WhL3xawA1Py7Cnx-eJSy6ULg1_1gc2LSO' }}
              style={styles.avatar}
            />
            <View style={styles.verifiedBadge}>
              <MaterialIcons name="verified-user" size={13} color="#fff" />
            </View>
          </View>
          <Text style={styles.catName}>Michi</Text>
          <View style={styles.activeRow}>
            <View style={styles.activeDot} />
            <Text style={styles.activeText}>ACTIVE</Text>
          </View>
        </View>

        {/* Vital Stats */}
        <View style={styles.statsGrid}>
          {[
            { label: 'Sex', value: 'Male' },
            { label: 'Est. Age', value: '2 years' },
            { label: 'Weight', value: '4.5 kg' },
            { label: 'Sterilized', value: 'Yes', valueColor: PRIMARY },
          ].map((stat) => (
            <View key={stat.label} style={styles.statCard}>
              <Text style={styles.statLabel}>{stat.label}</Text>
              <Text style={[styles.statValue, stat.valueColor ? { color: stat.valueColor } : null]}>
                {stat.value}
              </Text>
            </View>
          ))}
        </View>

        {/* Location Section */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>
            <MaterialIcons name="place" size={18} color={PRIMARY} /> Location
          </Text>
          <View style={styles.locationCard}>
            <View style={styles.locationTextRow}>
              <Text style={styles.locationText}>Habitual Zone: <Text style={{ fontWeight: 'bold' }}>Patio Central</Text></Text>
            </View>
            <View style={styles.mapPreview}>
              <Image
                source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDmXawvzuIapu_r5yDpjcVx25q_DQMbm6zrUatpRnG9Z9Zcw-XK31sKgJIFFCUJ-KGtnZnufJuIfSwWsloSmJkU1zgxOgyjqAOsKdUR7PYlcoullPTPt3jqFSfJTi32bdSGLhbg1DnLFKnljjFFsodfQdQoV82Ydn86jeQvcuXH9ihdLf88Y_HjvJVLtGfejhHa1qKIzQwhRIxkQSQobB4tNdxTUfdFq9bo2-QKYLfas6tS876F41DV9O_mtGchV0REykboqcKgqzQZ' }}
                style={styles.mapImage}
                resizeMode="cover"
              />
              <View style={styles.mapOverlay} />
              <View style={styles.mapPin}>
                <MaterialIcons name="location-on" size={28} color={PRIMARY} />
              </View>
            </View>
          </View>
        </View>

        {/* Medical Quick View */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>
            <MaterialIcons name="medical-services" size={18} color={PRIMARY} /> Medical Quick View
          </Text>
          <View style={styles.medicalCard}>
            <View style={styles.medicalRow}>
              <Text style={styles.medicalLabel}>Last Vaccination</Text>
              <Text style={styles.medicalValue}>Oct 12, 2023</Text>
            </View>
            <View style={styles.medicalDivider} />
            <View style={styles.medicalRow}>
              <Text style={[styles.medicalLabel, { color: PRIMARY }]}>Next Check-up</Text>
              <Text style={[styles.medicalValue, { color: PRIMARY }]}>Apr 15, 2024</Text>
            </View>
          </View>
        </View>

        {/* Assigned Caregivers */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Assigned Caregivers</Text>
          {[
            { name: 'Elena Martinez', role: 'PRIMARY', roleColor: PRIMARY },
            { name: 'Carlos Ruiz', role: 'VOLUNTEER', roleColor: '#94a3b8' },
          ].map((c) => (
            <View key={c.name} style={styles.caregiverCard}>
              <View style={styles.caregiverAvatar}>
                <MaterialIcons name="person" size={22} color="#94a3b8" />
              </View>
              <View style={styles.caregiverInfo}>
                <Text style={styles.caregiverName}>{c.name}</Text>
                <Text style={[styles.caregiverRole, { color: c.roleColor }]}>{c.role}</Text>
              </View>
              <MaterialIcons name="chat" size={20} color="#cbd5e1" />
            </View>
          ))}
        </View>

        {/* Action Buttons */}
        <View style={styles.actionsContainer}>
          <TouchableOpacity style={styles.primaryButton}>
            <MaterialIcons name="edit" size={18} color="#0f172a" />
            <Text style={styles.primaryButtonText}>Edit Profile</Text>
          </TouchableOpacity>
          <View style={styles.secondaryButtons}>
            <TouchableOpacity style={styles.secondaryButton}>
              <MaterialIcons name="history" size={18} color={PRIMARY} />
              <Text style={styles.secondaryButtonText}>Medical</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.secondaryButton}>
              <MaterialIcons name="analytics" size={18} color={PRIMARY} />
              <Text style={styles.secondaryButtonText}>Log</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={{ height: 24 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8fafc' },
  header: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingHorizontal: 16, paddingTop: 52, paddingBottom: 12,
    borderBottomWidth: 1, borderBottomColor: 'rgba(17,212,180,0.12)',
    backgroundColor: 'rgba(248,250,252,0.9)',
  },
  backBtn: {
    width: 38, height: 38, borderRadius: 19, alignItems: 'center', justifyContent: 'center',
  },
  headerTitle: { fontSize: 18, fontWeight: 'bold', color: '#0f172a' },
  scrollContent: { paddingBottom: 20 },
  heroSection: { alignItems: 'center', paddingVertical: 28, paddingHorizontal: 24 },
  avatarWrapper: { position: 'relative', marginBottom: 12 },
  avatar: {
    width: 120, height: 120, borderRadius: 60,
    borderWidth: 4, borderColor: PRIMARY,
    shadowColor: PRIMARY, shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 8, elevation: 6,
  },
  verifiedBadge: {
    position: 'absolute', bottom: 4, right: 4,
    width: 26, height: 26, borderRadius: 13,
    backgroundColor: PRIMARY, alignItems: 'center', justifyContent: 'center',
    borderWidth: 2, borderColor: '#f8fafc',
  },
  catName: { fontSize: 26, fontWeight: 'bold', color: '#0f172a', letterSpacing: -0.5 },
  activeRow: { flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: 6 },
  activeDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: PRIMARY },
  activeText: { fontSize: 12, fontWeight: '700', color: PRIMARY, letterSpacing: 1 },
  statsGrid: {
    flexDirection: 'row', flexWrap: 'wrap', gap: 10,
    paddingHorizontal: 16, marginBottom: 20,
  },
  statCard: {
    width: '47%', backgroundColor: '#fff', borderRadius: 14, padding: 14,
    borderWidth: 1, borderColor: '#e2e8f0',
    shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.04, shadowRadius: 4, elevation: 1,
  },
  statLabel: { fontSize: 11, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 6 },
  statValue: { fontSize: 18, fontWeight: 'bold', color: '#0f172a' },
  sectionContainer: { paddingHorizontal: 16, marginBottom: 20 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', color: '#0f172a', marginBottom: 10 },
  locationCard: {
    backgroundColor: '#fff', borderRadius: 14,
    borderWidth: 1, borderColor: '#e2e8f0', overflow: 'hidden',
  },
  locationTextRow: { padding: 12 },
  locationText: { fontSize: 14, color: '#475569' },
  mapPreview: { height: 130, position: 'relative' },
  mapImage: { width: '100%', height: '100%' },
  mapOverlay: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(17,212,180,0.08)' },
  mapPin: {
    position: 'absolute', bottom: 8, left: '50%', marginLeft: -14,
  },
  medicalCard: {
    backgroundColor: 'rgba(17,212,180,0.08)',
    borderWidth: 1, borderColor: 'rgba(17,212,180,0.2)',
    borderRadius: 14, padding: 14, gap: 10,
  },
  medicalRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  medicalLabel: { fontSize: 13, color: '#475569' },
  medicalValue: { fontSize: 14, fontWeight: 'bold', color: '#0f172a' },
  medicalDivider: { height: 1, backgroundColor: 'rgba(17,212,180,0.2)' },
  caregiverCard: {
    flexDirection: 'row', alignItems: 'center', gap: 12,
    backgroundColor: '#fff', borderRadius: 14, padding: 14,
    borderWidth: 1, borderColor: '#e2e8f0', marginBottom: 8,
    shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.04, shadowRadius: 4, elevation: 1,
  },
  caregiverAvatar: {
    width: 44, height: 44, borderRadius: 22,
    backgroundColor: '#f1f5f9', alignItems: 'center', justifyContent: 'center',
  },
  caregiverInfo: { flex: 1 },
  caregiverName: { fontSize: 15, fontWeight: '600', color: '#0f172a' },
  caregiverRole: { fontSize: 11, fontWeight: '700', textTransform: 'uppercase', marginTop: 2 },
  actionsContainer: { paddingHorizontal: 16, gap: 10 },
  primaryButton: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8,
    backgroundColor: PRIMARY, paddingVertical: 14, borderRadius: 14,
    shadowColor: PRIMARY, shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 8, elevation: 5,
  },
  primaryButtonText: { fontSize: 15, fontWeight: 'bold', color: '#0f172a' },
  secondaryButtons: { flexDirection: 'row', gap: 10 },
  secondaryButton: {
    flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8,
    backgroundColor: '#fff', borderWidth: 1, borderColor: '#e2e8f0',
    paddingVertical: 13, borderRadius: 14,
  },
  secondaryButtonText: { fontSize: 14, fontWeight: '600', color: '#0f172a' },
});
