import React from "react";
import CustomAppBar from "../components/CustomAppBar";
import MIcon from "react-native-vector-icons/MaterialIcons";
import themeConfig from "../config/theme";
import useStore from "../hooks/useStore";
import { ScrollView, Text, View } from "react-native";
import CustomTextInput from "../components/CustomTextInput";

export default function NotesListScreen() {
	const appTheme = themeConfig(useStore().theme);

	return (
		<>
			<CustomAppBar
				trailIcon={MIcon}
				trailIconProps={{ name: "more-vert", size: 32, color: appTheme.gold }}
			/>
			<View style={{ backgroundColor: appTheme.primary, paddingHorizontal: 20, gap: 20 }}>
				<Text style={{ color: appTheme.gold, fontFamily: "sfBold", fontSize: 32 }}>Notes</Text>
				<CustomTextInput
					onChangeText={() => {}}
					containerStyle={{
						borderRadius: 32,
						height: 60,
						backgroundColor: "#ece8e8",
						borderColor: "#ece8e8",
					}}
					inputStyle={{ fontSize: 16 }}
				/>
			</View>
			<ScrollView
				style={{ backgroundColor: appTheme.primary }}
				contentContainerStyle={{ flex: 1 }}
			></ScrollView>
		</>
	);
}
