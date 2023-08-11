import { useMutation, useQueryClient } from "react-query";
import db from "../../firebase/firebaseConfig";
import * as firestore from "firebase/firestore";
import { Note } from "../types";
import { showToast } from "../utils/helpers";
import { toastType } from "../enums";

export default function useCreateNoteMutation(onClear: () => void) {
	const queryClient = useQueryClient();

	return useMutation<unknown, unknown, Note>(
		async (values) => {
			await firestore.setDoc(firestore.doc(db, "notes", values.documentId), values);
		},
		{
			onError: (err: any) => {
				__DEV__ && console.log("Error adding note: ", err.message);
				showToast(err.message, toastType.ERROR);
			},
			onSettled: () => {
				onClear?.();
				queryClient.refetchQueries("user_notes");
			},
		}
	);
}
