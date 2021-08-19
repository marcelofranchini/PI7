import React, {useEffect, useState} from 'react';
import {Text, View, Button} from 'react-native';

import firebase from 'firebase';

const firebaseConfig = {
  apiKey: 'AIzaSyAiNB-15CRlkvtwgsZBx5cGo4ZOL9jqrf8',
  authDomain: 'esp32-1ccd5.firebaseapp.com',
  databaseURL: 'https://esp32-1ccd5-default-rtdb.firebaseio.com',
  projectId: 'esp32-1ccd5',
  storageBucket: 'esp32-1ccd5.appspot.com',
  messagingSenderId: '184172303710',
  appId: '1:184172303710:web:1ac6f9a1ffbd0c5fc6abcf',
  measurementId: 'G-4J23QBR6PT',
};
// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const App: React.FC = () => {
  const [led, setLed] = useState<number>();
  const [led2, setLed2] = useState<number>();
  const [buzzer, setBuzzer] = useState<number>();
  const [rele, setRele] = useState<number>();

  useEffect(() => {
    firebase
      .database()
      .ref('led/')
      .child('status')
      .on('value', snapshot => {
        const status: number = snapshot.val();
        setLed(status);
      });
    firebase
      .database()
      .ref('led2/')
      .child('status')
      .on('value', snapshot => {
        const status: number = snapshot.val();
        setLed2(status);
      });
    firebase
      .database()
      .ref('buzzer/')
      .child('status')
      .on('value', snapshot => {
        const status: number = snapshot.val();
        setBuzzer(status);
      });
    firebase
      .database()
      .ref('rele/')
      .child('status')
      .on('value', snapshot => {
        const status: number = snapshot.val();
        setRele(status);
      });
  }, []);

  async function onOffLed() {
    let ledFirebase = firebase.database().ref('led');
    if (led === 0) {
      await ledFirebase.child('status').set(1);
      setLed(1);
    } else if (led === 1) {
      await ledFirebase.child('status').set(0);
      setLed(0);
    }
  }

  async function onOffLed2() {
    let ledFirebase = firebase.database().ref('led2');
    if (led2 === 0) {
      await ledFirebase.child('status').set(1);
      setLed2(1);
    } else if (led2 === 1) {
      await ledFirebase.child('status').set(0);
      setLed2(0);
    }
  }

  async function onOffLed3() {
    let ledFirebase = firebase.database().ref('buzzer');
    if (buzzer === 0) {
      await ledFirebase.child('status').set(1);
      setBuzzer(1);
    } else if (buzzer === 1) {
      await ledFirebase.child('status').set(0);
      setBuzzer(0);
    }
  }

  async function onOffVentilador() {
    let ledFirebase = firebase.database().ref('rele');
    if (rele === 0) {
      await ledFirebase.child('status').set(1);
      setRele(1);
    } else if (rele === 1) {
      await ledFirebase.child('status').set(0);
      setRele(0);
    }
  }
  return (
    <View
      // eslint-disable-next-line react-native/no-inline-styles
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        alignContent: 'center',
        backgroundColor: 'grey',
        height: '100%',
      }}>
      <Text style={{marginBottom: 20}}>Lâmpada Sala</Text>
      <Button
        onPress={onOffLed}
        title={led === 0 ? 'Desligado' : 'Ligado'}
        color={led === 0 ? 'red' : 'green'}
      />
      <Text style={{marginBottom: 20, marginTop: 20}}>Lâmpada Cozinha</Text>
      <Button
        onPress={onOffLed2}
        title={led2 === 0 ? 'Desligado' : 'Ligado'}
        color={led2 === 0 ? 'red' : 'green'}
      />
      <Text style={{marginBottom: 20, marginTop: 20}}>Lâmpada Corredor</Text>
      <Button
        onPress={onOffLed3}
        title={buzzer === 0 ? 'Desligado' : 'Ligado'}
        color={buzzer === 0 ? 'red' : 'green'}
      />
      <Text style={{marginBottom: 20, marginTop: 20}}>Ventilador</Text>
      <Button
        onPress={onOffVentilador}
        title={rele === 0 ? 'Desligado' : 'Ligado'}
        color={rele === 0 ? 'red' : 'green'}
      />
    </View>
  );
};

export default App;
