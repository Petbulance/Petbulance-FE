import { ChevronLeft, Upload, Image as ImageIcon } from 'lucide-react';
import { useEffect, useState } from 'react';

import api from '@/apis/api.jsx';

export default function ContentForm({
  mode = 'create',
  noticeId,
  initialData,
  onBack,
}) {
  /* =========================
     기본 폼 State
  ========================= */
  const [category, setCategory] = useState('이벤트');
  const [postStatus, setPostStatus] = useState('ACTIVE');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  /* =========================
     파일 State (🔥 수정 핵심)
  ========================= */
  const [originFiles, setOriginFiles] = useState([]); // 기존 서버 파일
  const [addFiles, setAddFiles] = useState([]); // 새로 추가할 파일(URL)
  const [deleteFileIds, setDeleteFileIds] = useState([]); // 삭제할 fileId
  const [filePreviews, setFilePreviews] = useState([]); // 화면 미리보기용

  /* =========================
     Banner State
  ========================= */
  const [isBannerEnabled, setIsBannerEnabled] = useState(false);
  const [bannerStartDate, setBannerStartDate] = useState('');
  const [bannerEndDate, setBannerEndDate] = useState('');
  const [bannerPreview, setBannerPreview] = useState('');

  /* =========================
     초기 데이터 반영 (수정 모드)
  ========================= */
  useEffect(() => {
    if (!initialData) return;

    setCategory(
      initialData.noticeStatus === 'NOTICE'
        ? '공지'
        : initialData.noticeStatus === 'ADVERTISING'
          ? '광고'
          : '이벤트'
    );
    setPostStatus(initialData.postStatus);
    setTitle(initialData.title);
    setContent(initialData.content);

    // 기존 파일 세팅
    if (Array.isArray(initialData.files)) {
      setOriginFiles(initialData.files);
      setFilePreviews(
        initialData.files.map((f) => ({
          previewUrl: f.fileUrl,
          fileId: f.fileId,
          isServerFile: true,
        }))
      );
    }

    // 배너 세팅
    if (initialData.bannerInfo) {
      setIsBannerEnabled(true);
      setBannerStartDate(initialData.bannerInfo.startDate);
      setBannerEndDate(initialData.bannerInfo.endDate);
      setBannerPreview(initialData.bannerInfo.imageUrl);
    }
  }, [initialData]);

  /* =========================
     Enum 매핑
  ========================= */
  const mapNoticeStatus = (category) => {
    switch (category) {
      case '공지':
        return 'NOTICE';
      case '광고':
        return 'ADVERTISING';
      default:
        return 'EVENT';
    }
  };

  /* =========================
     presigned URL 발급 + S3 업로드
  ========================= */
  const uploadFilesWithPresign = async (files, usage = 'NOTICE_FILE') => {
    if (!files.length) return [];

    const imageFiles = files.filter((f) => f.type.startsWith('image/'));
    if (!imageFiles.length) {
      alert('이미지 파일만 업로드할 수 있습니다.');
      return [];
    }

    const presignRes = await api.post('/app/image/presign', {
      files: imageFiles.map((file, index) => ({
        usage,
        filename: file.name,
        contentType: file.type,
        order: index + 1,
      })),
    });

    const uploadedFiles = presignRes.data.data.uploadedFiles;

    await Promise.all(
      uploadedFiles.map((fileInfo, index) =>
        fetch(fileInfo.preSignedUrl, {
          method: 'PUT',
          headers: { 'Content-Type': imageFiles[index].type },
          body: imageFiles[index],
        })
      )
    );

    return uploadedFiles.map((f) => f.imageUrl);
  };

  /* =========================
     첨부 파일 추가
  ========================= */
  const handleAttachFiles = async (e) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;

    // 미리보기
    setFilePreviews((prev) => [
      ...prev,
      ...files.map((file) => ({
        previewUrl: URL.createObjectURL(file),
        isServerFile: false,
      })),
    ]);

    const urls = await uploadFilesWithPresign(files);
    setAddFiles((prev) => [...prev, ...urls]);
  };

  /* =========================
     파일 삭제
  ========================= */
  const handleRemoveFile = (item, index) => {
    setFilePreviews((prev) => prev.filter((_, i) => i !== index));

    if (item.isServerFile) {
      setDeleteFileIds((prev) => [...prev, item.fileId]);
    } else {
      setAddFiles((prev) => prev.filter((_, i) => i !== index));
    }
  };

  /* =========================
     배너 이미지 업로드
  ========================= */
  const handleBannerFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const [imageUrl] = await uploadFilesWithPresign([file], 'BANNER');
    setBannerPreview(imageUrl);
  };

  /* =========================
     저장 (등록 / 수정)
  ========================= */
  const handleSubmit = async () => {
    const payload = {
      noticeStatus: mapNoticeStatus(category),
      postStatus,
      title,
      content,
      bannerRegistered: isBannerEnabled,

      ...(isBannerEnabled
        ? {
            bannerInfo: {
              startDate: bannerStartDate,
              endDate: bannerEndDate,
              imageUrl: bannerPreview,
            },
          }
        : {
            bannerInfo: {}, // ✅ 이게 핵심
          }),

      ...(mode === 'edit' && {
        addFiles,
        deleteFileIds,
      }),
    };

    console.log('저장 이벤트', payload);

    try {
      if (mode === 'create') {
        await api.post('/admin/notices', payload);
      } else {
        await api.put(`/admin/notices/${noticeId}`, payload);
      }

      alert('저장 완료');
      onBack();
    } catch (e) {
      console.error(e);
      alert('저장 실패');
    }
  };

  return (
    <div className="animate-in fade-in space-y-4">
      <button
        onClick={onBack}
        className="flex items-center text-sm text-gray-500 hover:text-gray-800"
      >
        <ChevronLeft size={16} className="mr-1" />
        목록으로 돌아가기
      </button>

      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">
          {mode === 'edit' ? '공지/배너 수정' : '공지/배너 신규 등록'}
        </h2>
        <button
          onClick={handleSubmit}
          className="rounded bg-blue-600 px-6 py-2 text-sm text-white hover:bg-blue-700"
        >
          저장
        </button>
      </div>

      <div className="space-y-6 rounded-lg border bg-white p-6">
        {/* 분류 / 상태 */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div>
            <label className="mb-1 block text-sm font-medium">분류</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full rounded border p-2 text-sm"
            >
              <option>이벤트</option>
              <option>공지</option>
              <option>광고</option>
            </select>
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium">상태</label>
            <div className="flex h-[38px] items-center gap-4">
              <label className="flex items-center gap-2 text-sm">
                <input
                  type="radio"
                  checked={postStatus === 'ACTIVE'}
                  onChange={() => setPostStatus('ACTIVE')}
                />
                게시
              </label>
              <label className="flex items-center gap-2 text-sm">
                <input
                  type="radio"
                  checked={postStatus === 'INACTIVE'}
                  onChange={() => setPostStatus('INACTIVE')}
                />
                중단
              </label>
            </div>
          </div>
        </div>

        {/* 제목 */}
        <div>
          <label className="mb-1 block text-sm font-medium">제목</label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full rounded border p-2 text-sm"
          />
        </div>

        {/* 메인 배너 */}
        <div className="rounded-lg border bg-gray-50 p-4">
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ImageIcon size={18} />
              <span className="text-sm font-bold">메인 배너 설정</span>
            </div>

            <button
              onClick={() => setIsBannerEnabled((v) => !v)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full ${
                isBannerEnabled ? 'bg-blue-600' : 'bg-gray-300'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                  isBannerEnabled ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>

          {isBannerEnabled && (
            <div className="space-y-4">
              <div className="flex gap-2">
                <input
                  type="date"
                  value={bannerStartDate}
                  onChange={(e) => setBannerStartDate(e.target.value)}
                  className="w-full rounded border p-2 text-sm"
                />
                <input
                  type="date"
                  value={bannerEndDate}
                  onChange={(e) => setBannerEndDate(e.target.value)}
                  className="w-full rounded border p-2 text-sm"
                />
              </div>

              <label className="flex cursor-pointer items-center justify-center rounded border border-dashed p-2 text-xs text-gray-400">
                <Upload size={14} className="mr-1" />
                배너 이미지 선택
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleBannerFileChange}
                />
              </label>

              {bannerPreview && (
                <img
                  src={bannerPreview}
                  alt="배너 미리보기"
                  className="h-40 w-full rounded object-cover"
                />
              )}
            </div>
          )}
        </div>

        {/* 본문 */}
        <div>
          <label className="mb-1 block text-sm font-medium">본문 내용</label>
          <textarea
            rows={8}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full rounded border p-2 text-sm"
          />
        </div>

        {/* 첨부 파일 */}
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            이미지 파일
          </label>
          <label className="flex cursor-pointer items-center justify-center rounded border border-dashed p-2 text-xs text-gray-400">
            <Upload size={14} className="mr-1" />
            파일 선택
            <input
              type="file"
              multiple
              className="hidden"
              onChange={handleAttachFiles}
            />
          </label>

          {filePreviews.length > 0 && (
            <div className="mt-3 w-full gap-3 md:grid-cols-4">
              {filePreviews.map((item, idx) => (
                <div
                  key={idx}
                  className="relative overflow-hidden rounded border"
                >
                  <img
                    src={item.previewUrl}
                    alt="미리보기"
                    className="h-32 w-full object-cover"
                  />

                  <button
                    type="button"
                    onClick={() => handleRemoveFile(item, idx)} // ✅ 핵심
                    className="absolute top-1 right-1 rounded bg-black/60 px-2 py-1 text-xs text-white"
                  >
                    삭제
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
