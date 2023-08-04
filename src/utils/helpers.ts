import Toast from "react-native-root-toast";
import { toastType } from "../enums";

export const mailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

export const showToast = (
	message: string,
	variation?: toastType,
	duration: number = Toast.durations.LONG,
	position: number = Toast.positions.BOTTOM
) =>
	Toast.show(message, {
		duration,
		position,
		backgroundColor: variation === toastType.ERROR ? "red" : "green",
		textColor: "#fff",
	});
