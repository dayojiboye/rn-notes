import React from "react";
import { BottomSheetBackdropProps } from "@gorhom/bottom-sheet";
import { Pressable, View } from "react-native";

export default function Backdrop({
	onPress,
}: BottomSheetBackdropProps & {
	onPress?: () => void;
}) {
	return (
		<Pressable
			style={{
				flex: 1,
				position: "absolute",
				top: 0,
				left: 0,
				right: 0,
				bottom: 0,
			}}
			onPress={() => onPress?.()}
		>
			<View style={{ backgroundColor: "rgba(0, 0, 0, 0.7)", flex: 1 }} />
		</Pressable>
	);
}
