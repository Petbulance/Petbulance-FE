import eye from '@/assets/images/icons/eye_icon.svg';
import dot from '@/assets/images/icons/DotIcon.svg';
import thumbs from '@/assets/images/icons/thumbs.svg';
import message from '@/assets/images/icons/message.svg';

export function PostCard({ post }) {
  return (
    <article key={post.id} className="border-b border-[##EEEEEE] px-6 py-4">
      <div className="flex gap-3">
        <div className="min-w-0 flex-1">
          <div className="flex justify-between">
            <div>
              <div className="mb-2 flex items-center gap-1 text-[14px]">
                <span className="rounded border-[0.5px] border-[#9E9E9E] px-2 py-[2px] text-[#616161]">
                  {post.category}
                </span>
                <span className="rounded bg-[#F5F5F5] px-2 py-[2px] text-[#9E9E9E]">
                  {post.animal}
                </span>
              </div>

              <h3 className="mb-2 text-[18px] font-medium text-[#1E1E1E]">
                {post.title}
              </h3>
              <p className="mb-[28px] text-[16px] text-[#424242]">
                {post.content}
              </p>
            </div>

            {post.hasImage && (
              <div className="relative ml-3 h-[90px] w-[90px] shrink-0 rounded-[8px] bg-gray-100">
                <span className="absolute top-0 left-0 rounded-tl-[8px] rounded-br-[8px] bg-[#222222]/50 px-1 px-[6.5px] py-[2px] text-[11px] text-white">
                  5
                </span>
              </div>
            )}
          </div>

          <div className="flex items-center justify-between">
            <div className="flex flex-row items-center gap-[2px] text-[14px] text-[#9E9E9E]">
              {post.nickname}
              <img src={dot} />
              {post.time}
              <img src={dot} />
              <img src={eye} /> {post.views}
            </div>

            <div className="flex justify-end gap-3 text-sm text-[#A3A3A3]">
              <p className="flex items-center gap-1">
                <img src={thumbs} /> {post.likes}
              </p>
              <p className="flex items-center gap-1">
                <img src={message} /> {post.comments}
              </p>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
