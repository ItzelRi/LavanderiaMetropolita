import { useNavigation } from "@react-navigation/native";
import { Pressable, StyleSheet, Text, View } from "react-native";

export const Dashboard = () => {
  const { navigate } = useNavigation();

  return (
    <View style={styles.containerMain}>
      <View style={styles.containerContent}>
        <Text style={styles.title}>Lavandería</Text>

        <View style={styles.crudb}>
          <View style={styles.rowButtons}>
            <Pressable style={styles.sendInline} onPress={() => navigate("TableG")}>
              <Text style={styles.textButtonInline}>Prendas</Text>
            </Pressable>
            <Pressable style={styles.sendInline} onPress={() => navigate("TableS")}>
              <Text style={styles.textButtonInline}>Servicios</Text>
            </Pressable>
            <Pressable style={styles.sendInline} onPress={() => navigate("TableU")}>
              <Text style={styles.textButtonInline}>Usuarios</Text>
            </Pressable>
            <Pressable style={styles.sendInline} onPress={() => navigate("TablesC")}>
              <Text style={styles.textButtonInline}>Clientes</Text>
            </Pressable>
          </View>
        </View>

        <Pressable style={styles.send} onPress={() => navigate("CreateOrder")}>
          <Text style={styles.textButton1}>Añadir Orden</Text>
        </Pressable>

        <View style={styles.rowOrders}>
          <Pressable style={styles.sendInline} onPress={() => navigate("ListO")}>
            <Text style={styles.textButtonInline}>Ordenes Generales</Text>
          </Pressable>
          <Pressable style={styles.sendInline} onPress={() => navigate("ListOP")}>
            <Text style={styles.textButtonInline}>Ordenes Pendientes</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  containerMain: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff"
  },
  containerContent: {
    flex: 1,
    justifyContent: "center"
  },
  title: {
    fontSize: 25,
    fontWeight: "bold",
    alignSelf: "center",
    marginBottom: 20,
    color: "#221386ff"
  },
  rowButtons: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    flexWrap: "wrap",
    marginBottom: 40
  },
  rowOrders: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    marginBottom: 40
  },
  sendInline: {
    marginHorizontal: 5,
    marginVertical: 5
  },
  textButtonInline: {
    backgroundColor: "#7a67ee",
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 10,
    textAlign: "center"
  },
  send: {
    marginBottom: 20,
    alignSelf: "center"
  },
  textButton1: {
    backgroundColor: "#22157aff",
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
    paddingVertical: 8,
    paddingHorizontal: 138,
    borderRadius: 10,
    textAlign: "center"
  },
  crudb: {
    backgroundColor: "#ccc4ff",
    marginBottom: 45,
    borderRadius: 20,
    paddingVertical: 15,
    paddingHorizontal: 15,
    height: 130
  }
});
