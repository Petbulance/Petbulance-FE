import { Dialog, DialogContent, DialogHeader, DialogTitle, } from '@/components/ui/dialog.jsx';

export default function TermsDetailDialog({ open, onClose, title, content }) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-h-[80vh] w-full max-w-md overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-base font-bold">
            {title}
          </DialogTitle>
        </DialogHeader>

        <div className="mt-4 whitespace-pre-line text-sm text-gray-700">
          {content}
        </div>
      </DialogContent>
    </Dialog>
  );
}
