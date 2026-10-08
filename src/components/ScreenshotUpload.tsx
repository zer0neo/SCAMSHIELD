import React, { useState, useRef } from 'react';
import { UploadCloud, Image as ImageIcon, X, AlertCircle, Sparkles, ShieldAlert } from 'lucide-react';
import { SupportedLanguage } from '../types/analysis';
import { translations } from '../translations/uiTranslations';

interface ScreenshotUploadProps {
  currentLanguage: SupportedLanguage;
  onAnalyzeScreenshot: (file: File) => void;
  isLoading: boolean;
}

const MAX_FILE_SIZE_BYTES = 10 * 1024 * 1024; // 10 MB

export const ScreenshotUpload: React.FC<ScreenshotUploadProps> = ({
  currentLanguage,
  onAnalyzeScreenshot,
  isLoading,
}) => {
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const t = translations[currentLanguage];

  const validateAndSetFile = (file: File) => {
    const validTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/webp'];
    if (!validTypes.includes(file.type)) {
      setError(t.errorInvalidFile);
      return;
    }

    if (file.size > MAX_FILE_SIZE_BYTES) {
      setError(t.errorFileTooLarge);
      return;
    }

    setError(null);
    setSelectedFile(file);
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      validateAndSetFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      validateAndSetFile(e.target.files[0]);
    }
  };

  const handleRemove = () => {
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }
    setSelectedFile(null);
    setPreviewUrl(null);
    setError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleAnalyze = () => {
    if (!selectedFile) {
      setError('Please upload an image first.');
      return;
    }
    onAnalyzeScreenshot(selectedFile);
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024 * 1024) {
      return `${(bytes / 1024).toFixed(1)} KB`;
    }
    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  };

  const loadSampleScreenshot = (type: 'sbi' | 'upi') => {
    const canvas = document.createElement('canvas');
    canvas.width = 640;
    canvas.height = 360;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    if (type === 'sbi') {
      ctx.fillStyle = '#070B14';
      ctx.fillRect(0, 0, 640, 360);
      ctx.fillStyle = '#111D35';
      ctx.fillRect(30, 35, 580, 290);
      ctx.strokeStyle = '#EF4444';
      ctx.lineWidth = 2;
      ctx.strokeRect(30, 35, 580, 290);
      ctx.fillStyle = '#38BDF8';
      ctx.font = 'bold 20px sans-serif';
      ctx.fillText('💬 Incoming SMS from: AX-SBIINB', 55, 80);
      ctx.fillStyle = '#FFFFFF';
      ctx.font = '16px sans-serif';
      ctx.fillText('Dear SBI User, your NetBanking access is expired today.', 55, 130);
      ctx.fillText('Update your PAN card immediately to avoid account block:', 55, 165);
      ctx.fillStyle = '#EF4444';
      ctx.font = 'bold 17px monospace';
      ctx.fillText('https://sbi-kyc-update.xyz/verify', 55, 215);
      ctx.fillStyle = '#94A3B8';
      ctx.font = '13px sans-serif';
      ctx.fillText('Time: Today, 11:42 AM • Urgent Action Required', 55, 265);
    } else {
      ctx.fillStyle = '#070B14';
      ctx.fillRect(0, 0, 640, 360);
      ctx.fillStyle = '#111D35';
      ctx.fillRect(30, 35, 580, 290);
      ctx.strokeStyle = '#F59E0B';
      ctx.lineWidth = 2;
      ctx.strokeRect(30, 35, 580, 290);
      ctx.fillStyle = '#A855F7';
      ctx.font = 'bold 20px sans-serif';
      ctx.fillText('📱 PhonePe Collect Request', 55, 80);
      ctx.fillStyle = '#FFFFFF';
      ctx.font = 'bold 28px sans-serif';
      ctx.fillText('₹ 4,999.00', 55, 135);
      ctx.fillStyle = '#CBD5E1';
      ctx.font = '16px sans-serif';
      ctx.fillText('From: Rahul Sharma (rahul@xyzbank)', 55, 185);
      ctx.fillStyle = '#F59E0B';
      ctx.font = 'italic 15px sans-serif';
      ctx.fillText('Note: "Approve this collect request to claim refund"', 55, 230);
    }

    canvas.toBlob((blob) => {
      if (blob) {
        const fileName = type === 'sbi' ? 'sbi_kyc_phishing_sms.png' : 'phonepe_fake_refund.png';
        const file = new File([blob], fileName, { type: 'image/png' });
        validateAndSetFile(file);
      }
    }, 'image/png');
  };

  return (
    <div className="space-y-5">
      {/* OCR Educational Notice */}
      <div className="flex items-center gap-2.5 p-3.5 rounded-xl bg-sky-500/10 border border-sky-500/20 text-sky-200 text-xs sm:text-sm">
        <Sparkles className="w-4 h-4 text-sky-400 shrink-0" />
        <span>{t.screenshotOcrNote}</span>
      </div>

      {/* 1-Click Sample Screenshot Bar for Instant Hackathon Demos */}
      <div className="flex items-center gap-2 flex-wrap text-xs bg-slate-900/60 p-3 rounded-xl border border-slate-800">
        <span className="text-slate-400 font-semibold">1-Click Demo Screenshots:</span>
        <button
          type="button"
          onClick={() => loadSampleScreenshot('sbi')}
          className="px-3 py-1.5 rounded-lg bg-slate-800 border border-slate-700 text-slate-200 hover:text-white hover:border-sky-500 transition font-medium"
        >
          📸 Fake SBI KYC SMS
        </button>
        <button
          type="button"
          onClick={() => loadSampleScreenshot('upi')}
          className="px-3 py-1.5 rounded-lg bg-slate-800 border border-slate-700 text-slate-200 hover:text-white hover:border-sky-500 transition font-medium"
        >
          📸 PhonePe Fake Refund Request
        </button>
      </div>

      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        id="screenshot-file-input"
        accept="image/png,image/jpeg,image/jpg,image/webp"
        onChange={handleChange}
        className="hidden"
      />

      {/* Upload Box or Image Preview */}
      {!selectedFile ? (
        <div
          onDragEnter={handleDrag}
          onDragOver={handleDrag}
          onDragLeave={handleDrag}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`relative border-2 border-dashed rounded-2xl p-8 sm:p-12 text-center cursor-pointer transition-all duration-200 flex flex-col items-center justify-center gap-3 ${
            dragActive
              ? 'border-sky-400 bg-sky-500/10 scale-[1.01]'
              : 'border-slate-700/80 bg-slate-950/60 hover:border-slate-500 hover:bg-slate-900/50'
          }`}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === 'Enter' && fileInputRef.current?.click()}
          aria-label="Upload screenshot"
        >
          <div className="w-16 h-16 rounded-2xl bg-slate-800/80 border border-slate-700 flex items-center justify-center text-sky-400 shadow-lg">
            <UploadCloud className="w-8 h-8" />
          </div>

          <div className="space-y-1">
            <p className="text-base font-bold text-white">
              {t.screenshotDropText}{' '}
              <span className="text-sky-400 underline">{t.screenshotBrowseText}</span>
            </p>
            <p className="text-xs text-slate-400 font-medium">
              {t.screenshotSupported}
            </p>
          </div>

          <div className="mt-2 text-[11px] text-slate-500 font-mono">
            Supported: WhatsApp chats • Banking SMS • Payment QR & UPI screenshots
          </div>
        </div>
      ) : (
        <div className="p-4 sm:p-5 rounded-2xl bg-slate-950/80 border border-slate-800 shadow-xl space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-10 h-10 rounded-xl bg-sky-500/20 text-sky-400 flex items-center justify-center shrink-0">
                <ImageIcon className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <p className="text-sm font-semibold text-white truncate max-w-xs sm:max-w-md">
                  {selectedFile.name}
                </p>
                <p className="text-xs text-slate-400">
                  {formatFileSize(selectedFile.size)} • Ready for OCR extraction
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={handleRemove}
              className="p-2 rounded-xl text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 transition"
              aria-label="Remove image"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Visual Thumbnail */}
          {previewUrl && (
            <div className="relative rounded-xl overflow-hidden max-h-64 bg-slate-900 border border-slate-800 flex items-center justify-center">
              <img
                src={previewUrl}
                alt="Uploaded screenshot preview"
                className="max-h-64 w-auto object-contain"
              />
              <div className="absolute bottom-2 right-2 px-2.5 py-1 rounded-md bg-black/70 backdrop-blur-md text-[11px] font-mono text-slate-300">
                OCR Target
              </div>
            </div>
          )}

          {/* Analyze Action */}
          <div className="flex justify-end pt-2">
            <button
              type="button"
              onClick={handleAnalyze}
              disabled={isLoading}
              className="inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-xl text-base font-bold text-white bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 active:scale-[0.99] shadow-lg shadow-sky-500/25 disabled:opacity-50 transition-all"
            >
              <ShieldAlert className="w-5 h-5 text-white" />
              <span>{isLoading ? t.btnAnalyzing : t.btnAnalyzeScreenshot}</span>
            </button>
          </div>
        </div>
      )}

      {/* Friendly Error Display */}
      {error && (
        <div className="flex items-center gap-2 p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs sm:text-sm">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}
    </div>
  );
};
