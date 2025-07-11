import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { StatusBar } from 'expo-status-bar';
import { Button, Pressable, StyleSheet, Text, TextInput, View, Image, Alert, ScrollView } from 'react-native';
import axios from "axios";



export const CheckOut =({route})=>{ 
    const {OrdenCompleta}= route.params;
    const [Total, setTotal] = useState(0);

    useEffect(() => {
      calculateTotal()
    }, []);

        const calculateTotal = () => {
        let subTotal = 0;
        
        const data = OrdenCompleta;
        if (data.garments) {
            for (const garment of data.garments) {
                console.log(garment)
                for (const service of garment.services) {
                    console.log(service)
                    subTotal += service.quantity * service.unitPrice
                }
            }
        }
        setTotal(subTotal)
    }

    const registerOrder = async()=>{
        try {
          const dataAMandar=OrdenCompleta
          dataAMandar.total=Total
          dataAMandar.client_id=1 //se cambiara mas tarde
          dataAMandar.user_id=1 //este igual xd

          const today = new Date();
        const fechaActual = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;
          dataAMandar.estimated_delivery_date=fechaActual
          await axios.post("https://ngntrmk5-5000.usw3.devtunnels.ms/orders/create",dataAMandar)
          Alert.alert("Orden registrada", "Ves burro, si se pudo XD")
        } catch (error) {
          Alert.alert("Sucedio un error", `Valio madres: ${error}`)
        }
    }

   const {navigate} = useNavigation();
  return (
        <>
            <View style={styles.container}>
            <View style={styles.nav}>
              <Text style={styles.title}>Resumen</Text>
            </View>
  
            <View style={styles.scrollViewContainer}>
              <ScrollView style={styles.mainContent}>
                  {
                    OrdenCompleta.garments.map((garment)=>(
                      <View style={styles.garment}>

                        <View style={styles.textoHorizontal}>

                            <Text style={styles.subTitle}>Prenda:</Text>
                            <Text style={styles.label} >{garment.type}</Text>

                        </View>

                        <View style={styles.textoHorizontal}>

                            <Text style={styles.subTitle}>Descripcion:</Text>
                            <Text style={styles.label}>{garment.description}</Text>
                        </View>

                        <View style={styles.textoHorizontal}>
                            <Text style={styles.subTitle}>Observaciones:</Text>
                            <Text style={styles.label}>{garment.observations}</Text>

                        </View>
                        {
                          garment.services.map((servis)=>(
                            <View style={styles.serviceWithinGarment}>

                              <View style={styles.textoHorizontal}>
                                    <Text style={styles.serviceWithinGarment.subTitle}>Servicio:</Text>
                                    <Text>{servis.name}</Text>
                              </View>

                               <View style={styles.textoHorizontal}>
                                    <Text style={styles.serviceWithinGarment.subTitle}>Cantidad:</Text>
                                    <Text>{String(servis.quantity)}</Text>
                              </View>

                              <View style={styles.textoHorizontal}>
                                    <Text style={styles.serviceWithinGarment.subTitle}>Precio unitario:</Text>
                                    <Text>{String(servis.unitPrice)}</Text>
                              </View>

                              <View style={styles.textoHorizontal}>
                                    <Text style={styles.serviceWithinGarment.subTitle}>Subtotal de la prenda:</Text>
                                    <Text>{String(servis.unitPrice*servis.quantity)}</Text>
                              </View>
                            </View>
                          ))
                        }

                      </View>
                    ))
                  }
              </ScrollView>

            </View>
              <View style={styles.totalContainer}>
                    <View style={styles.textoHorizontal}>
                      <Text style={styles.subTitle}>Total:</Text>
                      <Text style={styles.label}>{Total}</Text>
                    </View>
                    <Pressable style={styles.totalContainer.boton} onPress={()=>registerOrder()}>
                        <Text style={styles.totalContainer.boton.label}>Realizar pedido</Text>
                    </Pressable>
              </View>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 9,
    paddingTop: 20,
    backgroundColor: "#fff"
  },
  title:{
    fontSize: 25,
    fontWeight: "bold",
    alignSelf: "center",
    marginBottom: 3
  },
  subTitle:{
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    color: "#3924bb",
    marginBottom: 3
  },
  nav:{
    flexDirection: 'row',
    padding:"auto",
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#fff',
    width: '100%',
   height:"17%",
    top: 0
  },
  mainContent:{
    marginHorizontal:"auto",
    padding:10,
    width:"100%",
    height:"100%",
    backgroundColor:"#fff",
    marginTop:10
  },
  label:{
   fontSize: 18,
    fontWeight: "bold",
    marginVertical: 5,
    marginHorizontal: 8,
    alignSelf: "left",
    color: "#7a67ee"
  },
  garment:{
    width:"100%",
    height:"auto",
    backgroundColor:"#ccc4ff",
    borderColor:"#ccc4ff",
    borderWidth:3,
    marginVertical:5,
    borderRadius: 10,
  },
  scrollViewContainer:{
    height:"60%"
  },
  serviceWithinGarment:{
    width:"95%",
    height:"auto",
    backgroundColor:"#ccc4ff",
    borderRadius: 10,
    borderColor:"#ccc4ffe",
    borderWidth:1,
    marginHorizontal:"auto",
    marginVertical:10,
      subTitle:{
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    color: "#3924bb",
    marginBottom: 3 
  },},
  textoHorizontal:{
    flexDirection:"row",
    padding:5,
    marginVertical:"5"
  },
  totalContainer:{
    width:"100%",
    height:"20%",
        boton:{
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    backgroundColor: "#7a67ee",
    padding: 12,
    borderRadius: 10,
    width: "80%",
    color: "white",
    fontSize: 15,
    fontWeight: "bold",
    textAlign: "center",
    label:{
        color:"white",
        fontWeight:"Bold",
        fontSize:15,
    textShadowColor: 'black',
    textShadowRadius: 2,
    }
  },
  }
});
