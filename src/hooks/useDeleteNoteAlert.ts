import { Alert } from "react-native";
import useDeleteNoteMutation from "./useDeleteNote";

export default function useDeleteNoteAlert(documentId?: string, onDone?: () => void) {
	const deleteNoteMutation = useDeleteNoteMutation(() => onDone?.());

	const showAlert = () => {
		if (!documentId) return;
		Alert.alert("Do you want to delete note?", "", [
			{
				text: "Proceed",
				onPress: () => deleteNoteMutation.mutate({ documentId }),
				style: "destructive",
			},
			{
				text: "Cancel",
				style: "cancel",
			},
		]);
	};

	return showAlert;
}
