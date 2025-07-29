// src/pages/AddInvoice.jsx
import React, { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase";
import { useNavigate } from "react-router-dom";

export default function AddInvoice() {
	const [client, setClient] = useState("");
	const [amount, setAmount] = useState("");
	const [dueDate, setDueDate] = useState("");
	const [status, setStatus] = useState("unpaid");

	const navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (!client || !amount || !dueDate) {
			alert("Please fill in all fields");
			return;
		}

		try {
			await addDoc(collection(db, "invoices"), {
				client,
				amount: parseFloat(amount),
				dueDate,
				status,
			});

			navigate("/");
		} catch (err) {
			console.error("Error adding invoice:", err);
		}
	};

	return (
		<div>
			<h2>Add New Invoice</h2>
			<form onSubmit={handleSubmit}>
				<input
					type="text"
					placeholder="Client Name"
					value={client}
					onChange={(e) => setClient(e.target.value)}
				/>
				<input
					type="number"
					placeholder="Amount"
					value={amount}
					onChange={(e) => setAmount(e.target.value)}
				/>
				<input
					type="date"
					value={dueDate}
					onChange={(e) => setDueDate(e.target.value)}
				/>
				<select value={status} onChange={(e) => setStatus(e.target.value)}>
					<option value="unpaid">Unpaid</option>
					<option value="paid">Paid</option>
				</select>
				<button type="submit">Add Invoice</button>
			</form>
		</div>
	);
}
