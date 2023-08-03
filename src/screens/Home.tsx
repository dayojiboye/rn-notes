import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { List } from "iconoir-react-native";
import { Image } from "react-native";
import NotesListScreen from "./NotesListScreen";
import ProfileScreen from "./ProfileScreen";
import themeConfig from "../config/theme";
import useTheme from "../hooks/useTheme";

const Tab = createBottomTabNavigator();

export default function Home() {
	const theme = themeConfig(useTheme().theme);

	return (
		<Tab.Navigator
			screenOptions={{
				headerShown: false,
				tabBarShowLabel: false,
				// tabBarStyle: { paddingBottom: 32, paddingTop: 10 },
			}}
		>
			<Tab.Screen
				name="Notes"
				component={NotesListScreen}
				options={{
					tabBarIcon: (props) => (
						<List color={props.focused ? theme.gold : theme.faded} height={36} width={36} />
					),
				}}
			/>
			<Tab.Screen
				name="Profile"
				component={ProfileScreen}
				options={{
					tabBarIcon: (props) => (
						<Image
							source={{
								uri: "https://api.dicebear.com/6.x/adventurer/png?seed=Zoe",
							}}
							style={{
								borderRadius: 18,
								width: 36,
								height: 36,
								borderColor: props.focused ? theme.gold : theme.faded,
								borderWidth: 1,
							}}
						/>
					),
				}}
			/>
		</Tab.Navigator>
	);
}
