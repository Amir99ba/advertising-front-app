export type AnalyticsMetric = { name: string; views: number };

export type AnalyticsData = {
  topPosts: Array<{ id: string; title: string; category: string; views: number }>;
  categories: AnalyticsMetric[];
  tags: AnalyticsMetric[];
  isMock?: boolean;
};

export const MOCK_ANALYTICS_DATA: AnalyticsData = {
  isMock: true,
  topPosts: [
    { id: 'mock-1', title: 'راهنمای شروع تبلیغات آنلاین', category: 'آموزش', views: 18420 },
    { id: 'mock-2', title: '۷ روش افزایش نرخ تبدیل', category: 'بازاریابی', views: 15280 },
    { id: 'mock-3', title: 'چطور کمپین موفق بسازیم؟', category: 'تبلیغات', views: 13140 },
    { id: 'mock-4', title: 'اصول تولید محتوای اثرگذار', category: 'محتوا', views: 11760 },
    { id: 'mock-5', title: 'تحلیل رفتار کاربران سایت', category: 'تحلیل داده', views: 9840 },
    { id: 'mock-6', title: 'بهینه‌سازی تبلیغات کلیکی', category: 'تبلیغات', views: 8610 },
    { id: 'mock-7', title: 'ساخت استراتژی شبکه‌های اجتماعی', category: 'بازاریابی', views: 7490 },
    { id: 'mock-8', title: 'شناخت بهتر مخاطب هدف', category: 'آموزش', views: 6350 },
  ],
  categories: [
    { name: 'آموزش', views: 24770 },
    { name: 'بازاریابی', views: 22770 },
    { name: 'تبلیغات', views: 21750 },
    { name: 'محتوا', views: 11760 },
    { name: 'تحلیل داده', views: 9840 },
  ],
  tags: [
    { name: 'دیجیتال مارکتینگ', views: 28600 },
    { name: 'تبلیغات', views: 21750 },
    { name: 'تولید محتوا', views: 17420 },
    { name: 'نرخ تبدیل', views: 15280 },
    { name: 'شبکه اجتماعی', views: 11240 },
    { name: 'تحلیل داده', views: 9840 },
    { name: 'سئو', views: 7680 },
  ],
};
