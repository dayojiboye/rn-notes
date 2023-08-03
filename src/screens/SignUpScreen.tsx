import { View, Text } from "react-native";
import React from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { StatusBar } from "expo-status-bar";
import themeConfig from "../config/theme";
import useTheme from "../hooks/useTheme";
import CustomTextInput from "../components/CustomTextInput";
import CustomButton from "../components/CustomButton";
import { ArrowRight } from "iconoir-react-native";

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
			>
				<Text
					style={{
						fontSize: 32,
						textAlign: "center",
						fontFamily: "sfSemiBold",
						color: theme.primary,
					}}
				>
					Sign Up
				</Text>
				<Text style={{ textAlign: "center", fontSize: 16, marginTop: 16, color: theme.primary }}>
					Register to get started
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
						rightIcon={ArrowRight}
						iconProps={{ color: theme.secondary, width: 20, height: 20 }}
						onPress={handleSubmit}
					/>
				</View>
			</KeyboardAwareScrollView>
		</>
	);
}
