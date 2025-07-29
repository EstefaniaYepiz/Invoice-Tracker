import React from "react";
import { Link } from "react-router-dom";

export default function InvoiceItem({ invoice, onDelete }) {
	return (
		<div className="invoice-card">
			<h3>{invoice.client}</h3>
			<p>Amount: ${invoice.amount}</p>
			<p>Status: {invoice.status}</p>
			<p>Due: {invoice.dueDate}</p>
			<div className="invoice-actions">
				{" "}
				<button onClick={() => onDelete(invoice.id)}>Delete</button>
				<div className="edit-link">
					<Link to={`/edit/${invoice.id}`}>Edit</Link>
				</div>
			</div>
		</div>
	);
}
