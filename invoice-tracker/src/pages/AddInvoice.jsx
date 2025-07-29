// src/pages/AddInvoice.jsx
import React, { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase";
import { useNavigate } from "react-router-dom";
import InvoiceForm from "../components/InvoiceForm";

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
		<div className="invoice-form-container">
			<h2>Add New Invoice</h2>
			<div>
				<InvoiceForm
					client={client}
					setClient={setClient}
					amount={amount}
					setAmount={setAmount}
					dueDate={dueDate}
					setDueDate={setDueDate}
					status={status}
					setStatus={setStatus}
					onSubmit={handleSubmit}
					buttonText="Add Invoice"
				/>
			</div>
		</div>
	);
}
