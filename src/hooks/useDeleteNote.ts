import { useMutation, useQueryClient } from "react-query";
import { showToast } from "../utils/helpers";
import { toastType } from "../enums";
import { doc, deleteDoc } from "firebase/firestore";
import db from "../../firebase/firebaseConfig";

export default function useDeleteNoteMutation(onDone?: () => void) {
	const queryClient = useQueryClient();

	return useMutation<unknown, unknown, { documentId: string }>(
		async (values) => {
			const response = await deleteDoc(doc(db, "notes", values.documentId));
			return response;
		},
		{
			onSuccess: () => {
				showToast("Note was successfully deleted", toastType.SUCCESS);
				onDone?.();
			},
			onError: (err: any) => {
				showToast(err.message, toastType.ERROR);
			},
			onSettled: () => queryClient.refetchQueries("user_notes"),
		}
	);
}
