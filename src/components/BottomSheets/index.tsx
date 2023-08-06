import React from "react";
import { BottomSheetModal, BottomSheetModalProps } from "@gorhom/bottom-sheet";
import Backdrop from "../Backdrop";
import { BottomSheetModalMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import themeConfig from "../../config/theme";
import useStore from "../../hooks/useStore";

const AppBottomSheet = React.forwardRef(
	(
		props: { closeBottomsheet: () => void } & BottomSheetModalProps,
		ref: React.Ref<BottomSheetModalMethods>
	) => {
		const theme = themeConfig(useStore().theme);

		return (
			<BottomSheetModal
				ref={ref}
				index={0}
				handleIndicatorStyle={{ backgroundColor: theme.faded, width: 60 }}
				backdropComponent={(backdropProps) => (
					<Backdrop onPress={props.closeBottomsheet} {...backdropProps} />
				)}
				{...props}
			>
				{props.children}
			</BottomSheetModal>
		);
	}
);

export default AppBottomSheet;
