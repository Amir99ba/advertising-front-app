// hooks/usePosts.ts
import { useQuery } from '@tanstack/react-query';
import { fetchPostsApi, PaginatedPostsResponse } from '@/lib/api';

export function usePosts() {
  const query = useQuery<any[], Error>({
    queryKey: ['posts'], // کلید کش
    queryFn: () => fetchPostsApi(), // دریافت داده از همان API
  });

  return {
    // استخراج آرایه پست‌ها از داخل شیء دریافتی
    posts: query.data || [],
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error ? query.error.message : null,
    refetch: query.refetch,
  };
}