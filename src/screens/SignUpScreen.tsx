import { View, Text, TouchableOpacity, Keyboard, Image, Dimensions } from "react-native";
import React from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { StatusBar } from "expo-status-bar";
import themeConfig from "../config/theme";
import useStore from "../hooks/useStore";
import CustomTextInput from "../components/CustomTextInput";
import CustomButton from "../components/CustomButton";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import CustomTextButton from "../components/CustomTextButton";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { mailFormat } from "../utils/helpers";
import useSignUpMutation from "../hooks/useSignUp";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types";
import AvatarsBottomSheet from "../components/BottomSheets/AvatarsBottomSheet";
import AntIcon from "react-native-vector-icons/AntDesign";

type Props = NativeStackScreenProps<RootStackParamList, "Signup">;

export default function SignUpScreen({ navigation }: Props) {
	const theme = themeConfig(useStore().theme);
	const bottomSheetModalRef = React.useRef<BottomSheetModal>(null);

	const [formValues, setFormValues] = React.useState({
		name: "",
		email: "",
		password: "",
		avatar: "",
	});

	const isDisabled: boolean =
		!formValues.name.trim() ||
		!formValues.email.trim() ||
		!formValues.email.trim().match(mailFormat) ||
		!formValues.password.trim() ||
		formValues.password.trim().length < 6 ||
		!formValues.avatar;

	const signupMutation = useSignUpMutation(formValues.name, formValues.avatar);

	const openBottomsheet = React.useCallback(() => {
		Keyboard.dismiss();
		bottomSheetModalRef.current?.present();
	}, []);

	const handleChange = (name: string, value: string) => {
		setFormValues({
			...formValues,
			[name]: value,
		});
	};

	const handleSubmit = () => {
		if (isDisabled) return;
		signupMutation.mutate({ email: formValues.email, password: formValues.password });
	};

	const { height } = Dimensions.get("window");

	return (
		<>
			<StatusBar style="dark" />
			<KeyboardAwareScrollView
				style={{ backgroundColor: "#fff" }}
				contentContainerStyle={{
					paddingHorizontal: 20,
					justifyContent: "center",
					height,
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
					Sign Up
				</Text>
				<Text
					style={{
						fontSize: 16,
						marginTop: 7,
						color: theme.secondary,
						fontFamily: "sf",
					}}
				>
					Create an account to get started
				</Text>
				<View style={{ marginTop: 60, width: "100%", gap: 16 }}>
					<CustomTextInput
						placeholder="Enter Your Name"
						onChangeText={(value: string) => handleChange("name", value)}
					/>
					<CustomTextInput
						placeholder="Enter Your E-mail"
						onChangeText={(value: string) => handleChange("email", value)}
						autoCapitalize="none"
						keyboardType="email-address"
					/>
					<View style={{ gap: 5 }}>
						<CustomTextInput
							placeholder="Enter Your Password"
							onChangeText={(value: string) => handleChange("password", value)}
							isPassword
						/>
						<View style={{ flexDirection: "row", gap: 5, alignItems: "center" }}>
							<AntIcon name="exclamationcircleo" color={theme.gold} size={12} />
							<Text style={{ fontFamily: "sf", fontSize: 12, color: theme.gold }}>
								Password should be at least 6 characters
							</Text>
						</View>
					</View>
					<TouchableOpacity
						activeOpacity={0.8}
						style={{
							borderWidth: 1,
							borderRadius: 4,
							borderColor: theme.faded,
							paddingHorizontal: 20,
							paddingVertical: 16,
							justifyContent: "center",
							height: 50,
						}}
						onPress={openBottomsheet}
					>
						{formValues.avatar ? (
							<Image
								source={{ uri: formValues.avatar }}
								style={{
									width: 28,
									height: 28,
									objectFit: "contain",
									borderRadius: 28 / 2,
									borderWidth: 1,
									borderColor: theme.gold,
									backgroundColor: theme.gold,
								}}
							/>
						) : (
							<Text style={{ fontSize: 14, fontFamily: "sf", color: theme.secondary }}>
								Select an avatar
							</Text>
						)}
					</TouchableOpacity>
					<CustomButton
						label="Submit"
						isLoading={signupMutation.isLoading}
						disabled={isDisabled}
						rightIcon={Icon}
						iconProps={{ color: theme.primary, size: 16, name: "arrow-right" }}
						onPress={handleSubmit}
					/>
					<View style={{ flexDirection: "row", alignItems: "center", gap: 3 }}>
						<Text style={{ fontSize: 15, color: theme.secondary, fontFamily: "sfMedium" }}>
							Already have an account?
						</Text>
						<CustomTextButton
							label="Log in"
							labelStyle={{ fontSize: 15 }}
							onPress={() => navigation.push("Login")}
						/>
					</View>
				</View>
			</KeyboardAwareScrollView>
			<AvatarsBottomSheet
				ref={bottomSheetModalRef}
				selectedAvatar={formValues.avatar}
				handleChange={(name, value) => handleChange(name, value)}
			/>
		</>
	);
}
