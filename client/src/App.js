import "./App.css";
import React, { Fragment } from "react";
import Navbar from "./components/Navbar";
import Landing from "./components/landing";

const App = () => {
	return (
		<Fragment>
			<Navbar />
			<Landing />
		</Fragment>
	);
};

export default App;
