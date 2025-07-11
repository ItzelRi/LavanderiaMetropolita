import { createNativeStackNavigator} from "@react-navigation/native-stack";
import { NavigationContainer } from '@react-navigation/native';
import { Login } from "./Login";
import { Register } from "./Register";
import { CreateC } from "./CreateC";
import { TablesC } from "./TablesC";
import { UpdateC } from "./UpdateC";
import { TableS } from "./TableS";
import { UpdateS } from "./UpdateS";
import { CreateS } from "./CreateS";
import { TableG } from "./TableG";
import { UpdateG } from "./UpdateG";
import { CreateG } from "./CreateG";
import { CreateOrder } from "./CreateOrder";
import { CheckOut } from "./CheckOut";



const Stack = createNativeStackNavigator();
function RootStack() {
  return(
        <Stack.Navigator initialRouteName="CreateOrder" screenOptions={{headerShown:false}}>
{/*       <Stack.Screen name="Login" component={Login}/>
          <Stack.Screen name="Register" component={Register}/>
          <Stack.Screen name="CreateC" component={CreateC}/>
          <Stack.Screen name="UpdateC" component={UpdateC}/>
          <Stack.Screen name="TablesC" component={TablesC}/>
          <Stack.Screen name="TableS" component={TableS}/>
          <Stack.Screen name="CreateS" component={CreateS}/> 
          <Stack.Screen name="TableG" component={TableG}/>
          <Stack.Screen name="UpdateG" component={UpdateG}/>
          <Stack.Screen name="CreateG" component={CreateG}/> */}
          <Stack.Screen name="TableS" component={TableS}/>
          <Stack.Screen name="UpdateS" component={UpdateS}/>
          <Stack.Screen name="CreateS" component={CreateS}/>
          <Stack.Screen name="TableG" component={TableG}/>
          <Stack.Screen name="UpdateG" component={UpdateG}/>
          <Stack.Screen name="CreateG" component={CreateG}/>

          <Stack.Screen name="CheckOut" component={CheckOut}/>
          <Stack.Screen name="CreateOrder" component={CreateOrder}/>

        </Stack.Navigator>

    );
  }
  
  export default function App() {
  return (
     <NavigationContainer>
      <RootStack/>
     </NavigationContainer>
  );
}