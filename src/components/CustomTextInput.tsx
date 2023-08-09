import {
	TextInput,
	TextInputProps,
	TextStyle,
	TouchableOpacity,
	View,
	ViewStyle,
} from "react-native";
import React from "react";
import themeConfig from "../config/theme";
import useStore from "../hooks/useStore";
import Icon from "react-native-vector-icons/Feather";
import { StyleProp } from "react-native";

type Props = {
	onChangeText: (text: string) => void;
	placeholder?: string;
	isPassword?: boolean;
	containerStyle?: StyleProp<ViewStyle>;
	inputStyle?: StyleProp<TextStyle>;
} & TextInputProps;

export default function CustomTextInput({
	onChangeText,
	placeholder,
	isPassword = false,
	containerStyle,
	inputStyle,
	...props
}: Props) {
	const theme = themeConfig(useStore().theme);
	const refInput = React.useRef<TextInput>(null);
	const [secureText, setSecureText] = React.useState<boolean>(true);

	return (
		<View
			style={[
				{
					borderColor: theme.faded,
					backgroundColor: "transparent",
					borderWidth: 1,
					borderRadius: 4,
					flexDirection: "row",
					alignItems: "center",
					width: "100%",
					height: 50,
				},
				containerStyle,
			]}
		>
			<TextInput
				ref={refInput}
				placeholder={placeholder}
				placeholderTextColor={theme.placeholder}
				spellCheck={false}
				cursorColor={theme.gold}
				selectionColor={theme.gold}
				style={[
					{
						fontSize: 14,
						color: theme.secondary,
						fontFamily: "sf",
						flex: 1,
						height: "100%",
						paddingHorizontal: 20,
					},
					inputStyle,
				]}
				onChangeText={onChangeText}
				secureTextEntry={isPassword ? secureText : false}
				{...props}
			/>
			{isPassword && (
				<TouchableOpacity
					activeOpacity={0.8}
					style={{
						height: "100%",
						justifyContent: "center",
						alignItems: "center",
						width: 50,
					}}
					onPress={() => {
						// refInput?.current?.focus();
						setSecureText(!secureText);
					}}
				>
					<Icon name={secureText ? "eye-off" : "eye"} size={20} color={theme.placeholder} />
				</TouchableOpacity>
			)}
		</View>
	);
}
