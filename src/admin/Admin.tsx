
import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  Alert,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { supabase } from '../../lib/supabase';

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

const STORAGE_KEY = 'sa_dommu_mea_data';

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

  settings: 'Lingua: Italiano\n' + 'Notifiche: Attive',

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

type FieldProps = {
  label: string;
  field: keyof AppData;
  value: string;
  multiline?: boolean;
  onChange: (field: keyof AppData, value: string) => void;
};

function Field({
  label,
  field,
  value,
  multiline = false,
  onChange,
}: FieldProps) {
  return (
    <View style={styles.fieldContainer}>
      <Text style={styles.label}>{label}</Text>

      <TextInput
        value={value}
        onChangeText={(text) => onChange(field, text)}
        multiline={multiline}
        style={[styles.input, multiline && styles.textarea]}
        placeholder={label}
        placeholderTextColor="#999"
        textAlignVertical={multiline ? 'top' : 'center'}
        autoCorrect={false}
      />
    </View>
  );
}

export default function Admin() {
  const [data, setData] = useState<AppData>(defaultData);

  const [saving, setSaving] = useState(false);
  const [loaded, setLoaded] = useState(false);

  const [sessionChecked, setSessionChecked] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loggingIn, setLoggingIn] = useState(false);

  useEffect(() => {
    checkSession();
  }, []);

  const checkSession = async () => {
    try {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (session) {
        setLoggedIn(true);
        await loadData();
      } else {
        setLoggedIn(false);
      }
    } catch (error) {
      console.log('Errore controllo sessione:', error);
      setLoggedIn(false);
    } finally {
      setSessionChecked(true);
      setLoaded(true);
    }
  };

  const login = async () => {
    if (!email.trim() || !password) {
      Alert.alert(
        'Dati mancanti',
        'Inserisci email e password per accedere.'
      );
      return;
    }

    try {
      setLoggingIn(true);

      const { data: authData, error } =
        await supabase.auth.signInWithPassword({
          email: email.trim(),
          password,
        });

      if (error) {
        console.log('Errore login:', error);

        Alert.alert(
          'Accesso non riuscito',
          'Email o password non corrette.'
        );

        return;
      }

      if (!authData.session) {
        Alert.alert(
          'Accesso non riuscito',
          'Non è stato possibile creare la sessione.'
        );

        return;
      }

      setLoggedIn(true);
      setPassword('');

      await loadData();
    } catch (error) {
      console.log('Errore accesso:', error);

      Alert.alert(
        'Errore',
        'Non è stato possibile effettuare l’accesso.'
      );
    } finally {
      setLoggingIn(false);
    }
  };

  const logout = async () => {
    try {
      await supabase.auth.signOut();

      setLoggedIn(false);
      setEmail('');
      setPassword('');
    } catch (error) {
      console.log('Errore logout:', error);
    }
  };

  const loadData = async () => {
    try {
      const { data: remoteData, error } = await supabase
        .from('sa_dommu_mea_data')
        .select('*')
        .eq('id', 1)
        .maybeSingle();

      if (error) {
        console.log('Errore caricamento Supabase:', error);
      }

      if (remoteData) {
        const convertedData: AppData = {
          ...defaultData,

          wifiName: remoteData.wifi_name ?? defaultData.wifiName,
          wifiPassword:
            remoteData.wifi_password ?? defaultData.wifiPassword,

          checkIn: remoteData.check_in ?? defaultData.checkIn,
          checkOut: remoteData.check_out ?? defaultData.checkOut,

          description:
            remoteData.description ?? defaultData.description,

          photos: remoteData.photos ?? defaultData.photos,

          restaurants:
            remoteData.restaurants ?? defaultData.restaurants,

          experiences:
            remoteData.experiences ?? defaultData.experiences,

          services:
            remoteData.services ?? defaultData.services,

          transports:
            remoteData.transports ?? defaultData.transports,

          emergencies:
            remoteData.emergencies ?? defaultData.emergencies,

          contacts:
            remoteData.contacts ?? defaultData.contacts,

          reviews:
            remoteData.reviews ?? defaultData.reviews,

          sardegna:
            remoteData.sardegna ?? defaultData.sardegna,

          info: remoteData.info ?? defaultData.info,

          messages:
            remoteData.messages ?? defaultData.messages,

          settings:
            remoteData.settings ?? defaultData.settings,

          cenaSardaAttiva:
            remoteData.cena_sarda_attiva ??
            defaultData.cenaSardaAttiva,

          cenaSardaTitolo:
            remoteData.cena_sarda_titolo ??
            defaultData.cenaSardaTitolo,

          cenaSardaDescrizione:
            remoteData.cena_sarda_descrizione ??
            defaultData.cenaSardaDescrizione,

          cenaSardaMenu:
            remoteData.cena_sarda_menu ??
            defaultData.cenaSardaMenu,

          cenaSardaPrezzo:
            remoteData.cena_sarda_prezzo ??
            defaultData.cenaSardaPrezzo,

          cenaSardaGiorni:
            remoteData.cena_sarda_giorni ??
            defaultData.cenaSardaGiorni,

          cenaSardaContatto:
            remoteData.cena_sarda_contatto ??
            defaultData.cenaSardaContatto,
        };

        setData(convertedData);

        await AsyncStorage.setItem(
          STORAGE_KEY,
          JSON.stringify(convertedData)
        );

        return;
      }

      const saved = await AsyncStorage.getItem(STORAGE_KEY);

      if (saved) {
        const parsed = JSON.parse(saved);

        setData({
          ...defaultData,
          ...(parsed && typeof parsed === 'object' ? parsed : {}),
        });
      } else {
        setData(defaultData);
      }
    } catch (error) {
      console.log('Errore caricamento dati:', error);

      try {
        const saved = await AsyncStorage.getItem(STORAGE_KEY);

        if (saved) {
          const parsed = JSON.parse(saved);

          setData({
            ...defaultData,
            ...(parsed && typeof parsed === 'object' ? parsed : {}),
          });
        } else {
          setData(defaultData);
        }
      } catch {
        setData(defaultData);
      }
    } finally {
      setLoaded(true);
    }
  };

  const updateField = (
    field: keyof AppData,
    value: string
  ) => {
    setData((current) => ({
      ...current,
      [field]: value,
    }));
  };

  const saveData = async () => {
    try {
      setSaving(true);

      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) {
        setLoggedIn(false);

        Alert.alert(
          'Sessione scaduta',
          'Effettua nuovamente l’accesso.'
        );

        return;
      }

      const { error } = await supabase
        .from('sa_dommu_mea_data')
        .update({
          wifi_name: data.wifiName,
          wifi_password: data.wifiPassword,
          check_in: data.checkIn,
          check_out: data.checkOut,
          description: data.description,
          photos: data.photos,
          restaurants: data.restaurants,
          experiences: data.experiences,
          services: data.services,
          transports: data.transports,
          emergencies: data.emergencies,
          contacts: data.contacts,
          reviews: data.reviews,
          sardegna: data.sardegna,
          info: data.info,
          messages: data.messages,
          settings: data.settings,

          cena_sarda_attiva: data.cenaSardaAttiva,
          cena_sarda_titolo: data.cenaSardaTitolo,
          cena_sarda_descrizione:
            data.cenaSardaDescrizione,
          cena_sarda_menu: data.cenaSardaMenu,
          cena_sarda_prezzo: data.cenaSardaPrezzo,
          cena_sarda_giorni: data.cenaSardaGiorni,
          cena_sarda_contatto: data.cenaSardaContatto,

          updated_at: new Date().toISOString(),
        })
        .eq('id', 1);

      if (error) {
        console.log('Errore salvataggio Supabase:', error);

        Alert.alert(
          'Errore salvataggio',
          'Supabase non ha accettato la modifica.\n\n' +
            error.message
        );

        return;
      }

      await AsyncStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(data)
      );

      Alert.alert(
        'Salvataggio completato',
        'Le modifiche sono state salvate online su Supabase.'
      );
    } catch (error) {
      console.log('Errore salvataggio:', error);

      Alert.alert(
        'Errore',
        'Non è stato possibile salvare le modifiche.'
      );
    } finally {
      setSaving(false);
    }
  };

  const resetData = () => {
    Alert.alert(
      'Ripristina dati',
      'Vuoi davvero ripristinare tutti i contenuti iniziali? Le modifiche attuali verranno cancellate.',
      [
        {
          text: 'Annulla',
          style: 'cancel',
        },
        {
          text: 'Ripristina',
          style: 'destructive',
          onPress: async () => {
            try {
              setSaving(true);

              const {
                data: { session },
              } = await supabase.auth.getSession();

              if (!session) {
                setLoggedIn(false);

                Alert.alert(
                  'Sessione scaduta',
                  'Effettua nuovamente l’accesso.'
                );

                return;
              }

              const { error } = await supabase
                .from('sa_dommu_mea_data')
                .update({
                  wifi_name: defaultData.wifiName,
                  wifi_password: defaultData.wifiPassword,
                  check_in: defaultData.checkIn,
                  check_out: defaultData.checkOut,
                  description: defaultData.description,
                  photos: defaultData.photos,
                  restaurants: defaultData.restaurants,
                  experiences: defaultData.experiences,
                  services: defaultData.services,
                  transports: defaultData.transports,
                  emergencies: defaultData.emergencies,
                  contacts: defaultData.contacts,
                  reviews: defaultData.reviews,
                  sardegna: defaultData.sardegna,
                  info: defaultData.info,
                  messages: defaultData.messages,
                  settings: defaultData.settings,

                  cena_sarda_attiva:
                    defaultData.cenaSardaAttiva,
                  cena_sarda_titolo:
                    defaultData.cenaSardaTitolo,
                  cena_sarda_descrizione:
                    defaultData.cenaSardaDescrizione,
                  cena_sarda_menu:
                    defaultData.cenaSardaMenu,
                  cena_sarda_prezzo:
                    defaultData.cenaSardaPrezzo,
                  cena_sarda_giorni:
                    defaultData.cenaSardaGiorni,
                  cena_sarda_contatto:
                    defaultData.cenaSardaContatto,

                  updated_at: new Date().toISOString(),
                })
                .eq('id', 1);

              if (error) {
                console.log(
                  'Errore ripristino Supabase:',
                  error
                );

                Alert.alert(
                  'Errore',
                  'Non è stato possibile ripristinare i dati online.\n\n' +
                    error.message
                );

                return;
              }

              setData(defaultData);

              await AsyncStorage.setItem(
                STORAGE_KEY,
                JSON.stringify(defaultData)
              );

              Alert.alert(
                'Dati ripristinati',
                'I contenuti iniziali sono stati ripristinati anche online.'
              );
            } catch (error) {
              console.log(
                'Errore ripristino dati:',
                error
              );

              Alert.alert(
                'Errore',
                'Non è stato possibile ripristinare i dati.'
              );
            } finally {
              setSaving(false);
            }
          },
        },
      ]
    );
  };

  if (!sessionChecked) {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar style="dark" />

        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>
            Verifica accesso proprietario...
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  if (!loggedIn) {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar style="dark" />

        <ScrollView
          contentContainerStyle={styles.loginContent}
          keyboardShouldPersistTaps="handled"
        >
          <Text style={styles.kicker}>
            AREA PROPRIETARIO
          </Text>

          <Text style={styles.title}>
            SA DOMMU MEA
          </Text>

          <Text style={styles.subtitle}>
            Accedi per gestire i contenuti della casa.
          </Text>

          <View style={styles.loginCard}>
            <Text style={styles.sectionTitle}>
              🔐 Accesso proprietario
            </Text>

            <View style={styles.fieldContainer}>
              <Text style={styles.label}>
                Email
              </Text>

              <TextInput
                value={email}
                onChangeText={setEmail}
                style={styles.input}
                placeholder="La tua email"
                placeholderTextColor="#999"
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
              />
            </View>

            <View style={styles.fieldContainer}>
              <Text style={styles.label}>
                Password
              </Text>

              <TextInput
                value={password}
                onChangeText={setPassword}
                style={styles.input}
                placeholder="La tua password"
                placeholderTextColor="#999"
                secureTextEntry
                autoCapitalize="none"
                autoCorrect={false}
              />
            </View>

            <Pressable
              style={[
                styles.saveButton,
                loggingIn && styles.disabledButton,
              ]}
              onPress={login}
              disabled={loggingIn}
            >
              <Text style={styles.saveButtonText}>
                {loggingIn
                  ? '⏳ ACCESSO...'
                  : '🔐 ACCEDI'}
              </Text>
            </Pressable>
          </View>

          <Text style={styles.loginFooter}>
            SA DOMMU MEA • Accesso riservato al proprietario
          </Text>
        </ScrollView>
      </SafeAreaView>
    );
  }

  if (!loaded) {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar style="dark" />

        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>
            Caricamento area proprietario...
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />

      <ScrollView
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.topBar}>
          <View>
            <Text style={styles.kicker}>
              AREA PROPRIETARIO
            </Text>

            <Text style={styles.title}>
              SA DOMMU MEA
            </Text>

            <Text style={styles.subtitle}>
              Gestisci i contenuti della tua casa.
            </Text>
          </View>

          <Pressable
            style={styles.logoutButton}
            onPress={logout}
            disabled={saving}
          >
            <Text style={styles.logoutText}>
              Esci
            </Text>
          </Pressable>
        </View>

        {/* CHECK-IN / CHECK-OUT */}

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            ⏰ Check-in / Check-out
          </Text>

          <Field
            label="Orario check-in"
            field="checkIn"
            value={data.checkIn}
            onChange={updateField}
          />

          <Field
            label="Orario check-out"
            field="checkOut"
            value={data.checkOut}
            onChange={updateField}
          />
        </View>

        {/* WI-FI */}

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            📶 Wi-Fi
          </Text>

          <Field
            label="Nome rete Wi-Fi"
            field="wifiName"
            value={data.wifiName}
            onChange={updateField}
          />

          <Field
            label="Password Wi-Fi"
            field="wifiPassword"
            value={data.wifiPassword}
            onChange={updateField}
          />
        </View>

        {/* CASA */}

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            🏠 La casa
          </Text>

          <Field
            label="Descrizione della casa"
            field="description"
            value={data.description}
            multiline
            onChange={updateField}
          />
        </View>

        {/* RISTORANTI */}

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            🍽️ Ristoranti
          </Text>

          <Text style={styles.helper}>
            Inserisci un ristorante per riga.
          </Text>

          <Field
            label="Ristoranti"
            field="restaurants"
            value={data.restaurants}
            multiline
            onChange={updateField}
          />
        </View>

        {/* ESPERIENZE */}

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            ✨ Esperienze
          </Text>

          <Field
            label="Esperienze"
            field="experiences"
            value={data.experiences}
            multiline
            onChange={updateField}
          />
        </View>

        {/* SERVIZI */}

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            🛍️ Servizi
          </Text>

          <Field
            label="Servizi"
            field="services"
            value={data.services}
            multiline
            onChange={updateField}
          />
        </View>

        {/* TRASPORTI */}

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            🚗 Trasporti
          </Text>

          <Field
            label="Trasporti"
            field="transports"
            value={data.transports}
            multiline
            onChange={updateField}
          />
        </View>

        {/* EMERGENZE */}

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            🆘 Emergenze
          </Text>

          <Field
            label="Emergenze"
            field="emergencies"
            value={data.emergencies}
            multiline
            onChange={updateField}
          />
        </View>

        {/* CONTATTI */}

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            📞 Contatti
          </Text>

          <Field
            label="Contatti"
            field="contacts"
            value={data.contacts}
            multiline
            onChange={updateField}
          />
        </View>

        {/* RECENSIONI */}

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            ⭐ Recensioni
          </Text>

          <Field
            label="Recensioni"
            field="reviews"
            value={data.reviews}
            multiline
            onChange={updateField}
          />
        </View>

        {/* SARDEGNA */}

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            🌍 Scopri la Sardegna
          </Text>

          <Field
            label="Sardegna"
            field="sardegna"
            value={data.sardegna}
            multiline
            onChange={updateField}
          />
        </View>

        {/* INFO */}

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            ℹ️ Informazioni utili
          </Text>

          <Field
            label="Informazioni"
            field="info"
            value={data.info}
            multiline
            onChange={updateField}
          />
        </View>

        {/* MESSAGGI */}

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            💬 Messaggi
          </Text>

          <Field
            label="Messaggi"
            field="messages"
            value={data.messages}
            multiline
            onChange={updateField}
          />
        </View>

        {/* IMPOSTAZIONI */}

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            ⚙️ Impostazioni
          </Text>

          <Field
            label="Impostazioni"
            field="settings"
            value={data.settings}
            multiline
            onChange={updateField}
          />
        </View>

        {/* CENA SARDA */}

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            🍷 Cena Sarda su prenotazione
          </Text>

          <Text style={styles.helper}>
            Gestisci l'offerta della cena sarda
            direttamente dall'area proprietario.
          </Text>

          <Field
            label="Cena attiva (true / false)"
            field="cenaSardaAttiva"
            value={data.cenaSardaAttiva}
            onChange={updateField}
          />

          <Field
            label="Titolo"
            field="cenaSardaTitolo"
            value={data.cenaSardaTitolo}
            onChange={updateField}
          />

          <Field
            label="Descrizione"
            field="cenaSardaDescrizione"
            value={data.cenaSardaDescrizione}
            multiline
            onChange={updateField}
          />

          <Field
            label="Menu della cena"
            field="cenaSardaMenu"
            value={data.cenaSardaMenu}
            multiline
            onChange={updateField}
          />

          <Field
            label="Prezzo per persona"
            field="cenaSardaPrezzo"
            value={data.cenaSardaPrezzo}
            onChange={updateField}
          />

          <Field
            label="Disponibilità"
            field="cenaSardaGiorni"
            value={data.cenaSardaGiorni}
            onChange={updateField}
          />

          <Field
            label="Contatto"
            field="cenaSardaContatto"
            value={data.cenaSardaContatto}
            onChange={updateField}
          />
        </View>

        {/* FOTOGRAFIE */}

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            📷 Fotografie
          </Text>

          <Text style={styles.helper}>
            Le fotografie della casa e della Sardegna
            sono inserite direttamente nell'applicazione.
          </Text>

          <View style={styles.photoInfo}>
            <Text style={styles.photoInfoIcon}>
              🖼️
            </Text>

            <Text style={styles.photoInfoText}>
              Le fotografie non vengono modificate
              dall'area proprietario.
              {'\n\n'}
              Rimangono quelle inserite nel progetto
              dell'app.
            </Text>
          </View>
        </View>

        {/* SALVA */}

        <Pressable
          style={[
            styles.saveButton,
            saving && styles.disabledButton,
          ]}
          onPress={saveData}
          disabled={saving}
        >
          <Text style={styles.saveButtonText}>
            {saving
              ? '⏳ Salvataggio...'
              : '💾 SALVA TUTTE LE MODIFICHE'}
          </Text>
        </Pressable>

        {/* RIPRISTINA */}

        <Pressable
          style={styles.resetButton}
          onPress={resetData}
          disabled={saving}
        >
          <Text style={styles.resetButtonText}>
            ↩️ RIPRISTINA DATI INIZIALI
          </Text>
        </Pressable>

        <Text style={styles.footer}>
          SA DOMMU MEA • Area proprietario
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F3EC',
  },

  content: {
    padding: 20,
    paddingBottom: 60,
  },

  loginContent: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 24,
    paddingBottom: 60,
  },

  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 30,
  },

  loadingText: {
    color: '#2F4638',
    fontSize: 16,
    fontWeight: '700',
    textAlign: 'center',
  },

  kicker: {
    color: '#8B7A62',
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 2,
    marginTop: 10,
  },

  title: {
    color: '#2F4638',
    fontSize: 30,
    fontWeight: '900',
    marginTop: 4,
  },

  subtitle: {
    color: '#777064',
    fontSize: 15,
    marginTop: 6,
    marginBottom: 22,
  },

  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 5,
  },

  loginCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 22,
    padding: 20,
    marginTop: 10,
  },

  section: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 18,
    marginBottom: 16,
  },

  sectionTitle: {
    color: '#2F4638',
    fontSize: 19,
    fontWeight: '800',
    marginBottom: 15,
  },

  fieldContainer: {
    marginBottom: 14,
  },

  label: {
    color: '#8B7A62',
    fontSize: 12,
    fontWeight: '800',
    marginBottom: 7,
  },

  input: {
    backgroundColor: '#F7F3EC',
    borderRadius: 13,
    borderWidth: 1,
    borderColor: '#E5DED2',
    paddingHorizontal: 14,
    paddingVertical: 13,
    color: '#2F4638',
    fontSize: 15,
    minHeight: 48,
  },

  textarea: {
    minHeight: 120,
    textAlignVertical: 'top',
  },

  helper: {
    color: '#777064',
    fontSize: 13,
    lineHeight: 19,
    marginBottom: 12,
  },

  photoInfo: {
    backgroundColor: '#F7F3EC',
    borderRadius: 15,
    padding: 18,
    flexDirection: 'row',
    alignItems: 'center',
  },

  photoInfoIcon: {
    fontSize: 40,
    marginRight: 15,
  },

  photoInfoText: {
    flex: 1,
    color: '#777064',
    fontSize: 14,
    lineHeight: 21,
  },

  saveButton: {
    backgroundColor: '#2F4638',
    borderRadius: 17,
    paddingVertical: 18,
    alignItems: 'center',
    marginTop: 5,
  },

  disabledButton: {
    opacity: 0.6,
  },

  saveButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '900',
  },

  resetButton: {
    backgroundColor: '#FFFFFF',
    borderRadius: 17,
    borderWidth: 1,
    borderColor: '#D8CFC1',
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 12,
  },

  resetButtonText: {
    color: '#8B7A62',
    fontSize: 14,
    fontWeight: '900',
  },

  logoutButton: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#D8CFC1',
    paddingHorizontal: 14,
    paddingVertical: 9,
    marginTop: 12,
  },

  logoutText: {
    color: '#8B7A62',
    fontSize: 13,
    fontWeight: '800',
  },

  loginFooter: {
    textAlign: 'center',
    color: '#8B7A62',
    fontSize: 12,
    marginTop: 25,
  },

  footer: {
    textAlign: 'center',
    color: '#8B7A62',
    fontSize: 12,
    marginTop: 30,
  },
});
