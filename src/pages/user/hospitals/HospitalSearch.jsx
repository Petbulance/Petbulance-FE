import { ButtonSection } from '@/components/hosiptals/ui/ButtonSection';
import { SearchBody } from '@/components/hosiptals/ui/HospitalSearch/SearchBody';

export function HospitalSearch() {
  const RECENT_KEYWORDS = ['도마뱀', '게코', '게코도마뱀'];

  const RECENT_HOSPITALS = [
    '연세동물병원',
    '에코동물병원',
    '서울응급동물병원',
    '행복동물병원',
  ];

  return (
    <div className="flex h-dvh flex-col bg-white">
      <ButtonSection />
      <SearchBody
        recentKeywords={RECENT_KEYWORDS}
        recentHospitals={RECENT_HOSPITALS}
        onRemoveKeyword={(w) => console.log('remove keyword', w)}
        onRemoveHospital={(h) => console.log('remove hospital', h)}
      />
    </div>
  );
}
