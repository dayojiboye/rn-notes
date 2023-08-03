import { TextInput, TextInputProps } from "react-native";
import React from "react";
import themeConfig from "../config/theme";
import useTheme from "../hooks/useTheme";

type Props = {
	onChangeText: (text: string) => void;
	placeholder?: string;
} & TextInputProps;

export default function CustomTextInput({ onChangeText, placeholder, ...props }: Props) {
	const theme = themeConfig(useTheme().theme);

	return (
		<TextInput
			placeholder={placeholder}
			placeholderTextColor={theme.placeholder}
			style={{
				fontSize: 16,
				paddingHorizontal: 12,
				paddingVertical: 16,
				borderColor: theme.faded,
				backgroundColor: "transparent",
				borderWidth: 1,
			}}
			onChangeText={onChangeText}
			{...props}
		/>
	);
}
