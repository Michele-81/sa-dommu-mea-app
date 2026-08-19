import React, { useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  ScrollView,
  Pressable,
  StyleSheet,
  Linking,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';

type Section =
  | 'home'
  | 'wifi'
  | 'casa'
  | 'posizione'
  | 'ristoranti'
  | 'esperienze'
  | 'servizi'
  | 'trasporti'
  | 'emergenze'
  | 'contatti'
  | 'recensioni'
  | 'sardegna'
  | 'preferiti'
  | 'messaggi'
  | 'info'
  | 'impostazioni';

export default function HomeScreen() {
  const [section, setSection] = useState<Section>('home');
  const [favorites, setFavorites] = useState<string[]>([]);

  const toggleFavorite = (name: string) => {
    setFavorites((current) =>
      current.includes(name)
        ? current.filter((item) => item !== name)
        : [...current, name]
    );
  };

  const openPhone = () => {
    Linking.openURL('tel:+393491870078');
  };

  const openMaps = () => {
    Linking.openURL(
      'https://www.google.com/maps/search/?api=1&query=Sardegna'
    );
  };

  const menuItems = [
    ['📶', 'Wi-Fi', 'wifi'],
    ['🏡', 'La casa', 'casa'],
    ['📍', 'Posizione', 'posizione'],
    ['🍝', 'Ristoranti', 'ristoranti'],
    ['🏖️', 'Esperienze', 'esperienze'],
    ['🛍️', 'Servizi', 'servizi'],
    ['🚕', 'Trasporti', 'trasporti'],
    ['🆘', 'Emergenze', 'emergenze'],
    ['📞', 'Contatti', 'contatti'],
    ['⭐', 'Recensioni', 'recensioni'],
    ['🌍', 'Scopri la Sardegna', 'sardegna'],
    ['❤️', 'Preferiti', 'preferiti'],
    ['💬', 'Messaggi', 'messaggi'],
    ['ℹ️', 'Info utili', 'info'],
    ['⚙️', 'Impostazioni', 'impostazioni'],
  ] as const;

  const Header = () => (
    <View style={styles.header}>
      <View>
        <Text style={styles.smallTitle}>BENVENUTI A</Text>
        <Text style={styles.logo}>SA DOMMU MEA</Text>
      </View>

      <Pressable
        style={styles.headerHeart}
        onPress={() => setSection('preferiti')}
      >
        <Text style={styles.heartText}>❤️</Text>
        {favorites.length > 0 && (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{favorites.length}</Text>
          </View>
        )}
      </Pressable>
    </View>
  );

  const BackButton = () => (
    <Pressable style={styles.backButton} onPress={() => setSection('home')}>
      <Text style={styles.backText}>‹  Torna alla Home</Text>
    </Pressable>
  );

  const Home = () => (
    <>
      <View style={styles.hero}>
        <Text style={styles.heroEmoji}>🏡</Text>
        <Text style={styles.heroTitle}>Benvenuti</Text>
        <Text style={styles.heroSubtitle}>
          La vostra guida digitale per vivere al meglio SA DOMMU MEA
        </Text>
      </View>

      <View style={styles.checkCard}>
        <View>
          <Text style={styles.cardLabel}>CHECK-IN</Text>
          <Text style={styles.cardValue}>15:00</Text>
        </View>

        <View style={styles.divider} />

        <View>
          <Text style={styles.cardLabel}>CHECK-OUT</Text>
          <Text style={styles.cardValue}>10:00</Text>
        </View>
      </View>

      <Text style={styles.sectionTitle}>Tutto quello che ti serve</Text>

      <View style={styles.grid}>
        {menuItems.slice(0, 10).map(([icon, title, value]) => (
          <Pressable
            key={value}
            style={styles.menuCard}
            onPress={() => setSection(value as Section)}
          >
            <Text style={styles.menuIcon}>{icon}</Text>
            <Text style={styles.menuTitle}>{title}</Text>
          </Pressable>
        ))}
      </View>

      <Text style={styles.sectionTitle}>Scopri di più</Text>

      <View style={styles.largeCards}>
        <Pressable
          style={styles.largeCard}
          onPress={() => setSection('sardegna')}
        >
          <Text style={styles.largeEmoji}>🌊</Text>
          <View style={{ flex: 1 }}>
            <Text style={styles.largeTitle}>Scopri la Sardegna</Text>
            <Text style={styles.largeText}>
              Spiagge, borghi, natura ed esperienze da non perdere.
            </Text>
          </View>
        </Pressable>

        <Pressable
          style={styles.largeCard}
          onPress={() => setSection('ristoranti')}
        >
          <Text style={styles.largeEmoji}>🍷</Text>
          <View style={{ flex: 1 }}>
            <Text style={styles.largeTitle}>Dove mangiare</Text>
            <Text style={styles.largeText}>
              I nostri suggerimenti per assaporare la cucina locale.
            </Text>
          </View>
        </Pressable>
      </View>

      <Pressable
        style={styles.emergencyButton}
        onPress={() => setSection('emergenze')}
      >
        <Text style={styles.emergencyText}>🆘  NUMERI DI EMERGENZA</Text>
      </Pressable>
    </>
  );

  const SimplePage = ({
    icon,
    title,
    text,
    children,
  }: {
    icon: string;
    title: string;
    text: string;
    children?: React.ReactNode;
  }) => (
    <>
      <BackButton />

      <View style={styles.pageHeader}>
        <Text style={styles.pageIcon}>{icon}</Text>
        <Text style={styles.pageTitle}>{title}</Text>
        <Text style={styles.pageSubtitle}>{text}</Text>
      </View>

      {children}
    </>
  );

  const WifiPage = () => (
    <SimplePage
      icon="📶"
      title="Wi-Fi"
      text="Collegati alla rete."
    >
      <View style={styles.infoCard}>
        <Text style={styles.infoLabel}>RETE WI-FI</Text>
        <Text style={styles.infoValue}>Huawei-B311-8B2F-EXT</Text>

        <Text style={styles.infoLabel}>PASSWORD</Text>
        <Text style={styles.infoValue}>590L57TAQ68</Text>
      </View>

      <Text style={styles.note}>
        La password potrà essere modificata dal pannello proprietario.
      </Text>
    </SimplePage>
  );

  const CasaPage = () => (
    <SimplePage
      icon="🏡"
      title="La casa"
      text="Tutto ciò che puoi trovare a tua disposizione."
    >
      {[
        '🛏️ Camera da letto',
        '🚿 Bagno completo',
        '🍳 Cucina attrezzata',
        '☕ Macchina del caffè',
        '❄️ Aria condizionata',
        '📺 TV',
        '🧺 Lavatrice',
        '📡 Wi-Fi',
      ].map((item) => (
        <View style={styles.listCard} key={item}>
          <Text style={styles.listText}>{item}</Text>
        </View>
      ))}
    </SimplePage>
  );

  const PosizionePage = () => (
    <SimplePage
      icon="📍"
      title="Posizione"
      text="Trova facilmente SA DOMMU MEA."
    >
      <View style={styles.mapCard}>
        <Text style={styles.mapEmoji}>🗺️</Text>
        <Text style={styles.mapTitle}>La nostra posizione</Text>
        <Text style={styles.mapText}>
          Apri Google Maps per ottenere indicazioni stradali.
        </Text>

        <Pressable style={styles.primaryButton} onPress={openMaps}>
          <Text style={styles.primaryButtonText}>Apri Google Maps</Text>
        </Pressable>
      </View>
    </SimplePage>
  );

  const RistorantiPage = () => {
    const restaurants = [
      '🍝 Ristorante tipico sardo',
      '🐟 Ristorante di pesce',
      '🍕 Pizzeria',
      '☕ Bar e colazioni',
    ];

    return (
      <SimplePage
        icon="🍝"
        title="Ristoranti"
        text="Alcuni suggerimenti per mangiare bene."
      >
        {restaurants.map((restaurant) => (
          <Pressable
            key={restaurant}
            style={styles.listCard}
            onPress={() => toggleFavorite(restaurant)}
          >
            <Text style={styles.listText}>{restaurant}</Text>
            <Text style={styles.favoriteSmall}>
              {favorites.includes(restaurant) ? '❤️' : '♡'}
            </Text>
          </Pressable>
        ))}
      </SimplePage>
    );
  };

  const EsperienzePage = () => (
    <SimplePage
      icon="🏖️"
      title="Esperienze"
      text="Idee per scoprire il territorio."
    >
      {[
        '🏖️ Giornata al mare',
        '🥾 Escursioni nella natura',
        '🏘️ Visita ai borghi',
        '⛵ Gita in barca',
        '🌅 Tramonto sul mare',
        '🍷 Degustazione di prodotti locali',
      ].map((item) => (
        <View style={styles.listCard} key={item}>
          <Text style={styles.listText}>{item}</Text>
        </View>
      ))}
    </SimplePage>
  );

  const ServiziPage = () => (
    <SimplePage
      icon="🛍️"
      title="Negozi e servizi"
      text="Tutto ciò che può essere utile durante il soggiorno."
    >
      {[
        '🛒 Supermercati',
        '💊 Farmacie',
        '⛽ Distributori',
        '🏧 Bancomat',
        '🧴 Negozi',
        '🧺 Lavanderie',
      ].map((item) => (
        <View style={styles.listCard} key={item}>
          <Text style={styles.listText}>{item}</Text>
        </View>
      ))}
    </SimplePage>
  );

  const TrasportiPage = () => (
    <SimplePage
      icon="🚕"
      title="Trasporti"
      text="Come spostarsi facilmente."
    >
      {[
        '🚕 Taxi',
        '🚌 Autobus',
        '🚗 Noleggio auto',
        '🚲 Noleggio biciclette',
      ].map((item) => (
        <View style={styles.listCard} key={item}>
          <Text style={styles.listText}>{item}</Text>
        </View>
      ))}
    </SimplePage>
  );

  const EmergenzePage = () => (
    <SimplePage
      icon="🆘"
      title="Emergenze"
      text="In caso di emergenza chiama immediatamente il numero appropriato."
    >
      <Pressable style={styles.emergencyBig} onPress={() => Linking.openURL('tel:112')}>
        <Text style={styles.emergencyBigIcon}>📞</Text>
        <View>
          <Text style={styles.emergencyBigTitle}>112</Text>
          <Text style={styles.emergencyBigText}>Numero unico di emergenza</Text>
        </View>
      </Pressable>

      <Text style={styles.note}>
        Per emergenze reali utilizza sempre i numeri ufficiali.
      </Text>
    </SimplePage>
  );

  const ContattiPage = () => (
    <SimplePage
      icon="📞"
      title="Contatti"
      text="Hai bisogno di assistenza?"
    >
      <View style={styles.infoCard}>
        <Text style={styles.infoLabel}>HOST</Text>
        <Text style={styles.infoValue}>SA DOMMU MEA</Text>

        <Text style={styles.infoLabel}>TELEFONO</Text>
        <Text style={styles.infoValue}>+39 3491870078</Text>

        <Pressable style={styles.primaryButton} onPress={openPhone}>
          <Text style={styles.primaryButtonText}>Chiama</Text>
        </Pressable>
      </View>
    </SimplePage>
  );

  const RecensioniPage = () => (
    <SimplePage
      icon="⭐"
      title="Recensioni"
      text="La tua opinione è importante."
    >
      <View style={styles.reviewCard}>
        <Text style={styles.stars}>★★★★★</Text>
        <Text style={styles.reviewText}>
          “Un soggiorno speciale in una casa accogliente.”
        </Text>
        <Text style={styles.reviewName}>— Ospite SA DOMMU MEA</Text>
      </View>

      <View style={styles.reviewCard}>
        <Text style={styles.stars}>★★★★★</Text>
        <Text style={styles.reviewText}>
          “Tutto perfetto, torneremo sicuramente!”
        </Text>
        <Text style={styles.reviewName}>— Ospite SA DOMMU MEA</Text>
      </View>
    </SimplePage>
  );

  const SardegnaPage = () => (
    <SimplePage
      icon="🌍"
      title="Scopri la Sardegna"
      text="Il tuo punto di partenza per esplorare l'isola."
    >
      {[
        '🏖️ Spiagge da sogno',
        '⛰️ Montagne e natura',
        '🏘️ Borghi e tradizioni',
        '🍷 Enogastronomia',
        '🎭 Cultura e storia',
        '🌅 Tramonti indimenticabili',
      ].map((item) => (
        <View style={styles.listCard} key={item}>
          <Text style={styles.listText}>{item}</Text>
        </View>
      ))}
    </SimplePage>
  );

  const PreferitiPage = () => (
    <SimplePage
      icon="❤️"
      title="Preferiti"
      text="Qui trovi ciò che hai salvato."
    >
      {favorites.length === 0 ? (
        <View style={styles.emptyCard}>
          <Text style={styles.emptyIcon}>♡</Text>
          <Text style={styles.emptyTitle}>Nessun preferito</Text>
          <Text style={styles.emptyText}>
            Tocca il cuore vicino ai tuoi luoghi preferiti per salvarli.
          </Text>
        </View>
      ) : (
        favorites.map((item) => (
          <Pressable
            key={item}
            style={styles.listCard}
            onPress={() => toggleFavorite(item)}
          >
            <Text style={styles.listText}>{item}</Text>
            <Text>❤️</Text>
          </Pressable>
        ))
      )}
    </SimplePage>
  );

  const MessaggiPage = () => (
    <SimplePage
      icon="💬"
      title="Messaggi"
      text="Comunica con il proprietario."
    >
      <View style={styles.emptyCard}>
        <Text style={styles.emptyIcon}>💬</Text>
        <Text style={styles.emptyTitle}>Nessun messaggio</Text>
        <Text style={styles.emptyText}>
          Il sistema di messaggistica sarà collegato nel pannello proprietario.
        </Text>
      </View>
    </SimplePage>
  );

  const InfoPage = () => (
    <SimplePage
      icon="ℹ️"
      title="Info utili"
      text="Informazioni importanti per il tuo soggiorno."
    >
      {[
        '🗝️ Dove trovare le chiavi',
        '🗑️ Raccolta differenziata',
        '🔇 Regole della casa',
        '🧹 Pulizia',
        '🛏️ Biancheria',
        '🚭 Regole sul fumo',
      ].map((item) => (
        <View style={styles.listCard} key={item}>
          <Text style={styles.listText}>{item}</Text>
        </View>
      ))}
    </SimplePage>
  );

  const ImpostazioniPage = () => (
    <SimplePage
      icon="⚙️"
      title="Impostazioni"
      text="Personalizza la tua esperienza."
    >
      <View style={styles.listCard}>
        <Text style={styles.listText}>🌐 Lingua</Text>
        <Text style={styles.settingValue}>Italiano</Text>
      </View>

      <View style={styles.listCard}>
        <Text style={styles.listText}>🔔 Notifiche</Text>
        <Text style={styles.settingValue}>Attive</Text>
      </View>

      <View style={styles.listCard}>
        <Text style={styles.listText}>❤️ Preferiti</Text>
        <Text style={styles.settingValue}>{favorites.length}</Text>
      </View>
    </SimplePage>
  );

  const renderSection = () => {
    switch (section) {
      case 'wifi':
        return <WifiPage />;
      case 'casa':
        return <CasaPage />;
      case 'posizione':
        return <PosizionePage />;
      case 'ristoranti':
        return <RistorantiPage />;
      case 'esperienze':
        return <EsperienzePage />;
      case 'servizi':
        return <ServiziPage />;
      case 'trasporti':
        return <TrasportiPage />;
      case 'emergenze':
        return <EmergenzePage />;
      case 'contatti':
        return <ContattiPage />;
      case 'recensioni':
        return <RecensioniPage />;
      case 'sardegna':
        return <SardegnaPage />;
      case 'preferiti':
        return <PreferitiPage />;
      case 'messaggi':
        return <MessaggiPage />;
      case 'info':
        return <InfoPage />;
      case 'impostazioni':
        return <ImpostazioniPage />;
      default:
        return <Home />;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />

      <Header />

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {renderSection()}

        <View style={styles.footer}>
          <Text style={styles.footerLogo}>SA DOMMU MEA</Text>
          <Text style={styles.footerText}>
            La tua casa. La tua esperienza. La tua Sardegna.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F3EC',
  },

  scroll: {
    flex: 1,
  },

  content: {
    padding: 20,
    paddingBottom: 40,
  },

  header: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#E8E1D6',
  },

  smallTitle: {
    fontSize: 10,
    letterSpacing: 2,
    color: '#8B7A62',
    fontWeight: '700',
  },

  logo: {
    fontSize: 20,
    fontWeight: '800',
    letterSpacing: 1,
    color: '#2F4638',
    marginTop: 2,
  },

  headerHeart: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: '#F7F3EC',
    alignItems: 'center',
    justifyContent: 'center',
  },

  heartText: {
    fontSize: 20,
  },

  badge: {
    position: 'absolute',
    right: -2,
    top: -2,
    width: 19,
    height: 19,
    borderRadius: 10,
    backgroundColor: '#A35C4F',
    alignItems: 'center',
    justifyContent: 'center',
  },

  badgeText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '700',
  },

  hero: {
    backgroundColor: '#2F4638',
    borderRadius: 24,
    padding: 28,
    alignItems: 'center',
    marginBottom: 16,
  },

  heroEmoji: {
    fontSize: 42,
    marginBottom: 8,
  },

  heroTitle: {
    color: '#FFFFFF',
    fontSize: 34,
    fontWeight: '800',
  },

  heroSubtitle: {
    color: '#E6E0D5',
    textAlign: 'center',
    fontSize: 15,
    lineHeight: 22,
    marginTop: 8,
  },

  checkCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginBottom: 26,
    elevation: 2,
  },

  cardLabel: {
    color: '#8B7A62',
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 1,
  },

  cardValue: {
    color: '#2F4638',
    fontSize: 22,
    fontWeight: '800',
    marginTop: 4,
  },

  divider: {
    height: 45,
    width: 1,
    backgroundColor: '#DDD5C8',
  },

  sectionTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: '#2F4638',
    marginBottom: 14,
    marginTop: 8,
  },

  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },

  menuCard: {
    width: '48%',
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 18,
    marginBottom: 12,
    minHeight: 105,
    justifyContent: 'center',
    elevation: 1,
  },

  menuIcon: {
    fontSize: 27,
    marginBottom: 8,
  },

  menuTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#35453A',
  },

  largeCards: {
    gap: 12,
  },

  largeCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 18,
    flexDirection: 'row',
    alignItems: 'center',
  },

  largeEmoji: {
    fontSize: 38,
    marginRight: 15,
  },

  largeTitle: {
    fontSize: 17,
    fontWeight: '800',
    color: '#2F4638',
  },

  largeText: {
    color: '#777064',
    marginTop: 5,
    lineHeight: 19,
  },

  emergencyButton: {
    backgroundColor: '#A35C4F',
    borderRadius: 16,
    padding: 18,
    marginTop: 20,
    alignItems: 'center',
  },

  emergencyText: {
    color: '#FFFFFF',
    fontWeight: '800',
    letterSpacing: 0.5,
  },

  backButton: {
    marginBottom: 20,
  },

  backText: {
    color: '#A35C4F',
    fontSize: 15,
    fontWeight: '700',
  },

  pageHeader: {
    alignItems: 'center',
    marginBottom: 25,
  },

  pageIcon: {
    fontSize: 48,
    marginBottom: 10,
  },

  pageTitle: {
    fontSize: 30,
    fontWeight: '800',
    color: '#2F4638',
    textAlign: 'center',
  },

  pageSubtitle: {
    color: '#777064',
    textAlign: 'center',
    fontSize: 15,
    lineHeight: 21,
    marginTop: 8,
  },

  infoCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 24,
    marginBottom: 15,
  },

  infoLabel: {
    color: '#8B7A62',
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1,
    marginTop: 8,
  },

  infoValue: {
    color: '#2F4638',
    fontSize: 21,
    fontWeight: '800',
    marginTop: 5,
    marginBottom: 15,
  },

  note: {
    color: '#777064',
    fontSize: 13,
    lineHeight: 20,
    textAlign: 'center',
    marginTop: 10,
  },

  listCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 18,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  listText: {
    color: '#35453A',
    fontSize: 16,
    fontWeight: '600',
    flex: 1,
  },

  favoriteSmall: {
    fontSize: 21,
    marginLeft: 10,
  },

  mapCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 25,
    alignItems: 'center',
  },

  mapEmoji: {
    fontSize: 55,
  },

  mapTitle: {
    fontSize: 21,
    fontWeight: '800',
    color: '#2F4638',
    marginTop: 10,
  },

  mapText: {
    textAlign: 'center',
    color: '#777064',
    marginTop: 8,
    lineHeight: 20,
  },

  primaryButton: {
    backgroundColor: '#2F4638',
    borderRadius: 13,
    paddingHorizontal: 24,
    paddingVertical: 14,
    marginTop: 18,
  },

  primaryButtonText: {
    color: '#FFFFFF',
    fontWeight: '800',
  },

  emergencyBig: {
    backgroundColor: '#A35C4F',
    borderRadius: 20,
    padding: 22,
    flexDirection: 'row',
    alignItems: 'center',
  },

  emergencyBigIcon: {
    fontSize: 38,
    marginRight: 18,
  },

  emergencyBigTitle: {
    color: '#FFFFFF',
    fontSize: 30,
    fontWeight: '900',
  },

  emergencyBigText: {
    color: '#FFFFFF',
    fontSize: 13,
  },

  reviewCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 22,
    marginBottom: 12,
  },

  stars: {
    fontSize: 22,
    letterSpacing: 2,
    marginBottom: 12,
  },

  reviewText: {
    color: '#35453A',
    fontSize: 16,
    lineHeight: 23,
  },

  reviewName: {
    color: '#8B7A62',
    marginTop: 12,
    fontSize: 13,
  },

  emptyCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 30,
    alignItems: 'center',
  },

  emptyIcon: {
    fontSize: 48,
    color: '#A35C4F',
  },

  emptyTitle: {
    color: '#2F4638',
    fontSize: 21,
    fontWeight: '800',
    marginTop: 10,
  },

  emptyText: {
    color: '#777064',
    textAlign: 'center',
    lineHeight: 20,
    marginTop: 8,
  },

  settingValue: {
    color: '#8B7A62',
    fontWeight: '700',
  },

  footer: {
    alignItems: 'center',
    paddingTop: 35,
  },

  footerLogo: {
    color: '#2F4638',
    fontWeight: '900',
    letterSpacing: 1.5,
    fontSize: 16,
  },

  footerText: {
    color: '#8B7A62',
    fontSize: 12,
    textAlign: 'center',
    marginTop: 5,
  },
});