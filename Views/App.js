import { createNativeStackNavigator} from "@react-navigation/native-stack";
import { NavigationContainer } from '@react-navigation/native';

import { CreateC } from "./CreateC";
import { TablesC } from "./TablesC";
import { UpdateC } from "./UpdateC";

import { TableS } from "./TableS";
import { UpdateS } from "./UpdateS";
import { CreateS } from "./CreateS";

import { TableG } from "./TableG";
import { UpdateG } from "./UpdateG";
import { CreateG } from "./CreateG";

import { TableU } from "./TableU";
import { UpdateU } from "./UpdateU"; 
import { CreateU } from "./CreateU";

import { CreateOrder } from "./CreateOrder";
import { CheckOut } from "./CheckOut";

import { Dashboard } from "./Dashboard";
import { ListO } from "./ListO";
import { ListOP } from "./ListOP";
import { OrderDet } from "./OrderDet";


const Stack = createNativeStackNavigator();
function RootStack() {
  return(
        <Stack.Navigator initialRouteName="Dashboard" screenOptions={{headerShown:false}}>
          <Stack.Screen name="TablesC" component={TablesC}/>
          <Stack.Screen name="UpdateC" component={UpdateC}/>
          <Stack.Screen name="CreateC" component={CreateC}/>

          <Stack.Screen name="TableG" component={TableG}/>
          <Stack.Screen name="UpdateG" component={UpdateG}/>
          <Stack.Screen name="CreateG" component={CreateG}/>

          <Stack.Screen name="TableS" component={TableS}/>
          <Stack.Screen name="UpdateS" component={UpdateS}/>
          <Stack.Screen name="CreateS" component={CreateS}/>

          <Stack.Screen name="TableU" component={TableU}/>
          <Stack.Screen name="UpdateU" component={UpdateU}/>
          <Stack.Screen name="CreateU" component={CreateU}/>

          <Stack.Screen name="CheckOut" component={CheckOut}/>
          <Stack.Screen name="CreateOrder" component={CreateOrder}/>

          <Stack.Screen name="Dashboard" component={Dashboard}/>
          <Stack.Screen name="ListO" component={ListO}/>
          <Stack.Screen name="ListOP" component={ListOP}/>
          <Stack.Screen name="OrderDet" component={OrderDet}/>

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