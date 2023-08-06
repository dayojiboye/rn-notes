import React from "react";
import { AppContextValue, UserData } from "../types";
import AsyncStorage from "@react-native-async-storage/async-storage";

const _storeUserPreferredTheme = async (value: string) => {
	try {
		await AsyncStorage.setItem("theme", value);
	} catch (err) {
		__DEV__ && console.log("Something went wrong saving user's theme", err);
	}
};

const _storeUserData = async (value: UserData) => {
	try {
		await AsyncStorage.setItem("userData", JSON.stringify(value));
	} catch (err) {
		__DEV__ && console.log("Something went wrong saving user data", err);
	}
};

const _removeUserData = async () => {
	try {
		await AsyncStorage.removeItem("userData");
	} catch (err) {
		__DEV__ && console.log("Something went wrong removing user data", err);
	}
};

// const _removeUserId = async () => {
// 	try {
// 		await AsyncStorage.removeItem("userId");
// 	} catch (err) {
// 		__DEV__ && console.log("Something went wrong removing user ID", err);
// 	}
// };

type AppContextAction =
	| { type: "toggle_theme"; payload: string }
	| { type: "login_user"; payload: UserData }
	| { type: "logout_user" }
	| { type: "init_app"; payload: boolean }
	| { type: "update_user"; payload: UserData };

const initialState: {
	theme: string;
	user: UserData | null;
	isInitializing: boolean;
	isAuth: boolean;
} = {
	theme: "LIGHT",
	user: null,
	isInitializing: true,
	isAuth: false,
};

export const AppContext = React.createContext({} as AppContextValue);

const reducer = (state: typeof initialState, action: AppContextAction) => {
	switch (action.type) {
		case "toggle_theme":
			return {
				...state,
				theme: action.payload,
			};

		case "login_user":
			return {
				...state,
				user: action.payload,
				isAuth: true,
			};

		case "logout_user":
			return {
				...state,
				user: null,
				isAuth: false,
			};

		case "init_app":
			return {
				...state,
				isInitializing: action.payload,
			};

		case "update_user":
			return {
				...state,
				user: action.payload,
			};

		default:
			throw new Error("Unsupported action type for app context");
	}
};

export default function AppProvider(props: React.PropsWithChildren<{}>) {
	const [state, dispatch] = React.useReducer(reducer, initialState);

	const value: AppContextValue = React.useMemo(() => {
		const toggleTheme = (value: string) => {
			dispatch({ type: "toggle_theme", payload: value });
			_storeUserPreferredTheme(value);
		};

		const loginUser = (user: UserData) => {
			dispatch({ type: "login_user", payload: user });
			_storeUserData(user);
		};

		const logoutUser = () => {
			dispatch({ type: "logout_user" });
			_removeUserData();
		};

		const setInitApp = (value: boolean) => {
			dispatch({ type: "init_app", payload: value });
		};

		const updateUserDetails = (user: UserData) => {
			dispatch({ type: "update_user", payload: user });
			_storeUserData(user);
		};

		return {
			theme: state.theme,
			user: state.user,
			isInitializing: state.isInitializing,
			isAuth: state.isAuth,
			toggleTheme,
			loginUser,
			logoutUser,
			setInitApp,
			updateUserDetails,
		};
	}, [state.theme, state.user, state.isInitializing, state.isAuth]);

	return <AppContext.Provider value={value} {...props} />;
}
