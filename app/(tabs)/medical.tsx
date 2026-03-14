import { MaterialIcons } from '@expo/vector-icons';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const PRIMARY = '#11d4b4';

const TIMELINE = [
  {
    icon: 'medical-services',
    type: 'GENERAL CONSULTATION',
    date: 'Oct 24, 2023',
    title: 'Annual Checkup',
    meta: 'Dr. Sarah Jenkins • City Vet Clinic',
    metaIcon: 'person',
  },
  {
    icon: 'bug-report',
    type: 'DEWORMING',
    date: 'Sep 12, 2023',
    title: 'Internal & External Parasites',
    meta: 'Bravecto Plus Spot-on',
    metaIcon: 'medication',
  },
  {
    icon: 'vaccines',
    type: 'VACCINATION',
    date: 'Aug 05, 2023',
    title: 'Feline Triple Vaccine',
    meta: 'Dr. Sarah Jenkins • City Vet Clinic',
    metaIcon: 'person',
  },
];

const TREATMENTS = [
  { icon: 'medication', title: 'Amoxicilina', sub: '1/2 tab every 12h • 3 days left' },
  { icon: 'water-drop', title: 'Ear Drops (Otic)', sub: '2 drops once daily • Ongoing' },
];

export default function MedicalScreen() {
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn}>
          <MaterialIcons name="arrow-back" size={22} color="#0f172a" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Medical History</Text>
        <View style={styles.headerActions}>
          <TouchableOpacity style={styles.iconBtn}>
            <MaterialIcons name="search" size={20} color={PRIMARY} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconBtn}>
            <MaterialIcons name="filter-list" size={20} color={PRIMARY} />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Summary Cards */}
        <View style={styles.summaryRow}>
          <View style={styles.summaryCard}>
            <View style={styles.summaryTop}>
              <MaterialIcons name="vaccines" size={18} color={PRIMARY} />
              <Text style={styles.summaryLabel}>Cats Vaccinated</Text>
            </View>
            <View style={styles.summaryBottom}>
              <Text style={styles.summaryValue}>12</Text>
              <Text style={styles.summaryDelta}>+2 this month</Text>
            </View>
          </View>
          <View style={styles.summaryCard}>
            <View style={styles.summaryTop}>
              <MaterialIcons name="event" size={18} color={PRIMARY} />
              <Text style={styles.summaryLabel}>Next 30 Days</Text>
            </View>
            <View style={styles.summaryBottom}>
              <Text style={styles.summaryValue}>3</Text>
              <Text style={[styles.summaryDelta, { color: '#94a3b8' }]}>Upcoming visits</Text>
            </View>
          </View>
        </View>

        {/* Priority Alerts */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Priority Alerts</Text>
          <View style={styles.alertBadge}>
            <Text style={styles.alertBadgeText}>2 Action Required</Text>
          </View>
        </View>
        <View style={styles.alertCard}>
          <View style={styles.alertLeft}>
            <Text style={styles.alertPriority}>HIGH PRIORITY</Text>
            <Text style={styles.alertName}>Nobivac Rabies</Text>
            <Text style={styles.alertSub}>Luna • Due in 5 days</Text>
            <TouchableOpacity style={styles.scheduleBtn}>
              <Text style={styles.scheduleBtnText}>Schedule Now</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.alertImagePlaceholder}>
            <MaterialIcons name="pets" size={36} color={PRIMARY} />
          </View>
        </View>

        {/* Active Treatments */}
        <Text style={styles.sectionTitle}>Active Treatments</Text>
        <View style={styles.treatmentsCard}>
          {TREATMENTS.map((t, i) => (
            <View key={i} style={[styles.treatmentItem, i < TREATMENTS.length - 1 && styles.treatmentBorder]}>
              <View style={styles.treatmentIcon}>
                <MaterialIcons name={t.icon as any} size={22} color={PRIMARY} />
              </View>
              <View style={styles.treatmentContent}>
                <Text style={styles.treatmentTitle}>{t.title}</Text>
                <Text style={styles.treatmentSub}>{t.sub}</Text>
              </View>
              <TouchableOpacity style={styles.checkBtn}>
                <MaterialIcons name="check-circle" size={18} color={PRIMARY} />
              </TouchableOpacity>
            </View>
          ))}
        </View>

        {/* Clinical Timeline */}
        <Text style={[styles.sectionTitle, { marginTop: 20 }]}>Clinical Timeline</Text>
        <View style={styles.timeline}>
          {/* Vertical line */}
          <View style={styles.timelineLine} />
          {TIMELINE.map((entry, i) => (
            <View key={i} style={styles.timelineEntry}>
              <View style={styles.timelineDot}>
                <MaterialIcons name={entry.icon as any} size={18} color="#fff" />
              </View>
              <View style={styles.timelineCard}>
                <View style={styles.timelineCardTop}>
                  <Text style={styles.timelineType}>{entry.type}</Text>
                  <Text style={styles.timelineDate}>{entry.date}</Text>
                </View>
                <Text style={styles.timelineTitle}>{entry.title}</Text>
                <View style={styles.timelineMetaRow}>
                  <MaterialIcons name={entry.metaIcon as any} size={13} color="#94a3b8" />
                  <Text style={styles.timelineMeta}>{entry.meta}</Text>
                </View>
              </View>
            </View>
          ))}
        </View>

        <View style={{ height: 80 }} />
      </ScrollView>

      {/* FAB */}
      <TouchableOpacity style={styles.fab}>
        <MaterialIcons name="add" size={28} color="#fff" />
      </TouchableOpacity>
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
    alignItems: 'center', justifyContent: 'center',
  },
  headerTitle: { flex: 1, fontSize: 20, fontWeight: 'bold', color: '#0f172a', marginLeft: 8 },
  headerActions: { flexDirection: 'row', gap: 8 },
  iconBtn: {
    width: 36, height: 36, borderRadius: 18,
    backgroundColor: 'rgba(17,212,180,0.1)',
    alignItems: 'center', justifyContent: 'center',
  },
  scrollContent: { padding: 16 },
  summaryRow: { flexDirection: 'row', gap: 12, marginBottom: 20 },
  summaryCard: {
    flex: 1, backgroundColor: 'rgba(17,212,180,0.08)',
    borderWidth: 1, borderColor: 'rgba(17,212,180,0.2)',
    borderRadius: 16, padding: 16,
  },
  summaryTop: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 10 },
  summaryLabel: { fontSize: 13, color: '#334155' },
  summaryBottom: { flexDirection: 'row', alignItems: 'baseline', gap: 8 },
  summaryValue: { fontSize: 30, fontWeight: 'bold', color: '#0f172a' },
  summaryDelta: { fontSize: 12, fontWeight: 'bold', color: '#10b981' },
  sectionHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', color: '#0f172a', marginBottom: 12 },
  alertBadge: {
    backgroundColor: 'rgba(17,212,180,0.12)', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 20,
  },
  alertBadgeText: { fontSize: 11, fontWeight: 'bold', color: PRIMARY },
  alertCard: {
    flexDirection: 'row', backgroundColor: '#fff',
    borderRadius: 16, padding: 16, marginBottom: 20,
    borderLeftWidth: 4, borderColor: PRIMARY,
    shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 8, elevation: 2,
  },
  alertLeft: { flex: 1 },
  alertPriority: { fontSize: 10, fontWeight: 'bold', color: '#f43f5e', letterSpacing: 1, marginBottom: 4 },
  alertName: { fontSize: 16, fontWeight: 'bold', color: '#0f172a' },
  alertSub: { fontSize: 13, color: '#94a3b8', marginTop: 4, marginBottom: 12 },
  scheduleBtn: {
    backgroundColor: PRIMARY, paddingVertical: 8,
    borderRadius: 10, alignItems: 'center',
  },
  scheduleBtnText: { fontSize: 13, fontWeight: 'bold', color: '#0f172a' },
  alertImagePlaceholder: {
    width: 90, height: 90, borderRadius: 14,
    backgroundColor: 'rgba(17,212,180,0.1)',
    alignItems: 'center', justifyContent: 'center', marginLeft: 12,
  },
  treatmentsCard: {
    backgroundColor: '#fff', borderRadius: 16,
    borderWidth: 1, borderColor: 'rgba(17,212,180,0.1)',
    overflow: 'hidden', marginBottom: 6,
  },
  treatmentItem: { flexDirection: 'row', alignItems: 'center', padding: 16, gap: 12 },
  treatmentBorder: { borderBottomWidth: 1, borderBottomColor: '#f1f5f9' },
  treatmentIcon: {
    width: 48, height: 48, borderRadius: 12,
    backgroundColor: 'rgba(17,212,180,0.1)', alignItems: 'center', justifyContent: 'center',
  },
  treatmentContent: { flex: 1 },
  treatmentTitle: { fontSize: 14, fontWeight: 'bold', color: '#0f172a' },
  treatmentSub: { fontSize: 12, color: '#94a3b8', marginTop: 2 },
  checkBtn: {
    width: 32, height: 32, borderRadius: 16,
    borderWidth: 1, borderColor: 'rgba(17,212,180,0.3)',
    alignItems: 'center', justifyContent: 'center',
  },
  timeline: { paddingLeft: 20, gap: 20, position: 'relative' },
  timelineLine: {
    position: 'absolute', left: 29, top: 20,
    bottom: 0, width: 2, backgroundColor: 'rgba(17,212,180,0.2)',
  },
  timelineEntry: { flexDirection: 'row', alignItems: 'flex-start', gap: 14 },
  timelineDot: {
    width: 40, height: 40, borderRadius: 20,
    backgroundColor: PRIMARY, alignItems: 'center', justifyContent: 'center',
    zIndex: 1,
  },
  timelineCard: {
    flex: 1, backgroundColor: '#fff', borderRadius: 14, padding: 14,
    shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.04, shadowRadius: 6, elevation: 2,
  },
  timelineCardTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 },
  timelineType: { fontSize: 10, fontWeight: 'bold', color: PRIMARY, textTransform: 'uppercase' },
  timelineDate: { fontSize: 11, color: '#94a3b8' },
  timelineTitle: { fontSize: 14, fontWeight: 'bold', color: '#0f172a', marginBottom: 6 },
  timelineMetaRow: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  timelineMeta: { fontSize: 11, color: '#94a3b8' },
  fab: {
    position: 'absolute', bottom: 90, right: 20,
    width: 56, height: 56, borderRadius: 28,
    backgroundColor: PRIMARY, alignItems: 'center', justifyContent: 'center',
    shadowColor: PRIMARY, shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.4, shadowRadius: 8, elevation: 6,
  },
});
