import axios from "axios";
import { useNavigation } from '@react-navigation/native';
import { useState } from "react";
import {  Pressable, StyleSheet, Text, TextInput, View, Alert } from "react-native";

export const UpdateU=({route})=>{
  const {navigate} = useNavigation();

  const { userData } = route.params
    const [data, setData] = useState({})
  
    const onChange=(target, value)=>{
      const newData=data
      console.log(target, value)
      newData[target]= value
      setData(newData)
    }

      const updateUser= async()=>{
    try {
      await axios.put(`https://7qnhlz7j-5000.usw3.devtunnels.ms/users/update/${userData.id}`, data)
      Alert.alert("Se ha actualizado", `Su usuario, se ha actualizado correctamente`)
      navigate("TableU")
    } catch (error) {
      Alert.alert("Algo salio mal", `No se actualizo el usuario, ${error}`)
    }
  }

  return (
    <>
      <View style={styles.containerMain}>
        <View style={styles.containerContent}>
          <Text style={styles.title}>Actualizar Usuario</Text>

          <Text style={styles.label}>Nombre:</Text>
          <TextInput style={styles.input} onChangeText={(text) => onChange("name", text)}
          placeholder={userData.name}></TextInput>

          <Text style={styles.label}>Correo:</Text>
          <TextInput style={styles.input} onChangeText={(text) => onChange("email", text)} 
          placeholder={userData.email}></TextInput>

          <Text style={styles.label}>Rol:</Text>
          <TextInput style={styles.input} onChangeText={(text) => onChange("rol", text)}
            placeholder={userData.rol}></TextInput>

          <Text style={styles.label}>Contraseña:</Text>
          <TextInput style={styles.input} onChangeText={(text) => onChange("password", text)}
            placeholder={userData.password}></TextInput>

          <Pressable style={styles.send} onPress={() => updateUser()}>
            <Text style={styles.textButton}>Actualizar</Text>
          </Pressable>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  containerMain: {
    marginTop: 200, 
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
