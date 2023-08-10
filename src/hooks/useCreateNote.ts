import { useMutation } from "react-query";
import db from "../../firebase/firebaseConfig";
import * as firestore from "firebase/firestore";
import { Note } from "../types";
import useStore from "./useStore";
import { showToast } from "../utils/helpers";
import { toastType } from "../enums";

export default function useCreateNoteMutation(userId: string) {
	const appStore = useStore();

	return useMutation<Note | undefined, unknown, Note>(
		async (values) => {
			if (!userId) {
				return;
			}
			const docRef = firestore.doc(db, "notes", userId);
			firestore.updateDoc(docRef, values);
			const newNote: Note = values;
			return newNote;
		},
		{
			onSuccess: (data) => {
				if (data) {
					// __DEV__ && console.log("New Note Data", data);
					appStore.addNote(data);
				} else {
					__DEV__ && console.log("Error adding note!");
				}
			},
			onError: (err: any) => {
				__DEV__ && console.log("Error adding note: ", err.message);
				showToast(err.message, toastType.ERROR);
			},
		}
	);
}
