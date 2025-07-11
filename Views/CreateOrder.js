import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { StatusBar } from 'expo-status-bar';
import { Button, Pressable, StyleSheet, Text, TextInput, View, Image, Alert, ScrollView } from 'react-native';
import { Picker } from "@react-native-picker/picker";


export const CreateOrder =({navigation})=>{ 

     const services= [ 
        {
            name: "Lavado",
            quantity: 0,
            unitPrice:22
        },
        {
            name: "Plachado",
            quantity: 0,
            unitPrice:60
        },
        {
            name: "Tintoreria",
            quantity: 0,
            unitPrice:0
        },
        {
            name: "Especial",
            quantity: 0,
            unitPrice:0
        },
    ]

    const garmentsList = ["Camisa", "Falda", "Traje", "Pantalón"];
    const defaultGarment = { 
        type: "Camisa",
        description: "",
        observations: "",
        services: [services[0]],
    }
  
    const [DATA, setDATA] = useState({});
    const [order, setOrder] = useState({
        client_id: 0,
        user_id: 0,
        state: "recibido",
        total: 0,
        pagado: false,
        garments: [defaultGarment],
    });

    const [total, setTotal] = useState(0);
        const addGarment = () => {
        const data = order 
        data.garments.push(defaultGarment) 
        setOrder({ ...data })
    }
        const deleteGarment = (ig) => {
        const data = order;
        data.garments = data.garments.filter((_, i) => i != ig)
        setOrder({ ...data })
    }
        const onChangeGarment = (key,value, ig) => {
        console.log(`Hola estoy recibiendo el valor de ${value}, para el campo ${key}, en el indice ${ig}`)
            const data = order;
        if (data.garments) {
            data.garments[ig][key] = value
        }
    }
        const deleteServiceToGarment = (ig, is) => {
        const data = order;
        if (data.garments && data.garments[ig]) {
            data.garments[ig].services = data.garments[ig].services.filter((_, i) => i != is)
        }
        setOrder({ ...data })
    }
    const onChangeServiceFields = (key, value, ig, is) => {
        const data = order;
        if (data.garments) {
            if (key == "name") {
                data.garments[ig].services[is][key] = value
            } else {
                data.garments[ig].services[is][key] = parseFloat(value)
            }
        }
    }
const onChangeService = (selectedValue, ig, is) => {
    const data = order
    const newService = services.filter((s) => s.name ===selectedValue).shift()
    if (data.garments && data.garments[ig] && newService) {
    data.garments[ig].services[is] = newService
        }
    setOrder({ ...data })
  onChangeServiceFields("name", selectedValue, ig, is)
}

        const addServiceToGarment = (ig) => {
        const data = order;
        if (data.garments && data.garments[ig]) {
            data.garments[ig].services.push(services[0])
        }
        setOrder({ ...data })
    }

        const calculateTotal = () => {
        let subTotal = 0;
        const data = order;
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
  
    const onChange=(target, value)=>{
      const newData=DATA
      console.log(target, value)
      newData[target]= value
      setDATA(newData)
    }

    const {navigate}= useNavigation()
    return (
        <>
            <View style={styles.container}>
                <View style={styles.nav}>
                <Text style={styles.title} >Registre tu orden</Text>
                </View>
              <Text style={styles.subTitle} >Complete los campos</Text>
                <Pressable style={styles.boton} onPress={()=>addGarment()} >
                  <Text style={styles.boton.label.lil}>Agregar prenda</Text>
                </Pressable>
                <View style={styles.scrollViewContainer}>
                                <ScrollView style={styles.mainContent}>              
              {
                order.garments.map((garment, i)=>(
                    <View style={styles.garment}>
                        {
                            i > 0 && (
                                <Pressable onPress={()=>deleteGarment(i)}>
                                    <Text style={styles.boton.label.lil}>Eliminar prenda</Text>
                                </Pressable>
                            )
                        }
                        <Text>{i + 1}</Text>
                                <Text style={styles.SANDG}>Tipo de prenda</Text>

                                <Picker
                                onValueChange={(value) =>{ onChangeGarment("type", value, i), console.log("Desde el picker de prenda, este seria order:", order)}}>
                                    {garmentsList.map((g) => (
                                    <Picker.Item  label={g} value={g}/>
                                        ))}
                                </Picker>
                                <Text style={styles.label}>Descripcion:</Text>
                                <TextInput style={styles.input}
                                onChangeText={(text)=>onChangeGarment("description", text, i)}
                                ></TextInput> 

                                <Text style={styles.label}>Observaciones:</Text>
                                <TextInput style={styles.input}
                                onChangeText={(text) => onChangeGarment("observations", text, i)}
                                ></TextInput>

                        <Text style={styles.SANDG}>Servicios</Text>
                        {
                            garment.services.map((service,is)=>(
                               <View style={styles.serviceWithinGarment}>
                               
                                {
                                    is > 0 && (                                            
                                    <Pressable onPress={() => deleteServiceToGarment(i, is)}><Text style={styles.boton.label.lil}>Eliminar servicio</Text></Pressable>   
                                         )
                                }

                                    <Picker                             
                                        selectedValue={service.name}
                                        onValueChange={(value) => {onChangeService(value, i, is), console.log("Desde el picker de servicio, este seria order", order,
                                            "El No de garment es ", i+1, "Y el garment es ", order.garments[i]
                                        )}}>
                                            {
                                            services.map(({name}) => (
                                                    
                                                    <Picker.Item  label={name} value={name} />
                                                ))
                                                }
                                </Picker>

                                     <Text style={styles.label}>Cantidad:</Text>
                                        <TextInput style={styles.input} keyboardType="numeric"
                                        onChangeText={(text) => onChangeServiceFields("quantity", text, i, is)}
                                        ></TextInput> 

                                    <Text style={styles.label}>Precio:</Text>
                                        <TextInput style={styles.input} keyboardType="numeric"
                                        onChangeText={(text) => onChangeServiceFields("unitPrice", text, i, is)}
                                        ></TextInput> 

                                    <Pressable  onPress={() => addServiceToGarment(i)} >
                                        <Text style={styles.boton.label.lil}>Agregar servicio</Text>
                                     </Pressable>

                                                                       
                               </View>
   
                            ))
                        }
                    </View>

                ))
              }            

            </ScrollView>
            <Text>{total}</Text>

            <Pressable style={styles.boton} onPress={calculateTotal}>
                <Text style={styles.boton.label}>Calcular</Text>
            </Pressable>

            <Pressable style={styles.boton} onPress={() => navigation.navigate('CheckOut', { OrdenCompleta: order })}>
                <Text style={styles.boton.label}>CheckOut</Text>
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
  input:{
    width: "90%", 
    padding: 13,
    marginVertical: 3,
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
  label:{
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 5,
    marginHorizontal: 8,
    alignSelf: "left",
    color: "#7a67ee"
  },
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
    marginVertical:10
  },
  SANDG:{
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    color: "#3924bb",
    marginBottom: 20
  },
  lil:{
    backgroundColor: "#7a67ee",
    color: "#3924bb",
    margin: 20
  }
});

