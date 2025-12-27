import { Plus, ShieldCheck, Eye, Trash2 } from 'lucide-react';
import React from 'react';

export default function SettingsView() {
  return (
    <div className="animate-in fade-in space-y-6 duration-500">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-xl font-bold">관리자 계정 및 권한 설정</h3>
        <button className="flex items-center gap-2 rounded-lg bg-gray-800 px-6 py-2 text-sm font-bold text-white transition-all hover:bg-gray-900">
          <Plus className="h-4 w-4" /> 관리자 추가
        </button>
      </div>
      <div className="overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-gray-100 bg-gray-50">
            <tr>
              <th className="px-6 py-4 font-semibold text-gray-600">
                관리자 계정
              </th>
              <th className="px-6 py-4 font-semibold text-gray-600">
                권한 그룹
              </th>
              <th className="px-6 py-4 text-right font-semibold text-gray-600">
                관리
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {[
              { id: 'admin_master', name: '김대표', role: '최고관리자' },
              { id: 'ops_tester', name: '이대리', role: '조회자' },
            ].map((adm, i) => (
              <tr key={i} className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <div className="font-bold">{adm.name}</div>
                  <div className="font-mono text-xs text-gray-400">
                    {adm.id}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    {adm.role === '최고관리자' ? (
                      <ShieldCheck className="h-4 w-4 text-purple-600" />
                    ) : (
                      <Eye className="h-4 w-4 text-blue-500" />
                    )}
                    <span
                      className={`text-xs font-bold ${adm.role === '최고관리자' ? 'text-purple-600' : 'text-blue-500'}`}
                    >
                      {adm.role}
                    </span>
                  </div>
                </td>
                <td className="space-x-2 px-6 py-4 text-right">
                  <button className="rounded border px-3 py-1 text-xs hover:bg-gray-50">
                    수정
                  </button>
                  <button className="p-1 text-xs text-red-400 hover:text-red-600">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
