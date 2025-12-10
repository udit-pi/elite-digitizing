import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AdminLayout } from '../components/AdminLayout';
import { Card, CardContent, CardHeader } from '../components/ui/Card';
import { StatusBadge } from '../components/ui/StatusBadge';
import { getContact, updateContactStatus } from '../api/mockAdminApi';
import type { ContactForm } from '../types';
import { ArrowLeft } from 'lucide-react';

export default function ContactDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [contact, setContact] = useState<ContactForm | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) loadContact();
  }, [id]);

  const loadContact = async () => {
    if (!id) return;
    const response = await getContact(id);
    if (response.success && response.data) {
      setContact(response.data);
    }
    setLoading(false);
  };

  const handleStatusChange = async (newStatus: ContactForm['status']) => {
    if (!contact) return;
    const response = await updateContactStatus(contact.id, newStatus);
    if (response.success && response.data) {
      setContact(response.data);
    }
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64">
          <div className="text-gray-500">Loading contact...</div>
        </div>
      </AdminLayout>
    );
  }

  if (!contact) {
    return (
      <AdminLayout>
        <div className="text-center py-12">
          <p className="text-gray-500">Contact not found</p>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="max-w-3xl space-y-6">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate('/contacts')}
            className="p-2 hover:bg-gray-100 rounded-lg"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Contact Form</h1>
            <p className="text-gray-600 mt-1">{contact.subject}</p>
          </div>
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Details</h2>
              <StatusBadge status={contact.status} type="contact" />
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600">Name</p>
                <p className="font-medium">{contact.name}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Email</p>
                <p className="font-medium">{contact.email}</p>
              </div>
              {contact.phone && (
                <div>
                  <p className="text-sm text-gray-600">Phone</p>
                  <p className="font-medium">{contact.phone}</p>
                </div>
              )}
              <div>
                <p className="text-sm text-gray-600">Date</p>
                <p className="font-medium">{new Date(contact.createdAt).toLocaleString()}</p>
              </div>
            </div>

            <div className="pt-4 border-t">
              <p className="text-sm text-gray-600 mb-2">Subject</p>
              <p className="font-medium">{contact.subject}</p>
            </div>

            <div className="pt-4 border-t">
              <p className="text-sm text-gray-600 mb-2">Message</p>
              <p className="text-gray-900 whitespace-pre-wrap">{contact.message}</p>
            </div>

            {contact.notes && (
              <div className="pt-4 border-t">
                <p className="text-sm text-gray-600 mb-2">Admin Notes</p>
                <p className="text-gray-900">{contact.notes}</p>
              </div>
            )}

            <div className="pt-4 border-t">
              <p className="text-sm text-gray-600 mb-3">Update Status</p>
              <div className="flex gap-2">
                <button
                  onClick={() => handleStatusChange('read')}
                  disabled={contact.status === 'read'}
                  className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50"
                >
                  Mark as Read
                </button>
                <button
                  onClick={() => handleStatusChange('replied')}
                  disabled={contact.status === 'replied'}
                  className="px-4 py-2 bg-admin-primary text-white rounded-lg hover:bg-admin-primary-hover disabled:opacity-50"
                >
                  Mark as Replied
                </button>
                <button
                  onClick={() => handleStatusChange('archived')}
                  disabled={contact.status === 'archived'}
                  className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50"
                >
                  Archive
                </button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
