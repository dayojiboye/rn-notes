import React from "react";
import { AppContext } from "../context/AppContext";

const useStore = () => {
	const context = React.useContext(AppContext);
	if (!context) {
		throw new Error(`useStore must be used within an AppContext`);
	}

	return context;
};

export default useStore;
