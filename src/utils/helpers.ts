import Toast from "react-native-root-toast";
import { toastType } from "../enums";

export const mailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

export const showToast = (
	message: string,
	variation?: toastType,
	position: number = 60,
	duration: number = Toast.durations.LONG
) =>
	Toast.show(message, {
		duration,
		position,
		backgroundColor: variation === toastType.ERROR ? "red" : "green",
		textColor: "#fff",
		textStyle: { fontSize: 16 },
		shadow: false,
		animation: true,
	});
