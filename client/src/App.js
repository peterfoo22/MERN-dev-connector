import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./components/auth/Register";
import Landing from "./components/layout/Landing";
import Login from "./components/auth/Login";
import React, { Fragment } from "react";
import Navbar from "./components/layout/Navbar";

const App = () => {
	return (
		<Router>
			<Fragment>
				<Navbar />
				<section className="container">
					<Routes>
						<Route exact path="/" element={<Landing />} />
						<Route exact path="/register" element={<Register />} />
						<Route exact path="/login" element={<Login />} />
					</Routes>
				</section>
			</Fragment>
		</Router>
	);
};

export default App;
