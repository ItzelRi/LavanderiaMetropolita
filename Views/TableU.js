import { ScrollView, Pressable, StyleSheet, Text, View, Alert } from "react-native"
import { Table, Row, Rows } from "react-native-table-component"
import { useNavigation } from "@react-navigation/native"
import { useState, useEffect } from "react"
import axios from "axios"

export const TableU =()=>{
  const navigation = useNavigation() 
        useEffect(()=>{
        searchBD()
        },[])

        const [dataTable, setdataTable] = useState([])
        const searchBD=async()=>{
        try{
            const findBD = await axios.get("https://7qnhlz7j-5000.usw3.devtunnels.ms/users/getAll")
            console.log("soy la info de usuarios de la bd:", findBD.data) 
            setdataTable(findBD.data)
        } catch (error) {
            Alert.alert("Error al traer", `No se trajo su BD, ${error}`)
        }
    }
    
      const deleteUser= async(ID)=>{
          try {
            await axios.delete(`https://7qnhlz7j-5000.usw3.devtunnels.ms/users/delete/${ID}`)
            Alert.alert("Usuario elimiando con exito")
            searchBD()
          } catch (error) {
           Alert.alert("Algo salio mal", `No se elimino el usuario, ${error}`)
          }
      }

    const mapped = dataTable.map((register)=>( 
    [register.id,register.name,register.email,register.rol,
      (<>
      <View style={styles.actionsContainer}>
      <Pressable style={styles.action} onPress={()=>deleteUser(register.id)}>
        <Text>🗑️</Text>
      </Pressable>
      <Pressable style={styles.action} onPress={() => navigation.navigate("UpdateU", { userData: register })}>
        <Text>📝</Text>
      </Pressable>
      </View>
      </>)]
    ))

const {navigate} = useNavigation();
    return (
        <>
        <View style={styles.container}>
            <View style={styles.nav}>
              <Text style={styles.title}>Usuarios</Text>
            </View>
            <Text style={styles.subTitle}>Datos registrados</Text>
            <ScrollView style={styles.scrollView}>
              <Table style={styles.tabla}> 
                <Row data={["ID","Nombre","Correo","Rol","Acciones"]} style={styles.head} textStyle={styles.text1}/>
                <Rows data={mapped} textStyle={styles.text2}/>
              </Table>

            </ScrollView>  
                <Pressable style={styles.send} onPress={() => navigation.navigate("CreateU")} >
                    <Text style={styles.textButton}>Registrar Usuario</Text>
                </Pressable>
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
    alignSelf: "center",
    width: "100%"
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