import { ScrollView, Keyboard, TouchableOpacity, Image } from "react-native";
import React from "react";
import { BottomSheetModalMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import themeConfig from "../../config/theme";
import useStore from "../../hooks/useStore";
import { avatarUrl } from "../../constants";
import { avatarList } from "../../utils/mockData";
import AppBottomSheet from ".";

type Props = {
	selectedAvatar: string;
	handleChange: (name: string, value: string) => void;
};

const AvatarsBottomSheet = React.forwardRef(
	({ selectedAvatar, handleChange }: Props, ref: React.Ref<BottomSheetModalMethods>) => {
		const theme = themeConfig(useStore().theme);

		const closeBottomsheet = React.useCallback(() => {
			Keyboard.dismiss();
			// @ts-ignore
			ref?.current?.close();
		}, []);

		return (
			<AppBottomSheet ref={ref} snapPoints={["28%", "40%"]} closeBottomsheet={closeBottomsheet}>
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
								borderColor: selectedAvatar === item ? theme.gold : "transparent",
								backgroundColor: selectedAvatar === item ? theme.gold : "transparent",
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
			</AppBottomSheet>
		);
	}
);

export default AvatarsBottomSheet;
