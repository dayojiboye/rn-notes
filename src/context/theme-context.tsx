import React from "react";
import { ThemeContextValue } from "../types";
import AsyncStorage from "@react-native-async-storage/async-storage";

const _storeUserPreferredTheme = async (value: string) => {
	try {
		await AsyncStorage.setItem("theme", value);
	} catch (err) {
		__DEV__ && console.log("Something went wrong saving user's theme", err);
	}
};

type ThemeContextAction = { type: "toggle_theme"; payload: string };

const initialState = {
	theme: "LIGHT",
};

export const ThemeContext = React.createContext({} as ThemeContextValue);

const reducer = (state: typeof initialState, action: ThemeContextAction) => {
	switch (action.type) {
		case "toggle_theme":
			return {
				...state,
				theme: action.payload,
			};

		default:
			throw new Error("Unsupported action type for theme context");
	}
};

function ThemeProvider(props: React.PropsWithChildren<{}>) {
	const [state, dispatch] = React.useReducer(reducer, initialState);

	const value: ThemeContextValue = React.useMemo(() => {
		const toggleTheme = (value: string) => {
			dispatch({ type: "toggle_theme", payload: value });
			_storeUserPreferredTheme(value);
		};

		return {
			theme: state.theme,
			toggleTheme,
		};
	}, [state.theme]);

	return <ThemeContext.Provider value={value} {...props} />;
}

export default ThemeProvider;
