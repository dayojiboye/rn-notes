import { User, createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { useMutation } from "react-query";
import { showToast } from "../utils/helpers";
import { toastType } from "../enums";
import * as firestore from "firebase/firestore";
import db from "../../firebase/firebaseConfig";

export default function useSignUpMutation(name: string, avatar: string) {
	const auth = getAuth();

	return useMutation<User, unknown, { email: string; password: string }>(
		async (values) => {
			const response = await createUserWithEmailAndPassword(auth, values.email, values.password);

			const currentUser = response.user;
			const timestamp = new Date();

			try {
				const docRef = await firestore.addDoc(firestore.collection(db, "users"), {
					displayName: name,
					userAvatar: avatar,
					email: values.email,
					uid: currentUser.uid,
					createdDate: timestamp,
				});
				__DEV__ && console.log("Document written with ID: ", docRef.id);
			} catch (e: any) {
				__DEV__ && console.log("Error adding document: ", e);
				showToast(`Error adding document: ${e}`, toastType.ERROR);
			}

			return currentUser;
		},
		{
			onSuccess: (data) => {
				// Do anything
			},
			onError: (error: any) => {
				showToast(error, toastType.ERROR);
			},
		}
	);
}
