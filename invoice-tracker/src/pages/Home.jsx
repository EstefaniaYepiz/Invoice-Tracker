import React, { useEffect, useState } from "react";
import {
	collection,
	getDocs,
	query,
	orderBy,
	doc,
	deleteDoc,
} from "firebase/firestore";
import { db } from "../firebase";
import { Link } from "react-router-dom";
import InvoiceItem from "../components/InvoiceItem";

export default function Home() {
	const [invoices, setInvoices] = useState([]);
	const [filter, setFilter] = useState("all");

	useEffect(() => {
		const fetchInvoices = async () => {
			const querySnapshot = await getDocs(collection(db, "invoices"));
			const results = querySnapshot.docs.map((doc) => ({
				id: doc.id,
				...doc.data(),
			}));
			setInvoices(results);
		};

		fetchInvoices();
	}, []);

	const filteredInvoices = invoices.filter((inv) => {
		if (filter === "all") return true;
		return inv.status === filter;
	});

	const handleDelete = async (id) => {
		const confirm = window.confirm("Delete this invoice?");
		if (confirm) {
			await deleteDoc(doc(db, "invoices", id));
			setInvoices(invoices.filter((inv) => inv.id !== id));
		}
	};

	return (
		<div>
			<h1>Invoices</h1>
			<select value={filter} onChange={(e) => setFilter(e.target.value)}>
				<option value="all">All</option>
				<option value="paid">Paid</option>
				<option value="unpaid">Unpaid</option>
			</select>

			{invoices.length === 0 ? (
				<p>No invoices yet</p>
			) : (
				filteredInvoices.map((invoice) => (
					<InvoiceItem
						key={invoice.id}
						invoice={invoice}
						onDelete={handleDelete}
					/>
				))
			)}
		</div>
	);
}
