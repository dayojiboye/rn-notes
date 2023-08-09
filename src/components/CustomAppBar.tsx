import { Platform, TouchableOpacity, View, ViewStyle } from "react-native";
import React from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import FIcons from "@expo/vector-icons/Fontisto";
import themeConfig from "../config/theme";
import useStore from "../hooks/useStore";
import { StyleProp } from "react-native";

export default function CustomAppBar({
	disabled,
	leadIcon,
	trailIcon,
	leadIconProps,
	trailIconProps,
}: {
	disabled?: boolean;
	leadIcon?: any;
	trailIcon?: any;
	leadIconProps?: any;
	trailIconProps?: any;
}) {
	const insets = useSafeAreaInsets();
	const appTheme = themeConfig(useStore().theme);

	return (
		<View
			style={{
				paddingHorizontal: 20,
				paddingTop: insets.top + 20,
				paddingBottom: 16,
				flexDirection: "row",
				// justifyContent: "space-between",
				alignItems: "center",
				position: "relative",
				zIndex: 4,
				// shadowColor: Platform.OS === "ios" ? "rgba(0, 0, 0, 0.1)" : "rgba(0, 0, 0, 0.5)",
				// elevation: 2,
				// shadowOpacity: 1,
				// shadowRadius: 6,
				// shadowOffset: { width: 0.5, height: 0.5 },
				backgroundColor: appTheme.primary,
			}}
		>
			{leadIcon ? (
				<AppBarButton
					disabled={disabled}
					onPress={() => {}}
					icon={leadIcon}
					iconProps={leadIconProps}
				/>
			) : null}
			{trailIcon ? (
				<AppBarButton
					disabled={disabled}
					onPress={() => {}}
					icon={trailIcon}
					iconProps={trailIconProps}
					style={{ marginLeft: "auto" }}
				/>
			) : null}
		</View>
	);
}

const AppBarButton = ({
	disabled,
	icon,
	iconProps,
	style,
	onPress,
}: {
	disabled?: boolean;
	icon: any;
	iconProps: any;
	style?: StyleProp<ViewStyle>;
	onPress: () => void;
}) => {
	const appTheme = themeConfig(useStore().theme);
	const Icon = icon;

	return (
		<TouchableOpacity
			disabled={disabled}
			style={[
				{
					width: 35,
					height: 35,
					alignItems: "center",
					justifyContent: "center",
				},
				style,
			]}
			onPress={onPress}
		>
			<Icon {...iconProps} />
		</TouchableOpacity>
	);
};
