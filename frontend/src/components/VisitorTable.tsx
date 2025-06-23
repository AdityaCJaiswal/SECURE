import React, { useState } from 'react';
import { Filter, Download, Search, ChevronLeft, ChevronRight, Eye } from 'lucide-react';
import type { TrafficData } from '../types';

interface VisitorTableProps {
  data: TrafficData[];
  onExport: () => void;
}

const VisitorTable: React.FC<VisitorTableProps> = ({ data, onExport }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [isExporting, setIsExporting] = useState(false);
  const itemsPerPage = 10;

  const getStatusColor = (status: string) => {
    return status === 'in' 
      ? 'text-green-400 bg-green-400/20 border-green-400/30' 
      : 'text-red-400 bg-red-400/20 border-red-400/30';
  };

  const formatTime = (timeString: string) => {
    return new Date(timeString).toLocaleTimeString('en-US', {
      hour12: true,
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  };

  const filteredData = data.filter(visitor => {
    const matchesSearch = visitor.plateNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (visitor.visitorName || '').toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || visitor.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = filteredData.slice(startIndex, startIndex + itemsPerPage);

  const handleExport = async () => {
    setIsExporting(true);
    try {
      await onExport();
    } finally {
      setTimeout(() => setIsExporting(false), 1000);
    }
  };

  return (
    <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 shadow-xl">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-6 gap-4">
        <div>
          <h3 className="text-white text-xl font-semibold mb-1">Recent Activity</h3>
          <p className="text-gray-300 text-sm">Latest visitor entries and exits</p>
        </div>
        
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-3 sm:space-y-0 sm:space-x-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search visitors..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-white/10 border border-white/20 rounded-lg pl-10 pr-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-colors w-full sm:w-48"
            />
          </div>

          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500 transition-colors cursor-pointer"
          >
            <option value="all">All Status</option>
            <option value="in">Checked In</option>
            <option value="out">Checked Out</option>
          </select>

          <button 
            onClick={handleExport}
            disabled={isExporting}
            className="flex items-center justify-center space-x-2 bg-blue-500 hover:bg-blue-600 disabled:bg-blue-700 text-white rounded-lg px-4 py-2 transition-all duration-200 transform hover:scale-105 active:scale-95 disabled:scale-100 disabled:cursor-not-allowed"
          >
            {isExporting ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                <span className="text-sm font-medium">Exporting...</span>
              </>
            ) : (
              <>
                <Download className="w-4 h-4" />
                <span className="text-sm font-medium">Export</span>
              </>
            )}
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/20">
              <th className="text-left text-gray-300 font-medium py-4 px-4 text-sm">License Plate</th>
              <th className="text-left text-gray-300 font-medium py-4 px-4 text-sm">Visitor</th>
              <th className="text-left text-gray-300 font-medium py-4 px-4 text-sm">Date</th>
              <th className="text-left text-gray-300 font-medium py-4 px-4 text-sm">Entry Time</th>
              <th className="text-left text-gray-300 font-medium py-4 px-4 text-sm">Exit Time</th>
              <th className="text-left text-gray-300 font-medium py-4 px-4 text-sm">Status</th>
              <th className="text-left text-gray-300 font-medium py-4 px-4 text-sm">Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((visitor, index) => (
              <tr key={visitor._id} className="border-b border-white/10 hover:bg-white/5 transition-colors">
                <td className="py-4 px-4 text-white font-mono text-sm font-bold">{visitor.plateNumber}</td>
                <td className="py-4 px-4">
                  <div>
                    <div className="text-white text-sm font-medium">{visitor.visitorName || 'Unknown'}</div>
                    <div className="text-gray-400 text-xs capitalize">{visitor.visitorType}</div>
                  </div>
                </td>
                <td className="py-4 px-4 text-gray-300 text-sm">{formatDate(visitor.entryTime)}</td>
                <td className="py-4 px-4 text-gray-300 text-sm">{formatTime(visitor.entryTime)}</td>
                <td className="py-4 px-4 text-gray-300 text-sm">
                  {visitor.exitTime ? formatTime(visitor.exitTime) : '-'}
                </td>
                <td className="py-4 px-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium capitalize border ${getStatusColor(visitor.status)}`}>
                    {visitor.status}
                  </span>
                </td>
                <td className="py-4 px-4">
                  <button className="text-blue-400 hover:text-blue-300 transition-colors p-1 rounded">
                    <Eye className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="flex items-center justify-between mt-6 pt-4 border-t border-white/20">
          <div className="text-gray-400 text-sm">
            Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, filteredData.length)} of {filteredData.length} entries
          </div>
          
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            
            <div className="flex space-x-1">
              {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                let page;
                if (totalPages <= 5) {
                  page = i + 1;
                } else if (currentPage <= 3) {
                  page = i + 1;
                } else if (currentPage >= totalPages - 2) {
                  page = totalPages - 4 + i;
                } else {
                  page = currentPage - 2 + i;
                }
                
                return (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`px-3 py-1 rounded-lg text-sm transition-all duration-200 ${
                      currentPage === page
                        ? 'bg-blue-500 text-white'
                        : 'text-gray-400 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    {page}
                  </button>
                );
              })}
            </div>
            
            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {filteredData.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-400 text-lg mb-2">No visitors found</div>
          <div className="text-gray-500 text-sm">Try adjusting your search or filter criteria</div>
        </div>
      )}
    </div>
  );
};

export default VisitorTable;