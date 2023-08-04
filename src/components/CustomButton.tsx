import {
	Text,
	TouchableOpacity,
	StyleProp,
	ViewStyle,
	GestureResponderEvent,
	TextStyle,
	TouchableOpacityProps,
	ActivityIndicator,
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
	isLoading?: boolean;
} & TouchableOpacityProps;

export default function CustomButton({
	disabled,
	label = "Button",
	style,
	labelStyle,
	activeOpacity = 0.8,
	onPress,
	leftIcon,
	rightIcon,
	iconProps,
	isLoading,
	...props
}: Props) {
	const theme = themeConfig(useTheme().theme);

	const Icon = leftIcon ? leftIcon : rightIcon;

	return (
		<TouchableOpacity
			activeOpacity={activeOpacity}
			disabled={disabled || isLoading}
			style={[
				{
					backgroundColor: disabled || isLoading ? theme.disabled : theme.gold,
					width: "100%",
					height: 50,
					alignItems: "center",
					justifyContent: "center",
					flexDirection: "row",
					gap: 3,
					borderRadius: 4,
				},
				style,
			]}
			onPress={onPress}
			{...props}
		>
			{isLoading ? (
				<ActivityIndicator size="small" color={theme.secondary} />
			) : (
				<>
					{leftIcon && <Icon {...iconProps} />}
					<Text
						style={[{ fontSize: 16, color: theme.secondary, fontFamily: "sfMedium" }, labelStyle]}
					>
						{label}
					</Text>
					{rightIcon && <Icon {...iconProps} />}
				</>
			)}
		</TouchableOpacity>
	);
}
