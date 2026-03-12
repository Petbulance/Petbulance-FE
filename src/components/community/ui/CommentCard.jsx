import { useNavigate } from 'react-router-dom';

function renderHighlightedText(text, keyword) {
  const normalizedKeyword = keyword?.trim();
  if (!normalizedKeyword) {
    return text;
  }

  const escapedKeyword = normalizedKeyword.replace(
    /[.*+?^${}()|[\]\\]/g,
    '\\$&'
  );
  const regex = new RegExp(`(${escapedKeyword})`, 'gi');
  const target = String(text ?? '');

  return target.split(regex).map((part, index) =>
    part.toLowerCase() === normalizedKeyword.toLowerCase() ? (
      <span key={`${part}-${index}`} className="font-semibold text-inherit">
        {part}
      </span>
    ) : (
      <span key={`${part}-${index}`}>{part}</span>
    )
  );
}

export function CommentCard({ comment, keyword }) {
  const navigate = useNavigate();

  return (
    <article
      className="border-b border-[#EEEEEE] px-6 py-3"
      onClick={() => navigate(`/index/community/${comment.postId}`)}
    >
      <div className="flex gap-2">
        {comment.img && (
          <div className="h-10 w-10 shrink-0 rounded-[3.59px] bg-[#F0F0F0]" />
        )}

        <div className="min-w-0 flex-1">
          <p className="truncate text-[16px] font-medium text-[#424242]">
            {renderHighlightedText(comment.content, keyword)}
          </p>
          <p className="text-[14px] text-[#9E9E9E]">
            {comment.nickname} · {comment.date}
          </p>
        </div>
      </div>

      <div className="mt-1 flex items-center gap-1">
        <span className="rounded-full border border-[#9E9E9E] px-2 py-[2px] text-[14px] font-medium text-[#616161]">
          원문
        </span>
        <p className="truncate text-[15px] font-medium text-[#616161]">
          {comment.postTitle}
        </p>
      </div>
    </article>
  );
}
