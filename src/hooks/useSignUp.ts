import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { useMutation } from "react-query";
import { showToast } from "../utils/helpers";
import { toastType } from "../enums";
import * as firestore from "firebase/firestore";
import db from "../../firebase/firebaseConfig";
import useStore from "./useStore";
import { avatarUrl } from "../constants";
import { UserData } from "../types";

export default function useSignUpMutation(name: string, avatar: string) {
	const auth = getAuth();
	const appStore = useStore();

	return useMutation<UserData, unknown, { email: string; password: string }>(
		async (values) => {
			const response = await createUserWithEmailAndPassword(auth, values.email, values.password);

			const currentUser = response.user;
			const timestamp = new Date();

			const userData: UserData = {
				displayName: name,
				userAvatar: avatarUrl + avatar,
				email: values.email,
				uid: currentUser.uid,
				createdDate: timestamp,
			};

			appStore.loginUser(userData);

			try {
				await firestore.setDoc(firestore.doc(db, "users", currentUser.uid), userData);
			} catch (err: any) {
				__DEV__ && console.log("Error creating document: ", err.message);
				showToast(err.message, toastType.ERROR);
			}

			return userData;
		},
		{
			onSuccess: (data) => {
				// Do anything
			},
			onError: (err: any) => {
				showToast(err.message, toastType.ERROR);
			},
		}
	);
}
