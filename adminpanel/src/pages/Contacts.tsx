import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AdminLayout } from '../components/AdminLayout';
import { Card, CardContent } from '../components/ui/Card';
import { StatusBadge } from '../components/ui/StatusBadge';
import { listContacts } from '../api/mockAdminApi';
import type { ContactForm } from '../types';
import { Eye } from 'lucide-react';

export default function Contacts() {
  const [contacts, setContacts] = useState<ContactForm[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadContacts();
  }, []);

  const loadContacts = async () => {
    const response = await listContacts();
    if (response.success && response.data) {
      setContacts(response.data);
    }
    setLoading(false);
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Contact Forms</h1>
          <p className="text-gray-600 mt-1">Manage customer inquiries</p>
        </div>

        <Card>
          <CardContent>
            {loading ? (
              <div className="text-center py-12 text-gray-500">Loading contacts...</div>
            ) : (
              <div className="space-y-3">
                {contacts.map((contact) => (
                  <div key={contact.id} className="flex items-start justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <p className="font-medium text-gray-900">{contact.name}</p>
                        <StatusBadge status={contact.status} type="contact" />
                      </div>
                      <p className="text-sm font-medium text-gray-700">{contact.subject}</p>
                      <p className="text-sm text-gray-600 mt-1 line-clamp-2">{contact.message}</p>
                      <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                        <span>{contact.email}</span>
                        {contact.phone && <span>{contact.phone}</span>}
                        <span>{new Date(contact.createdAt).toLocaleDateString()}</span>
                      </div>
                    </div>
                    <Link
                      to={`/contacts/${contact.id}`}
                      className="ml-4 inline-flex items-center gap-1 text-sm text-admin-primary hover:text-admin-primary-hover"
                    >
                      <Eye className="w-4 h-4" />
                      View
                    </Link>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
