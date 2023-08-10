import {
	View,
	Text,
	Modal,
	TouchableOpacity,
	ScrollView,
	KeyboardAvoidingView,
	Platform,
} from "react-native";
import React from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import MIcon from "react-native-vector-icons/MaterialIcons";
import themeConfig from "../config/theme";
import useStore from "../hooks/useStore";
import AntIcon from "react-native-vector-icons/AntDesign";
import FAIcon from "react-native-vector-icons/FontAwesome5";
import {
	actions,
	FONT_SIZE,
	getContentCSS,
	RichEditor,
	RichToolbar,
} from "react-native-pell-rich-editor";
import { StatusBar } from "expo-status-bar";
import useCreateNoteMutation from "../hooks/useCreateNote";
import { format as formatDate } from "date-fns";
import { Note } from "../types";

type Props = {
	isVisible: boolean;
	onClose: () => void;
};

export default function NoteModal({ isVisible, onClose }: Props) {
	const insets = useSafeAreaInsets();
	const appStore = useStore();
	const theme = themeConfig(appStore.theme);
	const richText = React.useRef<RichEditor>(null);
	const [note, setNote] = React.useState<string>("");
	const scrollRef = React.useRef<ScrollView>(null);
	const [isPinned, setIsPinned] = React.useState<boolean>(false);

	const createNote = useCreateNoteMutation(() => setNote(""));

	const newNote: Note = {
		content: note,
		createdDate: formatDate(new Date(), "MMMM YYY"),
		isPinned,
		userId: appStore.user?.uid,
	};

	// Editor config starts
	const editorInitializedCallback = () => {
		richText.current?.registerToolbar(function (items) {
			// items contain all the actions that are currently active
			// console.log("Toolbar click, selected items (insert end callback):", items);
		});
	};

	const handleHeightChange = (height: any) => {
		// console.log("editor height change:", height);
	};

	const handleCursorPosition = React.useCallback((scrollY: number) => {
		// Positioning scroll bar
		scrollRef.current?.scrollTo({ y: scrollY - 30, animated: true });
	}, []);

	// const handleFontSize = React.useCallback(() => {
	//   // 1=  10px, 2 = 13px, 3 = 16px, 4 = 18px, 5 = 24px, 6 = 32px, 7 = 48px;
	//   let size = [1, 2, 3, 4, 5, 6, 7];
	//   richText.current?.setFontSize(size[XMath.random(size.length - 1)] as FONT_SIZE);
	// }, []);

	// const handleMessage = React.useCallback(({type, id, data}: {type: string; id: string; data?: any}) => {
	//   switch (type) {
	//     case 'ImgClick':
	//       richText.current?.commandDOM(`$('#${id}').src="${imageList[XMath.random(imageList.length - 1)]}"`);
	//       break;
	//     case 'TitleClick':
	//       const color = ['red', 'blue', 'gray', 'yellow', 'coral'];

	//       // command: $ = document.querySelector
	//       richText.current?.commandDOM(`$('#${id}').style.color='${color[XMath.random(color.length - 1)]}'`);
	//       break;
	//     case 'SwitchImage':
	//       break;
	//   }
	//   console.log('onMessage', type, id, data);
	// }, []);

	// const handleBlur = React.useCallback(() => {
	// 	createNote.mutate(newNote);
	// }, []);

	// Editor config ends

	// React.useEffect(() => {
	// 	console.log(note);
	// });

	// React.useEffect(() => {
	// 	console.log(appStore.notes);
	// }, [appStore.notes]);

	return (
		<>
			<StatusBar style="auto" />
			<Modal visible={isVisible} animationType="slide">
				<View
					style={{
						flex: 1,
						paddingTop: insets.top + 20,
						// paddingHorizontal: 20,
						backgroundColor: theme.primary,
					}}
				>
					{/* CTA */}
					<View
						style={{ flexDirection: "row", alignItems: "center", gap: 28, paddingHorizontal: 20 }}
					>
						<TouchableOpacity
							style={{ width: 40, height: 40 }}
							onPress={() => setIsPinned(!isPinned)}
						>
							<AntIcon name={isPinned ? "pushpin" : "pushpino"} size={35} color={theme.gold} />
						</TouchableOpacity>
						<TouchableOpacity style={{ width: 40, height: 40 }}>
							<FAIcon name="trash-alt" size={30} color={theme.red} />
						</TouchableOpacity>
						<TouchableOpacity
							onPress={() => {
								onClose?.();
								if (!note) return;
								createNote.mutate(newNote);
							}}
							style={{
								marginLeft: "auto",
								backgroundColor: "rgba(0, 0, 0, 0.4)",
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
							// To-Do: should only focus if it's a new note, on editing an existing note it shouldn't focus
							// Don't focus on android at all! It's having a weird behaviour
							// To-Do: save note on editor blur and on closing modal
							initialFocus={Platform.OS === "android" ? false : true}
							initialContentHTML={note}
							ref={richText}
							placeholder="Start writing..."
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
							// enterKeyHint="done"
							pasteAsPlainText={true}
							autoCapitalize="on"
							onCursorPosition={handleCursorPosition}
							// onBlur={handleBlur}
						/>
					</ScrollView>
					<KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}>
						<RichToolbar
							style={{ height: 70, backgroundColor: "#ece8e8" }}
							flatContainerStyle={{ paddingHorizontal: 10 }}
							editor={richText}
							// disabled={disabled}
							iconTint={theme.black}
							selectedIconTint={theme.gold}
							// disabledIconTint={theme.muted}
							// onPressAddImage={onPressAddImage}
							// onInsertLink={onInsertLink}
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
								// actions.insertVideo,
								// actions.insertImage,
								actions.setStrikethrough,
								actions.insertLink,
								// actions.checkboxList,
								// actions.blockquote,
								// actions.alignLeft,
								// actions.alignCenter,
								// actions.alignRight,
								// actions.code,
								// actions.line,
								// actions.foreColor,
								// actions.hiliteColor,
								// actions.heading1,
								// actions.heading4,
								// "insertEmoji",
								// "insertHTML",
								// "fontSize",
							]} // default defaultActions
							// iconMap={{
							//   insertEmoji: phizIcon,
							//   [actions.foreColor]: () => <Text style={[styles.tib, {color: 'blue'}]}>FC</Text>,
							//   [actions.hiliteColor]: ({tintColor}: IconRecord) => (
							//     <Text style={[styles.tib, {color: tintColor, backgroundColor: 'red'}]}>BC</Text>
							//   ),
							//   [actions.heading1]: ({tintColor}: IconRecord) => <Text style={[styles.tib, {color: tintColor}]}>H1</Text>,
							//   [actions.heading4]: ({tintColor}: IconRecord) => <Text style={[styles.tib, {color: tintColor}]}>H4</Text>,
							//   insertHTML: htmlIcon,
							// }}
							// insertEmoji={handleEmoji}
							// insertHTML={handleInsertHTML}
							// insertVideo={handleInsertVideo}
							// fontSize={handleFontSize}
							// foreColor={handleForeColor}
							// hiliteColor={handleHaliteColor}
						/>
						{/* {emojiVisible && <EmojiView onSelect={handleInsertEmoji} />} */}
					</KeyboardAvoidingView>
				</View>
			</Modal>
		</>
	);
}
