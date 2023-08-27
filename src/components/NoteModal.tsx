import {
	View,
	TouchableOpacity,
	ScrollView,
	KeyboardAvoidingView,
	Platform,
	Alert,
	ActivityIndicator,
} from "react-native";
import React from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import MIcon from "react-native-vector-icons/MaterialIcons";
import themeConfig from "../config/theme";
import useStore from "../hooks/useStore";
import AntIcon from "react-native-vector-icons/AntDesign";
import FAIcon from "react-native-vector-icons/FontAwesome5";
import { actions, RichEditor, RichToolbar } from "react-native-pell-rich-editor";
import { StatusBar } from "expo-status-bar";
import useCreateNoteMutation from "../hooks/useCreateNote";
import { format as formatDate } from "date-fns";
import { Note } from "../types";
import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";
import useUpdateNoteMutation from "../hooks/useUpdateNote";
import Modal from "react-native-modal";
import useDeleteNoteMutation from "../hooks/useDeleteNote";

type Props = {
	isVisible: boolean;
	onClose: () => void;
	currentNote: Note | undefined;
};

export default function NoteModal({ isVisible, onClose, currentNote }: Props) {
	const insets = useSafeAreaInsets();
	const appStore = useStore();
	const theme = themeConfig(appStore.theme);
	const richText = React.useRef<RichEditor>(null);
	const [note, setNote] = React.useState<string>("");
	const scrollRef = React.useRef<ScrollView>(null);
	const [isPinned, setIsPinned] = React.useState<boolean>(false);

	const onReset = () => {
		setNote("");
		setIsPinned(false);
	};

	const createNote = useCreateNoteMutation(onReset);
	const updateNote = useUpdateNoteMutation(onReset);
	const deleteNoteMutation = useDeleteNoteMutation(() => {
		onClose?.();
		onReset();
	});
	const documentId: string = uuidv4();

	const newNote: Note = {
		content: note,
		createdDate: formatDate(new Date(), "MMMM YYY"),
		isPinned,
		userId: appStore.user?.uid,
		documentId,
	};

	const handleCloseModal = () => {
		onClose?.();
		setIsPinned(false);
		if (!note) return;
		if (currentNote) {
			updateNote.mutate({ content: note, isPinned, documentId: currentNote.documentId });
			return;
		}
		createNote.mutate(newNote);
	};

	const showDeleteAlert = () => {
		if (!currentNote?.documentId) return;
		Alert.alert("Do you want to delete note?", "", [
			{
				text: "Proceed",
				onPress: () => deleteNoteMutation.mutate({ documentId: currentNote.documentId }),
				style: "destructive",
			},
			{
				text: "Cancel",
				style: "cancel",
			},
		]);
	};

	// Editor config starts
	const editorInitializedCallback = () => {
		richText.current?.registerToolbar(function (items) {
			// items contain all the actions that are currently active
			// console.log("Toolbar click, selected items (insert end callback):", items);
		});
	};

	const handleCursorPosition = React.useCallback((scrollY: number) => {
		// Positioning scroll bar
		scrollRef.current?.scrollTo({ y: scrollY - 30, animated: true });
	}, []);

	// Editor config ends

	React.useEffect(() => {
		if (currentNote) {
			setNote(currentNote.content);
			setIsPinned(currentNote.isPinned);
		} else {
			setNote("");
			setIsPinned(false);
		}
	}, [currentNote]);

	return (
		<>
			<StatusBar style="auto" />
			<Modal
				isVisible={isVisible}
				coverScreen
				onBackButtonPress={handleCloseModal}
				hasBackdrop={false}
				style={{ margin: 0 }}
			>
				<View
					style={{
						flex: 1,
						paddingTop: insets.top + 20,
						backgroundColor: theme.primary,
					}}
				>
					{/* CTA */}
					<View
						style={{ flexDirection: "row", alignItems: "center", gap: 20, paddingHorizontal: 20 }}
					>
						<TouchableOpacity
							style={{ width: 30, height: 30 }}
							onPress={() => setIsPinned(!isPinned)}
						>
							<AntIcon name={isPinned ? "pushpin" : "pushpino"} size={25} color={theme.gold} />
						</TouchableOpacity>
						{deleteNoteMutation.isLoading ? (
							<ActivityIndicator />
						) : currentNote && note.trim() ? (
							<TouchableOpacity style={{ width: 30, height: 30 }} onPress={showDeleteAlert}>
								<FAIcon name="trash-alt" size={20} color={theme.red} />
							</TouchableOpacity>
						) : null}
						<TouchableOpacity
							onPress={handleCloseModal}
							disabled={deleteNoteMutation.isLoading}
							style={{
								marginLeft: "auto",
								backgroundColor: deleteNoteMutation.isLoading ? theme.faded : "rgba(0, 0, 0, 0.4)",
								width: 40,
								height: 40,
								borderRadius: 25,
								alignItems: "center",
								justifyContent: "center",
								shadowColor: theme.black,
								shadowOffset: {
									width: 0,
									height: 8,
								},
								shadowOpacity: 0.44,
								shadowRadius: 10.32,
								elevation: 16,
							}}
						>
							<MIcon name="close" size={25} color="#fff" />
						</TouchableOpacity>
					</View>
					{/* Rich Editor */}
					<ScrollView
						ref={scrollRef}
						contentContainerStyle={{ paddingTop: 32 }}
						nestedScrollEnabled={true}
						scrollEventThrottle={20}
						keyboardDismissMode="none"
					>
						<RichEditor
							// Don't focus on android at all! It's having a weird behaviour
							initialFocus={currentNote || Platform.OS === "android" ? false : true}
							initialContentHTML={note}
							ref={richText}
							placeholder="Start typing..."
							onChange={(text) => setNote(text)}
							editorInitializedCallback={editorInitializedCallback}
							containerStyle={{ flex: 1 }}
							editorStyle={{
								backgroundColor: "#fff",
								contentCSSText: `font-size: 16px; line-height: 24px; caret-color: ${theme.gold}`,
							}}
							style={{ minHeight: 300, flex: 1, paddingHorizontal: 20 }}
							useContainer={true}
							initialHeight={400}
							pasteAsPlainText={true}
							autoCapitalize="on"
							onCursorPosition={handleCursorPosition}
						/>
					</ScrollView>
					<KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}>
						<RichToolbar
							style={{ height: 70, backgroundColor: "#ece8e8" }}
							flatContainerStyle={{ paddingHorizontal: 10 }}
							editor={richText}
							iconTint={theme.black}
							selectedIconTint={theme.gold}
							iconSize={24}
							iconGap={24}
							actions={[
								actions.keyboard,
								actions.setBold,
								actions.setItalic,
								actions.setUnderline,
								actions.undo,
								actions.redo,
								actions.insertOrderedList,
								actions.setStrikethrough,
								actions.insertLink,
							]} // default defaultActions
						/>
					</KeyboardAvoidingView>
				</View>
			</Modal>
		</>
	);
}
