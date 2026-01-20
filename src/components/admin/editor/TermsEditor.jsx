import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import { useEffect, useRef, useState } from 'react';

/**
 * text(\n) → HTML 변환
 */
const textToHtml = (text = '') => {
  if (text.includes('<p') || text.includes('<br')) {
    // 이미 HTML이면 그대로
    return text;
  }

  return text
    .split('\n\n')
    .map((p) => `<p>${p.replace(/\n/g, '<br />')}</p>`)
    .join('');
};

export default function TermsEditor({ value, onChange }) {
  const editorRef = useRef(null);
  const [editorData, setEditorData] = useState('');

  /** value 변경 시 HTML 변환해서 에디터에 주입 */
  useEffect(() => {
    setEditorData(textToHtml(value));
  }, [value]);

  return (
    <div className="overflow-hidden rounded-lg border">
      <CKEditor
        editor={ClassicEditor}
        data={editorData}
        onReady={(editor) => {
          editorRef.current = editor;

          // 에디터 높이 고정
          editor.editing.view.change((writer) => {
            const root = editor.editing.view.document.getRoot();
            writer.setStyle('min-height', '420px', root);
          });
        }}
        onChange={(event, editor) => {
          const html = editor.getData();
          setEditorData(html);
          onChange(html); // 부모로는 HTML 그대로 전달
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
