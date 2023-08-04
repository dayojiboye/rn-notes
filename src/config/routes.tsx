import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../screens/Home";
import SignUpScreen from "../screens/SignUpScreen";
import useAuthentication from "../hooks/useAuthentication";
import InitScreen from "../screens/InitScreen";
import { RootStackParamList } from "../types";

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppRoutes() {
	const { user } = useAuthentication();
	const [isAuthorized, setIsAuthorized] = React.useState<boolean>(false);

	React.useEffect(() => {
		if (user) setIsAuthorized(true);
		else setIsAuthorized(false);
	}, [user]);

	return (
		<Stack.Navigator screenOptions={{ headerShown: false }}>
			{isAuthorized ? (
				<>
					<Stack.Screen name="Home" component={Home} />
				</>
			) : (
				<>
					<Stack.Screen name="Initial" component={InitScreen} />
					<Stack.Screen name="Signup" component={SignUpScreen} />
				</>
			)}
		</Stack.Navigator>
	);
}
