"use client"

import { useState, useRef } from 'react'
import { upload } from '@vercel/blob/client'
import { Button } from '@/components/ui/button'
import { Upload, X, Loader2 } from 'lucide-react'

type ImageUploadProps = {
  onUploadComplete: (url: string) => void
  currentImage?: string
  label?: string
}

export function ImageUpload({ onUploadComplete, currentImage, label = "სურათის ატვირთვა" }: ImageUploadProps) {
  const [uploading, setUploading] = useState(false)
  const [preview, setPreview] = useState<string | null>(currentImage || null)
  const inputFileRef = useRef<HTMLInputElement>(null)

  const handleUpload = async (file: File) => {
    setUploading(true)
    try {
      const blob = await upload(file.name, file, {
        access: 'public',
        handleUploadUrl: '/api/upload',
      })
      
      setPreview(blob.url)
      onUploadComplete(blob.url)
    } catch (error) {
      console.error('[v0] Upload failed:', error)
      alert('ატვირთვა ვერ მოხერხდა. გთხოვთ სცადოთ თავიდან.')
    } finally {
      setUploading(false)
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      // Create preview
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreview(reader.result as string)
      }
      reader.readAsDataURL(file)
      
      // Upload to Vercel Blob
      handleUpload(file)
    }
  }

  const clearImage = () => {
    setPreview(null)
    onUploadComplete('')
    if (inputFileRef.current) {
      inputFileRef.current.value = ''
    }
  }

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <Button
          type="button"
          onClick={() => inputFileRef.current?.click()}
          disabled={uploading}
          variant="outline"
          className="flex items-center gap-2"
        >
          {uploading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              ატვირთვა...
            </>
          ) : (
            <>
              <Upload className="w-4 h-4" />
              {label}
            </>
          )}
        </Button>
        {preview && (
          <Button
            type="button"
            onClick={clearImage}
            variant="ghost"
            size="sm"
          >
            <X className="w-4 h-4" />
          </Button>
        )}
      </div>
      <input
        ref={inputFileRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />
      {preview && (
        <div className="mt-2">
          <img
            src={preview || "/placeholder.svg"}
            alt="Preview"
            className="max-w-xs h-auto rounded-lg border"
          />
        </div>
      )}
    </div>
  )
}
