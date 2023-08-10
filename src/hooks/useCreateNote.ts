import { useMutation } from "react-query";
import db from "../../firebase/firebaseConfig";
import * as firestore from "firebase/firestore";
import { Note } from "../types";
import useStore from "./useStore";
import { showToast } from "../utils/helpers";
import { toastType } from "../enums";

export default function useCreateNoteMutation(onClear: () => void) {
	const appStore = useStore();

	return useMutation<Note | undefined, unknown, Note>(
		async (values) => {
			let newNote: Note | undefined;
			const docRef = await firestore.addDoc(firestore.collection(db, "notes"), values);
			if (docRef.id) {
				newNote = {
					...values,
					documentId: docRef.id,
				};
			}
			return newNote;
		},
		{
			onSuccess: (data) => {
				if (data) {
					appStore.addNote(data);
					onClear?.();
				}
			},
			onError: (err: any) => {
				__DEV__ && console.log("Error adding note: ", err.message);
				showToast(err.message, toastType.ERROR);
			},
		}
	);
}
