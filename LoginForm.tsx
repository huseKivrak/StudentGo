import { Text, View, TextInput, Button, StyleSheet } from "react-native";
import { useForm, Controller } from "react-hook-form";
import RithmIcon from "./RithmIcon";

function LoginForm({login}) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit = (data) => {
    console.log("onSubmit called with data = ", data);
    login(data)
  };

  return (
    <View style={styles.container}>
      <RithmIcon />
      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            placeholder="Username"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            style={styles.input}
          />
        )}
        name="username"
      />
      {errors.username && <Text>Username required.</Text>}

      <Controller
        control={control}
        rules={{
          maxLength: 100,
          required: true,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            placeholder="Password"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            style={styles.input}
          />
        )}
        name="password"
      />
      {errors.password && <Text>Password required.</Text>}
      <Button title="Submit" onPress={handleSubmit(onSubmit)} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  icon: {
    marginBottom: 30
  },
  input: {
    fontSize: 25,
    paddingLeft: 90,
    paddingRight: 90,
    paddingTop: 15,
    paddingBottom: 15,
    margin: 10,
    borderRadius: 40,
    backgroundColor: "#E46B66",
  },
  submit: {
    marginTop: 40,
    backgroundColor: "#E46B66",
    paddingLeft: 50,
    paddingRight: 50,
    paddingTop: 15,
    paddingBottom: 15,
    borderRadius: 40,
    color: "#ffffff"
  }

});

export default LoginForm;
