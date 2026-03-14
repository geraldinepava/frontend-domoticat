import { MaterialIcons } from '@expo/vector-icons';
import {
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

const PRIMARY = '#11d4b4';

const MAP_IMAGE = 'https://lh3.googleusercontent.com/aida-public/AB6AXuC-y_CPWvK52tpt8lCSxiVBuDPu1VHMvWjWaIMFFxpnz2Q0Ysv-RlqywSahgWdqdFx0b3QyJoTASeEEFacNsYlVySee94FpOzH9Iqz36x1rcf3nO4SE0Tspi-yCR84mqeOg3slAWcsaWxDBUihxwvOPMrg1nhqBBnztB5FFOqYTT9-V2mNF57Jp8JsqAvO4Ai5qM4fxEX8UlxC1A65aLDxlwMK9yXLnxB754JyLp2mEBgF-YWXWjoHdPvtfzDBj-VNCyxZ9NWXQYQ2h';

const ZONES = [
  { name: 'Patio Central', status: 'Normal Conditions', temp: '24°C', food: '85%', foodColor: PRIMARY },
  { name: 'Cafetería', status: 'Refill Needed', temp: '22°C', food: '12%', foodColor: '#f97316' },
  { name: 'Bloque A', status: '3 Cats Active', temp: '26°C', food: '60%', foodColor: '#10b981' },
];

const FILTER_TABS = ['Cats', 'Dispensers', 'Sensors'];

export default function MapScreen() {
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerCenter}>
          <Text style={styles.headerTitle}>Girardot Campus</Text>
          <Text style={styles.headerSub}>Domoticat Active Monitoring</Text>
        </View>
        <TouchableOpacity style={styles.notifBtn}>
          <MaterialIcons name="notifications" size={20} color={PRIMARY} />
        </TouchableOpacity>
      </View>

      {/* Search */}
      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <MaterialIcons name="search" size={20} color={PRIMARY} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search cats, zones, or sensors..."
            placeholderTextColor="#94a3b8"
          />
          <MaterialIcons name="tune" size={20} color={PRIMARY} />
        </View>
      </View>

      {/* Filter Tabs */}
      <View style={styles.filterRow}>
        {FILTER_TABS.map((tab, i) => (
          <TouchableOpacity
            key={tab}
            style={[styles.filterTab, i === 0 && styles.filterTabActive]}
          >
            <MaterialIcons
              name={i === 0 ? 'pets' : i === 1 ? 'dialpad' : 'sensors'}
              size={14}
              color={i === 0 ? '#fff' : PRIMARY}
            />
            <Text style={[styles.filterTabText, i === 0 && styles.filterTabTextActive]}>{tab}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Map Area */}
      <View style={styles.mapContainer}>
        <ImageBackground
          source={{ uri: MAP_IMAGE }}
          style={styles.mapImage}
          imageStyle={{ opacity: 0.85 }}
        >
          {/* Overlay tint */}
          <View style={[StyleSheet.absoluteFillObject, { backgroundColor: 'rgba(17,212,180,0.06)' }]} />

          {/* Patio Central marker */}
          <View style={[styles.marker, { top: '15%', left: '25%' }]}>
            <View style={styles.markerPulse} />
            <View style={styles.markerDot} />
            <View style={styles.markerTooltip}>
              <Text style={styles.markerTitle}>Patio Central</Text>
              <View style={styles.markerRow}>
                <MaterialIcons name="pets" size={11} color={PRIMARY} />
                <Text style={styles.markerSub}>8 Cats Active</Text>
              </View>
              <View style={styles.markerRow}>
                <MaterialIcons name="devices" size={11} color={PRIMARY} />
                <Text style={styles.markerSub}>3 IoT Devices</Text>
              </View>
            </View>
          </View>

          {/* Bloque A marker */}
          <View style={[styles.marker, { top: '45%', right: '20%' }]}>
            <View style={styles.markerDot} />
            <View style={[styles.markerTooltip, { top: '100%', marginTop: 8 }]}>
              <Text style={styles.markerTitle}>Bloque A</Text>
              <View style={styles.markerRow}>
                <MaterialIcons name="pets" size={11} color={PRIMARY} />
                <Text style={styles.markerSub}>3 Cats Active</Text>
              </View>
            </View>
          </View>

          {/* Cafeteria marker */}
          <View style={[styles.marker, { bottom: '25%', left: '50%' }]}>
            <View style={styles.markerDot} />
            <View style={styles.markerTooltip}>
              <Text style={styles.markerTitle}>Cafetería</Text>
              <View style={styles.markerRow}>
                <MaterialIcons name="warning" size={11} color="#f97316" />
                <Text style={[styles.markerSub, { color: '#f97316' }]}>Low Food Level</Text>
              </View>
            </View>
          </View>

          {/* Zoom Controls */}
          <View style={styles.zoomControls}>
            <TouchableOpacity style={styles.zoomBtn}>
              <MaterialIcons name="add" size={20} color="#0f172a" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.zoomBtn}>
              <MaterialIcons name="remove" size={20} color="#0f172a" />
            </TouchableOpacity>
            <TouchableOpacity style={[styles.zoomBtn, styles.locationBtn]}>
              <MaterialIcons name="my-location" size={20} color="#fff" />
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </View>

      {/* Zone Status Panel */}
      <View style={styles.zonePanel}>
        <View style={styles.zonePanelHandle} />
        <View style={styles.zonePanelHeader}>
          <Text style={styles.zonePanelTitle}>Zone Status</Text>
          <Text style={styles.liveText}>Live Updates</Text>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.zoneScroll}>
          {ZONES.map((zone, i) => (
            <View key={i} style={styles.zoneCard}>
              <View style={styles.zoneCardLeft}>
                <View style={styles.zoneIconBox}>
                  <MaterialIcons name="location-on" size={18} color={PRIMARY} />
                </View>
                <View>
                  <Text style={styles.zoneName}>{zone.name}</Text>
                  <Text style={[styles.zoneStatus, zone.foodColor === '#f97316' && { color: '#f97316' }]}>
                    {zone.status}
                  </Text>
                </View>
              </View>
              <View style={styles.zoneMetrics}>
                <View style={styles.zoneMetric}>
                  <Text style={styles.zoneMetricLabel}>Temp</Text>
                  <Text style={styles.zoneMetricValue}>{zone.temp}</Text>
                </View>
                <View style={styles.zoneMetric}>
                  <Text style={styles.zoneMetricLabel}>Food</Text>
                  <Text style={[styles.zoneMetricValue, { color: zone.foodColor }]}>{zone.food}</Text>
                </View>
              </View>
            </View>
          ))}
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8fafc' },
  header: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingHorizontal: 16, paddingTop: 52, paddingBottom: 12,
    borderBottomWidth: 1, borderBottomColor: 'rgba(17,212,180,0.12)',
  },
  headerCenter: { flex: 1, alignItems: 'center' },
  headerTitle: { fontSize: 18, fontWeight: 'bold', color: '#0f172a' },
  headerSub: { fontSize: 11, color: PRIMARY, fontWeight: '600', textTransform: 'uppercase', letterSpacing: 1 },
  notifBtn: {
    width: 38, height: 38, borderRadius: 10,
    backgroundColor: 'rgba(17,212,180,0.1)',
    alignItems: 'center', justifyContent: 'center',
  },
  searchContainer: { paddingHorizontal: 16, paddingVertical: 10 },
  searchBar: {
    flexDirection: 'row', alignItems: 'center', gap: 10,
    backgroundColor: 'rgba(17,212,180,0.06)',
    borderWidth: 1, borderColor: 'rgba(17,212,180,0.2)',
    borderRadius: 14, paddingHorizontal: 14, height: 44,
  },
  searchInput: { flex: 1, fontSize: 14, color: '#0f172a' },
  filterRow: {
    flexDirection: 'row', gap: 10, paddingHorizontal: 16, paddingBottom: 10,
  },
  filterTab: {
    flexDirection: 'row', alignItems: 'center', gap: 6,
    paddingHorizontal: 14, paddingVertical: 8, borderRadius: 20,
    backgroundColor: 'rgba(17,212,180,0.1)',
    borderWidth: 1, borderColor: 'rgba(17,212,180,0.2)',
  },
  filterTabActive: { backgroundColor: PRIMARY, borderColor: PRIMARY },
  filterTabText: { fontSize: 13, fontWeight: '600', color: PRIMARY },
  filterTabTextActive: { color: '#fff' },
  mapContainer: { flex: 1, position: 'relative' },
  mapImage: { flex: 1 },
  marker: {
    position: 'absolute',
    alignItems: 'center',
  },
  markerPulse: {
    position: 'absolute', width: 20, height: 20, borderRadius: 10,
    backgroundColor: 'rgba(17,212,180,0.3)',
    top: -3, left: -3,
  },
  markerDot: {
    width: 14, height: 14, borderRadius: 7,
    backgroundColor: PRIMARY,
    borderWidth: 2, borderColor: '#fff',
    shadowColor: PRIMARY, shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.5, shadowRadius: 4, elevation: 4,
  },
  markerTooltip: {
    position: 'absolute',
    bottom: '100%',
    marginBottom: 8,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 10,
    minWidth: 140,
    shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.15, shadowRadius: 12, elevation: 6,
    borderWidth: 1, borderColor: 'rgba(17,212,180,0.2)',
  },
  markerTitle: { fontSize: 13, fontWeight: 'bold', color: '#0f172a', marginBottom: 4 },
  markerRow: { flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: 2 },
  markerSub: { fontSize: 11, color: '#64748b' },
  zoomControls: {
    position: 'absolute', right: 16, bottom: 20,
    gap: 8, alignItems: 'center',
  },
  zoomBtn: {
    width: 44, height: 44, borderRadius: 12,
    backgroundColor: '#fff',
    alignItems: 'center', justifyContent: 'center',
    shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 6, elevation: 3,
  },
  locationBtn: { backgroundColor: PRIMARY, marginTop: 4 },
  zonePanel: {
    backgroundColor: '#fff', paddingTop: 10, paddingHorizontal: 16, paddingBottom: 12,
    borderTopLeftRadius: 24, borderTopRightRadius: 24,
    shadowColor: '#000', shadowOffset: { width: 0, height: -4 }, shadowOpacity: 0.08, shadowRadius: 12, elevation: 8,
    borderTopWidth: 1, borderTopColor: 'rgba(17,212,180,0.1)',
  },
  zonePanelHandle: {
    width: 40, height: 4, backgroundColor: '#cbd5e1', borderRadius: 2, alignSelf: 'center', marginBottom: 14,
  },
  zonePanelHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 },
  zonePanelTitle: { fontSize: 17, fontWeight: 'bold', color: '#0f172a' },
  liveText: { fontSize: 13, color: PRIMARY, fontWeight: '500' },
  zoneScroll: { flexGrow: 0 },
  zoneCard: {
    backgroundColor: 'rgba(17,212,180,0.04)',
    borderWidth: 1, borderColor: 'rgba(17,212,180,0.12)',
    borderRadius: 16, padding: 14, marginRight: 10,
    flexDirection: 'row', alignItems: 'center', gap: 12,
    minWidth: 230,
  },
  zoneCardLeft: { flexDirection: 'row', alignItems: 'center', gap: 10, flex: 1 },
  zoneIconBox: {
    width: 36, height: 36, borderRadius: 10,
    backgroundColor: 'rgba(17,212,180,0.15)',
    alignItems: 'center', justifyContent: 'center',
  },
  zoneName: { fontSize: 13, fontWeight: 'bold', color: '#0f172a' },
  zoneStatus: { fontSize: 11, color: '#94a3b8', marginTop: 2 },
  zoneMetrics: { flexDirection: 'row', gap: 12 },
  zoneMetric: { alignItems: 'center' },
  zoneMetricLabel: { fontSize: 9, fontWeight: '700', textTransform: 'uppercase', color: '#94a3b8', letterSpacing: 0.5 },
  zoneMetricValue: { fontSize: 14, fontWeight: 'bold', color: '#0f172a' },
});
