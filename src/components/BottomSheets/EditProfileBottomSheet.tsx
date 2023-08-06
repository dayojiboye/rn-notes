import { ScrollView, Keyboard } from "react-native";
import React from "react";
import { BottomSheetModalMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import themeConfig from "../../config/theme";
import useStore from "../../hooks/useStore";
import AppBottomSheet from ".";
import { profileItemsEnum } from "../../enums";
import CustomTextInput from "../CustomTextInput";
import CustomButton from "../CustomButton";
import useUpdateNameMutation from "../../hooks/useUpdateName";
import { mailFormat } from "../../utils/helpers";

type Props = {
	itemType: profileItemsEnum | undefined;
	onClose: () => void;
};

const EditProfileBottomSheet = React.forwardRef(
	({ itemType, onClose }: Props, ref: React.Ref<BottomSheetModalMethods>) => {
		const appStore = useStore();
		const defaultSnapPoints = ["28%"];
		const theme = themeConfig(appStore.theme);
		const [displayName, setDisplayName] = React.useState<string>("");
		const [email, setEmail] = React.useState<string>("");
		const [snapPoints, setSnapPoints] = React.useState(defaultSnapPoints);

		const closeBottomsheet = React.useCallback(() => {
			if (disableDismiss) return;
			// Keyboard.dismiss();
			// @ts-ignore
			ref?.current?.close();
		}, []);

		const updateDisplayName = useUpdateNameMutation(closeBottomsheet);

		const disableDismiss = updateDisplayName.isLoading;

		React.useEffect(() => {
			const keyboardDidShowListener = Keyboard.addListener("keyboardDidShow", () => {
				setSnapPoints(["80%"]);
			});

			const keyboardWillShowListener = Keyboard.addListener("keyboardWillShow", () => {
				setSnapPoints(["80%"]);
			});

			const keyboardDidHideListener = Keyboard.addListener("keyboardDidHide", () => {
				setSnapPoints(defaultSnapPoints);
			});

			const keyboardWillHideListener = Keyboard.addListener("keyboardWillHide", () => {
				setSnapPoints(defaultSnapPoints);
			});

			return () => {
				keyboardDidShowListener.remove();
				keyboardWillShowListener.remove();
				keyboardDidHideListener.remove();
				keyboardWillHideListener.remove();
			};
		}, []);

		const renderBasedOnType = () => {
			switch (itemType) {
				case profileItemsEnum.DISPLAY_NAME:
					return (
						<>
							<CustomTextInput
								defaultValue={appStore.user?.displayName}
								onChangeText={(value: string) => setDisplayName(value)}
							/>
							<CustomButton
								label="Update"
								isLoading={updateDisplayName.isLoading}
								disabled={
									!displayName.trim() ||
									displayName.trim().toLowerCase() === appStore.user?.displayName.toLowerCase()
								}
								onPress={() => updateDisplayName.mutate({ displayName })}
							/>
						</>
					);

				// ** //

				// ** //

				default:
					return null;
			}
		};

		return (
			<AppBottomSheet
				ref={ref}
				snapPoints={snapPoints}
				closeBottomsheet={closeBottomsheet}
				enableHandlePanningGesture={!disableDismiss}
			>
				<ScrollView
					style={{ flex: 1 }}
					contentContainerStyle={{
						paddingTop: 16,
						paddingHorizontal: 20,
						flexDirection: "row",
						flexWrap: "wrap",
						rowGap: 10,
						justifyContent: "center",
					}}
					keyboardShouldPersistTaps="handled"
				>
					{renderBasedOnType()}
				</ScrollView>
			</AppBottomSheet>
		);
	}
);

export default EditProfileBottomSheet;
