import { Text, View, TextInput, Button, StyleSheet, Pressable } from "react-native";
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
      {/* <RithmIcon width={63} height={53} fillColor={"#000000"}/> */}
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
      <Pressable onPress={handleSubmit(onSubmit)} style={styles.submit}>
        <Text style={styles.submitText}>Login</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 25,
    marginTop: -70,
  },
  icon: {
    marginBottom: 30
  },
  input: {
    fontSize: 23,
    width: 300,
    height: 50,
    borderRadius: 40,
    backgroundColor: "#f3bcb9",
    textAlign: "center",
  },
  submit: {
    marginTop: 40,
    backgroundColor: "#E46B66",
    width: 150,
    height: 60,
    borderRadius: 40,
    color: "#ffffff",
    justifyContent: "center",
    alignItems: "center",
  },
  submitText: {
    fontSize: 24,
    fontWeight: "600",
  }

});

export default LoginForm;
