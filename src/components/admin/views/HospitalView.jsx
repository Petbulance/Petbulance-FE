import { Search, Share2, Phone, Clock } from 'lucide-react';
import React from 'react';

import { Badge } from '../ui/Badge';

export default function HospitalView() {
  return (
    <div className="animate-in fade-in space-y-6 duration-500">
      <div className="flex h-[calc(100vh-180px)] gap-6">
        <div className="flex w-1/3 flex-col overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm">
          <div className="border-b bg-gray-50/50 p-4">
            <div className="relative">
              <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <input
                className="w-full rounded-lg border py-2 pr-4 pl-9 text-sm"
                placeholder="병원명 검색..."
              />
            </div>
          </div>
          <div className="flex-1 divide-y divide-gray-50 overflow-y-auto">
            {[
              '아크리스 동물병원',
              '에코 특수동물병원',
              '하니 특수병원',
              '우성 동물센터',
            ].map((name, i) => (
              <div
                key={i}
                className={`cursor-pointer p-4 hover:bg-blue-50 ${i === 0 ? 'border-r-4 border-blue-600 bg-blue-50' : ''}`}
              >
                <div className="text-sm font-bold">{name}</div>
                <div className="mt-1 text-xs text-gray-400">
                  서울 강남구 역삼동 123-4
                </div>
                <div className="mt-2 flex gap-1">
                  <Badge color="green">진료중</Badge>
                  <Badge color="blue">파충류</Badge>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex-1 overflow-y-auto rounded-xl border border-gray-100 bg-white p-8 shadow-sm">
          <div className="mb-8 flex items-start justify-between">
            <div>
              <h2 className="text-2xl font-black text-gray-800">
                아크리스 동물병원
              </h2>
              <p className="text-sm text-gray-400">ID: PET_HOSP_000123</p>
            </div>
            <div className="flex gap-2">
              <button className="flex items-center gap-2 rounded-lg border px-4 py-2 text-sm font-bold hover:bg-gray-50">
                <Share2 className="h-4 w-4" /> 딥링크 복사
              </button>
              <button className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-bold text-white hover:bg-blue-700">
                저장하기
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="space-y-4 rounded-2xl bg-gray-50 p-6">
                <h3 className="flex items-center gap-2 border-b pb-2 text-sm font-bold text-gray-700">
                  <Phone className="h-4 w-4 text-blue-500" /> 기본 정보 및 편의
                  기능
                </h3>
                <div className="space-y-3">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-gray-400 uppercase">
                      전화번호
                    </label>
                    <input
                      className="w-full rounded border bg-white p-2 text-sm"
                      defaultValue="02-1234-5678"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-gray-400 uppercase">
                      주소
                    </label>
                    <input
                      className="w-full rounded border bg-white p-2 text-sm"
                      defaultValue="서울 강남구 역삼로 123"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-gray-400 uppercase">
                        위도(Lat)
                      </label>
                      <input
                        className="w-full rounded border bg-white p-2 text-sm"
                        defaultValue="37.123456"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-gray-400 uppercase">
                        경도(Lng)
                      </label>
                      <input
                        className="w-full rounded border bg-white p-2 text-sm"
                        defaultValue="127.123456"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4 rounded-2xl bg-gray-50 p-6">
                <h3 className="flex items-center gap-2 border-b pb-2 text-sm font-bold text-gray-700">
                  <Clock className="h-4 w-4 text-blue-500" /> 운영 시간 관리
                </h3>
                <div className="space-y-2">
                  {[
                    '월요일',
                    '화요일',
                    '수요일',
                    '목요일',
                    '금요일',
                    '토요일',
                    '일/공휴일',
                  ].map((day) => (
                    <div
                      key={day}
                      className="flex items-center justify-between rounded border bg-white p-2 text-xs"
                    >
                      <span className="w-16 font-bold">{day}</span>
                      <div className="flex items-center gap-2">
                        <input
                          type="time"
                          className="rounded border p-1"
                          defaultValue="09:00"
                        />
                        <span>~</span>
                        <input
                          type="time"
                          className="rounded border p-1"
                          defaultValue="18:00"
                        />
                      </div>
                      <label className="flex items-center gap-1">
                        <input type="checkbox" className="h-3 w-3" />{' '}
                        <span className="text-[10px]">휴무</span>
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="space-y-4 rounded-2xl bg-gray-50 p-6">
                <h3 className="border-b pb-2 text-sm font-bold text-gray-700">
                  진료 가능 동물종 (태그)
                </h3>
                <div className="flex flex-wrap gap-2">
                  {[
                    '파충류',
                    '조류',
                    '양서류',
                    '소형 포유류',
                    '고슴도치',
                    '토끼',
                  ].map((tag) => (
                    <div
                      key={tag}
                      className="flex items-center gap-2 rounded-full border bg-white px-3 py-1.5 text-xs"
                    >
                      {tag} <button className="text-red-400">×</button>
                    </div>
                  ))}
                  <button className="rounded-full bg-blue-100 px-3 py-1.5 text-xs font-bold text-blue-600">
                    + 추가
                  </button>
                </div>
              </div>

              <div className="space-y-4 rounded-2xl bg-gray-50 p-6">
                <h3 className="border-b pb-2 text-sm font-bold text-gray-700">
                  병원 소개글
                </h3>
                <textarea
                  className="h-40 w-full rounded-xl border bg-white p-4 text-sm outline-none focus:ring-2 focus:ring-blue-500"
                  defaultValue={`전국 최대 규모의 특수동물 전문 병원입니다.\n30년 경력의 전문의가 상주하며 최첨단 의료 시설을 갖추고 있습니다.\n파충류 및 희귀 조류 수술이 가능합니다.`}
                />
                <p className="text-[10px] text-gray-400">
                  * 5줄 이상 작성 시 앱에서 '더보기' 버튼이 자동 활성화됩니다.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
