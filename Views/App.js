import { createNativeStackNavigator} from "@react-navigation/native-stack";
import { NavigationContainer } from '@react-navigation/native';
import { Login } from "./Login";
import { Register } from "./Register";
import { CreateC } from "./CreateC";
import { TablesC } from "./TablesC";
import { UpdateC } from "./UpdateC";


const Stack = createNativeStackNavigator();
function RootStack() {
  return(
        <Stack.Navigator initialRouteName="Register" screenOptions={{headerShown:false}}>
          <Stack.Screen name="Login" component={Login}/>
          <Stack.Screen name="Register" component={Register}/>
          <Stack.Screen name="CreateC" component={CreateC}/>
          <Stack.Screen name="UpdateC" component={UpdateC}/>
          <Stack.Screen name="TablesC" component={TablesC}/>
          
        </Stack.Navigator>

    );
  }export default function App() {
  return (
     <NavigationContainer>
      <RootStack/>
     </NavigationContainer>
  );
}