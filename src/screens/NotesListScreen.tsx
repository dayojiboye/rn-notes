import React from "react";
import CustomAppBar from "../components/CustomAppBar";
import MIcon from "react-native-vector-icons/MaterialIcons";
import FIcon from "react-native-vector-icons/Feather";
import themeConfig from "../config/theme";
import useStore from "../hooks/useStore";
import { Keyboard, ScrollView, Text, TouchableOpacity, View } from "react-native";
import CustomTextInput from "../components/CustomTextInput";

export default function NotesListScreen() {
	const appTheme = themeConfig(useStore().theme);

	return (
		<>
			<CustomAppBar
				trailIcon={MIcon}
				trailIconProps={{ name: "more-vert", size: 32, color: appTheme.gold }}
			/>
			<TouchableOpacity
				activeOpacity={1}
				onPress={() => Keyboard.dismiss()}
				style={{ backgroundColor: appTheme.primary, paddingHorizontal: 20, gap: 20 }}
			>
				<Text style={{ color: appTheme.gold, fontFamily: "sfBold", fontSize: 32 }}>Notes</Text>
				<CustomTextInput
					placeholder="Search notes"
					onChangeText={() => {}}
					containerStyle={{
						borderRadius: 32,
						height: 60,
						backgroundColor: "#ece8e8",
						borderColor: "#ece8e8",
						paddingLeft: 20,
					}}
					inputStyle={{ fontSize: 16, paddingLeft: 10 }}
					icon={FIcon}
					iconProps={{ name: "search", size: 20, color: appTheme.gold }}
				/>
			</TouchableOpacity>
			<ScrollView
				style={{ backgroundColor: appTheme.primary }}
				contentContainerStyle={{ flex: 1 }}
			></ScrollView>
		</>
	);
}
