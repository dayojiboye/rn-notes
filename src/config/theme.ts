import { themeMode } from "../enums";

const lightTheme = {
	primary: "#fff",
	secondary: "#122620",
	progressBg: "rgba(0, 0, 0, 0.8)",
	background: "rgba(0, 39, 98, 0.83)",
	faded: "#ccc",
	placeholder: "#80868b",
	muted: "#eee",
	disabled: "#949191",
	gold: "#C29B0C",
	red: "#BA0F30",
	black: "#000",
	green: "#2E8B57",
};

const darkTheme = {
	primary: "#122620",
	secondary: "#fff",
	progressBg: "rgb(255, 255, 255)",
	background: "rgba(0, 0, 0, 0.83)",
	faded: "#ccc",
	placeholder: "#80868b",
	muted: "#eee",
	disabled: "#949191",
	gold: "#C29B0C",
	red: "#BA0F30",
	black: "#000",
	green: "#2E8B57",
};

const themeConfig = (value: string) => {
	if (value === themeMode.DARK) {
		return darkTheme;
	} else {
		return lightTheme;
	}
};

export default themeConfig;
