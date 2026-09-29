import React, { useRef, useState } from 'react';
import { Camera, Image as ImageIcon, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { haptic } from '@/lib/telegram';

interface ImageCaptureProps {
  onImageCaptured: (file: File) => void;
}

export default function ImageCapture({ onImageCaptured }: ImageCaptureProps) {
  const cameraInputRef = useRef<HTMLInputElement>(null);
  const galleryInputRef = useRef<HTMLInputElement>(null);

  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      haptic('light');
      setSelectedFile(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  const handleConfirm = () => {
    if (selectedFile) {
      haptic('success');
      onImageCaptured(selectedFile);
    }
  };

  const handleCancel = () => {
    haptic('light');
    setSelectedFile(null);
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }
    setPreviewUrl(null);
  };

  return (
    <div className="w-full h-full flex flex-col items-center">
      <input
        type="file"
        accept="image/*"
        capture="environment"
        ref={cameraInputRef}
        className="hidden"
        onChange={handleFileChange}
      />
      <input
        type="file"
        accept="image/*"
        ref={galleryInputRef}
        className="hidden"
        onChange={handleFileChange}
      />

      <AnimatePresence mode="wait">
        {!previewUrl ? (
          <motion.div
            key="capture-buttons"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="flex gap-4 w-full"
          >
            <button
              onClick={() => {
                haptic('light');
                cameraInputRef.current?.click();
              }}
              className="flex-1 bg-white p-6 rounded-3xl shadow-[0_4px_15px_rgba(0,0,0,0.04)] flex flex-col items-center justify-center gap-4"
            >
              <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center">
                <Camera className="w-7 h-7 text-primary" />
              </div>
              <div className="text-center">
                <p className="font-bold text-gray-900">Take Photo</p>
                <p className="text-xs text-gray-500 mt-1">Get instant solution</p>
              </div>
            </button>

            <button
              onClick={() => {
                haptic('light');
                galleryInputRef.current?.click();
              }}
              className="flex-1 bg-white p-6 rounded-3xl shadow-[0_4px_15px_rgba(0,0,0,0.04)] flex flex-col items-center justify-center gap-4"
            >
              <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center">
                <ImageIcon className="w-7 h-7 text-primary" />
              </div>
              <div className="text-center">
                <p className="font-bold text-gray-900">Upload Image</p>
                <p className="text-xs text-gray-500 mt-1">Select from gallery</p>
              </div>
            </button>
          </motion.div>
        ) : (
          <motion.div
            key="preview"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="w-full flex flex-col items-center gap-4"
          >
            <div className="relative w-full aspect-[3/4] bg-black rounded-3xl overflow-hidden shadow-lg">
              <img
                src={previewUrl}
                alt="Preview"
                className="w-full h-full object-contain"
              />
              <button
                onClick={handleCancel}
                className="absolute top-4 right-4 w-10 h-10 bg-black/50 backdrop-blur-sm text-white rounded-full flex items-center justify-center"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <button
              onClick={handleConfirm}
              className="w-full h-[58px] bg-primary text-white font-bold rounded-2xl shadow-lg flex items-center justify-center"
            >
              Solve Question
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
