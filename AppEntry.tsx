import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import AppRoutes from "./src/config/routes";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { RootSiblingParent } from "react-native-root-siblings";
import * as SplashScreen from "expo-splash-screen";
import useStore from "./src/hooks/useStore";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFonts } from "expo-font";
import useAuthentication from "./src/hooks/useAuthentication";

SplashScreen.preventAutoHideAsync();

export default function AppEntry() {
	const appStore = useStore();
	const user = useAuthentication();

	const _getUserPreferredTheme = async () => {
		try {
			const value = await AsyncStorage.getItem("theme");
			if (value !== null) {
				appStore.toggleTheme(value);
			}
		} catch (err) {
			__DEV__ && console.log("Something went wrong loading user's theme", err);
		}
	};

	const _getUserData = async () => {
		try {
			const value = await AsyncStorage.getItem("userData");
			if (value !== null) {
				appStore.loginUser(JSON.parse(value));
			}
		} catch (err) {
			__DEV__ && console.log("Something went wrong loading user data", err);
		}
	};

	React.useEffect(() => {
		// App is ready..
		setTimeout(() => {
			appStore.setInitApp(false);
		}, 200);
	}, [user]);

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
			_getUserData();
			await SplashScreen.hideAsync();
		}
	}, [fontsLoaded]);

	if (!fontsLoaded || appStore.isInitializing) {
		// App is still loading
		return null;
	}

	return (
		<SafeAreaProvider onLayout={onLayoutRootView}>
			<GestureHandlerRootView style={{ flex: 1 }}>
				<BottomSheetModalProvider>
					<NavigationContainer>
						<RootSiblingParent>
							<AppRoutes />
						</RootSiblingParent>
					</NavigationContainer>
				</BottomSheetModalProvider>
			</GestureHandlerRootView>
		</SafeAreaProvider>
	);
}
