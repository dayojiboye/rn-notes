import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useMutation } from "react-query";
import { showToast } from "../utils/helpers";
import { toastType } from "../enums";
import useStore from "./useStore";
import { UserData } from "../types";
import * as firestore from "firebase/firestore";
import db from "../../firebase/firebaseConfig";

export default function useSignInMutation() {
	const auth = getAuth();
	const appStore = useStore();

	return useMutation<UserData, unknown, { email: string; password: string }>(
		async (values) => {
			const response = await signInWithEmailAndPassword(auth, values.email, values.password);
			let userData: UserData;

			try {
				const docRef = firestore.doc(db, "users", response.user.uid);
				const docSnap = await firestore.getDoc(docRef);

				if (docSnap.exists()) {
					userData = JSON.parse(JSON.stringify(docSnap.data()));
				} else {
					__DEV__ && console.log("No such document!");
					showToast("No such document!", toastType.ERROR);
				}
			} catch (err: any) {
				__DEV__ && console.log("Error fecthing document: ", err.message);
				showToast(err.message, toastType.ERROR);
			}

			return userData;
		},
		{
			onSuccess: (data) => {
				appStore.loginUser(data);
			},
			onError: (err: any) => {
				showToast(err.message, toastType.ERROR);
			},
		}
	);
}
