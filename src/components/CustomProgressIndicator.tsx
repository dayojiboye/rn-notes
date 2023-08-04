import { View, ActivityIndicator, Text } from "react-native";
import React from "react";
import useStore from "../hooks/useStore";
import themeConfig from "../config/theme";

export default function CustomProgressIndicator() {
	const theme = themeConfig(useStore().theme);

	return (
		<View
			style={{
				position: "absolute",
				top: 0,
				left: 0,
				right: 0,
				bottom: 0,
				justifyContent: "center",
				alignItems: "center",
				zIndex: 1000,
			}}
		>
			<View
				style={{
					backgroundColor: theme.progressBg,
					width: 80,
					height: 80,
					alignItems: "center",
					justifyContent: "center",
					borderRadius: 4,
				}}
			>
				<ActivityIndicator />
			</View>
		</View>
	);
}
