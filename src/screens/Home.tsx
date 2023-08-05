import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { List } from "iconoir-react-native";
import { Image } from "react-native";
import NotesListScreen from "./NotesListScreen";
import ProfileScreen from "./ProfileScreen";
import themeConfig from "../config/theme";
import useStore from "../hooks/useStore";
import { avatarUrl } from "../constants";

const Tab = createBottomTabNavigator();

export default function Home() {
	const appStore = useStore();
	const theme = themeConfig(appStore.theme);
	const user = appStore.user;

	return (
		<Tab.Navigator
			screenOptions={{
				headerShown: false,
				tabBarShowLabel: false,
				tabBarStyle: {
					shadowColor: "rgba(0, 0, 0, 0.3)",
					shadowOpacity: 1,
					shadowRadius: 3,
					shadowOffset: { width: 1, height: 1 },
				},
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
								uri: user?.userAvatar || "https://api.dicebear.com/6.x/bottts/png?seed=Mittens",
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
