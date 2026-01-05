import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '@/apis/api.jsx';

export default function TermsDetailPage() {
  const { id } = useParams()
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchTerms = async () => {
      try {
        // ✅ TODO: 실제 API로 교체
        // GET /api/terms/{id}
        const res = await api.get(`/app/version`)
       console.log(res)

        setData([])
      } catch (e) {
        console.error(e)
      } finally {
        setLoading(false)
      }
    }

    fetchTerms()
  }, [id])

  if (loading) {
    return (
      <div className="p-4 text-sm text-gray-400">
        불러오는 중...
      </div>
    )
  }

  if (!data) {
    return (
      <div className="p-4 text-sm text-gray-400">
        약관을 찾을 수 없어요
      </div>
    )
  }

  return (
    <div className="bg-white px-4 py-5">
      <h1 className="mb-4 text-[18px] font-semibold">
        {data.title}
      </h1>

      <div className="whitespace-pre-line text-[14px] leading-relaxed text-[#424242]">
        {data.content}
      </div>
    </div>
  )
}
