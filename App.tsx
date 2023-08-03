import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import ThemeProvider from "./src/context/theme-context";
import useTheme from "./src/hooks/useTheme";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React from "react";
import AppRoutes from "./src/config/routes";

SplashScreen.preventAutoHideAsync();

export default function App() {
	const appTheme = useTheme();

	const _getUserPreferredTheme = async () => {
		try {
			const value = await AsyncStorage.getItem("theme");
			if (value !== null) {
				appTheme.toggleTheme(value);
			}
		} catch (err) {
			__DEV__ && console.log("Something went wrong loading user's theme", err);
		}
	};

	const [fontsLoaded] = useFonts({
		sfLight: require("./assets/fonts/SF-Pro-Display-Light.otf"),
		sf: require("./assets/fonts/SF-Pro-Display-Regular.otf"),
		sfMedium: require("./assets/fonts/SF-Pro-Display-Medium.otf"),
		sfSemiBold: require("./assets/fonts/SF-Pro-Display-Semibold.otf"),
		sfBold: require("./assets/fonts/SF-Pro-Display-Bold.otf"),
	});

	const onLayoutRootView = React.useCallback(async () => {
		if (fontsLoaded) {
			_getUserPreferredTheme();
			await SplashScreen.hideAsync();
		}
	}, [fontsLoaded]);

	if (!fontsLoaded) {
		return null;
	}

	return (
		<ThemeProvider>
			<SafeAreaProvider onLayout={onLayoutRootView}>
				<BottomSheetModalProvider>
					<NavigationContainer>
						<AppRoutes />
					</NavigationContainer>
				</BottomSheetModalProvider>
			</SafeAreaProvider>
		</ThemeProvider>
	);
}