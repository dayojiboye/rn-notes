import { useMutation } from "react-query";
import { showToast } from "../utils/helpers";
import { toastType } from "../enums";
import * as firestore from "firebase/firestore";
import db from "../../firebase/firebaseConfig";
import useStore from "./useStore";
import { UserData } from "../types";

export default function useCreateUserData() {
	const appStore = useStore();

	return useMutation<UserData, unknown, UserData>(
		async (values) => {
			const response = await firestore.addDoc(firestore.collection(db, "users"), values);
			__DEV__ && console.log("Document written with ID: ", response.id);
			return values;
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
