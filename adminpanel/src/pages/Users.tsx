import { useEffect, useState } from 'react';
import { AdminLayout } from '../components/AdminLayout';
import { Card, CardContent } from '../components/ui/Card';
import { Modal, ModalFooter } from '../components/ui/Modal';
import { listAdminUsers, createAdminUser, toggleAdminStatus } from '../api/mockAdminApi';
import type { AdminUser, CreateAdminData } from '../types';
import { UserPlus, Check, X } from 'lucide-react';

export default function Users() {
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [formData, setFormData] = useState<CreateAdminData>({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    role: 'manager',
  });

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    const response = await listAdminUsers();
    if (response.success && response.data) {
      setUsers(response.data);
    }
    setLoading(false);
  };

  const handleCreate = async () => {
    const response = await createAdminUser(formData);
    if (response.success) {
      setShowCreateModal(false);
      setFormData({ email: '', password: '', firstName: '', lastName: '', role: 'manager' });
      loadUsers();
    }
  };

  const handleToggleStatus = async (userId: string) => {
    await toggleAdminStatus(userId);
    loadUsers();
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Admin Users</h1>
            <p className="text-gray-600 mt-1">Manage admin and manager accounts</p>
          </div>
          <button
            onClick={() => setShowCreateModal(true)}
            className="flex items-center gap-2 bg-admin-primary text-white px-4 py-2 rounded-lg hover:bg-admin-primary-hover"
          >
            <UserPlus className="w-5 h-5" />
            Add User
          </button>
        </div>

        <Card>
          <CardContent>
            {loading ? (
              <div className="text-center py-12 text-gray-500">Loading users...</div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Name</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Email</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Role</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Status</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Last Login</th>
                      <th className="text-right py-3 px-4 text-sm font-medium text-gray-600">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user) => (
                      <tr key={user.id} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-3 px-4 text-sm font-medium text-gray-900">
                          {user.firstName} {user.lastName}
                        </td>
                        <td className="py-3 px-4 text-sm text-gray-600">{user.email}</td>
                        <td className="py-3 px-4">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            user.role === 'admin' ? 'bg-purple-100 text-purple-800' : 'bg-blue-100 text-blue-800'
                          }`}>
                            {user.role}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            user.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                          }`}>
                            {user.isActive ? 'Active' : 'Inactive'}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-sm text-gray-600">
                          {user.lastLogin ? new Date(user.lastLogin).toLocaleDateString() : 'Never'}
                        </td>
                        <td className="py-3 px-4 text-right">
                          <button
                            onClick={() => handleToggleStatus(user.id)}
                            className="text-sm text-admin-primary hover:text-admin-primary-hover"
                          >
                            {user.isActive ? 'Deactivate' : 'Activate'}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <Modal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        title="Create Admin User"
      >
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
              <input
                type="text"
                value={formData.firstName}
                onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                className="w-full border border-gray-300 rounded-lg px-3 py-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
              <input
                type="text"
                value={formData.lastName}
                onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                className="w-full border border-gray-300 rounded-lg px-3 py-2"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full border border-gray-300 rounded-lg px-3 py-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
            <input
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="w-full border border-gray-300 rounded-lg px-3 py-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Role</label>
            <select
              value={formData.role}
              onChange={(e) => setFormData({ ...formData, role: e.target.value as 'admin' | 'manager' })}
              className="w-full border border-gray-300 rounded-lg px-3 py-2"
            >
              <option value="manager">Manager</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          <ModalFooter>
            <button
              onClick={() => setShowCreateModal(false)}
              className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              onClick={handleCreate}
              className="px-4 py-2 bg-admin-primary text-white rounded-lg hover:bg-admin-primary-hover"
            >
              Create User
            </button>
          </ModalFooter>
        </div>
      </Modal>
    </AdminLayout>
  );
}
