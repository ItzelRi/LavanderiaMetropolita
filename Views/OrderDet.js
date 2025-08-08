import { ScrollView, Pressable, StyleSheet, Text, TextInput, View, Alert } from 'react-native'
import { Table, Row, Rows } from 'react-native-table-component'
import { useNavigation } from "@react-navigation/native"
import { useEffect, useState } from "react"
import axios from "axios"

export const OrderDet =({route})=>{ 
      const { dataOrder } = route.params
      console.log(dataOrder)

    const {navigate}= useNavigation()

return (
        <>
        <View style={styles.container}>
            <View style={styles.nav}>
              <Text style={styles.title}>Detalles de la Orden</Text>
            </View>
            <View style={styles.search}>
            <View style={styles.textoHorizontal}>
                <Text style={styles.subTitle}>Vendedor:</Text>
                <Text style={styles.text}>{dataOrder.user_name}</Text>
             </View>
             </View>
             <View style={styles.search}>
             <View style={styles.textoHorizontal}>
                <Text style={styles.subTitle}>Cliente:</Text>
                <Text style={styles.text}>{dataOrder.client_name}</Text>
             </View>
             </View>
             <View style={styles.search}>
             <View style={styles.textoHorizontal}>
                <Text style={styles.subTitle}>Fecha de Orden:</Text>
                <Text style={styles.text}>{dataOrder.created_at}</Text>
             </View>
             </View>
             <View style={styles.search}>
             <View style={styles.textoHorizontal}>
                <Text style={styles.subTitle}>Estado:</Text>
                <Text style={styles.text}>{dataOrder.state}</Text>
             </View>
             </View>
             <View style={styles.search}>
             <View style={styles.textoHorizontal}>
                <Text style={styles.subTitle}>Total:</Text>
                <Text style={styles.text}>{dataOrder.total}</Text>
             </View>
             </View>

              <Pressable style={styles.send} onPress={() => navigate("Dashboard")}>
                <Text style={styles.textButton}>Salir</Text>
              </Pressable>
            </View>
            </> 
    )}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    paddingTop: 30,
    backgroundColor: '#fff',
  },
  subTitle: {
    fontSize: 20,
    marginTop: 5,
    fontWeight: "bold",
    marginHorizontal: 3,
    textAlign: "center",
    color:"#21137dff"
  },
  text: {
    fontSize: 16,
    color: "#636364ff",
    fontWeight: "bold",
    textAlign: "left",
    marginTop:7,
    marginLeft:10
  },
  title: {
    marginTop: 20,
    fontSize: 25,
    fontWeight: "bold",
    alignSelf: "center",
    marginBottom: 20,
    color:"#3924bb"
  },
  search: {
    flexDirection: "row",
    backgroundColor: "#bdb7e1",
    padding: 3,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 15
  },
  boton: {
    backgroundColor: "#70f788",
    width: "20%",
    marginHorizontal: 5,
    height: 40,
    alignContent: "center",
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: "black",
    borderWidth: 1,
  },
  botonAccion: {
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#7a67ee",
    backgroundColor: "transparent",
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 5,
  },
  label: {
    color: "white",
    fontWeight: "bold",
    fontSize: 15,
    textShadowColor: 'black',
    textShadowRadius: 2,
  },
  input: {
    marginLeft: 5,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "black",
    fontSize: 15,
    width: "60%",
    height: 40,
    backgroundColor: "white",
    paddingHorizontal: 10,
  },
  tabla: {
    widthArr: 10
  },
  textButton: {
    backgroundColor: "#7a67ee",
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
    paddingVertical: 8,
    paddingHorizontal: 80,
    borderRadius: 10,
    textAlign: "center"
  },
  send: {
    marginTop: 30,
    alignSelf: "center",
    width: "100%"
  },
  action: {
    padding: 8,       
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 4
  },
  actionsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    flex: 1
},
  textoHorizontal:{
    flexDirection:"row",
    padding:6,
    marginVertical:3
  },
});