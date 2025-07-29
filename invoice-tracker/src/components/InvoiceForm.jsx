import React from "react";

export default function InvoiceForm({
	client,
	setClient,
	amount,
	setAmount,
	dueDate,
	setDueDate,
	status,
	setStatus,
	onSubmit,
	buttonText,
}) {
	return (
		<form onSubmit={onSubmit}>
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
			<button type="submit">{buttonText}</button>
		</form>
	);
}
