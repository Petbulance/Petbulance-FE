import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { useRef } from 'react';

export default function TermsEditor({ value, onChange }) {
  const editorRef = useRef(null);

  return (
    <div className="rounded-lg border overflow-hidden">
      <CKEditor
        editor={ClassicEditor}
        data={value}
        onReady={(editor) => {
          editorRef.current = editor;

          // ✅ 여기서 실제 입력 영역 높이 강제 설정
          editor.editing.view.change((writer) => {
            const root = editor.editing.view.document.getRoot();
            writer.setStyle('min-height', '420px', root);
          });
        }}
        onChange={(event, editor) => {
          onChange(editor.getData());
        }}
        config={{
          toolbar: [
            'bold',
            'italic',
            'underline',
            '|',
            'bulletedList',
            'numberedList',
            '|',
            'link',
            '|',
            'undo',
            'redo',
          ],
        }}
      />
    </div>
  );
}
