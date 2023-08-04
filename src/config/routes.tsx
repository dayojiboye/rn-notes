import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../screens/Home";
import SignUpScreen from "../screens/SignUpScreen";
import { useAuthentication } from "../hooks/useAuthentication";

const Stack = createNativeStackNavigator();

export default function AppRoutes() {
	const { user } = useAuthentication();

	return (
		<Stack.Navigator screenOptions={{ headerShown: false }}>
			{user ? (
				<Stack.Screen name="Home" component={Home} />
			) : (
				<>
					<Stack.Screen name="Signup" component={SignUpScreen} />
				</>
			)}
		</Stack.Navigator>
	);
}
