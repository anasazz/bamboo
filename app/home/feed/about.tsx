import { View, Text, Image, ScrollView } from "react-native";
import React from "react";

// Define component type for TypeScript
const About: React.FC = () => {
  return (
    <ScrollView style={{ flex: 1, backgroundColor: 'white', paddingVertical: 12 }}>
      <View style={{ alignSelf: 'center' }}>
        <Image
          style={{ width: 220, height: 220 }}
          source={require("../../../assets/guida.jpg")}
        />
      </View>

      <View style={{ paddingHorizontal: 12 }}>
        <Text style={{ color: '#45d49c', fontWeight: 'bold', fontSize: 18, marginTop: 8 }}>
          Hai Bisogno di aiuto?
        </Text>
        <Text style={{ color: '#4B5563', textAlign: 'left', paddingTop: 8 }}>
          Utilizzare Bamboo è semplice, ma se hai bisogno di aiuto, sei nel
          posto giusto!! {"\n\n"}Scorri tra gli articoli, seleziona quelli di
          tuo interesse, e clicca sulle offerte che ti interessano. Se l'offerta
          è già scontata, ti si aprirà direttamente Amazon, e potrai procedere
          con i tuoi acquisti
        </Text>
      </View>

      <View style={{ paddingHorizontal: 12 }}>
        <Text style={{ color: '#45d49c', fontWeight: 'bold', fontSize: 18, marginTop: 40 }}>
          Offerte a Coupon
        </Text>
        <Text style={{ color: '#4B5563', textAlign: 'left', paddingTop: 8 }}>
          Se invece l'offerta necessita di un COUPON, troverai la dicitura
          "SCONTO NEL CARRELLO, CODICE COUPON". Per questa tipologia di sconti,
          è necessario inserire un codice in fase di acquisto, per poter
          usufruire dello sconto. {"\n \n"}Cliccando l'offerta, ti ricorderemo
          comunque la procedura necessaria per procedere con l'acquisto.{" "}
          {"\n\n"}La puoi trovare anche qui sotto, spiegata!
        </Text>
      </View>

      <View style={{ paddingHorizontal: 12 }}>
        <Text style={{ color: '#45d49c', fontWeight: 'bold', fontSize: 18, marginTop: 40, paddingBottom: 12 }}>
          Aggiungi l'articolo al carrello
        </Text>
        <Image
          style={{ width: '90%', height: 200, alignSelf: 'center', paddingVertical: 12 }}
          source={require("../../../assets/coupon_01.png")}
        />
        <Text style={{ color: '#4B5563', textAlign: 'left', paddingTop: 8 }}>
          Non preoccuparti se il prezzo che vedi non è scontato: questo tipo di
          sconti, infatti, ti apparirà solo in fase di conferma acquisto!
          {"\n\n"}
          Aggiungi l'articolo al carrello, e premi il pulsante "Procedi
          all'acquisto". Non preoccuparti: non stai ancora comprando l'articolo!
        </Text>
      </View>

      <View style={{ paddingHorizontal: 12 }}>
        <Text style={{ color: '#45d49c', fontWeight: 'bold', fontSize: 18, marginBottom: 12, marginTop: 40 }}>
          Procedi all'ordine ed inserisci il Coupon
        </Text>
        <Image
          style={{ width: '70%', height: 200, alignSelf: 'center', paddingVertical: 12 }}
          source={require("../../../assets/coupon_02.png")}
        />
        <Text style={{ color: '#4B5563', textAlign: 'left', paddingTop: 8 }}>
          Posizionati nel campo "Buoni regalo e codici promozionali", ed incolla
          il Coupon (Bamboo te l'ha già copiato e basterà solo incollarlo).
          Premi il tasto inserisci e dovresti vedere applicato lo sconto.
        </Text>
      </View>

      <View style={{ paddingHorizontal: 12, marginBottom: 40 }}>
        <Text style={{ color: '#45d49c', fontWeight: 'bold', fontSize: 18, marginTop: 40 }}>
          About Bamboo
        </Text>
        <Image
          style={{ width: '100%', height: 160, paddingVertical: 8 }}
          source={require("../../../assets/guida_02.jpg")}
        />
        <Text style={{ color: '#4B5563', textAlign: 'left', paddingTop: 8 }}>
          In qualità di affiliato Amazon, ricevo un guadagno per ogni acquisto
          idoneo. L'app di Bamboo è stata sviluppata con il cuore, se la trovi
          utile e ti piace, lasciami una bella recensione. Le recensioni
          positive ci aiutano a sopravvivere, e poi.. beh fanno anche piacere :)
        </Text>
      </View>
    </ScrollView>
  );
};

export default About;
