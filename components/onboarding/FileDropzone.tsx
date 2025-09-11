"use client"

import { useCallback, useState } from "react"
import { useDropzone } from "react-dropzone"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { X, Upload, Image, File } from "lucide-react"
import { cn } from "@/lib/utils"

interface FileDropzoneProps {
  onFilesChange: (files: File[]) => void
  acceptedTypes?: string[]
  maxFiles?: number
  maxSize?: number // en bytes
  title?: string
  description?: string
}

export function FileDropzone({
  onFilesChange,
  acceptedTypes = ["image/*"],
  maxFiles = 5,
  maxSize = 5 * 1024 * 1024, // 5MB
  title = "Subir archivos",
  description = "Arrastra y suelta archivos aquí o haz clic para seleccionar"
}: FileDropzoneProps) {
  const [files, setFiles] = useState<File[]>([])

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const newFiles = [...files, ...acceptedFiles].slice(0, maxFiles)
    setFiles(newFiles)
    onFilesChange(newFiles)
  }, [files, maxFiles, onFilesChange])

  const removeFile = (index: number) => {
    const newFiles = files.filter((_, i) => i !== index)
    setFiles(newFiles)
    onFilesChange(newFiles)
  }

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: acceptedTypes.reduce((acc, type) => {
      acc[type] = []
      return acc
    }, {} as Record<string, string[]>),
    maxFiles: maxFiles - files.length,
    maxSize,
    multiple: true
  })

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
  }

  const getFileIcon = (file: File) => {
    if (file.type.startsWith("image/")) {
      // eslint-disable-next-line jsx-a11y/alt-text
      return <Image className="w-5 h-5" />
    }
    // eslint-disable-next-line jsx-a11y/alt-text
    return <File className="w-5 h-5" />
  }

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-base font-semibold mb-1">{title}</h3>
        <p className="text-sm text-gray-600">{description}</p>
      </div>

      {/* Zona de drop */}
      <div
        {...getRootProps()}
        className={cn(
          "file-dropzone cursor-pointer transition-colors duration-200",
          isDragActive && "active"
        )}
      >
        <input {...getInputProps()} />
        <div className="flex flex-col items-center justify-center py-8">
          <Upload className="w-12 h-12 text-gray-400 mb-4" />
          <p className="text-lg font-medium mb-2">
            {isDragActive ? "Suelta los archivos aquí" : "Arrastra archivos aquí"}
          </p>
          <p className="text-sm text-gray-500 mb-4">
            o haz clic para seleccionar archivos
          </p>
          <Button variant="outline" type="button">
            Seleccionar archivos
          </Button>
        </div>
      </div>

      {/* Archivos seleccionados */}
      {files.length > 0 && (
        <div className="space-y-2">
          <h4 className="text-sm font-medium">
            Archivos seleccionados ({files.length}/{maxFiles})
          </h4>
          <div className="space-y-2">
            {files.map((file, index) => (
              <Card key={index} className="p-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    {getFileIcon(file)}
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">
                        {file.name}
                      </p>
                      <p className="text-xs text-gray-500">
                        {formatFileSize(file.size)}
                      </p>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeFile(index)}
                    className="h-8 w-8"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Información adicional */}
      <div className="text-xs text-gray-500 bg-gray-50 p-3 rounded-lg">
        <p className="font-medium mb-1">Formatos aceptados:</p>
        <p>
          {acceptedTypes.includes("image/*") && "Imágenes (PNG, JPG, SVG, etc.) "}
          {acceptedTypes.includes("application/pdf") && "PDF "}
          {acceptedTypes.includes(".psd") && "PSD "}
          {acceptedTypes.includes(".ai") && "AI "}
        </p>
        <p className="mt-1">
          Tamaño máximo: {formatFileSize(maxSize)} por archivo
        </p>
      </div>
    </div>
  )
}
