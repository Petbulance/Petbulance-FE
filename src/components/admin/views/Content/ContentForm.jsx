import { ChevronLeft, Upload, Image as ImageIcon } from 'lucide-react';
import { useEffect, useState } from 'react';

import api from '@/apis/api.jsx';

export default function ContentForm({ mode = 'create', initialData, onBack }) {
  /* =========================
     기본 폼 State
  ========================= */
  const [category, setCategory] = useState(initialData?.category || '이벤트');
  const [postStatus, setPostStatus] = useState(
    initialData?.postStatus || 'ACTIVE'
  );
  const [title, setTitle] = useState(initialData?.title || '');
  const [content, setContent] = useState(initialData?.content || '');
  const [fileUrls, setFileUrls] = useState(initialData?.fileUrls || []);

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
    if (initialData?.bannerInfo) {
      setIsBannerEnabled(true);
      setBannerStartDate(initialData.bannerInfo.startDate ?? '');
      setBannerEndDate(initialData.bannerInfo.endDate ?? '');
      setBannerPreview(initialData.bannerInfo.imageUrl ?? '');
    }
  }, [initialData]);

  /* =========================
     Enum 매핑
  ========================= */
  const mapNoticeStatus = (category) => {
    switch (category) {
      case '공지':
        return 'NOTICE';
      case '이벤트':
        return 'EVENT';
      case '광고':
        return 'ADVERTISING';
      default:
        return 'NOTICE';
    }
  };

  /* =========================
     presigned URL 발급 + S3 업로드 공통 함수
  ========================= */
  const uploadFilesWithPresign = async (files) => {
    // 1️⃣ presigned URL 발급
    console.log(files);
    const presignRes = await api.post('/app/image/presign', {
      files: files.map((file) => ({
        filename: file.name,
        contentType: file.type,
      })),
    });
    console.log(presignRes);
    const uploadedFiles = presignRes.data.data.uploadedFiles;
    console.log('uploadedFiles', uploadedFiles);
    // // 2️⃣ S3 PUT 업로드
    // await Promise.all(
    //   uploadedFiles.map((info, idx) =>
    //     fetch(info.preSignedUrl, {
    //       method: 'PUT',
    //       headers: {
    //         'Content-Type': files[idx].type,
    //       },
    //       body: files[idx],
    //     })
    //   )
    // );

    // 3️⃣ imageUrl 반환
    return uploadedFiles.map((f) => f.imageUrl);
  };

  /* =========================
     첨부 파일 업로드
  ========================= */
  const handleAttachFiles = async (e) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;
    console.log(files);
    try {
      const urls = await uploadFilesWithPresign(files);
      setFileUrls((prev) => [...prev, ...urls]);
    } catch (e) {
      console.error(e);
      alert('첨부 파일 업로드 실패');
    }
  };

  /* =========================
     배너 이미지 업로드
  ========================= */
  const handleBannerFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const [imageUrl] = await uploadFilesWithPresign([file]);
      setBannerPreview(imageUrl);
    } catch (e) {
      console.error(e);
      alert('배너 이미지 업로드 실패');
    }
  };

  /* =========================
     첨부 파일 삭제
  ========================= */
  const handleRemoveFileUrl = (index) => {
    setFileUrls((prev) => prev.filter((_, i) => i !== index));
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
      fileUrls,
      bannerRegistered: isBannerEnabled,
      ...(isBannerEnabled && {
        bannerInfo: {
          startDate: bannerStartDate,
          endDate: bannerEndDate,
          imageUrl: bannerPreview,
        },
      }),
    };
    console.log('저장 이벤트', payload);
    try {
      if (mode === 'create') {
        await api.post('/admin/notices', payload);
      }

      if (mode === 'edit') {
        /* =========================
           ✏️ 수정 (샘플)
           PUT /admin/notices/{noticeId}

           await api.put(
             `/admin/notices/${initialData.id}`,
             payload
           );
        ========================= */
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
            첨부 파일
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

          {fileUrls.length > 0 && (
            <ul className="mt-2 space-y-1">
              {fileUrls.map((url, idx) => (
                <li
                  key={idx}
                  className="flex items-center justify-between rounded bg-gray-50 px-2 py-1 text-xs"
                >
                  <span className="truncate">{url}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveFileUrl(idx)}
                    className="text-red-500 hover:text-red-700"
                  >
                    삭제
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
