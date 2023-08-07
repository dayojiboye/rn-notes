import { View, Text } from "react-native";
import React from "react";
import { StatusBar } from "expo-status-bar";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import themeConfig from "../config/theme";
import useStore from "../hooks/useStore";
import CustomTextInput from "../components/CustomTextInput";
import { mailFormat } from "../utils/helpers";
import CustomButton from "../components/CustomButton";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import CustomTextButton from "../components/CustomTextButton";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types";
import useSignInMutation from "../hooks/useSignIn";
import { Dimensions } from "react-native";

type Props = NativeStackScreenProps<RootStackParamList, "Login">;

export default function LoginScreen({ navigation }: Props) {
	const theme = themeConfig(useStore().theme);
	const signin = useSignInMutation();

	const [formValues, setFormValues] = React.useState({
		email: "",
		password: "",
	});

	const isDisabled: boolean =
		!formValues.email.trim() ||
		!formValues.email.trim().match(mailFormat) ||
		!formValues.password.trim();

	const handleChange = (name: string, value: string) => {
		setFormValues({
			...formValues,
			[name]: value,
		});
	};

	const handleSubmit = () => {
		if (isDisabled) return;
		signin.mutate({ email: formValues.email, password: formValues.password });
	};

	const { height } = Dimensions.get("window");

	return (
		<>
			<StatusBar style="dark" />
			<KeyboardAwareScrollView
				style={{ backgroundColor: "#fff" }}
				contentContainerStyle={{
					paddingHorizontal: 20,
					height,
					justifyContent: "center",
					backgroundColor: theme.primary,
				}}
				keyboardShouldPersistTaps="handled"
			>
				<Text
					style={{
						fontSize: 32,
						fontFamily: "sfBold",
						color: theme.secondary,
					}}
				>
					Sign In
				</Text>
				<Text
					style={{
						fontSize: 16,
						marginTop: 7,
						color: theme.secondary,
						fontFamily: "sf",
					}}
				>
					Log in with your credentials
				</Text>
				<View style={{ marginTop: 60, width: "100%", gap: 16 }}>
					<CustomTextInput
						placeholder="Enter Your E-mail"
						onChangeText={(value: string) => handleChange("email", value)}
						autoCapitalize="none"
					/>
					<CustomTextInput
						placeholder="Enter Your Password"
						onChangeText={(value: string) => handleChange("password", value)}
						isPassword
					/>
					<CustomButton
						label="Submit"
						disabled={isDisabled}
						isLoading={signin.isLoading}
						rightIcon={Icon}
						iconProps={{ color: theme.primary, size: 16, name: "arrow-right" }}
						onPress={handleSubmit}
					/>
					<View style={{ flexDirection: "row", alignItems: "center", gap: 3 }}>
						<Text style={{ fontSize: 15, color: theme.secondary, fontFamily: "sfMedium" }}>
							Don't have an account?
						</Text>
						<CustomTextButton
							label="Sign up"
							disabled={signin.isLoading}
							labelStyle={{ fontSize: 15 }}
							onPress={() => navigation.push("Signup")}
						/>
					</View>
				</View>
			</KeyboardAwareScrollView>
		</>
	);
}
