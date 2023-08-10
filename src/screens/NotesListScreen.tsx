import React from "react";
import CustomAppBar from "../components/CustomAppBar";
import MIcon from "react-native-vector-icons/MaterialIcons";
import FIcon from "react-native-vector-icons/Feather";
import themeConfig from "../config/theme";
import useStore from "../hooks/useStore";
import { Keyboard, Platform, ScrollView, Text, TouchableOpacity, View } from "react-native";
import CustomTextInput from "../components/CustomTextInput";
import NoteModal from "../components/NoteModal";

export default function NotesListScreen() {
	const appTheme = themeConfig(useStore().theme);
	const [isModalVisible, setIsModalVisible] = React.useState<boolean>(false);
	const [showFloatingButton, setShowFloatingButton] = React.useState<boolean>(true);

	return (
		<>
			<CustomAppBar
				trailIcon={MIcon}
				trailIconProps={{ name: "more-vert", size: 36, color: appTheme.gold }}
			/>
			<View style={{ backgroundColor: "red", flex: 1, position: "relative" }}>
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
				{showFloatingButton ? (
					<TouchableOpacity
						activeOpacity={0.7}
						style={{
							position: "absolute",
							bottom: 72,
							right: 20,
							backgroundColor: appTheme.gold,
							width: 68,
							height: 68,
							borderRadius: 34,
							alignItems: "center",
							justifyContent: "center",
							shadowColor: appTheme.black,
							shadowOffset: {
								width: 0,
								height: 8,
							},
							shadowOpacity: 0.44,
							shadowRadius: 10.32,
							elevation: 16,
						}}
						onPress={() => {
							setShowFloatingButton(false);
							setIsModalVisible(true);
						}}
					>
						<MIcon name="add" size={36} color="#fff" />
					</TouchableOpacity>
				) : null}
			</View>
			<NoteModal
				isVisible={isModalVisible}
				onClose={() => {
					setShowFloatingButton(true);
					setIsModalVisible(false);
				}}
			/>
		</>
	);
}
