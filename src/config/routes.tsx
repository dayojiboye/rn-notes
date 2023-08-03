import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../screens/Home";
import SignUpScreen from "../screens/SignUpScreen";

const Stack = createNativeStackNavigator();

export default function AppRoutes() {
	return (
		<Stack.Navigator screenOptions={{ headerShown: false }}>
			{/* <Stack.Screen name="Home" component={Home} /> */}
			<Stack.Screen name="Signup" component={SignUpScreen} />
		</Stack.Navigator>
	);
}
