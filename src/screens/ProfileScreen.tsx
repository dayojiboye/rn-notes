import { ScrollView } from "react-native";
import React from "react";
import CustomButton from "../components/CustomButton";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import useSignOutMutation from "../hooks/useSignOut";

export default function ProfileScreen() {
	const insets = useSafeAreaInsets();
	const signout = useSignOutMutation();

	return (
		<ScrollView
			contentContainerStyle={{
				flex: 1,
				justifyContent: "center",
				alignItems: "center",
				paddingTop: insets.top + 20,
			}}
		>
			<CustomButton
				label="Log Out"
				style={{ width: "50%" }}
				isLoading={signout.isLoading}
				onPress={() => signout.mutate()}
			/>
		</ScrollView>
	);
}
