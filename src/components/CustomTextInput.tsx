import { TextInput, TextInputProps, TouchableOpacity, View } from "react-native";
import React from "react";
import themeConfig from "../config/theme";
import useStore from "../hooks/useStore";
import Icon from "react-native-vector-icons/Feather";

type Props = {
	onChangeText: (text: string) => void;
	placeholder?: string;
	isPassword?: boolean;
} & TextInputProps;

export default function CustomTextInput({
	onChangeText,
	placeholder,
	isPassword = false,
	...props
}: Props) {
	const theme = themeConfig(useStore().theme);
	const refInput = React.useRef<TextInput>(null);
	const [secureText, setSecureText] = React.useState<boolean>(true);

	return (
		<View
			style={{
				borderColor: theme.faded,
				backgroundColor: "transparent",
				borderWidth: 1,
				borderRadius: 4,
				flexDirection: "row",
				alignItems: "center",
				width: "100%",
			}}
		>
			<TextInput
				ref={refInput}
				placeholder={placeholder}
				placeholderTextColor={theme.placeholder}
				spellCheck={false}
				style={{
					fontSize: 16,
					color: theme.secondary,
					fontFamily: "sf",
					paddingHorizontal: 12,
					paddingVertical: 16,
					flex: 1,
				}}
				onChangeText={onChangeText}
				secureTextEntry={isPassword ? secureText : false}
				{...props}
			/>
			{isPassword && (
				<TouchableOpacity
					activeOpacity={0.8}
					style={{ marginRight: 12, marginLeft: 10 }}
					onPress={() => {
						refInput?.current?.focus();
						setSecureText(!secureText);
					}}
				>
					<Icon name={secureText ? "eye-off" : "eye"} size={22} color={theme.placeholder} />
				</TouchableOpacity>
			)}
		</View>
	);
}
