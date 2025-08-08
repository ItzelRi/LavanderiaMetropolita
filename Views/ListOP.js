import { ScrollView, Pressable, StyleSheet, Text, TextInput, View, Alert } from 'react-native'
import { Table, Row, Rows } from 'react-native-table-component'
import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react"
import axios from "axios"

export const ListOP =()=>{ 
      const [dataSearched, setdataSearched] = useState([])
      const [Pagination, setPagination] = useState(1)

    useEffect(() => {
        getAllOrders()
    }, [Pagination]);

    const getAllOrders=async() =>{
    try {
           console.log("Entre a get all ordes")
      const pendingOrders= await axios.get(`https://7qnhlz7j-5000.usw3.devtunnels.ms/orders/get-pending-orders-dashboard?pagination=${Pagination}`)
     console.log(pendingOrders.data)
      setdataSearched(pendingOrders.data)
    } catch (error) {
      console.log(error)
      //Alert.alert("Error", "No se pudieron trater todas las ordenes")
    }
  }
    const {navigate}= useNavigation()

    const mapped = dataSearched.map((register)=>( 
    [ register.user_name,register.client_name,register.created_at,register.state,
      (<>
        <Pressable onPress={() => navigate('OrderDet', { dataOrder: register })}>
            <Text>{register.id}</Text>
        </Pressable></>)
        ]))

        const header=[ (
        <Pressable style={styles.arrow} onPress={()=>setPagination(Pagination-1)}><Text>                ◀️</Text></Pressable>),
            Pagination, 
        (<Pressable style={styles.arrow} onPress={()=>setPagination(Pagination+1)}><Text>              ▶️</Text></Pressable>), 
        ]

return (
        <>
        <View style={styles.container}>
            <View style={styles.nav}>
              <Text style={styles.title}>Ordenes Pendientes</Text>
            </View>

            <ScrollView style={styles.mainContent}>
              <Table style={styles.tabla}> 
                <Row data={header}/>
                <Row data={[ 'Vendedor', 'Cliente', 'Fecha de orden', "Estado", "No.Orden"]} style={styles.head} textStyle={styles.text}/>
                <Rows data={mapped} textStyle={styles.text}/>
              </Table>
            </ScrollView>
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
  head: {
    backgroundColor: "#7a67ee",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  row: {
    flexDirection: 'row',
    backgroundColor: '#dad4ffff',
    paddingVertical: 12,
    paddingHorizontal: 8,
    marginVertical: 2,
    borderRadius: 5,
  },
  text: {
    fontSize: 13,
    color: "black",
    fontWeight: "bold",
    textAlign: "center"
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
    padding: 10,
    borderRadius: 10,
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
    marginBottom: 50,
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
  sbot:{
  backgroundColor: "#7a67ee",
    color: "#fff",
    fontWeight: "bold",
    fontSize: 13,
    paddingVertical: 8,
    paddingHorizontal: 2,
    borderRadius: 10,
    textAlign: "center",
    marginStart:5 
  },
  sboty:{
  backgroundColor: "#2612a8ff",
    color: "#fff",
    fontWeight: "bold",
    fontSize: 13,
    paddingVertical: 8,
    paddingHorizontal: 2,
    borderRadius: 10,
    textAlign: "center", 
    marginStart:20,
  },
  arrow:{
    fontSize: 20,
    fontWeight: "bold"
  }
});