import React from "react";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types";
import CustomProgressIndicator from "../components/CustomProgressIndicator";

type Props = NativeStackScreenProps<RootStackParamList, "Initial">;

export default function InitScreen({ navigation }: Props) {
	return <CustomProgressIndicator />;
}
