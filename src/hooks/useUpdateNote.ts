import { useMutation, useQueryClient } from "react-query";
import { showToast } from "../utils/helpers";
import { toastType } from "../enums";
import * as firestore from "firebase/firestore";
import db from "../../firebase/firebaseConfig";

export default function useUpdateNoteMutation(onClear: () => void) {
	const queryClient = useQueryClient();

	return useMutation<unknown, unknown, { content: string; isPinned: boolean; documentId: string }>(
		async (values) => {
			const docRef = firestore.doc(db, "notes", values.documentId);
			await firestore.updateDoc(docRef, {
				content: values.content,
				isPinned: values.isPinned,
			});
		},
		{
			onError: (err: any) => {
				showToast(err.message, toastType.ERROR);
			},
			onSettled: () => {
				onClear?.();
				queryClient.refetchQueries("user_notes");
			},
		}
	);
}
