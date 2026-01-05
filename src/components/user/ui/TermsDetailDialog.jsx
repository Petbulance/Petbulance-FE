import { Dialog, DialogContent, DialogHeader, DialogTitle, } from '@/components/ui/dialog.jsx';

export default function TermsDetailDialog({ open, onClose, title, content }) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-h-[80vh] w-full  overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-[27px] font-semibold text-[#1e1e1e]">
            {title}
          </DialogTitle>
        </DialogHeader>

        <div className="mt-6 whitespace-pre-line text-[16px] text-[#1e1e1e]">
          {content}
        </div>
      </DialogContent>
    </Dialog>
  );
}
