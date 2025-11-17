import { handleUpload, type HandleUploadBody } from '@vercel/blob/client'
import { NextResponse } from 'next/server'

export async function POST(request: Request): Promise<NextResponse> {
  const body = (await request.json()) as HandleUploadBody

  try {
    const jsonResponse = await handleUpload({
      body,
      request,
      onBeforeGenerateToken: async (pathname) => {
        return {
          allowedContentTypes: ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'],
          maximumSizeInBytes: 10 * 1024 * 1024, // 10MB
          addRandomSuffix: true,
        }
      },
      onUploadCompleted: async ({ blob }) => {
        console.log('[v0] Image upload completed:', blob.url)
      },
    })

    return NextResponse.json(jsonResponse)
  } catch (error) {
    console.error('[v0] Upload error:', error)
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 400 }
    )
  }
}
