"use client"

import { useCallback, useState } from "react"
import { useDropzone } from "react-dropzone"
import { Upload, X, Link as LinkIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"

interface SimpleFileUploadProps {
  onFileUpload: (url: string) => void
  currentFile?: string
  accept?: string
  maxSize?: number
}

export function SimpleFileUpload({ 
  onFileUpload, 
  currentFile,
  accept = "image/*",
  maxSize = 5 * 1024 * 1024 // 5MB
}: SimpleFileUploadProps) {
  const [file, setFile] = useState<File | null>(null)
  const [link, setLink] = useState(currentFile || "")
  const [showLinkInput, setShowLinkInput] = useState(false)

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      const selectedFile = acceptedFiles[0]
      setFile(selectedFile)
      
      // Crear una URL temporal para el archivo
      const fileUrl = URL.createObjectURL(selectedFile)
      onFileUpload(fileUrl)
    }
  }, [onFileUpload])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { [accept]: [] },
    maxSize,
    maxFiles: 1
  })

  const removeFile = () => {
    setFile(null)
    setLink("")
    onFileUpload("")
  }

  const handleLinkChange = (value: string) => {
    setLink(value)
    onFileUpload(value)
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  return (
    <div className="space-y-4">
      {/* Upload Area */}
      <div
        {...getRootProps()}
        className={`file-dropzone ${isDragActive ? 'active' : ''}`}
      >
        <input {...getInputProps()} />
        <div className="text-center">
          <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
          {isDragActive ? (
            <p className="text-lg font-medium text-brand-accent">
              Suelta el archivo aquí...
            </p>
          ) : (
            <div>
              <p className="text-lg font-medium text-brand-black mb-2">
                Arrastra un archivo aquí o haz clic para seleccionar
              </p>
              <p className="text-sm text-brand-gray">
                {accept === "image/*" ? "PNG, JPG, GIF" : "Cualquier archivo"} hasta {formatFileSize(maxSize)}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Link Option */}
      <div className="text-center">
        <Button
          type="button"
          variant="outline"
          onClick={() => setShowLinkInput(!showLinkInput)}
          className="flex items-center space-x-2"
        >
          <LinkIcon className="h-4 w-4" />
          <span>O proporcionar enlace (Google Drive, Dropbox, etc.)</span>
        </Button>
      </div>

      {showLinkInput && (
        <div className="space-y-2">
          <Label htmlFor="fileLink">Enlace al archivo</Label>
          <Input
            id="fileLink"
            type="url"
            placeholder="https://drive.google.com/..."
            value={link}
            onChange={(e) => handleLinkChange(e.target.value)}
          />
        </div>
      )}

      {/* File Preview */}
      {(file || currentFile) && (
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                {file && (
                  <>
                    <div className="w-12 h-12 bg-gray-100 rounded flex items-center justify-center">
                      <Upload className="h-6 w-6 text-gray-400" />
                    </div>
                    <div>
                      <p className="font-medium text-sm">{file.name}</p>
                      <p className="text-xs text-gray-500">
                        {formatFileSize(file.size)}
                      </p>
                    </div>
                  </>
                )}
                {currentFile && !file && (
                  <>
                    <div className="w-12 h-12 bg-gray-100 rounded flex items-center justify-center">
                      <LinkIcon className="h-6 w-6 text-gray-400" />
                    </div>
                    <div>
                      <p className="font-medium text-sm">Archivo desde enlace</p>
                      <p className="text-xs text-gray-500 truncate max-w-xs">
                        {currentFile}
                      </p>
                    </div>
                  </>
                )}
              </div>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={removeFile}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
