'use client';

import { useState, useEffect } from 'react';

export default function InvoiceForm({ onSubmit, initialData }) {
  const [client, setClient] = useState('');
  const [amount, setAmount] = useState('');
  const [status, setStatus] = useState('unpaid');

  // Load draft or initial data
  useEffect(() => {
    if (initialData) {
      setClient(initialData.client);
      setAmount(initialData.amount);
      setStatus(initialData.status);
    } else {
      const saved = JSON.parse(localStorage.getItem('invoiceDraft') || '{}');
      if (saved.client) setClient(saved.client);
      if (saved.amount) setAmount(saved.amount);
      if (saved.status) setStatus(saved.status);
    }
  }, [initialData]);

  // Save draft to localStorage
  useEffect(() => {
    if (!initialData) {
      const draft = { client, amount, status };
      localStorage.setItem('invoiceDraft', JSON.stringify(draft));
    }
  }, [client, amount, status, initialData]);

  function handleSubmit(e) {
    e.preventDefault();

    if (!client || !amount) return;

    const newInvoice = {
      client,
      amount: parseFloat(amount),
      status,
      id: initialData?.id || crypto.randomUUID(), // generate ID if new
    };

    onSubmit(newInvoice);

    if (!initialData) {
      setClient('');
      setAmount('');
      setStatus('unpaid');
      localStorage.removeItem('invoiceDraft');
    }
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow space-y-4">
      <h2 className="text-xl font-semibold text-gray-900">
        {initialData ? 'Edit Invoice' : 'New Invoice'}
      </h2>

      <div>
        <label className="block text-sm font-medium text-gray-700">Client</label>
        <input
          type="text"
          value={client}
          onChange={(e) => setClient(e.target.value)}
          className="mt-1 block w-full border border-gray-300 rounded px-3 py-2 text-gray-900"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Amount</label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="mt-1 block w-full border border-gray-300 rounded px-3 py-2 text-gray-900"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Status</label>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="mt-1 block w-full border border-gray-300 rounded px-3 py-2 text-gray-900"
        >
          <option value="unpaid">Unpaid</option>
          <option value="paid">Paid</option>
        </select>
      </div>

      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        {initialData ? 'Update Invoice' : 'Add Invoice'}
      </button>
    </form>
  );
}




