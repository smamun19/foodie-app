import React, {useState} from 'react';
import {View, TextInput} from 'react-native';

const Login = () => {
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  return (
    <View>
      <View>
        <TextInput placeholder="Email" value={email} onChangeText={setEmail} />
      </View>
      <View>
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
        />
      </View>
    </View>
  );
};

export default Login;
