// app/posts/page.tsx
'use client';

import { usePosts } from '@/hooks/usePosts';
import Image from 'next/image';
import Link from 'next/link';

function calculateReadTime(content: string): number {
  const wordsPerMinute = 200;
  const wordsCount = content.trim().split(/\s+/).length;
  const readTime = Math.ceil(wordsCount / wordsPerMinute);
  return readTime < 1 ? 1 : readTime;
}

function formatDate(dateString: string): string {
  return new Intl.DateTimeFormat('fa-IR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(dateString));
}

export default function PostsListPage() {
  const { posts, isLoading, isError, error } = usePosts();

  return (
    <main className="max-w-5xl mx-auto my-10 p-6" dir="rtl">
      <div className="mb-8 pb-4 border-b border-gray-200">
        <h1 className="text-2xl font-bold text-gray-800">لیست پست‌ها</h1>
      </div>

      {isLoading && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className="bg-white rounded-lg border border-gray-200 p-4 h-72 animate-pulse flex flex-col justify-between"
            >
              <div className="w-full h-36 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4 my-2"></div>
              <div className="h-3 bg-gray-200 rounded w-full"></div>
              <div className="h-3 bg-gray-200 rounded w-1/2"></div>
            </div>
          ))}
        </div>
      )}

      {isError && (
        <div className="p-4 bg-red-100 text-red-700 rounded-md border border-red-200 text-sm">
          {error}
        </div>
      )}

      {!isLoading && !isError && posts.length === 0 && (
        <div className="text-center py-12 text-gray-500 bg-gray-50 rounded-lg border border-dashed border-gray-300">
          هنوز پستی ثبت نشده است.
        </div>
      )}

      {!isLoading && !isError && posts.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => {
            const isImage =
              post.fileUrl &&
              post.fileType &&
              post.fileType.startsWith('image/');

            const readTime = calculateReadTime(post.content);

            return (
              /* کارت پست متصل شده به مسیر /posts/[id] */
              <Link
                href={`/posts/${post.id}`}
                key={post.id}
                className="group bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden flex flex-col justify-between hover:shadow-md hover:border-gray-300 transition duration-200"
              >
                <div className="w-full h-48 bg-gray-100 relative flex items-center justify-center border-b border-gray-100 overflow-hidden">
                  {isImage && post.fileUrl ? (
                    <Image
                      src={post.fileUrl}
                      alt={post.title}
                      fill
                      className="object-cover group-hover:scale-105 transition duration-300"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-200 flex flex-col items-center justify-center text-gray-400">
                      <svg
                        className="w-10 h-10 mb-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="1.5"
                          d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                      <span className="text-xs">بدون تصویر</span>
                    </div>
                  )}
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <span className="inline-block text-xs font-semibold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-md mb-2">
                      {post.category}
                    </span>

                    <h2 className="text-lg font-bold text-gray-800 group-hover:text-blue-600 line-clamp-2 mb-2 transition">
                      {post.title}
                    </h2>

                    <p className="text-gray-600 text-sm line-clamp-3 mb-4">
                      {post.content}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
                    <span>{formatDate(post.createdAt)}</span>
                    <span className="flex items-center gap-1 bg-gray-50 px-2 py-1 rounded">
                      ⏱ {readTime} دقیقه مطالعه
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </main>
  );
}