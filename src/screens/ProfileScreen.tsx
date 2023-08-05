import { ActivityIndicator, Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import useSignOutMutation from "../hooks/useSignOut";
import useStore from "../hooks/useStore";
import themeConfig from "../config/theme";
import Icon from "react-native-vector-icons/AntDesign";
import OctIcon from "react-native-vector-icons/Octicons";
import { StatusBar } from "expo-status-bar";

export default function ProfileScreen() {
	const insets = useSafeAreaInsets();
	const signout = useSignOutMutation();
	const appStore = useStore();
	const theme = themeConfig(appStore.theme);

	return (
		<>
			<StatusBar style="dark" />
			<ScrollView
				contentContainerStyle={{ paddingBottom: 100 }}
				style={{ backgroundColor: theme.primary }}
			>
				<View
					style={{
						height: 300,
						width: "100%",
						alignItems: "center",
						justifyContent: "center",
						backgroundColor: "#F4EBD0",
					}}
				>
					<TouchableOpacity activeOpacity={0.8} style={{ position: "relative" }}>
						<Image
							source={{ uri: appStore.user?.userAvatar }}
							style={{
								width: 120,
								height: 120,
								borderWidth: 2,
								borderRadius: 130 / 2,
								borderColor: theme.gold,
							}}
						/>
						<View
							style={{
								backgroundColor: "#F4EBD0",
								width: 30,
								height: 30,
								borderRadius: 15,
								position: "absolute",
								right: 10,
								bottom: 0,
								alignItems: "center",
								justifyContent: "center",
								shadowColor: theme.faded,
								shadowOpacity: 1,
								shadowRadius: 1.7,
								shadowOffset: { width: 0.5, height: 0.5 },
							}}
						>
							<Icon name="edit" size={22} color="#4f4f4f" />
						</View>
					</TouchableOpacity>
					<Text
						style={{ color: theme.black, fontSize: 20, fontFamily: "sfSemiBold", marginTop: 16 }}
					>
						{appStore.user?.displayName}
					</Text>
				</View>
				<View style={{ paddingHorizontal: 20, paddingTop: 32, gap: 22 }}>
					<ProfileItem title="Display name" value={appStore.user?.displayName} />
					<ProfileItem title="Email address" value={appStore.user?.email} isVerified />
					<ProfileItem title="Joined" value={appStore.user?.createdDate} />
				</View>
				<TouchableOpacity
					activeOpacity={0.5}
					disabled={signout.isLoading}
					style={{
						alignSelf: "center",
						marginTop: 48,
						alignItems: "center",
						gap: 7,
						flexDirection: "row",
					}}
					onPress={() => signout.mutate()}
				>
					<Text style={{ color: theme.red, fontFamily: "sfMedium", fontSize: 18 }}>Log Out</Text>
					{signout.isLoading && <ActivityIndicator color={theme.red} />}
				</TouchableOpacity>
			</ScrollView>
		</>
	);
}

const ProfileItem = ({
	title,
	value,
	isVerified,
}: {
	title: string;
	value?: string | null;
	isVerified?: boolean;
}) => {
	const appStore = useStore();
	const theme = themeConfig(appStore.theme);

	return (
		<TouchableOpacity
			activeOpacity={0.7}
			style={{
				backgroundColor: "#f5f5f5",
				padding: 20,
				borderRadius: 4,
				flexDirection: "row",
				alignItems: "center",
				gap: 12,
			}}
		>
			<View style={{ gap: 7, marginRight: "auto" }}>
				<Text style={{ color: "#4a4a4c", fontFamily: "sfSemiBold", fontSize: 15 }}>{title}</Text>
				<Text style={{ color: theme.disabled, fontFamily: "sf", fontSize: 14 }}>{value}</Text>
			</View>
			{isVerified && <OctIcon name="verified" color={theme.green} size={22} />}
			<Icon name="edit" size={24} color="#4f4f4f" />
		</TouchableOpacity>
	);
};
