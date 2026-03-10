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
  중고거래: 'TRADE',
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

export async function fetchCommunityPostDetail(postId) {
  const response = await api.get(`/posts/${postId}`);
  const data = response.data?.data ?? {};
  return data.post ?? data;
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
