import { View, Text } from "react-native";
import React from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { StatusBar } from "expo-status-bar";
import themeConfig from "../config/theme";
import useTheme from "../hooks/useTheme";
import CustomTextInput from "../components/CustomTextInput";
import CustomButton from "../components/CustomButton";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import CustomTextButton from "../components/CustomTextButton";

export default function SignUpScreen() {
	const theme = themeConfig(useTheme().theme);

	const [formValues, setFormValues] = React.useState({
		name: "",
		email: "",
	});

	const handleChange = (name: string, value: string) => {
		setFormValues({
			...formValues,
			[name]: value,
		});
	};

	const handleSubmit = () => {
		if (!formValues.name.trim() || !formValues.email.trim()) return;
		console.log(formValues);
	};

	return (
		<>
			<StatusBar style="dark" />
			<KeyboardAwareScrollView
				contentContainerStyle={{
					paddingHorizontal: 20,
					alignItems: "center",
					flex: 1,
					justifyContent: "center",
				}}
				keyboardShouldPersistTaps="handled"
			>
				<Text
					style={{
						fontSize: 32,
						textAlign: "center",
						fontFamily: "sfBold",
						color: theme.primary,
					}}
				>
					Sign Up
				</Text>
				<Text style={{ textAlign: "center", fontSize: 16, marginTop: 7, color: theme.primary }}>
					Fill in your details to register
				</Text>
				<View style={{ marginTop: 32, width: "100%", gap: 16 }}>
					<CustomTextInput
						placeholder="John"
						onChangeText={(value: string) => handleChange("name", value)}
					/>
					<CustomTextInput
						placeholder="johndoe@test.com"
						onChangeText={(value: string) => handleChange("email", value)}
					/>
					<CustomButton
						label="Submit"
						rightIcon={Icon}
						iconProps={{ color: theme.secondary, size: 16, name: "arrow-right" }}
						onPress={handleSubmit}
					/>
					<View style={{ flexDirection: "row", alignItems: "center", gap: 3 }}>
						<Text style={{ fontSize: 15, color: theme.primary, fontFamily: "sfMedium" }}>
							Already have an account?
						</Text>
						<CustomTextButton label="Log in" labelStyle={{ fontSize: 15 }} />
					</View>
				</View>
			</KeyboardAwareScrollView>
		</>
	);
}
