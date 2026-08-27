
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
    'Ristorante La Luna nel Pozzo - Maladroxia\nRistorante Il Cavaliere del Fuoco - Viale Trieste, 41\nRistorante La Rosa dei Venti - Via Roma, 17\nRistorante SeZiro - Viale Giosuè Carducci\nRistorante I due Fratelli - Lungomare Cristoforo Colombo\nRistorante Da Silvana - Località Is Loddus\nPizzeria Dolly - Via della Rinascita, 26\nPizzeria La Gabbia dei Matti - Via Toscana, 8\nPizzeria Tavernetta Ipogeo - Piazza de Gasperi, 6\nPizzeria Birrificio Rubiu - Via Bologna\nPizzeria Ristorante Il Covo - Via XXIV Maggio, 36\nBar e colazioni',

  experiences:
    'Giornata al mare\nEscursioni nella natura\nVisita ai borghi\nGita in barca\nTramonto sul mare\nDegustazione di prodotti locali',

  services:
    'Supermercati\nFarmacie\nDistributori\nBancomat\nNegozi\nLavanderie',

  transports:
    'Taxi\nAutobus\nNoleggio auto\nNoleggio biciclette',

  emergencies:
    'Numero unico di emergenza: 112',

  contacts:
    'HOST: SA DOMMU MEA\nTELEFONO: +39 3491870078',

  reviews:
    '★★★★★\nUn soggiorno speciale in una casa accogliente.\n\n★★★★★\nTutto perfetto, torneremo sicuramente!',

  sardegna:
    'Spiagge da sogno\nMontagne e natura\nBorghi e tradizioni\nEnogastronomia\nCultura e storia\nTramonti indimenticabili\nCala Lunga\nCala della Signora\nIs Praneddas\nSotto Torre\nVacca e Vitello\nLoc. Mercury',

  info:
    'Dove trovare le chiavi\nRaccolta differenziata\nRegole della casa\nPulizia\nBiancheria\nRegole sul fumo',

  messages:
    'Comunica con il proprietario.',

  settings:
    'Lingua: Italiano\nNotifiche: Attive',

  cenaSardaAttiva: 'true',

  cenaSardaTitolo:
    'Cena Sarda',

  cenaSardaDescrizione:
    'Una serata speciale alla scoperta dei sapori, dei profumi e delle tradizioni della Sardegna.',

  cenaSardaMenu:
    'Antipasti tipici sardi\nPrimo piatto tradizionale\nSecondo piatto\nDolce sardo\nVino e acqua',

  cenaSardaPrezzo: '',

  cenaSardaGiorni:
    'Su prenotazione',

  cenaSardaContatto:
    'Parlane con Michele',
};


/*
* IMPORTANTE:
* Field è fuori da Admin.
*
* In questo modo il campo NON viene ricreato
* ad ogni carattere digitato.
*
* Questo risolve il problema:
* "scrivo una lettera e il cursore esce dal campo".
*/

type FieldProps = {
  label: string;
  field: keyof AppData;
  value: string;
  multiline?: boolean;
  onChange: (
    field: keyof AppData,
    value: string
  ) => void;
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
      <Text style={styles.label}>
        {label}
      </Text>

      <TextInput
        value={value}
        onChangeText={(text) =>
          onChange(field, text)
        }
        multiline={multiline}
        style={[
          styles.input,
          multiline && styles.textarea,
        ]}
        placeholder={label}
        placeholderTextColor="#999"
        textAlignVertical={
          multiline ? 'top' : 'center'
        }
      />
    </View>
  );
}


export default function Admin() {
  const [data, setData] =
    useState<AppData>(defaultData);

  const [saving, setSaving] =
    useState(false);

  useEffect(() => {
    loadData();
  }, []);


  const loadData = async () => {
    try {
      const saved =
        await AsyncStorage.getItem(
          STORAGE_KEY
        );

      if (saved) {
        const parsed =
          JSON.parse(saved);

        setData({
          ...defaultData,
          ...parsed,
        });
      }
    } catch (error) {
      console.log(
        'Errore caricamento dati:',
        error
      );
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

      await AsyncStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(data)
      );

      Alert.alert(
        'Salvataggio completato',
        'Le modifiche sono state salvate correttamente.'
      );

    } catch (error) {

      console.log(
        'Errore salvataggio:',
        error
      );

      Alert.alert(
        'Errore',
        'Non è stato possibile salvare le modifiche.'
      );

    } finally {
      setSaving(false);
    }
  };


  return (
    <SafeAreaView
      style={styles.container}
    >
      <StatusBar style="dark" />

      <ScrollView
        contentContainerStyle={
          styles.content
        }
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={
          false
        }
      >

        <Text style={styles.kicker}>
          AREA PROPRIETARIO
        </Text>

        <Text style={styles.title}>
          SA DOMMU MEA
        </Text>

        <Text style={styles.subtitle}>
          Gestisci i contenuti della tua casa.
        </Text>


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
            Gestisci l'offerta della cena
            sarda direttamente dall'area
            proprietario.
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
            Le fotografie della casa e della
            Sardegna sono inserite direttamente
            nell'applicazione.
          </Text>

          <View style={styles.photoInfo}>

            <Text style={styles.photoInfoIcon}>
              🖼️
            </Text>

            <Text style={styles.photoInfoText}>
              Le fotografie non vengono
              modificate dall'area proprietario.
              {'\n\n'}
              Rimangono quelle inserite nel
              progetto dell'app.
            </Text>

          </View>

        </View>


        {/* SALVA */}

        <Pressable
          style={[
            styles.saveButton,
            saving &&
              styles.disabledButton,
          ]}
          onPress={saveData}
          disabled={saving}
        >

          <Text
            style={styles.saveButtonText}
          >
            {saving
              ? '⏳ Salvataggio...'
              : '💾 SALVA TUTTE LE MODIFICHE'}
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

  footer: {
    textAlign: 'center',
    color: '#8B7A62',
    fontSize: 12,
    marginTop: 30,
  },

}); 
