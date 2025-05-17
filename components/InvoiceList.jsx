'use client';

export default function InvoiceList({ invoices = [], onEdit, onDelete }) {
  if (!invoices.length) {
    return (
      <div className="text-gray-600 text-center py-10">
        No invoices found.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white rounded-lg shadow-md">
        <thead className="bg-gray-100">
          <tr>
            <th className="text-left px-4 py-2 text-gray-900 font-semibold">Client</th>
            <th className="text-left px-4 py-2 text-gray-900 font-semibold">Amount</th>
            <th className="text-left px-4 py-2 text-gray-900 font-semibold">Status</th>
            <th className="text-left px-4 py-2 text-gray-900 font-semibold">Actions</th>
          </tr>
        </thead>
        <tbody>
          {invoices.map((invoice) => (
            <tr key={invoice.id} className="border-t">
              <td className="px-4 py-2 text-gray-900">{invoice.client}</td>
              <td className="px-4 py-2 text-gray-900">€{invoice.amount}</td>
              <td className="px-4 py-2">
                <span
                  className={`px-2 py-1 rounded text-sm font-medium ${
                    invoice.status === 'paid'
                      ? 'bg-green-100 text-green-900'
                      : 'bg-yellow-100 text-yellow-900'
                  }`}
                >
                  {invoice.status}
                </span>
              </td>
              <td className="px-4 py-2 space-x-2">
                <button
                  className="text-blue-700 hover:underline font-medium"
                  onClick={() => onEdit(invoice)}
                >
                  Edit
                </button>
                <button
                  className="text-red-700 hover:underline font-medium"
                  onClick={() => onDelete(invoice.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
