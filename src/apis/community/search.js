import api from '../api';

const buildParams = (params = {}) =>
  Object.fromEntries(
    Object.entries(params).filter(
      ([, value]) => value !== undefined && value !== null && value !== ''
    )
  );

//검색 기록 조회
export const fetchRecentCommunityKeywords = async () => {
  try {
    const response = await api.get('/recents/community');
    console.log(response);
    return response.data.data;
  } catch (error) {
    console.error('커뮤니티 최근 검색어 조회 실패:', error);
    return [];
  }
};

//검색 기록 전체 삭제
export const deleteAllRecentCommunityKeywords = async () => {
  try {
    const response = await api.delete('/recents/community');
    return response?.data?.data ?? null;
  } catch (error) {
    console.error('커뮤니티 최근 검색어 전체 삭제 실패:', error);
    return null;
  }
};

//단일 검색 기록 삭제
export const deleteRecentCommunityKeyword = async (keywordId) => {
  try {
    const response = await api.delete(`/recents/community/${keywordId}`);
    return response?.data?.data ?? null;
  } catch (error) {
    console.error('커뮤니티 최근 검색어 삭제 실패:', error);
    return null;
  }
};

//게시글 검색
export const searchCommunityPosts = async ({
  type,
  topic,
  sort,
  lastPostId,
  pageSize,
  searchKeyword,
  searchScope,
} = {}) => {
  try {
    const response = await api.get('/posts/search', {
      params: buildParams({
        type,
        topic,
        sort,
        lastPostId,
        pageSize,
        searchKeyword,
        searchScope,
      }),
    });
    return response.data.data.content;
  } catch (error) {
    console.error('커뮤니티 게시글 검색 실패:', error);
    throw error;
  }
};

//댓글 검색
export const searchCommunityComments = async ({
  type,
  topic,
  sort,
  lastCommentId,
  pageSize,
  searchKeyword,
  searchScope,
} = {}) => {
  try {
    const response = await api.get('/comments/search', {
      params: buildParams({
        type,
        topic,
        sort,
        lastCommentId,
        pageSize,
        searchKeyword,
        searchScope: searchScope ?? 'content',
      }),
    });
    console.log('댓글 조회', response.data.data);
    return response.data.data.content;
  } catch (error) {
    console.error('커뮤니티 댓글 검색 실패:', error);
    throw error;
  }
};
