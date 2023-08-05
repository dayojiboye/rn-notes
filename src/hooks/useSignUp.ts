import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { useMutation } from "react-query";
import { showToast } from "../utils/helpers";
import { toastType } from "../enums";
import { avatarUrl } from "../constants";
import { UserData } from "../types";
import useCreateUserData from "./useCreateUserData";

export default function useSignUpMutation(name: string, avatar: string) {
	const auth = getAuth();
	const saveUserData = useCreateUserData();

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

			return userData;
		},
		{
			onSuccess: (data) => {
				saveUserData.mutate(data);
			},
			onError: (err: any) => {
				showToast(err.message, toastType.ERROR);
			},
		}
	);
}
