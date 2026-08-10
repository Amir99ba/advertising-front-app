export interface Post {
  id: string;
  title: string;
  content: string;
  category: string;
  tags: string[];
  fileUrl?: string | null;
  fileType?: string | null;
  createdAt: string; // از JSON به‌صورت string دریافت می‌شود
  updatedAt: string;
  views: number;
}

// lib/api.ts
export interface CreatePostPayload {
  title: string;
  content: string;
  category: string;
  tags: string[];
  fileUrl?: string | null;
  fileType?: string | null;
}

export interface PaginatedPostsResponse {
  posts: Post[];
  pagination: {
    totalPosts: number;
    totalPages: number;
    currentPage: number;
    limit: number;
  };
}

// دریافت لیست پست‌ها
export async function fetchPostsApi(): Promise<Post[]> {
  const response = await fetch('/api/posts');
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || 'خطا در دریافت لیست پست‌ها');
  }

  return data;
}

// ایجاد پست جدید
export async function createPostApi(payload: CreatePostPayload) {
  const response = await fetch('/api/posts', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || 'خطایی در ثبت پست رخ داد.');
  }

  return data;
}

// دریافت پست‌ها با فیلتر صفحه و جستجو
export async function fetchAdminPostsApi(page = 1, search = '', limit = 10): Promise<PaginatedPostsResponse> {
  const query = new URLSearchParams({
    page: page.toString(),
    limit: limit.toString(),
    search,
  });

  const response = await fetch(`/api/posts?${query.toString()}`);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || 'خطا در دریافت لیست پست‌ها');
  }

  return data;
}

// حذف پست
export async function deletePostApi(id: string): Promise<void> {
  const response = await fetch(`/api/posts/${id}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    const data = await response.json();
    throw new Error(data.error || 'خطا در حذف پست');
  }
}

// دریافت اطلاعات یک پست تکی بر اساس ID
export async function fetchSinglePostApi(id: string): Promise<Post> {
  const response = await fetch(`/api/posts/${id}`);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || 'خطا در دریافت اطلاعات پست');
  }

  return data;
}

// بروزرسانی (ویرایش) پست
export async function updatePostApi({
  id,
  payload,
}: {
  id: string;
  payload: CreatePostPayload;
}): Promise<Post> {
  const response = await fetch(`/api/posts/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || 'خطایی در بروزرسانی پست رخ داد.');
  }

  return data;
}
