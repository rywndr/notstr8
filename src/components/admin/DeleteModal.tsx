'use client';

import { useState } from 'react';
import { Trash2, AlertTriangle, X } from 'lucide-react';
import { deleteMember } from '@/actions/member-actions';

interface DeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  memberName: string;
  memberId: string;
}

export function DeleteModal({ isOpen, onClose, memberName, memberId }: DeleteModalProps) {
  const [isDeleting, setIsDeleting] = useState(false);

  if (!isOpen) return null;

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      const result = await deleteMember(memberId);
      if (result.success) {
        onClose();
      } else {
        alert('gagal hapus member');
      }
    } catch (deleteError) {
      console.error('Error deleting member:', deleteError);
      alert('error occurred');
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 max-w-md w-full mx-4 shadow-2xl">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
              <AlertTriangle className="text-red-600" size={20} />
            </div>
            <h3 className="text-lg font-semibold text-slate-800">Hapus Member</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 hover:bg-slate-100 rounded-lg transition-colors"
            disabled={isDeleting}
          >
            <X size={20} className="text-slate-500" />
          </button>
        </div>

        <div className="mb-6">
          <p className="text-slate-600 mb-2">
            Yakin ingin menghapus member <span className="font-semibold text-slate-800">{memberName}</span>?
          </p>
          <p className="text-sm text-red-600">
            Aksi ini tidak dapat dibatalkan dan semua data akan hilang permanent.
          </p>
        </div>

        <div className="flex gap-3">
          <button
            onClick={onClose}
            disabled={isDeleting}
            className="flex-1 px-4 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors disabled:opacity-50"
          >
            Batal
          </button>
          <button
            onClick={handleDelete}
            disabled={isDeleting}
            className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {isDeleting ? (
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                <Trash2 size={16} />
                Hapus
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
