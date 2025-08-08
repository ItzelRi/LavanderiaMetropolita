import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { useState } from "react";
import {  Pressable, StyleSheet, Text, TextInput, View, Alert } from "react-native";

export const CreateU=()=>{
    const [data, setData] = useState({})

    const onChange=(target, value)=>{
      const newData=data
      console.log(target, value)
      newData[target]= value
      setData(newData)
    }

      const CreateUser= async()=>{
    try {
        console.log("mandare ", data)
        await axios.post("https://7qnhlz7j-5000.usw3.devtunnels.ms/users/create", data)
      Alert.alert("Creado!", "Su usuario se ha creado con exito")
    } catch (error) {
      Alert.alert("Algo salio mal", `No se ha creado su usuario, ${error}`)
    }
  }

  const {navigate} = useNavigation();
  return (
    <>
      <View style={styles.containerMain}>
        <View style={styles.containerContent}>
          <Text style={styles.title}>Registrar Usuario</Text>

          <Text style={styles.label}>Nombre:</Text>
          <TextInput style={styles.input} onChangeText={(text) => onChange("name", text)}
          placeholder={""}></TextInput>

          <Text style={styles.label}>Correo:</Text>
          <TextInput style={styles.input} onChangeText={(text) => onChange("email", text)} 
            placeholder={""}></TextInput>

          <Text style={styles.label}>Rol:</Text>
          <TextInput style={styles.input} onChangeText={(text) => onChange("rol", text)}
            placeholder={""}></TextInput>


          <Text style={styles.label}>Contraseña:</Text>
          <TextInput style={styles.input} onChangeText={(text) => onChange("password", text)}
            placeholder={""}></TextInput>

          <Pressable style={styles.send} onPress={() => CreateUser()}>
            <Text style={styles.textButton}>Enviar</Text>
          </Pressable>
          
          <Pressable style={styles.send} onPress={() => navigate("TableU")}>
            <Text style={styles.textButton}>Salir</Text>
          </Pressable>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  containerMain: {
    marginTop: 100, 
  },
  title: {
    fontSize: 25,
    fontWeight: "bold",
    alignSelf: "center",
    marginBottom: 20,
    color: "#000",
  },
  input: {
    width: "80%", 
    padding: 12,
    marginVertical: 10,
    backgroundColor: "#ffffff",
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#7a67ee",
    fontSize: 15,
    shadowColor: "#000",
    justifyContent: "center",
    marginHorizontal:"auto",
    alignItems: "center",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3, 
  },
  button: {
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    backgroundColor: "#87CEFA",
    padding: 12,
    borderRadius: 5,
    width: "80%",
  },
  textButton: {
    backgroundColor: "#7a67ee",
    width: "30%",
    height: 40,
    borderRadius: 10,
    marginTop: 15,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  label: {
    fontSize: 20,
    fontWeight: "bold",
    marginVertical: 5,
    alignSelf: "center",
    color: "#7a67ee",
  },
  containerFooter: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 15,
  },
  footerText: {
    fontSize: 14,
    color: "#333",
    marginVertical: 5,
  },
  containerContent: {
    width: "100%",
  },
});
