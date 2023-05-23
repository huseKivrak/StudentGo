import React, { Component, useState } from "react";
// import { View } from 'react-native/types';
import { Text, TextInput, View } from "react-native";

export class LoginForm extends Component {
  constructor(props) {
    super(props)

    this.state = {
      username: "",
      password: "",
    };

    this.handleUsernameChange = this.handleUsernameChange.bind(this)
    this.handlePasswordChange = this.handlePasswordChange.bind(this)
  }

  handleUsernameChange(evt) {
    console.log("this", this);
    this.setState((curr) => ({ ...curr, username: evt.target }));
  }

  handlePasswordChange(evt) {
    this.setState((curr) => ({ ...curr, password: evt.target }));
  }

  render() {
    return (
      <View>
        <TextInput
          style={{
            height: 40,
            borderColor: "gray",
            borderWidth: 1,
          }}
          placeholder="Enter your username"
          onChangeText={this.handleUsernameChange}
          // name="username"
          value={this.state.username}
        />
        <TextInput
          style={{
            height: 40,
            borderColor: "gray",
            borderWidth: 1,
          }}
          placeholder="Enter your password"
          onChangeText={this.handlePasswordChange}
          // name="password"
          value={this.state.password}
        />
      </View>
    );
  }
}
