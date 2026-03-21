import api from '@/apis/api.jsx';
import { uploadImagesWithPresign } from '@/apis/files/presignedUpload.js';

export const COMMUNITY_TYPE_TO_API = {
  전체: undefined,
  소형포유류: 'SMALLMAMMALS',
  조류: 'AVIAN',
  파충류: 'REPTILE',
  양서류: 'AMPHIBIAN',
  어류: 'FISH',
};

export const COMMUNITY_TOPIC_TO_API = {
  전체: undefined,
  '건강/질병': 'HEALTH',
  '용품/사료': 'SUPPLIES',
  '일상/자랑': 'DAILY',
};

export const COMMUNITY_SORT_TO_API = {
  최신순: 'latest',
  인기순: 'popular',
};

const POST_IMAGE_USAGE = import.meta.env.VITE_POST_IMAGE_USAGE || 'BANNER';

export async function fetchCommunityPosts({
  type,
  topic,
  sort = 'latest',
  lastPostId,
  pageSize = 20,
} = {}) {
  const response = await api.get('/posts', {
    params: {
      type,
      topic,
      sort,
      lastPostId: lastPostId ?? undefined,
      pageSize,
    },
  });

  return response.data?.data ?? {};
}

export async function fetchMyPosts({
  keyword,
  lastPostId,
  pageSize = 10,
} = {}) {
  const response = await api.get('/posts/me', {
    params: {
      keyword: keyword || undefined,
      lastPostId: lastPostId ?? undefined,
      pageSize,
    },
  });

  return response.data?.data ?? {};
}

export async function fetchMyComments({
  keyword,
  lastCommentId,
  pageSize = 10,
} = {}) {
  const response = await api.get('/comments/me', {
    params: {
      keyword: keyword || undefined,
      lastCommentId: lastCommentId ?? undefined,
      pageSize,
    },
  });

  return response.data?.data ?? {};
}

export async function fetchCommunityPostDetail(postId, options = {}) {
  const response = await api.get(`/posts/${postId}`, {
    authType: options.authType,
  });
  const data = response.data?.data ?? {};
  return data.post ?? data;
}

export async function createPostLike(postId) {
  const response = await api.post(`/posts/${postId}/likes`);
  return response.data?.data ?? {};
}

export async function deletePostLike(postId) {
  const response = await api.delete(`/posts/${postId}/likes`);
  return response.data?.data ?? {};
}

export async function deleteCommunityPosts(postIds = []) {
  const response = await api.delete('/posts', {
    data: {
      postIds,
    },
  });

  return response.data?.data ?? {};
}

export async function createCommunityPost({
  type,
  topic,
  title,
  content,
  imageUrls = [],
}) {
  const payload = {
    type,
    topic,
    title,
    content,
    imageUrls: Array.isArray(imageUrls) ? imageUrls : [],
  };

  const response = await api.post('/posts', payload);

  return response.data?.data ?? {};
}

export async function updateCommunityPost(postId, payload) {
  const response = await api.put(`/posts/${postId}`, payload);
  return response.data?.data ?? {};
}

export async function uploadPostImages(imageFiles = []) {
  return uploadImagesWithPresign(imageFiles, { usage: POST_IMAGE_USAGE });
}

export async function fetchPostComments(postId) {
  const response = await api.get(`/posts/${postId}/comments`);
  console.log('poset/id/comm', response);
  const root = response.data ?? {};
  const data = root.data ?? {};

  if (Array.isArray(data)) return data;
  if (Array.isArray(data.comments)) return data.comments;
  if (Array.isArray(data.content)) return data.content;
  if (Array.isArray(data.list)) return data.list;
  if (Array.isArray(data.commentList)) return data.commentList;
  if (Array.isArray(data.items)) return data.items;

  // 일부 응답은 data 안에 다시 data를 감싸서 내려줄 수 있음
  const nested = data.data ?? {};
  if (Array.isArray(nested)) return nested;
  if (Array.isArray(nested.comments)) return nested.comments;
  if (Array.isArray(nested.content)) return nested.content;
  if (Array.isArray(nested.list)) return nested.list;
  if (Array.isArray(nested.commentList)) return nested.commentList;
  if (Array.isArray(nested.items)) return nested.items;

  return [];
}

export async function createPostComment(postId, payload) {
  const response = await api.post(`/posts/${postId}/comments`, payload);
  return response.data?.data ?? {};
}

export async function deletePostComment(commentId) {
  const response = await api.delete(`/comments/${commentId}`);
  return response.data?.data ?? {};
}

export async function updatePostComment(commentId, payload) {
  const response = await api.patch(`/comments/${commentId}`, payload);
  return response.data?.data ?? {};
}

export async function uploadCommentImages(imageFiles = []) {
  const urls = await uploadImagesWithPresign(imageFiles, { usage: 'COMMENT' });
  return urls;
}

export async function createContentReport({
  reportType,
  reportReason,
  postId = null,
  commentId = null,
  reviewId = null,
}) {
  const response = await api.post('/reports', {
    reportType,
    reportReason,
    postId,
    commentId,
    reviewId,
  });

  return response.data?.data ?? {};
}
