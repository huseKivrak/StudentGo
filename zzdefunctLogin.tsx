import React, { Component, useState } from "react";
// import { View } from 'react-native/types';
import { Text, TextInput, View, Button } from "react-native";

export default function defunctLogin() {
  const [username, setUsername] = useState({ username: "" });
  const [password, setPassword] = useState({ password: "" });

  function handleUsernameChange(evt) {
    setUsername((curr) => ({ ...curr, username: evt.target }));
  }

  function handlePasswordChange() {

  }

  function handleSubmit(){
    console.log("form submitted");
    console.log("username is:", username, "password is:", password)
  }

  return (
    <View>
      <TextInput
        style={{
          height: 40,
          borderColor: "gray",
          borderWidth: 1,
        }}
        placeholder="Enter your username"
        onChangeText={newName => setUsername(newName)}
        value={username}
      />
      <TextInput
        style={{
          height: 40,
          borderColor: "gray",
          borderWidth: 1,
        }}
        placeholder="Enter your password"
        onChangeText={newPass => setPassword(newPass)}
        // name="password"
        value={password}
      />
      <Button
        title="Submit"
        onPress={handleSubmit} />
    </View>
  );
}
