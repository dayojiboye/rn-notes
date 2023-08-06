import { getAuth, updateProfile } from "firebase/auth";
import { useMutation } from "react-query";
import { showToast } from "../utils/helpers";
import { toastType } from "../enums";
import useStore from "./useStore";
import { UserData } from "../types";
import * as firestore from "firebase/firestore";
import db from "../../firebase/firebaseConfig";

export default function useUpdateNameMutation(onClose: () => void) {
	const auth = getAuth();
	const appStore = useStore();

	return useMutation<unknown, unknown, { displayName: string }>(
		async (values) => {
			// @ts-ignore
			await updateProfile(auth.currentUser, {
				displayName: values.displayName,
			});

			// @ts-ignore
			const userData: UserData = {
				...appStore.user,
				displayName: values.displayName,
			};

			appStore.updateUserDetails(userData);

			try {
				// @ts-ignore
				const docRef = firestore.doc(db, "users", appStore.user?.uid);
				await firestore.updateDoc(docRef, {
					displayName: values.displayName,
				});
				showToast("Display name updated successfully!", toastType.SUCCESS);
				onClose();
			} catch (err: any) {
				__DEV__ && console.log("Error updating display name: ", err.message);
				showToast(err.message, toastType.ERROR);
			}

			return userData;
		},
		{
			// onSuccess: (data) => {
			// 	onClose();
			// },
			onError: (err: any) => {
				showToast(err.message, toastType.ERROR);
			},
		}
	);
}
