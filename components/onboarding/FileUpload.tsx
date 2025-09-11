"use client"

import { useCallback, useState } from "react"
import { useDropzone } from "react-dropzone"
import { Upload, X, Link as LinkIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"

interface FileUploadProps {
  onFilesChange: (files: File[]) => void
  onLinkChange: (link: string) => void
  acceptedTypes?: string[]
  maxFiles?: number
  maxSize?: number
}

export function FileUpload({ 
  onFilesChange, 
  onLinkChange,
  acceptedTypes = ["image/*", ".pdf", ".doc", ".docx"],
  maxFiles = 5,
  maxSize = 10 * 1024 * 1024 // 10MB
}: FileUploadProps) {
  const [files, setFiles] = useState<File[]>([])
  const [link, setLink] = useState("")
  const [showLinkInput, setShowLinkInput] = useState(false)

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const newFiles = [...files, ...acceptedFiles].slice(0, maxFiles)
    setFiles(newFiles)
    onFilesChange(newFiles)
  }, [files, maxFiles, onFilesChange])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: acceptedTypes.reduce((acc, type) => {
      acc[type] = []
      return acc
    }, {} as Record<string, string[]>),
    maxSize,
    maxFiles: maxFiles - files.length
  })

  const removeFile = (index: number) => {
    const newFiles = files.filter((_, i) => i !== index)
    setFiles(newFiles)
    onFilesChange(newFiles)
  }

  const handleLinkChange = (value: string) => {
    setLink(value)
    onLinkChange(value)
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
              Suelta los archivos aquí...
            </p>
          ) : (
            <div>
                          <p className="text-lg font-medium text-brand-black mb-2">
              Arrastra archivos aquí o haz clic para seleccionar
            </p>
            <p className="text-sm text-brand-gray">
              PNG, JPG, PDF, DOC hasta {formatFileSize(maxSize)}
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
          <Label htmlFor="fileLink">Enlace a archivos</Label>
          <Input
            id="fileLink"
            type="url"
            placeholder="https://drive.google.com/..."
            value={link}
            onChange={(e) => handleLinkChange(e.target.value)}
          />
        </div>
      )}

      {/* File List */}
      {files.length > 0 && (
        <Card>
          <CardContent className="p-4">
            <h4 className="font-medium mb-3 text-brand-black">Archivos seleccionados:</h4>
            <div className="space-y-2">
              {files.map((file, index) => (
                <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded-sm">
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-medium">{file.name}</span>
                    <span className="text-xs text-brand-gray">
                      ({formatFileSize(file.size)})
                    </span>
                  </div>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => removeFile(index)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
