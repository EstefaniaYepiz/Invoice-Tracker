import React, { useEffect, useState } from "react";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";
import { useParams, useNavigate } from "react-router-dom";

export default function EditInvoice() {
	const { id } = useParams();
	const navigate = useNavigate();

	const [client, setClient] = useState("");
	const [amount, setAmount] = useState("");
	const [dueDate, setDueDate] = useState("");
	const [status, setStatus] = useState("unpaid");

	useEffect(() => {
		const loadInvoice = async () => {
			const docRef = doc(db, "invoices", id);
			const docSnap = await getDoc(docRef);

			if (docSnap.exists()) {
				const data = docSnap.data();
				setClient(data.client);
				setAmount(data.amount);
				setDueDate(data.dueDate);
				setStatus(data.status);
			}
		};

		loadInvoice();
	}, [id]);

	const handleUpdate = async (e) => {
		e.preventDefault();

		const docRef = doc(db, "invoices", id);
		await updateDoc(docRef, {
			client,
			amount: parseFloat(amount),
			dueDate,
			status,
		});

		navigate("/");
	};

	return (
		<div>
			<h2>Edit Invoice</h2>
			<form onSubmit={handleUpdate}>
				<input
					type="text"
					value={client}
					onChange={(e) => setClient(e.target.value)}
				/>
				<input
					type="number"
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
				<button type="submit">Update Invoice</button>
			</form>
		</div>
	);
}
