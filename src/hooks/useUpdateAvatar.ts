import { useMutation } from "react-query";
import { showToast } from "../utils/helpers";
import { toastType } from "../enums";
import useStore from "./useStore";
import { UserData } from "../types";
import * as firestore from "firebase/firestore";
import db from "../../firebase/firebaseConfig";

export default function useUpdateAvatarMutation(onClose: () => void) {
	const appStore = useStore();

	return useMutation<UserData, unknown, { avatar: string }>(
		async (values) => {
			// @ts-ignore
			const docRef = firestore.doc(db, "users", appStore.user?.uid);
			await firestore.updateDoc(docRef, {
				userAvatar: values.avatar,
			});
			// @ts-ignore
			const userData: UserData = {
				...appStore.user,
				userAvatar: values.avatar,
			};
			return userData;
		},
		{
			onSuccess: (updatedUserData) => {
				appStore.updateUserDetails(updatedUserData);
				onClose();
			},
			onError: (err: any) => {
				showToast(err.message, toastType.ERROR);
			},
		}
	);
}
