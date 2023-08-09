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

type Props = {
	isVisible: boolean;
	onClose: () => void;
};

export default function NoteModal({ isVisible, onClose }: Props) {
	const insets = useSafeAreaInsets();
	const theme = themeConfig(useStore().theme);
	const richText = React.useRef<RichEditor>(null);
	const [note, setNote] = React.useState<string>("");
	const scrollRef = React.useRef<ScrollView>(null);

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
		scrollRef.current!.scrollTo({ y: scrollY - 30, animated: true });
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

	return (
		<>
			<StatusBar style="auto" />
			<Modal
				visible={isVisible}
				animationType="slide"
				onRequestClose={() => {
					onClose?.();
				}}
			>
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
						style={{ flexDirection: "row", alignItems: "center", gap: 32, paddingHorizontal: 20 }}
					>
						<TouchableOpacity>
							<AntIcon name="pushpin" size={30} color={theme.gold} />
						</TouchableOpacity>
						<TouchableOpacity>
							<FAIcon name="trash-alt" size={30} color={theme.red} />
						</TouchableOpacity>
						<TouchableOpacity
							onPress={() => onClose?.()}
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
						contentContainerStyle={{ flex: 1, paddingTop: 32 }}
						nestedScrollEnabled={true}
						scrollEventThrottle={20}
						keyboardDismissMode="none"
					>
						<RichEditor
							initialFocus={true}
							ref={richText}
							placeholder="Start writing..."
							onChange={(text) => setNote(text)}
							editorInitializedCallback={editorInitializedCallback}
							containerStyle={{ flex: 1, paddingHorizontal: 20 }}
							editorStyle={{ backgroundColor: "#fff" }}
							style={{ minHeight: 300, flex: 1 }}
							useContainer={true}
							initialHeight={400}
							// enterKeyHint="done"
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
							// disabled={disabled}
							iconTint={theme.black}
							selectedIconTint={theme.gold}
							// disabledIconTint={theme.muted}
							// onPressAddImage={onPressAddImage}
							// onInsertLink={onInsertLink}
							iconSize={24}
							iconGap={24}
							// actions={[
							// 	actions.undo,
							// 	actions.redo,
							// 	actions.insertVideo,
							// 	actions.insertImage,
							// 	actions.setStrikethrough,
							// 	// actions.checkboxList,
							// 	actions.insertOrderedList,
							// 	actions.blockquote,
							// 	actions.alignLeft,
							// 	actions.alignCenter,
							// 	actions.alignRight,
							// 	actions.code,
							// 	actions.line,
							// 	actions.foreColor,
							// 	actions.hiliteColor,
							// 	actions.heading1,
							// 	actions.heading4,
							// 	// "insertEmoji",
							// 	// "insertHTML",
							// 	// "fontSize",
							// ]} // default defaultActions
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
