// hooks/useCreatePost.ts
import { useState, ChangeEvent, FormEvent } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createPostApi } from '@/lib/api';

interface FormState {
  title: string;
  content: string;
  category: string;
  tags: string;
  file: File | null;
}

export function useCreatePost() {
    const queryClient = useQueryClient();
  const [formData, setFormData] = useState<FormState>({
    title: '',
    content: '',
    category: '',
    tags: '',
    file: null,
  });

  // تعریف mutation با TanStack Query
  const mutation = useMutation({
    mutationFn: createPostApi,
    onSuccess: () => {
        // این خط کش لیست پست‌ها را باطل می‌کند تا TanStack دوباره آن را به صورت هوشمند دریافت کند
      queryClient.invalidateQueries({ queryKey: ['posts'] });

      // ریست کردن فرم پس از موفقیت
      setFormData({
        title: '',
        content: '',
        category: '',
        tags: '',
        file: null,
      });
    },
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData((prev) => ({ ...prev, file: e.target.files![0] }));
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const tagArray = formData.tags
      .split(',')
      .map((tag) => tag.trim())
      .filter(Boolean);

    // اجرای درخواست ایجاد پست
    mutation.mutate({
      title: formData.title,
      content: formData.content,
      category: formData.category,
      tags: tagArray,
      fileUrl: formData.file ? formData.file.name : null,
      fileType: formData.file ? formData.file.type : null,
    });
  };

  return {
    formData,
    handleChange,
    handleFileChange,
    handleSubmit,
    isLoading: mutation.isPending,
    isSuccess: mutation.isSuccess,
    error: mutation.error ? mutation.error.message : null,
  };
}