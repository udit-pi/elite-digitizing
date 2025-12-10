import { Upload, X, FileIcon } from 'lucide-react';
import { useState, useRef } from 'react';

interface FileUploadProps {
  onFilesChange: (files: File[]) => void;
  accept?: string;
  multiple?: boolean;
  maxFiles?: number;
  maxSize?: number; // in bytes
  label?: string;
  description?: string;
}

export function FileUpload({
  onFilesChange,
  accept = '*',
  multiple = true,
  maxFiles = 10,
  maxSize = 25 * 1024 * 1024, // 25MB default
  label = 'Upload Files',
  description = 'Click to upload or drag and drop',
}: FileUploadProps) {
  const [files, setFiles] = useState<File[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string>('');
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFiles = (newFiles: FileList | null) => {
    if (!newFiles) return;

    setError('');
    const filesArray = Array.from(newFiles);
    
    // Check max files
    if (files.length + filesArray.length > maxFiles) {
      setError(`Maximum ${maxFiles} files allowed`);
      return;
    }

    // Check file sizes
    const oversizedFiles = filesArray.filter(file => file.size > maxSize);
    if (oversizedFiles.length > 0) {
      setError(`Some files exceed ${Math.round(maxSize / 1024 / 1024)}MB limit`);
      return;
    }

    const updatedFiles = [...files, ...filesArray];
    setFiles(updatedFiles);
    onFilesChange(updatedFiles);
  };

  const removeFile = (index: number) => {
    const updatedFiles = files.filter((_, i) => i !== index);
    setFiles(updatedFiles);
    onFilesChange(updatedFiles);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    handleFiles(e.dataTransfer.files);
  };

  const handleClick = () => {
    inputRef.current?.click();
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
  };

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label}
      </label>

      {/* Drop Zone */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={handleClick}
        className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
          isDragging
            ? 'border-brand-orange bg-orange-50'
            : 'border-gray-300 hover:border-brand-orange hover:bg-gray-50'
        }`}
        role="button"
        tabIndex={0}
        aria-label="File upload area"
      >
        <Upload className={`w-12 h-12 mx-auto mb-3 ${isDragging ? 'text-brand-orange' : 'text-gray-400'}`} />
        <p className="text-gray-600 mb-1">{description}</p>
        <p className="text-sm text-gray-500">
          {accept === '*' ? 'All file types' : accept} • Max {Math.round(maxSize / 1024 / 1024)}MB {multiple && `• Up to ${maxFiles} files`}
        </p>
      </div>

      {/* Hidden Input */}
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        multiple={multiple}
        onChange={(e) => handleFiles(e.target.files)}
        className="hidden"
        aria-label="File input"
      />

      {/* Error Message */}
      {error && (
        <div className="mt-2 text-sm text-red-600" role="alert">
          {error}
        </div>
      )}

      {/* File List */}
      {files.length > 0 && (
        <div className="mt-4 space-y-2">
          {files.map((file, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200"
            >
              <div className="flex items-center gap-3 flex-1 min-w-0">
                <FileIcon className="w-5 h-5 text-gray-400 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">{file.name}</p>
                  <p className="text-xs text-gray-500">{formatFileSize(file.size)}</p>
                </div>
              </div>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  removeFile(index);
                }}
                className="ml-2 p-1 text-gray-400 hover:text-red-600 transition-colors"
                aria-label={`Remove ${file.name}`}
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
