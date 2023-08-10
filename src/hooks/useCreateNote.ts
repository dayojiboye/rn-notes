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
			// if (!userId) {
			// 	return;
			// }
			// const docRef = firestore.doc(db, "notes", userId);
			// firestore.updateDoc(docRef, values);

			const docRef = await firestore.addDoc(firestore.collection(db, "notes"), values);
			if (docRef.id) {
				__DEV__ && console.log("Note document written with ID: ", docRef.id);
			}
			const newNote: Note = {
				...values,
				documentId: docRef.id,
			};
			return newNote;
		},
		{
			onSuccess: (data) => {
				if (data) {
					// __DEV__ && console.log("New Note Data", data);
					appStore.addNote(data);
					onClear?.();
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

// get user's order history
// export const handleGetUserOrderHistory = (userId) => {
//   return new Promise((res, rej) => {
//     let ref = firestore.collection('orders').orderBy('orderCreatedDate');
//     ref = ref.where('orderUserID', '==', userId);

//     ref
//       .get()
//       .then((snapshot) => {
//         const data = [
//           ...snapshot.docs.map((doc) => {
//             return {
//               ...doc.data(),
//               documentID: doc.id,
//             };
//           }),
//         ];

//         res({ data });
//       })
//       .catch((err) => {
//         rej(err);
//       });
//   });
// };
