export interface Post {
  id: string;
  titleAr: string;
  titleEn: string;
  excerptAr: string;
  excerptEn: string;
  contentAr: string;
  contentEn: string;
  sectionSlug: string;
  imageUrl: string;
  imagePublicId?: string | null;
  date: string;
  isPublished: boolean;
  createdAt?: string;
  updatedAt?: string;
}
