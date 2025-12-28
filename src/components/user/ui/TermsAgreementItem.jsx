import {
  AccordionItem, AccordionTrigger, AccordionContent,
} from '@/components/ui/accordion.jsx';
import { Checkbox } from '@/components/ui/checkbox.jsx';

export default function TermsAgreementItem({
                                             value, label, checked, onCheckedChange, children, required = false,
                                           }) {
  return (<AccordionItem value={value} className="border-b border-gray-100">
      <div className="flex items-center gap-3">
        {/* 체크박스 */}
        <Checkbox
          checked={checked}
          onCheckedChange={onCheckedChange}
          className="
    h-5 w-5
    border border-gray-300
    rounded-md
    bg-transparent

    data-[state=checked]:border-transparent

    [&>span>svg]:hidden
    data-[state=checked]:[&>span>svg]:block

    [&>span>svg]:h-5
    [&>span>svg]:w-5
    [&>span>svg]:text-blue-500
  "
        />


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
          <span>
            <span className="mr-1 text-gray-600">
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
          text-gray-500
        "
      >
        {children}
      </AccordionContent>
    </AccordionItem>);
}
