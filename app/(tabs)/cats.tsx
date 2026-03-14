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

const CATS = [
  {
    id: 1,
    name: 'Michi',
    sex: 'MACHO',
    age: '2 años',
    weight: '4.5 kg',
    sterilized: true,
    zone: 'Patio Central',
    coat: 'Atigrado',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBoSokKwY9bJeFepipST5oHsgmnQ6JISMn3ASmR3NyuEljrRipQGb7BqpSFtxcW_b3KHy274fHpUFf6c_UBcYbDJ1X2DfJyWnb7DwIc9Lp0ZiYYPRFIoF3ExeuRuKuIoabeboEQYdBUkEg2ivXnYBNldkayw2t7uQkd64H-_GebYcNUqIIqOLoSeGLj7YdoKRy8Pf0b4oSN5gA8jFpJOnMBOOhAR899E0bdR7JQBU2LAw_WhL3xawA1Py7Cnx-eJSy6ULg1_1gc2LSO',
  },
  {
    id: 2,
    name: 'Luna',
    sex: 'HEMBRA',
    age: '3 años',
    weight: '3.8 kg',
    sterilized: true,
    zone: 'Bloque A',
    coat: 'Bicolor',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAhfIW_ywacLY3LugQLg-6OxX13iZsBQrRJ-ZFHbBh_EVBarNst_t_gebMCA6fX3NxsSaP3986rzf7zJrripXsuF8zpaBog46x7U6jtc3tSjnmQ6pisRD6LSw-Zep8yQsrcSYY06FT7FtABpA3N3ERx95YM3Dr4GXDgPsAOCOLPkCp5ekBJV9zY_GiL6QEiAD4s5RSf4taHdTBZk-gJJc0rpfa8OZm4DP3JNGGeq2bBi0hlrKrYVe1GhrvlAIAIbyOtyDkcbkw_JRu9',
  },
  {
    id: 3,
    name: 'Pelusa',
    sex: 'HEMBRA',
    age: '1 año',
    weight: '2.9 kg',
    sterilized: false,
    zone: 'Cafetería',
    coat: 'Carey',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBoSokKwY9bJeFepipST5oHsgmnQ6JISMn3ASmR3NyuEljrRipQGb7BqpSFtxcW_b3KHy274fHpUFf6c_UBcYbDJ1X2DfJyWnb7DwIc9Lp0ZiYYPRFIoF3ExeuRuKuIoabeboEQYdBUkEg2ivXnYBNldkayw2t7uQkd64H-_GebYcNUqIIqOLoSeGLj7YdoKRy8Pf0b4oSN5gA8jFpJOnMBOOhAR899E0bdR7JQBU2LAw_WhL3xawA1Py7Cnx-eJSy6ULg1_1gc2LSO',
  },
];

export default function CatsScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Cat Profiles</Text>
        <TouchableOpacity style={styles.addButton}>
          <MaterialIcons name="add" size={22} color="#0f172a" />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Stats row */}
        <View style={styles.statsRow}>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>11</Text>
            <Text style={styles.statLabel}>Total Cats</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={[styles.statValue, { color: PRIMARY }]}>8</Text>
            <Text style={styles.statLabel}>Active Today</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={[styles.statValue, { color: '#f97316' }]}>3</Text>
            <Text style={styles.statLabel}>Pending Vax</Text>
          </View>
        </View>

        {/* Cat list */}
        {CATS.map((cat) => (
          <TouchableOpacity key={cat.id} style={styles.catCard} activeOpacity={0.85}>
            <Image source={{ uri: cat.image }} style={styles.catImage} />
            <View style={styles.catInfo}>
              <View style={styles.catNameRow}>
                <Text style={styles.catName}>{cat.name}</Text>
                <View style={styles.onlineDot} />
              </View>
              <Text style={styles.catZone}>
                <MaterialIcons name="place" size={12} color="#94a3b8" /> {cat.zone}
              </Text>
              <View style={styles.catTags}>
                <View style={styles.tag}>
                  <Text style={styles.tagText}>{cat.sex === 'MACHO' ? '♂' : '♀'} {cat.sex}</Text>
                </View>
                <View style={styles.tag}>
                  <Text style={styles.tagText}>{cat.weight}</Text>
                </View>
                {cat.sterilized && (
                  <View style={[styles.tag, styles.tagGreen]}>
                    <Text style={[styles.tagText, { color: '#059669' }]}>Esterilizado</Text>
                  </View>
                )}
              </View>
            </View>
            <MaterialIcons name="chevron-right" size={22} color="#cbd5e1" />
          </TouchableOpacity>
        ))}

        <View style={{ height: 20 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8fafc' },
  header: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingHorizontal: 20, paddingTop: 52, paddingBottom: 14,
    borderBottomWidth: 1, borderBottomColor: 'rgba(17,212,180,0.12)',
    backgroundColor: 'rgba(248,250,252,0.9)',
  },
  headerTitle: { fontSize: 22, fontWeight: 'bold', color: '#0f172a' },
  addButton: {
    width: 38, height: 38, borderRadius: 12,
    backgroundColor: PRIMARY, alignItems: 'center', justifyContent: 'center',
  },
  scrollContent: { padding: 16 },
  statsRow: { flexDirection: 'row', gap: 10, marginBottom: 20 },
  statCard: {
    flex: 1, backgroundColor: '#fff', borderRadius: 14,
    padding: 14, alignItems: 'center',
    borderWidth: 1, borderColor: 'rgba(17,212,180,0.12)',
    shadowColor: '#000', shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04, shadowRadius: 6, elevation: 2,
  },
  statValue: { fontSize: 24, fontWeight: 'bold', color: '#0f172a' },
  statLabel: { fontSize: 11, color: '#94a3b8', marginTop: 2 },
  catCard: {
    flexDirection: 'row', alignItems: 'center', gap: 14,
    backgroundColor: '#fff', borderRadius: 16, padding: 14, marginBottom: 12,
    borderWidth: 1, borderColor: 'rgba(17,212,180,0.1)',
    shadowColor: '#000', shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05, shadowRadius: 8, elevation: 2,
  },
  catImage: {
    width: 60, height: 60, borderRadius: 30,
    borderWidth: 2.5, borderColor: PRIMARY,
  },
  catInfo: { flex: 1 },
  catNameRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 2 },
  catName: { fontSize: 16, fontWeight: 'bold', color: '#0f172a' },
  onlineDot: {
    width: 8, height: 8, borderRadius: 4,
    backgroundColor: PRIMARY,
  },
  catZone: { fontSize: 12, color: '#94a3b8', marginBottom: 8 },
  catTags: { flexDirection: 'row', flexWrap: 'wrap', gap: 6 },
  tag: {
    backgroundColor: 'rgba(17,212,180,0.08)',
    paddingHorizontal: 8, paddingVertical: 3, borderRadius: 20,
  },
  tagText: { fontSize: 11, color: '#334155', fontWeight: '600' },
  tagGreen: { backgroundColor: 'rgba(5,150,105,0.08)' },
});
