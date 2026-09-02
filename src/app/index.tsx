
import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  ScrollView,
  Pressable,
  StyleSheet,
  Linking,
  Image,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';

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

type AppData = {
  wifiName: string;
  wifiPassword: string;
  checkIn: string;
  checkOut: string;
  description: string;
  photos: string;
  restaurants: string;
  experiences: string;
  services: string;
  transports: string;
  emergencies: string;
  contacts: string;
  reviews: string;
  sardegna: string;
  info: string;
  messages: string;
  settings: string;
  cenaSardaAttiva: string;
  cenaSardaTitolo: string;
  cenaSardaDescrizione: string;
  cenaSardaMenu: string;
  cenaSardaPrezzo: string;
  cenaSardaGiorni: string;
  cenaSardaContatto: string;
};

const defaultData: AppData = {
  wifiName: 'SA DOMMU MEA',
  wifiPassword: 'Benvenuti2026',
  checkIn: '15:00',
  checkOut: '10:00',

  description:
    'Benvenuti a SA DOMMU MEA, una casa pensata per offrirvi comfort, relax e un autentico soggiorno in Sardegna.',

  photos: '',

  restaurants:
    'Ristorante La Luna nel Pozzo - Maladroxia\n' +
    'Ristorante Il Cavaliere del Fuoco - Viale Trieste, 41\n' +
    'Ristorante La Rosa dei Venti - Via Roma, 17\n' +
    'Ristorante SeZiro - Viale Giosuè Carducci\n' +
    'Ristorante I due Fratelli - Lungomare Cristoforo Colombo\n' +
    'Ristorante Da Silvana - Località Is Loddus\n' +
    'Pizzeria Dolly - Via della Rinascita, 26\n' +
    'Pizzeria La Gabbia dei Matti - Via Toscana, 8\n' +
    'Pizzeria Tavernetta Ipogeo - Piazza de Gasperi, 6\n' +
    'Pizzeria Birrificio Rubiu - Via Bologna\n' +
    'Pizzeria Ristorante Il Covo - Via XXIV Maggio, 36\n' +
    'Bar e colazioni',

  experiences:
    'Giornata al mare\n' +
    'Escursioni nella natura\n' +
    'Visita ai borghi\n' +
    'Gita in barca\n' +
    'Tramonto sul mare\n' +
    'Degustazione di prodotti locali',

  services:
    'Supermercati\n' +
    'Farmacie\n' +
    'Distributori\n' +
    'Bancomat\n' +
    'Negozi\n' +
    'Lavanderie',

  transports:
    'Taxi\n' +
    'Autobus\n' +
    'Noleggio auto\n' +
    'Noleggio biciclette',

  emergencies: 'Numero unico di emergenza: 112',

  contacts:
    'HOST: SA DOMMU MEA\n' +
    'TELEFONO: +39 3491870078',

  reviews:
    '★★★★★\n' +
    'Un soggiorno speciale in una casa accogliente.\n\n' +
    '★★★★★\n' +
    'Tutto perfetto, torneremo sicuramente!',

  sardegna:
    'Spiagge da sogno\n' +
    'Montagne e natura\n' +
    'Borghi e tradizioni\n' +
    'Enogastronomia\n' +
    'Cultura e storia\n' +
    'Tramonti indimenticabili\n' +
    'Cala Lunga\n' +
    'Cala della Signora\n' +
    'Is Praneddas\n' +
    'Sotto Torre\n' +
    'Vacca e Vitello\n' +
    'Loc. Mercury',

  info:
    'Dove trovare le chiavi\n' +
    'Raccolta differenziata\n' +
    'Regole della casa\n' +
    'Pulizia\n' +
    'Biancheria\n' +
    'Regole sul fumo',

  messages: 'Comunica con il proprietario.',

  settings:
    'Lingua: Italiano\n' +
    'Notifiche: Attive',

  cenaSardaAttiva: 'true',

  cenaSardaTitolo: 'Cena Sarda',

  cenaSardaDescrizione:
    'Una serata speciale alla scoperta dei sapori, dei profumi e delle tradizioni della Sardegna.',

  cenaSardaMenu:
    'Antipasti tipici sardi\n' +
    'Primo piatto tradizionale\n' +
    'Secondo piatto\n' +
    'Dolce sardo\n' +
    'Vino e acqua',

  cenaSardaPrezzo: '',

  cenaSardaGiorni: 'Su prenotazione',

  cenaSardaContatto: 'Parlane con Michele',
};

const splitLines = (value: string): string[] => {
  return String(value || '')
    .split('\n')
    .map((item) => item.trim())
    .filter(Boolean);
};

export default function HomeScreen() {
  const [section, setSection] = useState<Section>('home');
  const [favorites, setFavorites] = useState<string[]>([]);
  const [data, setData] = useState<AppData>(defaultData);

  useEffect(() => {
    const loadData = async () => {
      try {
        const savedData = await AsyncStorage.getItem('sa_dommu_mea_data');

        if (!savedData) {
          return;
        }

        const parsed = JSON.parse(savedData);

        if (parsed && typeof parsed === 'object') {
          setData({
            ...defaultData,
            ...parsed,
          });
        }
      } catch (error) {
        console.log('Errore caricamento dati:', error);
      }
    };

    loadData();
  }, []);

  const toggleFavorite = (name: string) => {
    setFavorites((current) =>
      current.includes(name)
        ? current.filter((item) => item !== name)
        : [...current, name]
    );
  };

  const openPhone = () => {
    const phoneMatch = data.contacts.match(
      /(?:TELEFONO|TEL|PHONE)\s*:\s*(.*)/i
    );

    const phone = phoneMatch?.[1]?.trim() || '+39 3491870078';

    Linking.openURL(`tel:${phone.replace(/\s/g, '')}`);
  };

  const openMaps = () => {
    Linking.openURL(
      "https://www.google.com/maps/search/?api=1&query=Sant%27Antioco%20Sardegna"
    );
  };

  const openReviewPage = () => {
    Linking.openURL(
      "https://www.google.com/maps/search/?api=1&query=SA%20DOMMU%20MEA%20Sant%27Antioco%20Sardegna"
    );
  };

  const restaurants = splitLines(data.restaurants);
  const experiences = splitLines(data.experiences);
  const services = splitLines(data.services);
  const transports = splitLines(data.transports);
  const sardegnaItems = splitLines(data.sardegna);
  const infoItems = splitLines(data.info);

  const menuItems: [string, string, Section][] = [
    ['📶', 'Wi-Fi', 'wifi'],
    ['🏠', 'La casa', 'casa'],
    ['📍', 'Posizione', 'posizione'],
    ['🍽️', 'Ristoranti', 'ristoranti'],
    ['✨', 'Esperienze', 'esperienze'],
    ['🛍️', 'Servizi', 'servizi'],
    ['🚗', 'Trasporti', 'trasporti'],
    ['🆘', 'Emergenze', 'emergenze'],
    ['📞', 'Contatti', 'contatti'],
    ['⭐', 'Recensioni', 'recensioni'],
  ];

  const Header = () => {
    const [adminTaps, setAdminTaps] = useState(0);

    const handleAdminTap = () => {
      const newCount = adminTaps + 1;

      if (newCount >= 5) {
        setAdminTaps(0);
        router.push('/admin-access');
        return;
      }

      setAdminTaps(newCount);

      setTimeout(() => {
        setAdminTaps(0);
      }, 2000);
    };

    return (
      <View style={styles.header}>
        <Pressable onPress={handleAdminTap}>
          <Text style={styles.smallTitle}>BENVENUTO</Text>

          <Text style={styles.logo}>SA DOMMU MEA</Text>
        </Pressable>

        <Pressable
          style={styles.headerHeart}
          onPress={() => setSection('preferiti')}
        >
          <Text style={styles.heartText}>
            {favorites.length > 0 ? '❤️' : '♡'}
          </Text>
        </Pressable>
      </View>
    );
  };

  const BackButton = () => (
    <Pressable
      style={styles.backButton}
      onPress={() => setSection('home')}
    >
      <Text style={styles.backText}>← Torna alla home</Text>
    </Pressable>
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
    <View>
      <BackButton />

      <View style={styles.pageHeader}>
        <Text style={styles.pageIcon}>{icon}</Text>

        <Text style={styles.pageTitle}>{title}</Text>

        <Text style={styles.pageSubtitle}>{text}</Text>
      </View>

      {children}
    </View>
  );

  const HomePage = () => (
    <View>
      <View style={styles.hero}>
        <Image
          source={require('../../assets/images/sant antioco.jpg')}
          style={styles.heroImage}
        />

        <Text style={styles.heroEmoji}>🏖️</Text>

        <Text style={styles.heroTitle}>
          Benvenuti a Sa Dommu Mea
        </Text>

        <Text style={styles.heroSubtitle}>
          {'La vostra guida digitale\n'}
          {'per vivere al meglio\n'}
          {'l’isola di Sant’Antioco'}
        </Text>
      </View>

      <View style={styles.checkRow}>
        <View style={styles.checkCard}>
          <Text style={styles.cardLabel}>CHECK-IN</Text>

          <Text style={styles.cardValue}>{data.checkIn}</Text>
        </View>

        <View style={styles.checkDivider} />

        <View style={styles.checkCard}>
          <Text style={styles.cardLabel}>CHECK-OUT</Text>

          <Text style={styles.cardValue}>{data.checkOut}</Text>
        </View>
      </View>

      <Text style={styles.sectionTitle}>
        Tutto quello che ti serve
      </Text>

      <View style={styles.grid}>
        {menuItems.map(([icon, title, value]) => (
          <Pressable
            key={value}
            style={styles.menuCard}
            onPress={() => setSection(value)}
          >
            <Text style={styles.menuIcon}>{icon}</Text>

            <Text style={styles.menuTitle}>{title}</Text>
          </Pressable>
        ))}
      </View>

      <Pressable
        style={styles.featureCard}
        onPress={() => setSection('sardegna')}
      >
        <Image
          source={require('../../assets/images/Su Portixeddu.jpg')}
          style={styles.featureImage}
        />

        <View style={styles.featureInfo}>
          <Text style={styles.largeTitle}>
            Scopri la Sardegna
          </Text>

          <Text style={styles.largeText}>
            Spiagge, borghi, natura ed esperienze da non perdere
          </Text>
        </View>
      </Pressable>

      <Pressable
        style={styles.featureCard}
        onPress={() => setSection('ristoranti')}
      >
        <View style={styles.featureEmojiBox}>
          <Text style={styles.largeEmoji}>🍽️</Text>
        </View>

        <View style={styles.featureInfo}>
          <Text style={styles.largeTitle}>
            Dove mangiare
          </Text>

          <Text style={styles.largeText}>
            I nostri suggerimenti per assaporare la cucina locale
          </Text>
        </View>
      </Pressable>

      {data.cenaSardaAttiva.toLowerCase() === 'true' && (
        <View style={styles.cenaSardaCard}>
          <Image
            source={require('../../assets/images/Maialino.jpg')}
            style={styles.cenaSardaImage}
          />

          <Text style={styles.cenaSardaBadge}>
            🍷 SU PRENOTAZIONE
          </Text>

          <Text style={styles.cenaSardaTitle}>
            {data.cenaSardaTitolo}
          </Text>

          <Text style={styles.cenaSardaDescription}>
            {data.cenaSardaDescrizione}
          </Text>

          <View style={styles.cenaSardaInfo}>
            <Text style={styles.cenaSardaLabel}>MENU</Text>

            {splitLines(data.cenaSardaMenu).map(
              (item, index) => (
                <Text
                  key={`${item}-${index}`}
                  style={styles.cenaSardaItem}
                >
                  • {item}
                </Text>
              )
            )}
          </View>

          {data.cenaSardaPrezzo.trim() !== '' && (
            <Text style={styles.cenaSardaPrice}>
              {data.cenaSardaPrezzo}
            </Text>
          )}

          <Text style={styles.cenaSardaAvailability}>
            📅 {data.cenaSardaGiorni}
          </Text>

          <Text style={styles.cenaSardaContact}>
            📞 {data.cenaSardaContatto}
          </Text>
        </View>
      )}
    </View>
  );

  const WifiPage = () => (
    <SimplePage
      icon="📶"
      title="Wi-Fi"
      text="Collegati alla rete della casa."
    >
      <View style={styles.infoCard}>
        <Text style={styles.infoLabel}>RETE WI-FI</Text>

        <Text style={styles.infoValue}>
          {data.wifiName}
        </Text>

        <Text style={styles.infoLabel}>PASSWORD</Text>

        <Text style={styles.infoValue}>
          {data.wifiPassword}
        </Text>
      </View>
    </SimplePage>
  );

  const CasaPage = () => (
    <SimplePage
      icon="🏠"
      title="La casa"
      text={data.description}
    >
      <Image
        source={require('../../assets/images/cucina.jpg')}
        style={styles.houseImageLarge}
      />

      <Image
        source={require('../../assets/images/cucina1.jpg')}
        style={styles.houseImageLarge}
      />

      <Image
        source={require('../../assets/images/camera matrimoniale.jpg')}
        style={styles.houseImageLarge}
      />

      <Image
        source={require('../../assets/images/camera matrimoniale1.jpg')}
        style={styles.houseImageLarge}
      />

      <Image
        source={require('../../assets/images/camera matrimoniale2.jpg')}
        style={styles.houseImageLarge}
      />

      <Image
        source={require('../../assets/images/camera.jpg')}
        style={styles.houseImageLarge}
      />

      <Image
        source={require('../../assets/images/camera1.jpg')}
        style={styles.houseImageLarge}
      />

      <Image
        source={require('../../assets/images/bagno.jpg')}
        style={styles.houseImageLarge}
      />

      <Image
        source={require('../../assets/images/bagno1.jpg')}
        style={styles.houseImageLarge}
      />

      <Image
        source={require('../../assets/images/porticato.jpg')}
        style={styles.houseImageLarge}
      />

      {[
        'Camera da letto matrimoniale',
        'Cameretta con letto a castello',
        'Bagno completo',
        'Cucina attrezzata',
        'Macchina del caffè',
        'Aria condizionata',
        'TV',
        'Lavatrice',
        'Wi-Fi',
        'Microonde',
      ].map((item) => (
        <View
          style={styles.listCard}
          key={item}
        >
          <Text style={styles.listText}>
            ✓ {item}
          </Text>
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
      <View style={styles.infoCard}>
        <Text style={styles.mapEmoji}>📍</Text>

        <Text style={styles.mapTitle}>
          La nostra posizione
        </Text>

        <Text style={styles.mapText}>
          Scopri dove si trova la casa e come muoverti nei dintorni.
        </Text>
      </View>

      <Pressable
        style={styles.primaryButton}
        onPress={openMaps}
      >
        <Text style={styles.primaryButtonText}>
          Apri Google Maps
        </Text>
      </Pressable>
    </SimplePage>
  );

  const RistorantiPage = () => (
    <SimplePage
      icon="🍽️"
      title="Ristoranti"
      text="Alcuni suggerimenti per mangiare bene."
    >
      {restaurants.map((restaurant) => (
        <Pressable
          key={restaurant}
          style={styles.listCard}
          onPress={() => toggleFavorite(restaurant)}
        >
          <Text style={styles.listText}>
            {restaurant}
          </Text>

          <Text style={styles.favoriteSmall}>
            {favorites.includes(restaurant)
              ? '❤️'
              : '🤍'}
          </Text>
        </Pressable>
      ))}
    </SimplePage>
  );

  const EsperienzePage = () => (
    <SimplePage
      icon="✨"
      title="Esperienze"
      text="Idee per scoprire il territorio."
    >
      {experiences.map((item) => (
        <Pressable
          key={item}
          style={styles.listCard}
          onPress={() => toggleFavorite(item)}
        >
          <Text style={styles.listText}>
            {item}
          </Text>

          <Text style={styles.favoriteSmall}>
            {favorites.includes(item)
              ? '❤️'
              : '🤍'}
          </Text>
        </Pressable>
      ))}
    </SimplePage>
  );

  const ServiziPage = () => (
    <SimplePage
      icon="🛍️"
      title="Negozi e servizi"
      text="Tutto ciò che può essere utile durante il soggiorno."
    >
      {services.map((item) => (
        <Pressable
          key={item}
          style={styles.listCard}
          onPress={() => toggleFavorite(item)}
        >
          <Text style={styles.listText}>
            {item}
          </Text>

          <Text style={styles.favoriteSmall}>
            {favorites.includes(item)
              ? '❤️'
              : '🤍'}
          </Text>
        </Pressable>
      ))}
    </SimplePage>
  );

  const TrasportiPage = () => (
    <SimplePage
      icon="🚗"
      title="Trasporti"
      text="Come spostarsi facilmente."
    >
      {transports.map((item) => (
        <Pressable
          key={item}
          style={styles.listCard}
          onPress={() => toggleFavorite(item)}
        >
          <Text style={styles.listText}>
            {item}
          </Text>

          <Text style={styles.favoriteSmall}>
            {favorites.includes(item)
              ? '❤️'
              : '🤍'}
          </Text>
        </Pressable>
      ))}
    </SimplePage>
  );

  const EmergenzePage = () => (
    <SimplePage
      icon="🆘"
      title="Emergenze"
      text={data.emergencies}
    >
      <Pressable
        style={styles.emergencyBig}
        onPress={() => Linking.openURL('tel:112')}
      >
        <Text style={styles.emergencyBigTitle}>
          112
        </Text>

        <Text style={styles.emergencyBigText}>
          Chiama il numero unico di emergenza
        </Text>
      </Pressable>
    </SimplePage>
  );

  const ContattiPage = () => (
    <SimplePage
      icon="📞"
      title="Contatti"
      text="Hai bisogno di assistenza?"
    >
      <View style={styles.infoCard}>
        {splitLines(data.contacts).map(
          (item, index) => (
            <Text
              key={`${item}-${index}`}
              style={
                item
                  .toUpperCase()
                  .includes('TELEFONO')
                  ? styles.infoValue
                  : styles.contactLine
              }
            >
              {item}
            </Text>
          )
        )}
      </View>

      <Pressable
        style={styles.primaryButton}
        onPress={openPhone}
      >
        <Text style={styles.primaryButtonText}>
          Chiama
        </Text>
      </Pressable>
    </SimplePage>
  );

  const RecensioniPage = () => {
    const reviewBlocks = data.reviews
      .split('\n\n')
      .map((item) => item.trim())
      .filter(Boolean);

    return (
      <SimplePage
        icon="⭐"
        title="Recensioni"
        text="La tua opinione è importante."
      >
        {reviewBlocks.map((review, index) => (
          <View
            style={styles.reviewCard}
            key={`${review}-${index}`}
          >
            <Text style={styles.reviewText}>
              {review}
            </Text>
          </View>
        ))}

        <View style={styles.reviewActionCard}>
          <Text style={styles.reviewActionTitle}>
            Hai soggiornato da noi?
          </Text>

          <Text style={styles.reviewActionText}>
            Ci farebbe piacere conoscere la tua esperienza.
          </Text>

          <Pressable
            style={styles.primaryButton}
            onPress={openReviewPage}
          >
            <Text style={styles.primaryButtonText}>
              ⭐ Lascia una recensione
            </Text>
          </Pressable>
        </View>
      </SimplePage>
    );
  };

  const SardegnaPage = () => (
    <SimplePage
      icon="🌍"
      title="Scopri la Sardegna"
      text="Il tuo punto di partenza per esplorare l'isola."
    >
      {sardegnaItems.map((item) => (
        <Pressable
          key={item}
          style={styles.listCard}
          onPress={() => toggleFavorite(item)}
        >
          <Text style={styles.listText}>
            {item}
          </Text>

          <Text style={styles.favoriteSmall}>
            {favorites.includes(item)
              ? '❤️'
              : '🤍'}
          </Text>
        </Pressable>
      ))}

      <View style={styles.sardegnaImages}>
        <Image
          source={require('../../assets/images/Su Portixeddu.jpg')}
          style={styles.sardegnaImageLarge}
        />

        <Image
          source={require('../../assets/images/Coe-Cuaddus.jpg')}
          style={styles.sardegnaImageLarge}
        />

        <Image
          source={require('../../assets/images/Maladroxia.jpg')}
          style={styles.sardegnaImageLarge}
        />

        <Image
          source={require('../../assets/images/Maladroxia1.jpg')}
          style={styles.sardegnaImageLarge}
        />

        <Image
          source={require('../../assets/images/Cala-Sapone.jpg')}
          style={styles.sardegnaImageLarge}
        />

        <Image
          source={require('../../assets/images/Cala-Sapone1.jpg')}
          style={styles.sardegnaImageLarge}
        />
      </View>
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
          <Text style={styles.emptyIcon}>
            🤍
          </Text>

          <Text style={styles.emptyTitle}>
            Nessun preferito
          </Text>

          <Text style={styles.emptyText}>
            Tocca il cuore vicino ai tuoi luoghi preferiti per salvarli qui.
          </Text>
        </View>
      ) : (
        favorites.map((item) => (
          <Pressable
            key={item}
            style={styles.listCard}
            onPress={() => toggleFavorite(item)}
          >
            <Text style={styles.listText}>
              {item}
            </Text>

            <Text style={styles.favoriteSmall}>
              ❤️
            </Text>
          </Pressable>
        ))
      )}
    </SimplePage>
  );

  const MessaggiPage = () => (
    <SimplePage
      icon="💬"
      title="Messaggi"
      text={data.messages}
    >
      <View style={styles.emptyCard}>
        <Text style={styles.emptyIcon}>
          💬
        </Text>

        <Text style={styles.emptyTitle}>
          Messaggi
        </Text>

        <Text style={styles.emptyText}>
          {data.messages}
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
      {infoItems.map((item) => (
        <View
          style={styles.listCard}
          key={item}
        >
          <Text style={styles.listText}>
            {item}
          </Text>
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
      {splitLines(data.settings).map((item) => (
        <View
          style={styles.listCard}
          key={item}
        >
          <Text style={styles.listText}>
            {item}
          </Text>
        </View>
      ))}

      <View style={styles.listCard}>
        <Text style={styles.listText}>
          ❤️ Preferiti
        </Text>

        <Text style={styles.settingValue}>
          {favorites.length}
        </Text>
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

      case 'home':
      default:
        return <HomePage />;
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

        <Pressable
          style={styles.adminButton}
          onPress={() => router.push('/admin-access')}
        >
          <Text style={styles.adminButtonText}>
            ⚙️ Area proprietario
          </Text>
        </Pressable>

        <View style={styles.footer}>
          <Text style={styles.footerLogo}>
            SA DOMMU MEA
          </Text>

          <Text style={styles.footerText}>
            {'La tua casa. La tua\n'}
            {'esperienza. La tua\n'}
            {'Sardegna.'}
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
    height: 48,
    width: 48,
    borderRadius: 24,
    backgroundColor: '#F7F3EC',
    alignItems: 'center',
    justifyContent: 'center',
  },

  heartText: {
    fontSize: 21,
  },

  hero: {
    backgroundColor: '#2F4638',
    borderRadius: 24,
    padding: 15,
    alignItems: 'center',
    marginBottom: 16,
  },

  heroImage: {
    width: '100%',
    height: 300,
    borderRadius: 18,
    marginBottom: 15,
  },

  heroEmoji: {
    fontSize: 38,
    marginBottom: 5,
  },

  heroTitle: {
    color: '#FFFFFF',
    fontSize: 30,
    fontWeight: '800',
    textAlign: 'center',
  },

  heroSubtitle: {
    color: '#F7F5E5',
    fontSize: 15,
    textAlign: 'center',
    lineHeight: 22,
    marginTop: 8,
    paddingHorizontal: 10,
  },

  checkRow: {
    flexDirection: 'row',
    alignItems: 'stretch',
    marginBottom: 16,
  },

  checkCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 18,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 2,
  },

  checkDivider: {
    width: 10,
  },

  cardLabel: {
    color: '#8B7A62',
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 1,
  },

  cardValue: {
    fontSize: 20,
    fontWeight: '800',
    color: '#2F4638',
    marginTop: 5,
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

  featureCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    overflow: 'hidden',
    marginBottom: 12,
  },

  featureImage: {
    width: '100%',
    height: 190,
  },

  featureEmojiBox: {
    width: '100%',
    height: 130,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F7F3EC',
  },

  largeEmoji: {
    fontSize: 42,
  },

  featureInfo: {
    padding: 18,
  },

  largeTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#2F4638',
  },

  largeText: {
    color: '#777064',
    fontSize: 14,
    lineHeight: 20,
    marginTop: 5,
  },

  cenaSardaCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 22,
    padding: 15,
    marginTop: 4,
    marginBottom: 15,
    overflow: 'hidden',
  },

  cenaSardaImage: {
    width: '100%',
    height: 350,
    borderRadius: 17,
    marginBottom: 15,
  },

  cenaSardaBadge: {
    color: '#8B7A62',
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 1,
    marginBottom: 6,
  },

  cenaSardaTitle: {
    color: '#2F4638',
    fontSize: 25,
    fontWeight: '900',
    marginBottom: 8,
  },

  cenaSardaDescription: {
    color: '#777064',
    fontSize: 14,
    lineHeight: 21,
    marginBottom: 15,
  },

  cenaSardaInfo: {
    backgroundColor: '#F7F3EC',
    borderRadius: 15,
    padding: 15,
    marginBottom: 14,
  },

  cenaSardaLabel: {
    color: '#8B7A62',
    fontSize: 10,
    fontWeight: '900',
    letterSpacing: 1,
    marginBottom: 8,
  },

  cenaSardaItem: {
    color: '#2F4638',
    fontSize: 14,
    lineHeight: 22,
  },

  cenaSardaPrice: {
    color: '#2F4638',
    fontSize: 18,
    fontWeight: '900',
    marginBottom: 8,
  },

  cenaSardaAvailability: {
    color: '#777064',
    fontSize: 14,
    marginBottom: 6,
  },

  cenaSardaContact: {
    color: '#2F4638',
    fontSize: 14,
    fontWeight: '800',
  },

  backButton: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingVertical: 11,
    paddingHorizontal: 15,
    alignSelf: 'flex-start',
    marginBottom: 18,
  },

  backText: {
    color: '#2F4638',
    fontWeight: '700',
  },

  pageHeader: {
    marginBottom: 18,
  },

  pageIcon: {
    fontSize: 42,
    marginBottom: 6,
  },

  pageTitle: {
    fontSize: 29,
    fontWeight: '900',
    color: '#2F4638',
  },

  pageSubtitle: {
    color: '#777064',
    fontSize: 15,
    lineHeight: 22,
    marginTop: 7,
  },

  infoCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 22,
    marginBottom: 15,
  },

  infoLabel: {
    color: '#8B7A62',
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 1,
    marginTop: 5,
  },

  infoValue: {
    color: '#2F4638',
    fontSize: 19,
    fontWeight: '800',
    marginTop: 5,
    marginBottom: 15,
  },

  contactLine: {
    color: '#2F4638',
    fontSize: 17,
    fontWeight: '700',
    marginBottom: 10,
  },

  primaryButton: {
    backgroundColor: '#2F4638',
    borderRadius: 15,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 15,
  },

  primaryButtonText: {
    color: '#FFFFFF',
    fontWeight: '800',
    fontSize: 15,
  },

  houseImageLarge: {
    width: '100%',
    height: 360,
    borderRadius: 18,
    marginBottom: 15,
  },

  listCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 17,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  listText: {
    color: '#2F4638',
    fontSize: 15,
    fontWeight: '600',
    lineHeight: 21,
    flex: 1,
    paddingRight: 10,
  },

  favoriteSmall: {
    fontSize: 22,
  },

  mapEmoji: {
    fontSize: 45,
    marginBottom: 10,
  },

  mapTitle: {
    color: '#2F4638',
    fontSize: 20,
    fontWeight: '800',
    marginBottom: 8,
  },

  mapText: {
    color: '#777064',
    fontSize: 14,
    lineHeight: 21,
  },

  emergencyBig: {
    backgroundColor: '#A35CAF',
    borderRadius: 20,
    padding: 24,
    alignItems: 'center',
    marginTop: 5,
    marginBottom: 15,
  },

  emergencyBigTitle: {
    fontSize: 36,
    color: '#FFFFFF',
    fontWeight: '900',
  },

  emergencyBigText: {
    color: '#FFFFFF',
    fontSize: 14,
    marginTop: 4,
    textAlign: 'center',
  },

  reviewCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 25,
    marginBottom: 14,
  },

  reviewText: {
    color: '#2F4638',
    fontSize: 17,
    fontWeight: '700',
    lineHeight: 25,
  },

  reviewActionCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 22,
    marginBottom: 15,
  },

  reviewActionTitle: {
    color: '#2F4638',
    fontSize: 20,
    fontWeight: '900',
    marginBottom: 7,
  },

  reviewActionText: {
    color: '#777064',
    fontSize: 14,
    lineHeight: 21,
    marginBottom: 15,
  },

  sardegnaImages: {
    marginTop: 8,
  },

  sardegnaImageLarge: {
    width: '100%',
    height: 280,
    borderRadius: 18,
    marginBottom: 14,
  },

  emptyCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 30,
    padding: 30,
    alignItems: 'center',
    marginTop: 10,
  },

  emptyIcon: {
    fontSize: 48,
    marginBottom: 10,
  },

  emptyTitle: {
    fontSize: 21,
    fontWeight: '800',
    color: '#2F4638',
    marginBottom: 10,
  },

  emptyText: {
    color: '#777064',
    textAlign: 'center',
    lineHeight: 20,
  },

  settingValue: {
    color: '#8B7A62',
    fontWeight: '700',
    marginLeft: 10,
  },

  adminButton: {
    marginTop: 20,
    marginBottom: 20,
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#2F4638',
    alignItems: 'center',
  },

  adminButtonText: {
    color: '#2F4638',
    fontSize: 14,
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
    marginTop: 5,
    textAlign: 'center',
  },
}); 
