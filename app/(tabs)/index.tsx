import { MaterialIcons } from '@expo/vector-icons';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const PRIMARY = '#11d4b4';
const BG = '#f8fafc';

/** Simple bar-based sparkline made from Views — no SVG dependency needed */
function Sparkline({ data }: { data: number[] }) {
  const maxVal = Math.max(...data);
  return (
    <View style={spark.row}>
      {data.map((v, i) => (
        <View key={i} style={spark.barWrapper}>
          <View
            style={[
              spark.bar,
              { height: (v / maxVal) * 52, opacity: 0.6 + (i / data.length) * 0.4 },
            ]}
          />
        </View>
      ))}
    </View>
  );
}

const spark = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'flex-end', height: 52, gap: 3 },
  barWrapper: { flex: 1, justifyContent: 'flex-end' },
  bar: { backgroundColor: PRIMARY, borderRadius: 3, minHeight: 4 },
});

const TEMP_DATA = [62, 30, 55, 40, 70, 35, 80, 45, 60, 72, 50, 85];
const HUM_DATA  = [55, 75, 45, 65, 35, 70, 40, 60, 50, 30, 65, 55];

export default function DashboardScreen() {
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <View style={styles.headerIcon}>
            <MaterialIcons name="pets" size={20} color="#0f172a" />
          </View>
          <Text style={styles.headerTitle}>Domoticat</Text>
        </View>
        <TouchableOpacity style={styles.notifButton}>
          <MaterialIcons name="notifications" size={22} color={PRIMARY} />
          <View style={styles.notifDot} />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Quick Actions */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>Quick Actions</Text>
          <View style={styles.actionsRow}>
            <TouchableOpacity style={styles.primaryAction}>
              <MaterialIcons name="restaurant" size={20} color="#0f172a" />
              <Text style={styles.primaryActionText}>Feed Now</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.secondaryAction}>
              <MaterialIcons name="medical-services" size={20} color="#0f172a" />
              <Text style={styles.secondaryActionText}>Add Record</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.secondaryAction}>
              <MaterialIcons name="person-add" size={20} color="#0f172a" />
              <Text style={styles.secondaryActionText}>New Cat</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Environmental Status */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Environmental Status</Text>
            <View style={styles.badge}>
              <Text style={styles.badgeText}>DHT11 Sensors</Text>
            </View>
          </View>
          <View style={styles.cardsRow}>
            {/* Temperature Card */}
            <View style={styles.telemetryCard}>
              <View style={styles.telemetryCardTop}>
                <View>
                  <Text style={styles.telemetryLabel}>Temperature</Text>
                  <Text style={styles.telemetryValue}>28°C</Text>
                </View>
                <View style={[styles.telemetryIconBox, { backgroundColor: '#fff7ed' }]}>
                  <MaterialIcons name="thermostat" size={22} color="#ea580c" />
                </View>
              </View>
              <View style={styles.trendRow}>
                <Text style={[styles.trendText, { color: '#10b981' }]}>▲ 2%</Text>
                <Text style={styles.trendSub}>vs last 24h</Text>
              </View>
              <Sparkline data={TEMP_DATA} />
            </View>

            {/* Humidity Card */}
            <View style={styles.telemetryCard}>
              <View style={styles.telemetryCardTop}>
                <View>
                  <Text style={styles.telemetryLabel}>Humidity</Text>
                  <Text style={styles.telemetryValue}>65%</Text>
                </View>
                <View style={[styles.telemetryIconBox, { backgroundColor: '#eff6ff' }]}>
                  <MaterialIcons name="water-drop" size={22} color="#2563eb" />
                </View>
              </View>
              <View style={styles.trendRow}>
                <Text style={[styles.trendText, { color: '#ef4444' }]}>▼ 1%</Text>
                <Text style={styles.trendSub}>vs last 24h</Text>
              </View>
              <Sparkline data={HUM_DATA} />
            </View>
          </View>
        </View>

        {/* System Alerts */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>System Alerts</Text>
          <View style={styles.alertCard_red}>
            <View style={styles.alertIconRed}>
              <MaterialIcons name="priority-high" size={18} color="#fff" />
            </View>
            <View style={styles.alertContent}>
              <Text style={styles.alertTitleRed}>Critical: Low Food Level</Text>
              <Text style={styles.alertBody}>Dispenser 'Patio Central' is at 5% capacity.</Text>
            </View>
          </View>
          <View style={styles.alertCard_primary}>
            <View style={styles.alertIconPrimary}>
              <MaterialIcons name="info" size={18} color="#0f172a" />
            </View>
            <View style={styles.alertContent}>
              <Text style={styles.alertTitlePrimary}>Info: Upcoming Vaccination</Text>
              <Text style={styles.alertBody}>Luna's annual rabies shot is next Tuesday.</Text>
            </View>
          </View>
        </View>

        {/* Device Activity */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Devices Activity</Text>
          <View style={styles.devicesRow}>
            <View style={styles.deviceCard}>
              <View style={[styles.deviceIconCircle, { backgroundColor: '#d1fae5' }]}>
                <MaterialIcons name="dishwasher" size={22} color="#059669" />
              </View>
              <Text style={styles.deviceCount}>3</Text>
              <Text style={styles.deviceLabel}>Dispensers Online</Text>
            </View>
            <View style={styles.deviceCard}>
              <View style={[styles.deviceIconCircle, { backgroundColor: 'rgba(17,212,180,0.2)' }]}>
                <MaterialIcons name="sensors" size={22} color={PRIMARY} />
              </View>
              <Text style={styles.deviceCount}>2</Text>
              <Text style={styles.deviceLabel}>Env. Sensors</Text>
            </View>
          </View>
        </View>

        <View style={{ height: 20 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: BG },
  header: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingHorizontal: 16, paddingTop: 52, paddingBottom: 12,
    backgroundColor: 'rgba(248,250,252,0.92)',
    borderBottomWidth: 1, borderBottomColor: 'rgba(17,212,180,0.1)',
  },
  headerLeft: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  headerIcon: {
    width: 40, height: 40, borderRadius: 10,
    backgroundColor: PRIMARY, alignItems: 'center', justifyContent: 'center',
  },
  headerTitle: { fontSize: 20, fontWeight: 'bold', color: '#0f172a' },
  notifButton: {
    width: 40, height: 40, borderRadius: 12,
    backgroundColor: 'rgba(17,212,180,0.12)',
    alignItems: 'center', justifyContent: 'center',
  },
  notifDot: {
    position: 'absolute', top: 8, right: 8,
    width: 8, height: 8, borderRadius: 4,
    backgroundColor: '#ef4444', borderWidth: 1.5, borderColor: BG,
  },
  scrollContent: { paddingHorizontal: 16, paddingTop: 20 },
  section: { marginBottom: 28 },
  sectionLabel: {
    fontSize: 11, fontWeight: '700', color: PRIMARY,
    textTransform: 'uppercase', letterSpacing: 1, marginBottom: 12,
  },
  sectionHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', color: '#0f172a' },
  badge: {
    backgroundColor: 'rgba(17,212,180,0.12)', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 20,
  },
  badgeText: { fontSize: 11, fontWeight: '600', color: PRIMARY },
  actionsRow: { flexDirection: 'row', gap: 10 },
  primaryAction: {
    flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 6,
    backgroundColor: PRIMARY, paddingVertical: 14, borderRadius: 14,
    shadowColor: PRIMARY, shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.25, shadowRadius: 8, elevation: 4,
  },
  primaryActionText: { fontSize: 13, fontWeight: 'bold', color: '#0f172a' },
  secondaryAction: {
    flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 6,
    backgroundColor: '#fff', borderWidth: 1, borderColor: 'rgba(17,212,180,0.25)',
    paddingVertical: 14, borderRadius: 14,
  },
  secondaryActionText: { fontSize: 12, fontWeight: 'bold', color: '#0f172a' },
  cardsRow: { gap: 12 },
  telemetryCard: {
    backgroundColor: '#fff', borderRadius: 16, padding: 16,
    borderWidth: 1, borderColor: 'rgba(17,212,180,0.08)',
    shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 8, elevation: 2,
  },
  telemetryCardTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 },
  telemetryLabel: { fontSize: 13, color: '#64748b', marginBottom: 4 },
  telemetryValue: { fontSize: 28, fontWeight: 'bold', color: '#0f172a' },
  telemetryIconBox: { padding: 8, borderRadius: 10 },
  trendRow: { flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 12 },
  trendText: { fontSize: 13, fontWeight: 'bold' },
  trendSub: { fontSize: 11, color: '#94a3b8' },
  alertCard_red: {
    flexDirection: 'row', alignItems: 'center', gap: 12,
    backgroundColor: 'rgba(239,68,68,0.08)', borderWidth: 1, borderColor: 'rgba(239,68,68,0.2)',
    borderRadius: 14, padding: 14, marginBottom: 10,
  },
  alertCard_primary: {
    flexDirection: 'row', alignItems: 'center', gap: 12,
    backgroundColor: 'rgba(17,212,180,0.08)', borderWidth: 1, borderColor: 'rgba(17,212,180,0.2)',
    borderRadius: 14, padding: 14,
  },
  alertIconRed: {
    width: 36, height: 36, borderRadius: 8, backgroundColor: '#ef4444',
    alignItems: 'center', justifyContent: 'center',
  },
  alertIconPrimary: {
    width: 36, height: 36, borderRadius: 8, backgroundColor: PRIMARY,
    alignItems: 'center', justifyContent: 'center',
  },
  alertContent: { flex: 1 },
  alertTitleRed: { fontSize: 13, fontWeight: 'bold', color: '#dc2626', marginBottom: 2 },
  alertTitlePrimary: { fontSize: 13, fontWeight: 'bold', color: PRIMARY, marginBottom: 2 },
  alertBody: { fontSize: 12, color: '#64748b' },
  devicesRow: { flexDirection: 'row', gap: 12 },
  deviceCard: {
    flex: 1, backgroundColor: '#fff', borderRadius: 16, padding: 16,
    borderWidth: 1, borderColor: 'rgba(17,212,180,0.12)', gap: 6,
    shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.04, shadowRadius: 6, elevation: 2,
  },
  deviceIconCircle: {
    width: 48, height: 48, borderRadius: 24, alignItems: 'center', justifyContent: 'center',
  },
  deviceCount: { fontSize: 22, fontWeight: 'bold', color: '#0f172a' },
  deviceLabel: { fontSize: 11, color: '#64748b' },
});
