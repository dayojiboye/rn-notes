import { ScrollView, TouchableOpacity, Image, Text, ActivityIndicator } from "react-native";
import React from "react";
import { BottomSheetModalMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import themeConfig from "../../config/theme";
import useStore from "../../hooks/useStore";
import { avatarList } from "../../utils/mockData";
import AppBottomSheet from ".";

type Props = {
	selectedAvatar: string;
	handleChange: (name: string, value: string) => void;
	isUpdate?: boolean;
	onUpdate?: () => void;
	isLoading?: boolean;
};

const AvatarsBottomSheet = React.forwardRef(
	(
		{ selectedAvatar, handleChange, isUpdate, onUpdate, isLoading }: Props,
		ref: React.Ref<BottomSheetModalMethods>
	) => {
		const appStore = useStore();
		const theme = themeConfig(appStore.theme);

		const isButtonDisabled: boolean =
			isLoading || !selectedAvatar || selectedAvatar === appStore.user?.userAvatar;

		const closeBottomsheet = React.useCallback(() => {
			if (isLoading) return;
			// @ts-ignore
			ref?.current?.close();
		}, []);

		return (
			<AppBottomSheet
				ref={ref}
				snapPoints={isUpdate ? ["45%"] : ["28%", "40%"]}
				closeBottomsheet={closeBottomsheet}
				enableHandlePanningGesture={!isLoading}
			>
				<ScrollView
					style={{ flex: 1 }}
					contentContainerStyle={{
						paddingTop: 16,
						paddingHorizontal: 8,
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
								borderColor: selectedAvatar === item ? theme.gold : "transparent",
								backgroundColor: selectedAvatar === item ? theme.gold : "transparent",
							}}
							onPress={() => {
								handleChange("avatar", item);
								if (isUpdate) return;
								closeBottomsheet();
							}}
						>
							<Image source={{ uri: item }} style={{ width: "100%", height: "100%" }} />
						</TouchableOpacity>
					))}
				</ScrollView>
				{isUpdate ? (
					<TouchableOpacity
						disabled={isButtonDisabled}
						style={{
							alignSelf: "center",
							flexDirection: "row",
							alignItems: "center",
							gap: 8,
							marginBottom: 32,
							opacity: isButtonDisabled ? 0.3 : 1,
						}}
						onPress={() => onUpdate?.()}
					>
						<Text style={{ color: theme.gold, fontFamily: "sfSemiBold", fontSize: 20 }}>
							{isLoading ? "Updating Avatar..." : "Update Avatar"}
						</Text>
						{isLoading ? <ActivityIndicator color={theme.gold} /> : null}
					</TouchableOpacity>
				) : null}
			</AppBottomSheet>
		);
	}
);

export default AvatarsBottomSheet;
