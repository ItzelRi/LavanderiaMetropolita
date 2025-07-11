import { ScrollView, Pressable, StyleSheet, Text, View, Alert } from "react-native"
import { Table, Row, Rows } from "react-native-table-component"
import { useNavigation } from "@react-navigation/native"
import { useState, useEffect } from "react"
import axios from "axios"

export const TableG =({navigation})=>{ 
        useEffect(()=>{
        bdGarments()
        },[])
        
        const [dataTable, setdataTable] = useState([])
        
        const arrayEjemplo=[
  {
    "id": 1,
    "type": "Camisa",
    "description": "Camisa de algodón, color blanca, manga larga.",
    "observations": "Requiere tratamiento anti-manchas en el cuello."
  },
  {
    "id": 2,
    "type": "Pantalón",
    "description": "Pantalón de mezclilla azul marino.",
    "observations": "Bolsillos rotos, no necesita planchado."
  },
  {
    "id": 3,
    "type": "Vestido",
    "description": "Vestido de seda, color rojo, con detalles bordados.",
    "observations": "Procesar en tintorería por tela delicada."
  },
  {
    "id": 4,
    "type": "Sábana",
    "description": "Sábana matrimonial de algodón con estampado floral.",
    "observations": "Manchas visibles en el centro, lavado profundo recomendado."
  },
  {
    "id": 5,
    "type": "Chamarra",
    "description": "Chamarra acolchada con forro térmico.",
    "observations": "Secado a baja temperatura para proteger el relleno."
  }
]


        const bdGarments=async()=>{
        try{
            /* const allGarments = await axios.get("https://ngntrmk5-5000.usw3.devtunnels.ms/garments/getAll")
            setdataTable(allGarments.data.garments) */
            setdataTable(arrayEjemplo)
        } catch (error) {
           Alert.alert("Error al traer", `No se trajo su BD, ${error}`)
          }
      }

      const deleteGarment= async(ID)=>{
          try {
            //await axios.delete(`https://ngntrmk5-5000.usw3.devtunnels.ms/garments/delete/${ID}`)
            Alert.alert("Prenda elimianda con exito")
          } catch (error) {
           Alert.alert("Algo salio mal", `No se elimino la prenda, ${error}`)
          }
      }
 
    const {navigate}= useNavigation()


    const mapped = dataTable.map((register)=>( 
    [register.id,register.type,register.description,register.observations,
      (<>
      <View style={styles.actionsContainer}>
      <Pressable style={styles.action} onPress={()=>deleteGarment(register.id)}>
        <Text>🗑️</Text>
      </Pressable>
      <Pressable style={styles.action} onPress={() => navigation.navigate("UpdateG", { garmentData: register })}>
        <Text>📝</Text>
      </Pressable>
      </View>
      </>)]
    ))

    return (
        <>
        <View style={styles.container}>
            <View style={styles.nav}>
              <Text style={styles.title}>Prendas</Text>
            </View>
            {/* <Pressable onPress={() => navigation.navigate("CreateS")}>
                <Text>Añadir Prenda</Text>
            </Pressable> */}
            <Text style={styles.subTitle}>Datos registradas</Text>
            <ScrollView style={styles.scrollView}>
              <Table style={styles.tabla}> 
                <Row data={["ID","Tipo","Descripcion","Observaciones","Acciones"]} style={styles.head} textStyle={styles.text1}/>
                <Rows data={mapped} textStyle={styles.text2}/>
              </Table>

            </ScrollView>  
                <Pressable style={styles.send} onPress={() => navigation.navigate("CreateG")} >
                    <Text style={styles.textButton}>Añadir Prenda</Text>
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