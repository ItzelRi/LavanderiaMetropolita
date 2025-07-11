import axios from "axios";
import { useState } from "react";
import {  Pressable, StyleSheet, Text, TextInput, View, Alert } from "react-native";

export const UpdateG=({route})=>{
  const { garmentData } = route.params
    const [data, setData] = useState({})
  
    const onChange=(target, value)=>{
      const newData=data
      console.log(target, value)
      newData[target]= value
      setData(newData)
    }

      const UpdateG= async()=>{
    try {
      //const updated= await axios.put(`https://ngntrmk5-5000.usw3.devtunnels.ms/garments/update/${garmentData.id}`, data)
      Alert.alert("Se ha actualizado", `La prenda,  se ha actualizado correctamente`)
    } catch (error) {
      Alert.alert("Algo salio mal", `No se actualizo la prenda, ${error}`)
    }
  }

  return (
    <>
      <View style={styles.containerMain}>
        <View style={styles.containerContent}>
          <Text style={styles.title}>Actualizar Prenda</Text>

          <Text style={styles.label}>Type:</Text>
          <TextInput style={styles.input} onChangeText={(text) => onChange("type", text)}
          placeholder={garmentData.type}></TextInput>

          <Text style={styles.label}>Descripcion:</Text>
          <TextInput style={styles.input} onChangeText={(text) => onChange("description", text)} 
          placeholder={garmentData.description}
            multiline={true}
            numberOfLines={4}></TextInput>

          <Text style={styles.label}>Observaciones:</Text>
          <TextInput style={styles.input} onChangeText={(text) => onChange("observations", text)}
            placeholder={garmentData.observations}
            multiline={true}
            numberOfLines={4}></TextInput>

          <Pressable style={styles.send} onPress={() => UpdateG()}>
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
