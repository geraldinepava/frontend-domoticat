import { MaterialIcons } from '@expo/vector-icons';
import {
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const PRIMARY = '#11d4b4';

const DAYS = ['L', 'M', 'X', 'J', 'V', 'S', 'D'];

function DayBadge({ label, active }: { label: string; active: boolean }) {
  return (
    <View style={[styles.dayBadge, active ? styles.dayBadgeActive : styles.dayBadgeInactive]}>
      <Text style={[styles.dayBadgeText, active ? styles.dayBadgeTextActive : styles.dayBadgeTextInactive]}>
        {label}
      </Text>
    </View>
  );
}

function ScheduleCard({
  time, label, enabled, activeDays,
}: { time: string; label: string; enabled: boolean; activeDays: boolean[] }) {
  return (
    <View style={styles.scheduleCard}>
      <View style={styles.scheduleCardTop}>
        <View>
          <Text style={styles.scheduleTime}>{time}</Text>
          <Text style={styles.scheduleLabel}>{label}</Text>
        </View>
        <Switch
          value={enabled}
          trackColor={{ false: '#e2e8f0', true: PRIMARY }}
          thumbColor="#fff"
          ios_backgroundColor="#e2e8f0"
        />
      </View>
      <View style={styles.daysRow}>
        {DAYS.map((d, i) => (
          <DayBadge key={d} label={d} active={activeDays[i]} />
        ))}
      </View>
    </View>
  );
}

const EVENTS = [
  { icon: 'check-circle', color: PRIMARY, bg: 'rgba(17,212,180,0.15)', title: 'Dispensado Exitoso', sub: 'Automático • Hoy, 08:00 AM', grams: '20g' },
  { icon: 'touch-app', color: '#3b82f6', bg: 'rgba(59,130,246,0.12)', title: 'Dispensado Manual', sub: 'App • Ayer, 09:15 PM', grams: '30g' },
  { icon: 'check-circle', color: PRIMARY, bg: 'rgba(17,212,180,0.15)', title: 'Dispensado Exitoso', sub: 'Automático • Ayer, 06:00 PM', grams: '20g' },
];

export default function DevicesScreen() {
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn}>
          <MaterialIcons name="arrow-back" size={22} color="#0f172a" />
        </TouchableOpacity>
        <View style={styles.headerCenter}>
          <Text style={styles.headerTitle}>Dispensador Bloque A</Text>
          <View style={styles.onlineRow}>
            <View style={styles.onlineDot} />
            <Text style={styles.onlineText}>Online</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.settingsBtn}>
          <MaterialIcons name="settings" size={22} color="#0f172a" />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Status Cards */}
        <View style={styles.statusRow}>
          <View style={styles.statusCard}>
            <View style={styles.statusCardTop}>
              <MaterialIcons name="battery-charging-80" size={18} color={PRIMARY} />
              <Text style={styles.statusCardLabel}>Batería</Text>
            </View>
            <Text style={styles.statusCardValue}>85%</Text>
          </View>
          <View style={styles.statusCard}>
            <View style={styles.statusCardTop}>
              <MaterialIcons name="restaurant" size={18} color={PRIMARY} />
              <Text style={styles.statusCardLabel}>Tipo Comida</Text>
            </View>
            <Text style={[styles.statusCardValue, { fontSize: 14 }]}>Croquetas Premium</Text>
          </View>
        </View>

        {/* Food Level */}
        <View style={styles.foodLevelCard}>
          <Text style={styles.foodLevelTitle}>Nivel de Comida</Text>
          {/* Circular ring approximation */}
          <View style={styles.foodCircleWrapper}>
            <View style={styles.foodCircleOuter}>
              <View style={styles.foodCircleInner}>
                <Text style={styles.foodPercent}>35%</Text>
                <Text style={styles.foodPercentLabel}>Restante</Text>
              </View>
            </View>
          </View>
          <View style={styles.warningBanner}>
            <MaterialIcons name="warning" size={16} color="#dc2626" />
            <Text style={styles.warningText}>¡Alerta! Nivel bajo de comida</Text>
          </View>
        </View>

        {/* Dispense Button */}
        <TouchableOpacity style={styles.dispenseButton} activeOpacity={0.85}>
          <MaterialIcons name="pets" size={24} color="#0f172a" />
          <Text style={styles.dispenseButtonText}>Dispensar 30g</Text>
        </TouchableOpacity>

        {/* Schedule */}
        <View style={styles.scheduleHeader}>
          <Text style={styles.subTitle}>Programación</Text>
          <TouchableOpacity>
            <Text style={styles.addScheduleBtn}>+ Añadir</Text>
          </TouchableOpacity>
        </View>
        <ScheduleCard time="08:00" label="Desayuno - 20g" enabled activeDays={[true, true, true, true, true, false, false]} />
        <ScheduleCard time="18:00" label="Cena - 20g" enabled activeDays={[true, true, true, true, true, true, true]} />

        {/* Hardware settings */}
        <Text style={[styles.subTitle, { marginTop: 20 }]}>Ajustes de Hardware</Text>
        <View style={styles.settingsCard}>
          <View style={styles.settingsRow}>
            <Text style={styles.settingsLabel}>Ángulo del Servo</Text>
            <Text style={styles.settingsValue}>95°</Text>
          </View>
          <View style={styles.sliderTrack}>
            <View style={[styles.sliderFill, { width: '55%' }]} />
            <View style={styles.sliderThumb} />
          </View>
        </View>

        {/* Recent Events */}
        <Text style={[styles.subTitle, { marginTop: 20 }]}>Historial Reciente</Text>
        <View style={styles.eventsCard}>
          {EVENTS.map((e, i) => (
            <View key={i} style={[styles.eventItem, i < EVENTS.length - 1 && styles.eventBorder]}>
              <View style={[styles.eventIcon, { backgroundColor: e.bg }]}>
                <MaterialIcons name={e.icon as any} size={20} color={e.color} />
              </View>
              <View style={styles.eventContent}>
                <Text style={styles.eventTitle}>{e.title}</Text>
                <Text style={styles.eventSub}>{e.sub}</Text>
              </View>
              <Text style={styles.eventGrams}>{e.grams}</Text>
            </View>
          ))}
        </View>

        <View style={{ height: 20 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8fafc' },
  header: {
    flexDirection: 'row', alignItems: 'center',
    paddingHorizontal: 16, paddingTop: 52, paddingBottom: 12,
    borderBottomWidth: 1, borderBottomColor: 'rgba(17,212,180,0.12)',
    backgroundColor: 'rgba(248,250,252,0.9)',
  },
  backBtn: {
    width: 38, height: 38, borderRadius: 19,
    backgroundColor: 'rgba(17,212,180,0.1)',
    alignItems: 'center', justifyContent: 'center',
  },
  headerCenter: { flex: 1, alignItems: 'center' },
  headerTitle: { fontSize: 17, fontWeight: 'bold', color: '#0f172a' },
  onlineRow: { flexDirection: 'row', alignItems: 'center', gap: 5, marginTop: 2 },
  onlineDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: PRIMARY },
  onlineText: { fontSize: 11, color: PRIMARY, fontWeight: '600' },
  settingsBtn: {
    width: 38, height: 38, borderRadius: 19,
    alignItems: 'center', justifyContent: 'center',
  },
  scrollContent: { padding: 16 },
  statusRow: { flexDirection: 'row', gap: 12, marginBottom: 16 },
  statusCard: {
    flex: 1, backgroundColor: '#fff', borderRadius: 14,
    padding: 14, borderWidth: 1, borderColor: 'rgba(17,212,180,0.12)',
    shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.04, shadowRadius: 6, elevation: 2,
  },
  statusCardTop: { flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 8 },
  statusCardLabel: { fontSize: 11, fontWeight: '700', textTransform: 'uppercase', color: PRIMARY, letterSpacing: 0.5 },
  statusCardValue: { fontSize: 22, fontWeight: 'bold', color: '#0f172a' },
  foodLevelCard: {
    backgroundColor: '#fff', borderRadius: 16, padding: 20,
    alignItems: 'center', marginBottom: 16,
    borderWidth: 1, borderColor: 'rgba(17,212,180,0.12)',
    shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.04, shadowRadius: 6, elevation: 2,
  },
  foodLevelTitle: {
    fontSize: 11, fontWeight: '700', textTransform: 'uppercase',
    color: '#94a3b8', letterSpacing: 1.5, marginBottom: 20,
  },
  foodCircleWrapper: { marginBottom: 20 },
  foodCircleOuter: {
    width: 150, height: 150, borderRadius: 75,
    borderWidth: 10, borderColor: PRIMARY,
    alignItems: 'center', justifyContent: 'center',
    borderTopColor: '#e2e8f0', borderRightColor: '#e2e8f0', borderBottomColor: '#e2e8f0',
    transform: [{ rotate: '-90deg' }],
  },
  foodCircleInner: {
    alignItems: 'center', justifyContent: 'center',
    transform: [{ rotate: '90deg' }],
  },
  foodPercent: { fontSize: 36, fontWeight: 'bold', color: '#0f172a' },
  foodPercentLabel: { fontSize: 11, color: '#94a3b8' },
  warningBanner: {
    flexDirection: 'row', alignItems: 'center', gap: 8,
    paddingHorizontal: 14, paddingVertical: 8,
    backgroundColor: '#fef2f2', borderRadius: 10,
  },
  warningText: { fontSize: 13, fontWeight: '600', color: '#dc2626' },
  dispenseButton: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 10,
    backgroundColor: PRIMARY, paddingVertical: 18, borderRadius: 16,
    shadowColor: PRIMARY, shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 8, elevation: 5,
    marginBottom: 24,
  },
  dispenseButtonText: { fontSize: 18, fontWeight: 'bold', color: '#0f172a' },
  scheduleHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 },
  subTitle: { fontSize: 16, fontWeight: 'bold', color: '#0f172a' },
  addScheduleBtn: { fontSize: 14, fontWeight: 'bold', color: PRIMARY },
  scheduleCard: {
    backgroundColor: '#fff', borderRadius: 14, padding: 14, marginBottom: 10,
    borderWidth: 1, borderColor: 'rgba(17,212,180,0.1)',
    shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.04, shadowRadius: 4, elevation: 1,
  },
  scheduleCardTop: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 },
  scheduleTime: { fontSize: 22, fontWeight: 'bold', color: '#0f172a' },
  scheduleLabel: { fontSize: 12, color: '#94a3b8', marginTop: 2 },
  daysRow: { flexDirection: 'row', gap: 6 },
  dayBadge: {
    width: 30, height: 30, borderRadius: 15,
    alignItems: 'center', justifyContent: 'center',
  },
  dayBadgeActive: { backgroundColor: PRIMARY },
  dayBadgeInactive: { backgroundColor: '#f1f5f9' },
  dayBadgeText: { fontSize: 11, fontWeight: 'bold' },
  dayBadgeTextActive: { color: '#0f172a' },
  dayBadgeTextInactive: { color: '#94a3b8' },
  settingsCard: {
    backgroundColor: '#fff', borderRadius: 14, padding: 16,
    borderWidth: 1, borderColor: 'rgba(17,212,180,0.1)',
  },
  settingsRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 },
  settingsLabel: { fontSize: 14, color: '#0f172a' },
  settingsValue: { fontSize: 14, fontWeight: 'bold', color: PRIMARY },
  sliderTrack: {
    height: 8, backgroundColor: '#e2e8f0', borderRadius: 4,
    flexDirection: 'row', alignItems: 'center',
  },
  sliderFill: { height: 8, backgroundColor: PRIMARY, borderRadius: 4 },
  sliderThumb: {
    width: 18, height: 18, borderRadius: 9,
    backgroundColor: PRIMARY, marginLeft: -9,
    shadowColor: PRIMARY, shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.3, shadowRadius: 4, elevation: 3,
  },
  eventsCard: {
    backgroundColor: '#fff', borderRadius: 14,
    borderWidth: 1, borderColor: 'rgba(17,212,180,0.1)',
    overflow: 'hidden',
  },
  eventItem: { flexDirection: 'row', alignItems: 'center', padding: 14, gap: 12 },
  eventBorder: { borderBottomWidth: 1, borderBottomColor: 'rgba(17,212,180,0.08)' },
  eventIcon: { width: 40, height: 40, borderRadius: 20, alignItems: 'center', justifyContent: 'center' },
  eventContent: { flex: 1 },
  eventTitle: { fontSize: 13, fontWeight: 'bold', color: '#0f172a' },
  eventSub: { fontSize: 11, color: '#94a3b8', marginTop: 2 },
  eventGrams: { fontSize: 12, fontWeight: '600', color: '#334155' },
});
