import { themeMode } from "../enums";

const lightTheme = {
	primary: "#122620",
	secondary: "#fff",
	progressBg: "rgba(0, 0, 0, 0.8)",
	background: "rgba(0, 39, 98, 0.83)",
	faded: "#ccc",
	placeholder: "#80868b",
	muted: "#eee",
	disabled: "#949191",
	gold: "#C29B0C",
	red: "red",
};

const darkTheme = {
	primary: "#fff",
	secondary: "#122620",
	progressBg: "rgb(255, 255, 255)",
	background: "rgba(0, 0, 0, 0.83)",
	faded: "#ccc",
	placeholder: "#80868b",
	muted: "#eee",
	disabled: "#949191",
	gold: "#C29B0C",
	red: "red",
};

const themeConfig = (value: string) => {
	if (value === themeMode.DARK) {
		return darkTheme;
	} else {
		return lightTheme;
	}
};

export default themeConfig;
