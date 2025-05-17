'use client';

import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import InvoiceForm from '@/components/InvoiceForm';
import InvoiceList from '@/components/InvoiceList';

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [invoices, setInvoices] = useState([]);
  const [editingInvoice, setEditingInvoice] = useState(null);

  // Redirect if not authenticated
  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    }
  }, [status, router]);

  // Fetch invoices when user is authenticated
  useEffect(() => {
    if (status === 'authenticated') {
      async function fetchInvoices() {
        try {
          const res = await fetch('/api/invoices');
          if (!res.ok) throw new Error('Failed to fetch invoices');
          const data = await res.json();
          setInvoices(data);
        } catch (error) {
          console.error(error);
          setInvoices([]); // or show an error message
        }
      }
      fetchInvoices();
    }
  }, [status]);

  function addOrUpdateInvoice(newInvoice) {
    setInvoices((prev) => {
      const exists = prev.find((inv) => inv.id === newInvoice.id);
      return exists
        ? prev.map((inv) => (inv.id === newInvoice.id ? newInvoice : inv))
        : [...prev, newInvoice];
    });
    setEditingInvoice(null);
  }

  function handleEdit(invoice) {
    setEditingInvoice(invoice);
  }

  function handleDelete(id) {
    if (confirm('Are you sure you want to delete this invoice?')) {
      setInvoices((prev) => prev.filter((inv) => inv.id !== id));
      if (editingInvoice?.id === id) setEditingInvoice(null);
    }
  }

  if (status === 'loading') {
    return <p className="text-center mt-10">Loading...</p>;
  }

  return (
    <main className="min-h-screen bg-gray-50 px-6 py-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">Your Invoices</h1>
          <button
            onClick={() => signOut()}
            className="text-sm text-red-600 hover:underline"
          >
            Sign Out
          </button>
        </div>

        <InvoiceForm onSubmit={addOrUpdateInvoice} initialData={editingInvoice} />
        <InvoiceList invoices={invoices} onEdit={handleEdit} onDelete={handleDelete} />
      </div>
    </main>
  );
}


