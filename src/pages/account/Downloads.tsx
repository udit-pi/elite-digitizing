import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AccountLayout } from '../../components/AccountLayout';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import { Download, FileText, Package, Calendar, ExternalLink } from 'lucide-react';
import { listOrders } from '../../api/mockApi';
import type { Order, Deliverable } from '../../types';
import { SERVICE_TYPES } from '../../types';

interface OrderWithDeliverables {
  order: Order;
  deliverables: Deliverable[];
}

export default function Downloads() {
  const [ordersWithFiles, setOrdersWithFiles] = useState<OrderWithDeliverables[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [totalFiles, setTotalFiles] = useState(0);
  const [totalSize, setTotalSize] = useState(0);

  useEffect(() => {
    loadDownloads();
  }, []);

  const loadDownloads = async () => {
    setIsLoading(true);
    const response = await listOrders();
    
    if (response.success && response.data) {
      // Filter orders that have deliverables
      const withFiles = response.data
        .filter(order => order.deliverables && order.deliverables.length > 0)
        .map(order => ({
          order,
          deliverables: order.deliverables || [],
        }))
        .sort((a, b) => b.order.createdAt.getTime() - a.order.createdAt.getTime());

      setOrdersWithFiles(withFiles);

      // Calculate totals
      let fileCount = 0;
      let sizeCount = 0;
      withFiles.forEach(({ deliverables }) => {
        fileCount += deliverables.length;
        sizeCount += deliverables.reduce((sum, file) => sum + file.filesize, 0);
      });
      setTotalFiles(fileCount);
      setTotalSize(sizeCount);
    }
    setIsLoading(false);
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
  };

  const downloadAll = (deliverables: Deliverable[]) => {
    // In real app, this would create a zip file
    deliverables.forEach((file, index) => {
      setTimeout(() => {
        const link = document.createElement('a');
        link.href = file.downloadUrl;
        link.download = file.filename;
        link.click();
      }, index * 300); // Stagger downloads
    });
  };

  if (isLoading) {
    return (
      <AccountLayout>
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-orange"></div>
        </div>
      </AccountLayout>
    );
  }

  return (
    <AccountLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Downloads</h1>
          <p className="mt-2 text-gray-600">Access all your completed order files in one place</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <Package className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Completed Orders</p>
                  <p className="text-2xl font-bold text-gray-900">{ordersWithFiles.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <FileText className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Total Files</p>
                  <p className="text-2xl font-bold text-gray-900">{totalFiles}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Download className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Total Size</p>
                  <p className="text-2xl font-bold text-gray-900">{formatFileSize(totalSize)}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Downloads List */}
        {ordersWithFiles.length === 0 ? (
          <Card>
            <CardContent className="text-center py-12">
              <Download className="w-12 h-12 text-gray-400 mx-auto mb-3" />
              <p className="text-gray-600 mb-4">No completed orders with files yet</p>
              <Link
                to="/order"
                className="inline-flex items-center gap-2 px-6 py-2.5 bg-brand-orange hover:bg-brand-orange-hover text-white rounded-lg transition-all"
              >
                Create Your First Order
              </Link>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-6">
            {ordersWithFiles.map(({ order, deliverables }) => (
              <Card key={order.id}>
                <CardHeader className="border-b border-gray-200">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <CardTitle>{order.details.designName}</CardTitle>
                        <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-medium rounded">
                          Complete
                        </span>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <span className="flex items-center gap-1">
                          <Package className="w-4 h-4" />
                          Order #{order.id.slice(-8)}
                        </span>
                        <span>•</span>
                        <span>{SERVICE_TYPES[order.serviceType].name}</span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {formatDate(order.createdAt)}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => downloadAll(deliverables)}
                        className="px-4 py-2 text-brand-orange hover:bg-orange-50 border border-brand-orange rounded-lg transition-colors text-sm font-medium"
                      >
                        Download All
                      </button>
                      <Link
                        to={`/account/orders/${order.id}`}
                        className="p-2 text-gray-600 hover:text-brand-orange hover:bg-gray-50 rounded-lg transition-colors"
                        title="View Order"
                      >
                        <ExternalLink className="w-5 h-5" />
                      </Link>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {deliverables.map((file) => (
                      <div
                        key={file.id}
                        className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200 hover:border-brand-orange transition-colors group"
                      >
                        <div className="flex items-center gap-3 flex-1 min-w-0">
                          <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center border border-gray-200 flex-shrink-0">
                            <FileText className="w-5 h-5 text-gray-400" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-900 truncate">
                              {file.filename}
                            </p>
                            <div className="flex items-center gap-2 text-xs text-gray-500">
                              <span>{formatFileSize(file.filesize)}</span>
                              <span>•</span>
                              <span>Uploaded {formatDate(file.uploadedAt)}</span>
                            </div>
                          </div>
                        </div>
                        <a
                          href={file.downloadUrl}
                          download={file.filename}
                          className="ml-2 p-2 text-brand-orange hover:bg-orange-50 rounded transition-colors opacity-0 group-hover:opacity-100"
                          title="Download file"
                        >
                          <Download className="w-5 h-5" />
                        </a>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </AccountLayout>
  );
}
