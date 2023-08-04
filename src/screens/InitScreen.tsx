import React from "react";
import CustomProgressIndicator from "../components/CustomProgressIndicator";
import useAuthentication from "../hooks/useAuthentication";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types";
import useStore from "../hooks/useStore";

type Props = NativeStackScreenProps<RootStackParamList, "Initial">;

export default function InitScreen({ navigation }: Props) {
	const { user } = useAuthentication();
	const appStore = useStore();

	React.useEffect(() => {
		if (appStore.isInitialized && !appStore.user) {
			navigation.replace("Signup");
		}
	}, [appStore.isInitialized, user]);

	return <CustomProgressIndicator />;
}
