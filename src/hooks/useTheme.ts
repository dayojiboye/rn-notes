import React from "react";
import { ThemeContext } from "../context/theme-context";

const useTheme = () => {
	const context = React.useContext(ThemeContext);
	if (!context) {
		throw new Error(`useTheme must be used within a ThemeContext`);
	}

	return context;
};

export default useTheme;
