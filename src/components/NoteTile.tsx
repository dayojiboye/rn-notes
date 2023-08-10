import { TouchableOpacity, View, useWindowDimensions } from "react-native";
import React from "react";
import { Note } from "../types";
import RenderHtml from "react-native-render-html";
import { palette } from "../constants";
import useStore from "../hooks/useStore";
import themeConfig from "../config/theme";
import AntIcon from "react-native-vector-icons/AntDesign";

type Props = {
	note: Note;
	index: number;
};

const NoteTile = React.memo(function NoteTile({ note, index }: Props) {
	const { width } = useWindowDimensions();
	const colorScheme = React.useMemo(() => palette[index % palette.length], [index]);
	const appStore = useStore();
	const appTheme = themeConfig(appStore.theme);

	const source: { html: string } = {
		html: note.content.slice(0, 50),
	};

	return (
		<TouchableOpacity
			activeOpacity={0.7}
			style={{
				backgroundColor: colorScheme,
				flex: 1,
				maxWidth: "48%",
				height: 150,
				borderRadius: 8,
				paddingHorizontal: 16,
				paddingVertical: 10,
				position: "relative",
			}}
		>
			{note.isPinned ? (
				<View
					style={{
						position: "absolute",
						right: 10,
						top: 10,
						backgroundColor: "rgba(0, 0, 0, 0.4)",
						width: 30,
						height: 30,
						borderRadius: 15,
						alignItems: "center",
						justifyContent: "center",
					}}
				>
					<AntIcon name="pushpin" size={16} color="#f0eded" />
				</View>
			) : null}
			<RenderHtml
				contentWidth={width}
				source={source}
				baseStyle={{ fontSize: 15, lineHeight: 20 }}
			/>
		</TouchableOpacity>
	);
});

export default NoteTile;
