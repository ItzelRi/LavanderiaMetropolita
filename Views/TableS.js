import { ScrollView, Pressable, StyleSheet, Text, View, Alert } from "react-native"
import { Table, Row, Rows } from "react-native-table-component"
import { useNavigation } from "@react-navigation/native"
import { useState, useEffect } from "react"
import axios from "axios"

export const TableS =({navigation})=>{ 
        useEffect(()=>{
        bdServices()
        },[])
        
        const [dataTable, setdataTable] = useState([])

        const arrayEjemplo=[
  {
    "id": 1,
    "name": "Lavado básico",
    "description": "Lavado de ropa regular con detergente estándar y secado incluido.",
    "price": 60.00
  },
  {
    "id": 2,
    "name": "Lavado delicado",
    "description": "Servicio especial para prendas delicadas que requieren tratamiento suave.",
    "price": 85.00
  },
  {
    "id": 3,
    "name": "Planchado",
    "description": "Planchado profesional de ropa previamente lavada.",
    "price": 35.00
  },
  {
    "id": 4,
    "name": "Tintorería",
    "description": "Limpieza profesional en seco para prendas delicadas o de alto valor.",
    "price": 100.00
  },
  {
    "id": 5,
    "name": "Secado industrial",
    "description": "Secado rápido y eficiente con maquinaria especializada, temperatura controlada.",
    "price": 120.00
  }
]

        
      const bdServices=async()=>{
        try{
            /* const allServices = await axios.get("https://ngntrmk5-5000.usw3.devtunnels.ms/services/getAll")
            setdataTable(allServices.data.services) */
            setdataTable(arrayEjemplo)
        } catch (error) {
           Alert.alert("Error al traer", `No se trajo su BD, ${error}`)
          }
      }
        
      const deleteService= async(ID)=>{
          try {
           //await axios.delete(`https://ngntrmk5-5000.usw3.devtunnels.ms/services/delete/${ID}`)
            Alert.alert("Servicio elimiando con exito")
          } catch (error) {
           Alert.alert("Algo salio mal", `No se elimino el servicio, ${error}`)
          }
      }

    const {navigate}= useNavigation()


    const mapped = dataTable.map((register)=>( 
    [register.id,register.name,register.description,register.price,
      (<>
      <View style={styles.actionsContainer}> 
      <Pressable style={styles.action} onPress={()=>deleteService(register.id)}>
        <Text>🗑️</Text>
      </Pressable>
      <Pressable style={styles.action} onPress={() => navigation.navigate("UpdateS", { serviceData: register })}>
        <Text>📝</Text>
      </Pressable>
      </View>
      </>)]
    ))

    return (
        <>
        <View style={styles.container}>
            <View style={styles.nav}>
              <Text style={styles.title}>Servicios</Text>
            </View>
            {/* <Pressable style={styles.send} onPress={() => navigation.navigate("CreateS")} >
                <Text style={styles.textButton}>Añadir Prenda</Text>
            </Pressable> */}
            <Text style={styles.subTitle}>Datos registrados</Text>
            <ScrollView style={styles.scrollView}>
              <Table style={styles.tabla}> 
                <Row data={["ID","Nombre","Descripcion","Precio","Acciones"]} style={styles.head} textStyle={styles.text1}/>
                <Rows data={mapped} textStyle={styles.text2}/>
              </Table>

                
            </ScrollView>  
                <Pressable style={styles.send} onPress={() => navigation.navigate("CreateS")} >
                    <Text style={styles.textButton}>Añadir Servicio</Text>
                </Pressable>
            </View>
            </>
    )}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    paddingTop: 30,
    backgroundColor: "#fff"
  },
  title: {
    fontSize: 25,
    fontWeight: "bold",
    alignSelf: "center",
    marginBottom: 10
  },
  subTitle: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    color: "#3924bb",
    marginBottom: 10
  },
  head: {
    backgroundColor: "#7a67ee",
    height: 50,
    alignItems: "center",
    justifyContent: "center"
  },
  scrollView: {
    marginBottom: 20
  },
  send: {
    marginBottom: 50,
    alignSelf: "center"
  },
  textButton: {
    backgroundColor: "#7a67ee",
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
    paddingVertical: 8,
    paddingHorizontal: 80,
    borderRadius: 10
  },
  text1: {
    fontSize: 13.5,
    color: "black",
    fontWeight: "bold",
    textAlign: "center",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "center"
  },
  text2: {
    fontSize: 13.5,
    color: "black",
    fontWeight: "bold",
    textAlign: "center",
    flexWrap: "wrap",
    marginVertical:"20%"
    
  },
  title: {
    fontSize: 25,
    fontWeight: "bold",
    alignSelf: "center",
    marginBottom: 20,
    color: "#000"
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
}})