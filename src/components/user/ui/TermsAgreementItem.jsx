import {
  AccordionItem, AccordionTrigger, AccordionContent,
} from '@/components/ui/accordion.jsx';
import { Checkbox } from '@/components/ui/checkbox.jsx';
import grayImg from '@/assets/images/icons/gray_bottom_arrow.svg';
import blueImg from '@/assets/images/icons/blue_bottom_arrow.svg';
export default function TermsAgreementItem({
                                             value, label, checked, onCheckedChange, children, required = false,
                                           }) {
  return (<AccordionItem value={value} className="border-b border-gray-100">
      <div className="flex items-center gap-3">
        {/* 체크박스 */}
        <div
          className="flex h-5 w-5 cursor-pointer items-center justify-center"
          onClick={() => onCheckedChange(!checked)}
        >
          <img
            src={checked ? blueImg : grayImg}
            alt={checked ? 'checked' : 'unchecked'}
            className="h-5 w-5"
          />
        </div>


        {/* 제목 + 화살표 */}
        <AccordionTrigger
          className="
            flex
            flex-1
            items-center
            py-3
            text-left
            text-sm
            font-medium
            text-gray-900
            hover:no-underline

            [&>svg]:ml-auto
            [&>svg]:text-gray-400
            [&[data-state=open]>svg]:rotate-180
          "
        >
          <span className="text-tertiary font-bold">
            <span className="mr-1 ">
              [{required ? '필수' : '선택'}]
            </span>
            {label}
          </span>
        </AccordionTrigger>
      </div>

      {/* 펼쳐진 내용 */}
      <AccordionContent
        className="
          pl-8
          pb-3
          text-xs
          leading-relaxed
          text-caption
        "
      >
        {children}
      </AccordionContent>
    </AccordionItem>);
}
