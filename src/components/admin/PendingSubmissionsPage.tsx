'use client';

import { useState, useEffect, useCallback } from 'react';
import { PendingSubmission, SubmissionStatus } from '../../../prisma/app/generated/prisma';
import { getAllSubmissions } from '@/actions/pendingSubmissions';
import { PendingSubmissionCard } from './PendingSubmissionCard';
import { Clock, CheckCircle, XCircle, RefreshCw } from 'lucide-react';

interface PendingSubmissionsPageProps {
  currentUserId: string;
}

export function PendingSubmissionsPage({ currentUserId }: PendingSubmissionsPageProps) {
  const [allSubmissions, setAllSubmissions] = useState<PendingSubmission[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'pending' | 'approved' | 'rejected'>('pending');

  const fetchSubmissions = useCallback(async () => {
    setLoading(true);
    try {
      const result = await getAllSubmissions();
      
      if (result.success && result.submissions) {
        setAllSubmissions(result.submissions);
      }
    } catch (error) {
      console.error('Error fetching submissions:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSubmissions();
  }, [fetchSubmissions]);

  // Filter submissions for display based on current filter
  const filteredSubmissions = allSubmissions.filter(s => {
    switch (filter) {
      case 'pending':
        return s.status === SubmissionStatus.PENDING;
      case 'approved':
        return s.status === SubmissionStatus.APPROVED;
      case 'rejected':
        return s.status === SubmissionStatus.REJECTED;
      default:
        return true;
    }
  });

  // Calculate counts from all submissions
  const pendingCount = allSubmissions.filter(s => s.status === SubmissionStatus.PENDING).length;
  const approvedCount = allSubmissions.filter(s => s.status === SubmissionStatus.APPROVED).length;
  const rejectedCount = allSubmissions.filter(s => s.status === SubmissionStatus.REJECTED).length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Formulir Pendaftaran</h1>
          <p className="text-slate-600 mt-1">Kelola formulir pendaftaran anggota komunitas</p>
        </div>
        <button
          onClick={fetchSubmissions}
          disabled={loading}
          className="flex items-center gap-2 px-4 py-2 bg-slate-600 text-white rounded-md hover:bg-slate-700 disabled:opacity-50"
        >
          <RefreshCw size={16} className={loading ? 'animate-spin' : ''} />
          Refresh
        </button>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <div className="flex items-center">
            <Clock className="h-8 w-8 text-yellow-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-yellow-800">Menunggu Review</p>
              <p className="text-2xl font-bold text-yellow-900">{pendingCount}</p>
            </div>
          </div>
        </div>

        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <div className="flex items-center">
            <CheckCircle className="h-8 w-8 text-green-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-green-800">Disetujui</p>
              <p className="text-2xl font-bold text-green-900">{approvedCount}</p>
            </div>
          </div>
        </div>

        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-center">
            <XCircle className="h-8 w-8 text-red-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-red-800">Ditolak</p>
              <p className="text-2xl font-bold text-red-900">{rejectedCount}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="border-b border-slate-200">
        <nav className="-mb-px flex space-x-8">
          {[
            { key: 'pending', label: 'Menunggu Review', count: pendingCount },
            { key: 'approved', label: 'Disetujui', count: approvedCount },
            { key: 'rejected', label: 'Ditolak', count: rejectedCount },
            { key: 'all', label: 'Semua', count: allSubmissions.length }
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setFilter(tab.key as 'all' | 'pending' | 'approved' | 'rejected')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                filter === tab.key
                  ? 'border-slate-500 text-slate-600'
                  : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
              }`}
            >
              {tab.label} ({tab.count})
            </button>
          ))}
        </nav>
      </div>

      {/* Submissions List */}
      <div className="space-y-4">
        {loading ? (
          <div className="text-center py-8">
            <RefreshCw className="animate-spin h-8 w-8 text-slate-400 mx-auto mb-4" />
            <p className="text-slate-600">Memuat formulir...</p>
          </div>
        ) : filteredSubmissions.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-slate-600">
              {filter === 'pending' 
                ? 'Tidak ada formulir yang menunggu review'
                : `Tidak ada formulir dengan status "${filter}"`
              }
            </p>
          </div>
        ) : (
          filteredSubmissions.map((submission) => (
            <PendingSubmissionCard
              key={submission.id}
              submission={submission}
              currentUserId={currentUserId}
              onUpdate={fetchSubmissions}
            />
          ))
        )}
      </div>
    </div>
  );
}
