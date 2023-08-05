import { View, Text, TouchableOpacity, Keyboard, ScrollView, Image } from "react-native";
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
import Backdrop from "../components/Backdrop";
import { avatarList } from "../utils/mockData";
import { mailFormat } from "../utils/helpers";
import useSignUpMutation from "../hooks/useSignUp";
import { avatarUrl } from "../constants";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types";

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
		!formValues.password ||
		!formValues.avatar;

	const signupMutation = useSignUpMutation(formValues.name, formValues.avatar);

	const openBottomsheet = React.useCallback(() => {
		Keyboard.dismiss();
		bottomSheetModalRef.current?.present();
	}, []);

	const closeBottomsheet = React.useCallback(() => {
		Keyboard.dismiss();
		bottomSheetModalRef.current?.close();
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
						color: theme.secondary,
					}}
				>
					Sign Up
				</Text>
				<Text
					style={{
						textAlign: "center",
						fontSize: 16,
						marginTop: 7,
						color: theme.secondary,
						fontFamily: "sf",
					}}
				>
					Fill in your details to register
				</Text>
				<View style={{ marginTop: 32, width: "100%", gap: 16 }}>
					<CustomTextInput
						placeholder="Enter Your Name"
						onChangeText={(value: string) => handleChange("name", value)}
					/>
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
					<TouchableOpacity
						activeOpacity={0.8}
						style={{
							borderWidth: 1,
							borderRadius: 4,
							borderColor: theme.faded,
							paddingHorizontal: 12,
							paddingVertical: 16,
							justifyContent: "center",
							maxHeight: 50,
						}}
						onPress={openBottomsheet}
					>
						{formValues.avatar ? (
							<Image
								source={{
									uri: `${avatarUrl}${formValues.avatar}`,
								}}
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
							<Text style={{ fontSize: 16, fontFamily: "sf", color: theme.secondary }}>
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
			<BottomSheetModal
				ref={bottomSheetModalRef}
				index={0}
				snapPoints={["28%", "40%"]}
				handleIndicatorStyle={{ backgroundColor: theme.faded, width: 60 }}
				backdropComponent={(props) => <Backdrop onPress={closeBottomsheet} {...props} />}
			>
				<ScrollView
					style={{ flex: 1 }}
					contentContainerStyle={{
						paddingTop: 16,
						paddingHorizontal: 20,
						flexDirection: "row",
						flexWrap: "wrap",
						rowGap: 10,
						columnGap: 20,
						justifyContent: "center",
					}}
				>
					{avatarList.map((item, index) => (
						<TouchableOpacity
							key={index}
							activeOpacity={0.8}
							style={{
								width: 60,
								height: 60,
								borderRadius: 30,
								borderWidth: 1,
								borderColor: formValues.avatar === item ? theme.gold : "transparent",
								backgroundColor: formValues.avatar === item ? theme.gold : "transparent",
							}}
							onPress={() => {
								handleChange("avatar", item);
								closeBottomsheet();
							}}
						>
							<Image
								source={{ uri: `${avatarUrl}${item}` }}
								style={{ width: "100%", height: "100%" }}
							/>
						</TouchableOpacity>
					))}
				</ScrollView>
			</BottomSheetModal>
		</>
	);
}
