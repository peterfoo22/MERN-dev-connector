import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./components/auth/Register";
import Landing from "./components/layout/Landing";
import Login from "./components/auth/Login";
import React, { Fragment, useEffect } from "react";
import Navbar from "./components/layout/Navbar";
import Alert from './components/layout/Alert';
import Dashboard from "./components/dashboard/Dashboard";
import PrivateRoute from "./components/routing/PrivateRoute";

//Redux
import { Provider } from 'react-redux';
import store from './store';

import { loadUser } from './actions/auth';
import setAuthToken from './utils/setAuthToken';

const App = () => {

	 useEffect(() => {
    if (localStorage.token) {
      // if there is a token set axios headers for all requests
      setAuthToken(localStorage.token);
    }
    store.dispatch(loadUser());

  }, []);

	return (
		<Provider store = {store}>
			<Router>
				<Fragment>
					<Navbar />
					<section className="container">
						<Alert />
						<Routes>
							<Route exact path="/" element={<Landing />} />
							<Route exact path="/register" element={<Register />} />
							<Route exact path="/login" element={<Login />} />
							<Route path="/dashboard" element={ <PrivateRoute> <Dashboard /></PrivateRoute>}/>
						</Routes>
					</section>
				</Fragment>
			</Router>
		</Provider>
	);
};

export default App;
