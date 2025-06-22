'use client';

import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { XCircle, AlertTriangle, X } from 'lucide-react';

interface RejectModalProps {
  isOpen: boolean;
  onClose: () => void;
  memberName: string;
  onReject: (reason: string) => Promise<void>;
  isProcessing?: boolean;
}

export function RejectModal({ 
  isOpen, 
  onClose, 
  memberName, 
  onReject, 
  isProcessing = false 
}: RejectModalProps) {
  const [rejectionReason, setRejectionReason] = useState('');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!isOpen) {
      setRejectionReason('');
    }
  }, [isOpen]);

  if (!isOpen || !mounted) return null;

  const handleReject = async () => {
    if (!rejectionReason.trim()) return;
    
    try {
      await onReject(rejectionReason);
      onClose();
      setRejectionReason('');
    } catch {
    }
  };

  const modalContent = (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-xl p-6 max-w-md w-full mx-4 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
              <AlertTriangle className="text-red-600" size={20} />
            </div>
            <h3 className="text-lg font-semibold text-slate-800">Tolak Formulir</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 hover:bg-slate-100 rounded-lg transition-colors"
            disabled={isProcessing}
          >
            <X size={20} className="text-slate-500" />
          </button>
        </div>

        <div className="mb-4">
          <p className="text-slate-600 mb-4">
            Berikan alasan penolakan untuk <span className="font-semibold text-slate-800">{memberName}</span>:
          </p>
          <textarea
            value={rejectionReason}
            onChange={(e) => setRejectionReason(e.target.value)}
            placeholder="Masukkan alasan penolakan..."
            className="w-full p-3 border border-slate-300 rounded-md focus:ring-2 focus:ring-slate-500 focus:border-slate-500 resize-none"
            rows={4}
            disabled={isProcessing}
          />
        </div>

        <div className="flex gap-3">
          <button
            onClick={onClose}
            disabled={isProcessing}
            className="flex-1 px-4 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors disabled:opacity-50"
          >
            Batal
          </button>
          <button
            onClick={handleReject}
            disabled={isProcessing || !rejectionReason.trim()}
            className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {isProcessing ? (
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                <XCircle size={16} />
                Tolak
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
}
