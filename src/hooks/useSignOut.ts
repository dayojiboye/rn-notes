import { getAuth, signOut } from "firebase/auth";
import { useMutation } from "react-query";
import { showToast } from "../utils/helpers";
import { toastType } from "../enums";
import useStore from "./useStore";

export default function useSignOutMutation() {
	const auth = getAuth();
	const appStore = useStore();

	return useMutation(
		async () => {
			const response = await signOut(auth);
			return response;
		},
		{
			onSuccess: () => {
				appStore.logoutUser();
			},
			onError: (err: any) => {
				showToast(err.message, toastType.ERROR);
			},
		}
	);
}
