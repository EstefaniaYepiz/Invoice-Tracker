import React, { useEffect, useState } from "react";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";
import { useParams, useNavigate } from "react-router-dom";
import InvoiceForm from "../components/InvoiceForm";

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
			<div onSubmit={handleUpdate}>
				<InvoiceForm
					client={client}
					setClient={setClient}
					amount={amount}
					setAmount={setAmount}
					dueDate={dueDate}
					setDueDate={setDueDate}
					status={status}
					setStatus={setStatus}
					onSubmit={handleUpdate}
					buttonText="Update Invoice"
				/>
			</div>
		</div>
	);
}
