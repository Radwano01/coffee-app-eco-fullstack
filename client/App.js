import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./src/pages/Home";
import Product from "./src/pages/Product";
import { Provider } from "react-redux";
import store from "./src/app/store";
import Cart from "./src/pages/Cart";
import AddressScreen from "./src/pages/AddressScreen";
import OrderPage from "./src/pages/OrderPage";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{ contentStyle: { backgroundColor: "white" } }}
        >
          <Stack.Screen
            name="Home"
            options={{ headerShown: false }}
            component={Home}
          />
          <Stack.Screen
            name="Product"
            options={{ headerShown: false }}
            component={Product}
          />
          <Stack.Screen
            name="Cart"
            options={{ headerShown: false }}
            component={Cart}
          />
          <Stack.Screen
            name="Address"
            options={{ headerShown: false }}
            component={AddressScreen}
          />
          <Stack.Screen
            name="Orders"
            options={{ headerShown: false }}
            component={OrderPage}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
