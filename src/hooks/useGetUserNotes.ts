import { useQuery } from "react-query";
import { collection, query, where, getDocs } from "firebase/firestore";
import db from "../../firebase/firebaseConfig";
import { regexToRemoveHtmlTags, showToast } from "../utils/helpers";
import { toastType } from "../enums";
import useStore from "./useStore";
import { Note } from "../types";

export default function useGetUserNotes(
	onDone?: () => void,
	isSearching?: boolean,
	searchText?: string
) {
	const appStore = useStore();

	const fetchUserNotes = async () => {
		const q = query(collection(db, "notes"), where("userId", "==", appStore.user?.uid));
		const querySnapshot = await getDocs(q);
		const userNotes: Note[] = [];
		querySnapshot.forEach((doc) => userNotes.push(JSON.parse(JSON.stringify(doc.data()))));
		return userNotes;
	};

	return useQuery<Note[]>(["user_notes", appStore.user?.uid], fetchUserNotes, {
		staleTime: 24 * 60 * 60 * 1000,
		onError: (err: any) => {
			showToast(err.message, toastType.ERROR);
		},
		onSettled: () => {
			onDone?.();
		},
		select: (data) => {
			if (isSearching && searchText) {
				const searchResult = data.filter((note) =>
					note.content
						.replace(regexToRemoveHtmlTags, "")
						.toLowerCase()
						.includes(searchText.toLowerCase())
				);
				return searchResult;
			} else {
				return data;
			}
		},
	});
}
