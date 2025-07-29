// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import AddInvoice from "./pages/AddInvoice";
import EditInvoice from "./pages/EditInvoice";

function App() {
	return (
		<Router>
			<nav>
				<Link to="/">Invoices</Link> | <Link to="/add">Add Invoice</Link>
			</nav>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/add" element={<AddInvoice />} />
				<Route path="/edit/:id" element={<EditInvoice />} />
			</Routes>
		</Router>
	);
}

export default App;
