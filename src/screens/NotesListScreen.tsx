import React from "react";
import CustomAppBar from "../components/CustomAppBar";
import MIcon from "react-native-vector-icons/MaterialIcons";
import FIcon from "react-native-vector-icons/Feather";
import themeConfig from "../config/theme";
import useStore from "../hooks/useStore";
import { FlatList, Keyboard, Text, TouchableOpacity, View } from "react-native";
import CustomTextInput from "../components/CustomTextInput";
import NoteModal from "../components/NoteModal";
import useGetUserNotes from "../hooks/useGetUserNotes";
import NoteTile from "../components/NoteTile";
import { KeyboardAwareFlatList } from "react-native-keyboard-aware-scroll-view";

export default function NotesListScreen() {
	const appStore = useStore();
	const appTheme = themeConfig(appStore.theme);
	const [isModalVisible, setIsModalVisible] = React.useState<boolean>(false);
	const [showFloatingButton, setShowFloatingButton] = React.useState<boolean>(true);
	const [isRefreshing, setIsRefreshing] = React.useState<boolean>(false);

	const fetchUserNotes = useGetUserNotes(() => setIsRefreshing(false));

	const computedNotes = React.useCallback(() => {
		if (!fetchUserNotes.data) return [];
		const pinnedNotes = fetchUserNotes.data?.filter((n) => n.isPinned);
		const unpinnedNotes = fetchUserNotes.data?.filter((n) => !n.isPinned);
		return [
			{
				title: "Pinned Notes",
				data: pinnedNotes,
			},
			{
				title: "Notes",
				data: unpinnedNotes,
			},
		];
	}, [fetchUserNotes.data]);

	// To-Do: add skeleton loader
	return (
		<>
			<CustomAppBar
				trailIcon={MIcon}
				trailIconProps={{ name: "more-vert", size: 36, color: appTheme.gold }}
			/>
			<View style={{ backgroundColor: appTheme.primary, flex: 1, position: "relative" }}>
				<TouchableOpacity
					activeOpacity={1}
					onPress={() => Keyboard.dismiss()}
					style={{ backgroundColor: appTheme.primary, paddingHorizontal: 20, gap: 20 }}
				>
					<Text style={{ color: appTheme.gold, fontFamily: "sfBold", fontSize: 32 }}>Notes</Text>
					{fetchUserNotes?.data && fetchUserNotes.data?.length > 0 ? (
						<CustomTextInput
							placeholder="Search notes"
							onChangeText={() => {}}
							containerStyle={{
								borderRadius: 32,
								height: 60,
								backgroundColor: "#ece8e8",
								borderColor: "#ece8e8",
								paddingLeft: 20,
							}}
							inputStyle={{ fontSize: 16, paddingLeft: 10 }}
							icon={FIcon}
							iconProps={{ name: "search", size: 20, color: appTheme.gold }}
						/>
					) : null}
				</TouchableOpacity>
				<KeyboardAwareFlatList
					data={computedNotes()}
					initialNumToRender={20}
					keyExtractor={(_, index) => index.toString()}
					enableOnAndroid
					renderItem={({ item }) => {
						return (
							<FlatList
								scrollEnabled={false}
								data={item.data ? item.data : []}
								keyExtractor={(_, i) => i.toString()}
								renderItem={({ item, index }) => <NoteTile note={item} index={index} />}
								style={{ rowGap: 16 }}
								numColumns={2}
								columnWrapperStyle={{ columnGap: 16 }}
								ListHeaderComponent={() =>
									item.data && item.data?.length > 0 && item.title ? (
										<View style={{ marginTop: 20 }}>
											<Text style={{ fontFamily: "sfSemiBold", fontSize: 20 }}>{item.title}</Text>
										</View>
									) : null
								}
							/>
						);
					}}
					style={{ backgroundColor: appTheme.primary, marginTop: 20 }}
					contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 50 }}
					keyboardShouldPersistTaps="handled"
					refreshing={isRefreshing || fetchUserNotes.isLoading}
					onRefresh={() => {
						setIsRefreshing(true);
						fetchUserNotes.refetch();
					}}
				/>
				{showFloatingButton && !fetchUserNotes.isLoading ? (
					<TouchableOpacity
						activeOpacity={0.7}
						style={{
							position: "absolute",
							bottom: 72,
							right: 20,
							backgroundColor: appTheme.gold,
							width: 68,
							height: 68,
							borderRadius: 34,
							alignItems: "center",
							justifyContent: "center",
							shadowColor: appTheme.black,
							shadowOffset: {
								width: 0,
								height: 8,
							},
							shadowOpacity: 0.44,
							shadowRadius: 10.32,
							elevation: 16,
						}}
						onPress={() => {
							setShowFloatingButton(false);
							setIsModalVisible(true);
						}}
					>
						<MIcon name="add" size={36} color="#fff" />
					</TouchableOpacity>
				) : null}
			</View>
			<NoteModal
				isVisible={isModalVisible}
				onClose={() => {
					setShowFloatingButton(true);
					setIsModalVisible(false);
					fetchUserNotes.refetch();
				}}
			/>
		</>
	);
}
