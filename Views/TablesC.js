import { ScrollView, Pressable, StyleSheet, Text, TextInput, View, Alert } from 'react-native'
import { Table, Row, Rows } from 'react-native-table-component'
import { useNavigation } from "@react-navigation/native"
import { useState } from "react"
import axios from "axios"

export const TablesC =({navigation})=>{ 
      const [Searching, setSearching] = useState({txt:"...",spc:" "})
      const [dataSearched, setdataSearched] = useState()
      const [dataTable, setdataTable] = useState([])

      const onChange=(value)=>{
        setdataSearched(value)
        console.log(value)
      }

      const toFind=async()=>{
        try {
          var dataAnswered=[]
          console.log("Buscare por ", Searching.spc, "con la data de ", dataSearched)
          if(Searching.spc=="phone"){
              dataAnswered= await axios.get(`https://ngntrmk5-5000.usw3.devtunnels.ms/clients/search/phone?phone=${dataSearched}`)
            const arrAux=[dataAnswered.data]
            console.log("Lo hago arreglo", arrAux)
            setdataTable(arrAux)//lo metemos a un arreglo para que no se ponga nena



          }
          if(Searching.spc=="name"){
             dataAnswered= await axios.get(`https://ngntrmk5-5000.usw3.devtunnels.ms/clients/search/name?name=${dataSearched}`)
             setdataTable(dataAnswered.data)   
          }


        } catch (error) {
          console.log(error)
          Alert.alert("Algo salio mal", `No se realizo la busqueda, ${error}`)
        }
      }

      const deleteClient= async(ID)=>{
          try {
           await axios.delete(`https://ngntrmk5-5000.usw3.devtunnels.ms/clients/delete/${ID}`)
            Alert.alert("Usuario elimiando con exito")
          } catch (error) {
           Alert.alert("Algo salio mal", `No se elimino al cliente, ${error}`)
          }
      }

    const {navigate}= useNavigation()


    const mapped = dataTable.map((register)=>( 
    [register.name,register.phone_number,register.address,
      (<>
      <Pressable onPress={()=>deleteClient(register.id)}>
        <Text>🗑️</Text>
      </Pressable>
      <Pressable onPress={() => navigation.navigate('UpdateC', { userData: register })}>
        <Text>📝</Text>
      </Pressable>
      </>)]
    ))

    return (
        <>
        <View style={styles.container}>
            <View style={styles.nav}>
              <Text style={styles.title}>Clientes ingresados</Text>
            </View>

            <View style={styles.search}>
              <TextInput
              placeholder={`Buscar por ${Searching.txt}`}
              style={styles.search.input}
              onChangeText={(text)=>onChange(text)}></TextInput>

              <Pressable style={styles.search.boton} onPress={()=>toFind()}><Text>Buscar   </Text></Pressable>
              <Pressable style={styles.search.boton} onPress={()=>setSearching({txt:"telefono",spc:"phone"})}><Text> Por Telefono   </Text></Pressable>
              <Pressable style={styles.search.boton} onPress={()=>setSearching({txt:"nombre",spc:"name"})}><Text>  o por Nombre</Text></Pressable>
              {}
            </View>
            <Text style={styles.subTitle}>Datos registrados</Text>
            <ScrollView style={styles.mainContent}>
              <Table style={styles.tabla}> 
                <Row data={[ 'Nombre', 'Telefono', 'Domicilio', "Acciones"]} style={styles.head} textStyle={styles.text}/>
                <Rows data={mapped} textStyle={styles.text}/>
              </Table>
            </ScrollView>  
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
    fontWeight: "bold",
    marginHorizontal: 15,
    textAlign: "center",
    color:"#3924bb"
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
    backgroundColor: '#bdb7e1',
    paddingVertical: 12,
    paddingHorizontal: 8,
    marginVertical: 2,
    borderRadius: 5,
  },
  text: {
    fontSize: 16,
    color: "black",
    fontWeight: "bold",
    textAlign: "center"
  },
  title: {
    fontSize: 25,
    fontWeight: "bold",
    alignSelf: "center",
    marginBottom: 20,
    color: "#000"
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
  }
});