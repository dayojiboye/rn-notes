import {
	Text,
	TouchableOpacity,
	StyleProp,
	ViewStyle,
	GestureResponderEvent,
	TextStyle,
	TouchableOpacityProps,
} from "react-native";
import React from "react";
import useTheme from "../hooks/useTheme";
import themeConfig from "../config/theme";

type Props = {
	disabled?: boolean;
	label: string;
	style?: StyleProp<ViewStyle>;
	labelStyle?: StyleProp<TextStyle>;
	activeOpacity?: number;
	onPress?: (event: GestureResponderEvent) => void;
	leftIcon?: any;
	rightIcon?: any;
	iconProps?: any;
} & TouchableOpacityProps;

export default function CustomTextButton({
	disabled,
	label = "Button",
	style,
	labelStyle,
	activeOpacity = 0.8,
	onPress,
	leftIcon,
	rightIcon,
	iconProps,
	...props
}: Props) {
	const theme = themeConfig(useTheme().theme);

	const Icon = leftIcon ? leftIcon : rightIcon;

	return (
		<TouchableOpacity
			activeOpacity={activeOpacity}
			disabled={disabled}
			style={[
				{
					alignItems: "center",
					// justifyContent: "center",
					flexDirection: "row",
					gap: 3,
					borderBottomColor: theme.gold,
					borderBottomWidth: 1,
				},
				style,
			]}
			onPress={onPress}
			{...props}
		>
			{leftIcon && <Icon {...iconProps} />}
			<Text style={[{ fontSize: 16, color: theme.gold, fontFamily: "sfMedium" }, labelStyle]}>
				{label}
			</Text>
			{rightIcon && <Icon {...iconProps} />}
		</TouchableOpacity>
	);
}
