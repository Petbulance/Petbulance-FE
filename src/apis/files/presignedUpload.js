import api from '@/apis/api.jsx';

export async function uploadImagesWithPresign(
  files = [],
  { usage = 'NOTICE_FILE', authType } = {}
) {
  const imageFiles = (Array.isArray(files) ? files : []).filter(
    (file) => file instanceof File && file.type?.startsWith('image/')
  );

  if (imageFiles.length === 0) return [];

  const config = authType ? { authType } : undefined;
  const presignRes = await api.post(
    '/app/image/presign',
    {
      files: imageFiles.map((file, index) => ({
        usage,
        filename: file.name,
        contentType: file.type || 'application/octet-stream',
        order: index + 1,
      })),
    },
    config
  );

  const uploadedFiles = presignRes?.data?.data?.uploadedFiles ?? [];
  if (uploadedFiles.length !== imageFiles.length) {
    throw new Error(
      `발급된 업로드 URL 수(${uploadedFiles.length})와 파일 수(${imageFiles.length})가 다릅니다.`
    );
  }

  await Promise.all(
    uploadedFiles.map(async (fileInfo, index) => {
      const response = await fetch(fileInfo.preSignedUrl, {
        method: 'PUT',
        headers: { 'Content-Type': imageFiles[index].type },
        body: imageFiles[index],
      });

      if (!response.ok) {
        throw new Error(
          `S3 업로드 실패: ${response.status} ${response.statusText || ''}`.trim()
        );
      }
    })
  );

  return uploadedFiles.map((file) => file.imageUrl).filter(Boolean);
}

