// hooks/useAdminPosts.ts
import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchAdminPostsApi, deletePostApi } from '@/lib/api';

export function useAdminPosts() {
  const queryClient = useQueryClient();
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');

  // Fetch داده‌ها با Query Keys وابسته به صفحه و جستجو
  const query = useQuery({
    queryKey: ['admin-posts', page, search],
    queryFn: () => fetchAdminPostsApi(page, search, 10),
  });

  // Mutation برای حذف پست
  const deleteMutation = useMutation({
    mutationFn: deletePostApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-posts'] });
      queryClient.invalidateQueries({ queryKey: ['posts'] });
    },
  });

  return {
    posts: query.data?.posts || [],
    pagination: query.data?.pagination,
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error ? query.error.message : null,
    page,
    setPage,
    search,
    setSearch,
    deletePost: deleteMutation.mutate,
    isDeleting: deleteMutation.isPending,
  };
}

