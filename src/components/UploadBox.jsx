import { useState, useRef, memo } from 'react';

const UploadBox = memo(function UploadBox({ variant = 'home', onUpload, file = null }) {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);

  // Allow internal or external file state, but prioritize external if provided
  const [internalFile, setInternalFile] = useState(null);
  const selectedFile = file || internalFile;

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFileSelected(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFileSelected(e.target.files[0]);
    }
  };

  const handleFileSelected = (file) => {
    setInternalFile(file);
    if (onUpload) {
      onUpload(file);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  const getFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  if (variant === 'detect') {
    return (
      <div 
        className={`relative group/upload h-80 flex flex-col items-center justify-center border-2 border-dashed rounded-xl transition-all cursor-pointer ${
          isDragging ? 'border-primary bg-primary-container/20' : 'border-outline-variant/30 bg-surface-container-lowest hover:bg-primary-container/10 hover:border-primary/50'
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={triggerFileInput}
      >
        <input 
          type="file" 
          ref={fileInputRef} 
          className="hidden" 
          onChange={handleChange}
          accept="video/*,image/*,.pdf,.doc,.docx,audio/*"
        />
        
        {selectedFile ? (
          <div className="flex flex-col items-center text-center gap-4 px-6">
            <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center">
              <span className="material-symbols-outlined text-primary text-3xl">task</span>
            </div>
            <div className="space-y-1">
              <p className="text-primary font-medium text-lg">{selectedFile.name}</p>
              <p className="text-on-surface-variant text-sm font-mono">{getFileSize(selectedFile.size)} • Ready for analysis</p>
            </div>
            <button className="mt-2 text-outline-variant font-bold text-xs tracking-widest uppercase hover:text-error transition-colors" onClick={(e) => { e.stopPropagation(); setInternalFile(null); if(onUpload) onUpload(null); }}>
              Remove File
            </button>
          </div>
        ) : (
          <div className="flex flex-col items-center text-center gap-4 px-6">
            <div className="w-16 h-16 rounded-full bg-surface-container flex items-center justify-center group-hover/upload:bg-primary/20 transition-colors">
              <span className="material-symbols-outlined text-primary text-3xl">upload_file</span>
            </div>
            <div className="space-y-1">
              <p className="text-on-surface font-medium">Drag and drop file here</p>
              <p className="text-on-surface-variant text-sm">Media & Documents up to 500MB</p>
            </div>
            <button className="mt-2 text-primary font-bold text-sm tracking-widest uppercase hover:text-white transition-colors pointer-events-none">
              Browse Files
            </button>
          </div>
        )}
      </div>
    );
  }

  // Home Variant
  return (
    <div 
      className={`flex flex-col items-center justify-center rounded-2xl ghost-border p-16 transition-all duration-300 ${
        isDragging ? 'bg-surface-container border-primary scale-[1.02]' : 'bg-surface-container-lowest hover:bg-surface-container hover:border-primary'
      }`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <input 
        type="file" 
        ref={fileInputRef} 
        className="hidden" 
        onChange={handleChange}
        accept="video/*,image/*,.pdf,.doc,.docx,audio/*"
      />
      
      {selectedFile ? (
        <>
          <span className="material-symbols-outlined text-primary text-6xl mb-6" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
          <div className="flex flex-col items-center gap-3 text-center">
            <h3 className="text-on-surface text-2xl font-headline font-bold truncate max-w-sm" title={selectedFile.name}>{selectedFile.name}</h3>
            <p className="text-on-surface-variant text-sm font-medium font-mono">{getFileSize(selectedFile.size)}</p>
          </div>
          <button 
            className="mt-8 flex cursor-pointer items-center justify-center overflow-hidden rounded-xl h-12 px-8 bg-surface-variant text-on-surface text-sm font-bold tracking-wide hover:bg-error/20 hover:text-error transition-colors border border-outline-variant/30"
            onClick={() => { setInternalFile(null); if(onUpload) onUpload(null); }}
          >
            <span>Change File</span>
          </button>
        </>
      ) : (
        <>
          <span className="material-symbols-outlined text-primary text-6xl mb-6 opacity-80" style={{ fontVariationSettings: "'FILL' 0" }}>cloud_upload</span>
          <div className="flex flex-col items-center gap-3 text-center">
            <h3 className="text-on-surface text-2xl font-headline font-bold">Drag &amp; Drop Files Here</h3>
            <p className="text-on-surface-variant text-sm font-medium">Media & Documents up to 100MB</p>
          </div>
          <button 
            className="mt-8 flex cursor-pointer items-center justify-center overflow-hidden rounded-xl h-12 px-8 bg-surface-variant text-on-surface text-sm font-bold tracking-wide hover:bg-surface-bright transition-colors border border-outline-variant/30"
            onClick={triggerFileInput}
          >
            <span>Browse Files</span>
          </button>
        </>
      )}
    </div>
  );
});

export default UploadBox;
