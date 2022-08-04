import React from 'react';
import {Button, StyleSheet, TextInput, View} from 'react-native';

export default function Login({onLogin, username, setUsername}) {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        onChangeText={setUsername}
        value={username}
      />
      <Button title={'Login'}  onPress={onLogin}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#31827e',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    backgroundColor: 'white',
    width: '70%',
    marginBottom: 20,
    borderRadius: 10,
    paddingHorizontal: 30,
  },
  
});