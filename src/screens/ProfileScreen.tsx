import {
	ActivityIndicator,
	Image,
	Platform,
	ScrollView,
	Text,
	TouchableOpacity,
	View,
} from "react-native";
import React from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import useSignOutMutation from "../hooks/useSignOut";
import useStore from "../hooks/useStore";
import themeConfig from "../config/theme";
import Icon from "react-native-vector-icons/AntDesign";
import OctIcon from "react-native-vector-icons/Octicons";
import EditProfileBottomSheet from "../components/BottomSheets/EditProfileBottomSheet";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import AvatarsBottomSheet from "../components/BottomSheets/AvatarsBottomSheet";
import useUpdateAvatarMutation from "../hooks/useUpdateAvatar";

export default function ProfileScreen() {
	const insets = useSafeAreaInsets();
	const signout = useSignOutMutation();
	const appStore = useStore();
	const theme = themeConfig(appStore.theme);
	const editProfileBottomSheetRef = React.useRef<BottomSheetModal>(null);
	const avatarsBottomSheetRef = React.useRef<BottomSheetModal>(null);
	const [currentAvatar, setCurrentAvatar] = React.useState<string | undefined>(
		appStore.user?.userAvatar
	);

	const updateAvatarMutation = useUpdateAvatarMutation(() =>
		avatarsBottomSheetRef.current?.close()
	);

	return (
		<>
			<ScrollView
				contentContainerStyle={{ paddingBottom: 100, paddingTop: insets.top }}
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
					<TouchableOpacity
						activeOpacity={0.8}
						style={{ position: "relative" }}
						onPress={() => avatarsBottomSheetRef.current?.present()}
					>
						<Image
							source={{ uri: appStore.user?.userAvatar }}
							style={{
								width: 120,
								height: 120,
								borderWidth: 2,
								borderRadius: 60,
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
								shadowColor: theme.black,
								elevation: 1,
								shadowOpacity: 1,
								shadowRadius: 1,
								shadowOffset: { width: 0, height: 0.5 },
								zIndex: 2,
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
					<ProfileItem
						title="Display name"
						value={appStore.user?.displayName}
						onPress={() => editProfileBottomSheetRef.current?.present()}
					/>
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
					<Text style={{ color: theme.red, fontFamily: "sfMedium", fontSize: 18 }}>
						{signout.isLoading ? "Logging Out..." : "Log Out"}
					</Text>
					{signout.isLoading && <ActivityIndicator color={theme.red} />}
				</TouchableOpacity>
			</ScrollView>
			<EditProfileBottomSheet ref={editProfileBottomSheetRef} />
			<AvatarsBottomSheet
				ref={avatarsBottomSheetRef}
				isUpdate
				selectedAvatar={currentAvatar ?? ""}
				isLoading={updateAvatarMutation.isLoading}
				handleChange={(_, value) => setCurrentAvatar(value)}
				onUpdate={() => {
					if (!currentAvatar || currentAvatar === appStore.user?.userAvatar) return;
					updateAvatarMutation.mutate({ avatar: currentAvatar });
				}}
			/>
		</>
	);
}

const ProfileItem = ({
	title,
	value,
	isVerified,
	onPress,
}: {
	title: string;
	value?: string | null;
	isVerified?: boolean;
	onPress?: () => void;
}) => {
	const appStore = useStore();
	const theme = themeConfig(appStore.theme);
	const isJoined = title.toLowerCase() === "joined";

	return (
		<TouchableOpacity
			activeOpacity={isJoined || isVerified ? 1 : 0.7}
			style={{
				backgroundColor: "#f5f5f5",
				padding: 20,
				borderRadius: 4,
				flexDirection: "row",
				alignItems: "center",
				gap: 12,
				shadowColor: Platform.OS === "ios" ? "rgba(0, 0, 0, 0.1)" : "rgba(0, 0, 0, 0.5)",
				elevation: 2,
				shadowOpacity: 1,
				shadowRadius: 1,
				shadowOffset: { width: 0.5, height: 0.5 },
			}}
			onPress={() => onPress?.()}
		>
			<View style={{ gap: 7, marginRight: "auto" }}>
				<Text style={{ color: "#4a4a4c", fontFamily: "sfSemiBold", fontSize: 15 }}>{title}</Text>
				<Text style={{ color: theme.disabled, fontFamily: "sf", fontSize: 14 }}>{value}</Text>
			</View>
			{isVerified && <OctIcon name="verified" color={theme.green} size={22} />}
			<Icon name={isJoined ? "calendar" : "edit"} size={24} color="#4f4f4f" />
		</TouchableOpacity>
	);
};
