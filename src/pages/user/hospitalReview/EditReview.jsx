import { useState, useEffect, useRef, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchHospitalsByName } from '@/apis/hospitals';
import { fetchReceiptDetail } from '@/apis/reviews/receipts';

import add from '@/assets/images/icons/add_icon.svg';
import circle_x from '@/assets/images/icons/circle_x.svg';
import down_arrow from '@/assets/images/icons/down_arrow2.svg';
import empty_star_icon from '@/assets/images/icons/star_gray_40.svg';
import fill_star_icon from '@/assets/images/icons/star_yellow_40.svg';

import { InputField } from './form/ReviewForm_2';
import { ANIMAL_CATEGORY_VALUE, ANIMAL_GROUPS_VALUE } from '@/data/animalSort';
import ConfirmSelectModal from '@/components/commons/layout/ConfirmSelectModal';
import { modifyReview } from '@/apis/reviews/modifyReview';
import { NextBtn } from '@/components/reviews/ui/NextBtn';
import { SelectField } from '@/components/reviews/ui/SelectField';

export function EditReview() {
  const { reviewId } = useParams();
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const containerRef = useRef(null);

  // 1. 상태 관리
  const [data, setData] = useState({
    hospitalName: '',
    hospitalId: null,
    cost: '',
    animalType: '',
    animalDetail: '',
    ratings: { expertise: 0, kindness: 0, facility: 0 },
    images: [],
    content: '',
  });

  const [searchTerm, setSearchTerm] = useState('');
  const [recommendations, setRecommendations] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSuccessOpen, setIsSuccessOpen] = useState(false);

  const categories = [
    {
      id: 'expertise',
      label: '전문성',
      desc: '증상과 치료에 대해 자세히 설명했나요?',
    },
    {
      id: 'kindness',
      label: '친절도',
      desc: '접수/수납 과정에서 충분한 안내를 받았나요?',
    },
    {
      id: 'facility',
      label: '시설/환경',
      desc: '진료실과 병원 시설이 위생적이었나요?',
    },
  ];

  // 2. 기존 데이터 불러오기
  useEffect(() => {
    const getReviewDetail = async () => {
      if (!reviewId) return;
      setIsLoading(true);
      try {
        const res = await fetchReceiptDetail(reviewId);
        const mappedData = {
          hospitalName: res.hospitalName,
          hospitalId: res.hospitalId,
          cost: res.totalPrice?.toString() || '',
          animalType: res.animalType,
          animalDetail: res.detailAnimalType,
          ratings: {
            expertise: res.expertiseRating || 0,
            kindness: res.kindnessRating || 0,
            facility: res.facilityRating || 0,
          },
          images: res.images || [],
          content: res.reviewContent || '',
        };
        setData(mappedData);
        setSearchTerm(res.hospitalName);
      } catch (error) {
        console.error('리뷰 로드 실패:', error);
        alert('리뷰 정보를 불러올 수 없습니다.');
        navigate(-1);
      } finally {
        setIsLoading(false);
      }
    };
    getReviewDetail();
  }, [reviewId, navigate]);

  // 3. 병원명 검색 로직
  useEffect(() => {
    if (!searchTerm.trim() || searchTerm === data.hospitalName) return;
    const timer = setTimeout(async () => {
      try {
        const results = await fetchHospitalsByName(searchTerm, {});
        setRecommendations(results.list || results || []);
        setShowDropdown(true);
      } catch (error) {
        console.error('병원 추천 목록 로드 실패:', error);
      }
    }, 300);
    return () => clearTimeout(timer);
  }, [searchTerm, data.hospitalName]);

  const detailOptions = useMemo(() => {
    return data.animalType ? ANIMAL_GROUPS_VALUE[data.animalType] || [] : [];
  }, [data.animalType]);

  const handleUpdateSubmit = async () => {
    const cleanedCost = Number(data.cost.toString().replace(/[^0-9]/g, ''));

    const payload = {
      reviewId: Number(reviewId),
      title: '병원 후기 수정',
      receiptChecked: true,
      hospitalId: Number(data.hospitalId),
      expertiseRating: Number(data.ratings.expertise),
      kindnessRating: Number(data.ratings.kindness),
      facilityRating: Number(data.ratings.facility),
      totalPrice: cleanedCost,
      animalType: data.animalType,
      receiptItems: [{ name: '진료비', price: cleanedCost }],
      visitDate: new Date().toISOString().split('T')[0],
      reviewComment: data.content,
      images: data.images.map((img) => ({
        filename: typeof img === 'string' ? img.split('/').pop() : img.name,
        contentType: typeof img === 'string' ? 'image/jpeg' : img.type,
      })),
      detailAnimalType: data.animalDetail,
    };

    try {
      await modifyReview(payload);
      setIsSuccessOpen(true);
    } catch (error) {
      alert('후기 수정에 실패했습니다.');
      console.error(error);
    }
  };

  const handleChange = (field, value) =>
    setData((prev) => ({ ...prev, [field]: value }));

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    if (!value.trim()) {
      setRecommendations([]);
      setShowDropdown(false);
      setData((prev) => ({ ...prev, hospitalName: '', hospitalId: null }));
    }
  };

  const handleSelectHospital = (hospital) => {
    setData((prev) => ({
      ...prev,
      hospitalName: hospital.name,
      hospitalId: hospital.hospitalId || hospital.id,
    }));
    setSearchTerm(hospital.name);
    setShowDropdown(false);
  };

  const handleRating = (catId, score) =>
    setData((prev) => ({
      ...prev,
      ratings: { ...prev.ratings, [catId]: score },
    }));

  const handleAddImage = (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;
    const newImageUrls = files.map((file) => URL.createObjectURL(file));
    setData((prev) => ({
      ...prev,
      images: [...prev.images, ...newImageUrls].slice(0, 5),
    }));
  };

  const handleRemoveImage = (index) =>
    setData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target))
        setShowDropdown(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (isLoading)
    return (
      <div className="flex h-screen items-center justify-center text-[20px] font-medium text-gray-500">
        리뷰 정보를 불러오는 중입니다...
      </div>
    );

  return (
    <div className="relative min-h-screen bg-white p-6 pb-[100px]">
      <h2 className="mb-8 text-[24px] font-bold text-[#424242]">후기 수정</h2>

      {/* 병원명 입력 */}
      <div className="relative mb-6" ref={containerRef}>
        <label className="mb-2 block text-[19px] font-medium text-[#424242]">
          병원명
        </label>
        <input
          className="w-full rounded-[8px] border border-[#EEEEEE] bg-white px-4 py-[14px] text-[20px] focus:outline-none"
          placeholder="병원명을 입력하세요"
          value={searchTerm}
          onChange={handleInputChange}
          onFocus={() =>
            searchTerm && recommendations.length > 0 && setShowDropdown(true)
          }
        />
        {showDropdown && recommendations.length > 0 && (
          <ul className="absolute z-50 mt-1 max-h-[220px] w-full overflow-y-auto rounded-[8px] border border-[#EEEEEE] bg-white shadow-xl">
            {recommendations.map((hospital) => (
              <li
                key={hospital.id}
                className="cursor-pointer border-b border-[#F5F5F5] px-4 py-3 last:border-none hover:bg-[#F9F9F9]"
                onClick={() => handleSelectHospital(hospital)}
              >
                <div className="text-[18px] font-medium text-[#424242]">
                  {hospital.name}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      <InputField
        label="총 비용"
        value={data.cost || ''}
        onChange={(val) => handleChange('cost', val)}
      />

      <SelectField
        label="동물종"
        value={data.animalType}
        options={ANIMAL_CATEGORY_VALUE}
        onChange={(val) =>
          setData((prev) => ({ ...prev, animalType: val, animalDetail: '' }))
        }
      />

      <SelectField
        label="세부 동물명"
        value={data.animalDetail}
        options={detailOptions}
        onChange={(val) => handleChange('animalDetail', val)}
        disabled={!data.animalType}
      />

      <section className="mt-12 text-center">
        {categories.map((cat) => (
          <div key={cat.id} className="mb-10 text-left">
            <span className="text-[20px] font-semibold text-[#424242]">
              {cat.label}
            </span>
            <div className="mt-4 flex justify-center gap-1">
              {[1, 2, 3, 4, 5].map((num) => (
                <button
                  key={num}
                  type="button"
                  onClick={() => handleRating(cat.id, num)}
                  className="p-1 active:scale-95"
                >
                  <img
                    src={
                      num <= data.ratings[cat.id]
                        ? fill_star_icon
                        : empty_star_icon
                    }
                    alt="star"
                    className="h-10 w-10"
                  />
                </button>
              ))}
            </div>
          </div>
        ))}
      </section>

      <section className="mt-10">
        <div className="mb-8 flex flex-wrap gap-2.5">
          {data.images.map((img, index) => (
            <div key={index} className="relative h-[110px] w-[110px]">
              <img
                src={img}
                alt="review"
                className="h-full w-full rounded-[8px] border border-[#EEEEEE] object-cover"
              />
              <button
                type="button"
                onClick={() => handleRemoveImage(index)}
                className="absolute -top-2 -right-2 z-20"
              >
                <img src={circle_x} alt="delete" />
              </button>
            </div>
          ))}
          {data.images.length < 5 && (
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="flex h-[110px] w-[110px] items-center justify-center rounded-[8px] border border-[#E0E0E0] bg-white"
            >
              <img src={add} alt="add" />
              <input
                ref={fileInputRef}
                type="file"
                multiple
                accept="image/*"
                onChange={handleAddImage}
                className="hidden"
              />
            </button>
          )}
        </div>
        <label className="mb-2 block text-[19px] font-medium text-[#424242]">
          내용
        </label>
        <textarea
          className="h-[200px] w-full resize-none rounded-[8px] border border-[#EEEEEE] p-4 text-[18px] focus:outline-none"
          value={data.content}
          onChange={(e) => handleChange('content', e.target.value)}
        />
      </section>

      <div className="mt-12">
        <NextBtn
          label="수정 완료"
          onClick={handleUpdateSubmit}
          isComplete={true}
        />
      </div>

      {isSuccessOpen && (
        <ConfirmSelectModal
          open={true}
          title={`후기가 수정되었습니다.`}
          content={`작성해주신 후기는 검수 완료 후 공개됩니다.`}
          confirmText="작성한 후기 확인"
          cancelText="닫기"
          onConfirm={() => navigate(`/index/reviews/detail/${reviewId}`)}
          onCancel={() => navigate('/index/reviews')}
        />
      )}
    </div>
  );
}
