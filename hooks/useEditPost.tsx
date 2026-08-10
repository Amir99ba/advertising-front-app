// hooks/useEditPost.ts
import { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchSinglePostApi, updatePostApi } from '@/lib/api';
import { useRouter } from 'next/navigation';

interface FormState {
  title: string;
  content: string;
  category: string;
  tags: string;
  fileUrl: string | null;
  fileType: string | null;
}

export function useEditPost(postId: string) {
  const router = useRouter();
  const queryClient = useQueryClient();

  const [formData, setFormData] = useState<FormState>({
    title: '',
    content: '',
    category: '',
    tags: '',
    fileUrl: null,
    fileType: null,
  });

  // ۱. دریافت داده‌های اولیه پست
  const postQuery = useQuery({
    queryKey: ['post', postId],
    queryFn: () => fetchSinglePostApi(postId),
    enabled: !!postId,
  });

  // مقداردهی اولیه فرم پس از دریافت داده از دیتابیس
  useEffect(() => {
    if (postQuery.data) {
      setFormData({
        title: postQuery.data.title,
        content: postQuery.data.content,
        category: postQuery.data.category,
        tags: postQuery.data.tags ? postQuery.data.tags.join(', ') : '',
        fileUrl: postQuery.data.fileUrl || null,
        fileType: postQuery.data.fileType || null,
      });
    }
  }, [postQuery.data]);

  // ۲. Mutation ویرایش پست
  const updateMutation = useMutation({
    mutationFn: updatePostApi,
    onSuccess: () => {
      // باطل کردن کش جهت به‌روزرسانی لیست‌ها
      queryClient.invalidateQueries({ queryKey: ['admin-posts'] });
      queryClient.invalidateQueries({ queryKey: ['posts'] });
      queryClient.invalidateQueries({ queryKey: ['post', postId] });

      // انتقال کاربر به جدول مدیریت
      router.push('/admin/posts');
    },
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const tagArray = formData.tags
      .split(',')
      .map((tag) => tag.trim())
      .filter(Boolean);

    updateMutation.mutate({
      id: postId,
      payload: {
        title: formData.title,
        content: formData.content,
        category: formData.category,
        tags: tagArray,
        fileUrl: formData.fileUrl,
        fileType: formData.fileType,
      },
    });
  };

  return {
    formData,
    handleChange,
    handleSubmit,
    isFetching: postQuery.isLoading,
    isUpdating: updateMutation.isPending,
    error: updateMutation.error
      ? updateMutation.error.message
      : postQuery.error
      ? postQuery.error.message
      : null,
  };
}