import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../screens/Home";
import SignUpScreen from "../screens/SignUpScreen";
import { RootStackParamList } from "../types";
import useStore from "../hooks/useStore";
import LoginScreen from "../screens/LoginScreen";

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppRoutes() {
	const appStore = useStore();

	return (
		<Stack.Navigator screenOptions={{ headerShown: false, gestureEnabled: false }}>
			{appStore.isAuth ? (
				<>
					<Stack.Screen name="Home" component={Home} />
				</>
			) : (
				<>
					{/* <Stack.Screen name="Initial" component={InitScreen} /> */}
					<Stack.Screen name="Login" component={LoginScreen} />
					<Stack.Screen name="Signup" component={SignUpScreen} />
				</>
			)}
		</Stack.Navigator>
	);
}
