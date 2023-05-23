import * as React from "react";
import { WebView } from "react-native-webview";

export default class RithmWebView extends React.Component {
  render() {
    return (
      <WebView
      source={{ uri: "https://r30.students.rithmschool.com/" }}
      style={{ marginTop: 20 }}
      />
    );
  }
}
