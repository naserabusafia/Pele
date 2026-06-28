import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  Plus,
  Edit2,
  Trash2,
  LogOut,
  Image as ImageIcon,
  CheckCircle,
  XCircle,
  Loader2,
  Globe,
  Calendar,
  Layers,
  FileText,
  AlertCircle,
  Eye,
} from "lucide-react";
import { useI18n } from "@/i18n/I18nProvider";
import { authService } from "@/services/authService";
import { postsService } from "@/services/postsService";
import type { Post } from "@/types/Post";

export function AdminPage() {
  const { lang } = useI18n();
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Authentication State
  const [authenticated, setAuthenticated] = useState(authService.isAuthenticated());
  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [loginError, setLoginError] = useState<string | null>(null);
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  // Data State
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoadingPosts, setIsLoadingPosts] = useState(false);
  const [postsError, setPostsError] = useState<string | null>(null);

  // Form State (Add / Edit)
  const [formOpen, setFormOpen] = useState(false);
  const [editingPostId, setEditingPostId] = useState<string | null>(null); // Null if adding
  const [formTitleAr, setFormTitleAr] = useState("");
  const [formTitleEn, setFormTitleEn] = useState("");
  const [formExcerptAr, setFormExcerptAr] = useState("");
  const [formExcerptEn, setFormExcerptEn] = useState("");
  const [formContentAr, setFormContentAr] = useState("");
  const [formContentEn, setFormContentEn] = useState("");
  const [formSectionSlug, setFormSectionSlug] = useState("football-academy");
  const [formDate, setFormDate] = useState(() => new Date().toISOString().split("T")[0]);
  const [formIsPublished, setFormIsPublished] = useState(true);
  const [formImageFile, setFormImageFile] = useState<File | null>(null);
  const [formImagePreview, setFormImagePreview] = useState<string | null>(null);
  const [existingImageUrl, setExistingImageUrl] = useState<string | null>(null);

  // Submission State
  const [isSaving, setIsSaving] = useState(false);
  const [formValidationError, setFormValidationError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const sectionsList = [
    { slug: "football-academy", ar: "أكاديمية بيليه لكرة القدم", en: "Pele Football Academy" },
    { slug: "training-development", ar: "مركز التدريب والتطوير", en: "Training & Development Center" },
    { slug: "civil-defense-volunteers", ar: "مركز متطوعي الدفاع المدني", en: "Civil Defense Volunteers Center" },
    { slug: "general-sports-activities", ar: "الأنشطة الرياضية العامة", en: "General Sports Activities" },
  ];

  // Fetch posts when authenticated
  useEffect(() => {
    if (authenticated) {
      loadAllPosts();
    }
  }, [authenticated]);

  async function loadAllPosts() {
    setIsLoadingPosts(true);
    setPostsError(null);
    try {
      // Get all posts (both published and drafts)
      const data = await postsService.getPosts();
      setPosts(data);
    } catch (err) {
      setPostsError(err instanceof Error ? err.message : "Failed to load posts.");
    } finally {
      setIsLoadingPosts(false);
    }
  }

  // Handle Login
  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoginError(null);
    setIsLoggingIn(true);

    try {
      await authService.login(emailInput, passwordInput);
      setAuthenticated(true);
      setLoginError(null);
    } catch (err) {
      setLoginError(err instanceof Error ? err.message : "Login failed.");
    } finally {
      setIsLoggingIn(false);
    }
  }

  // Handle Logout
  function handleLogout() {
    authService.logout();
    setAuthenticated(false);
    setPosts([]);
    setFormOpen(false);
  }

  // Open form for Adding
  function openAddForm() {
    setEditingPostId(null);
    setFormTitleAr("");
    setFormTitleEn("");
    setFormExcerptAr("");
    setFormExcerptEn("");
    setFormContentAr("");
    setFormContentEn("");
    setFormSectionSlug("football-academy");
    setFormDate(new Date().toISOString().split("T")[0]);
    setFormIsPublished(true);
    setFormImageFile(null);
    setFormImagePreview(null);
    setExistingImageUrl(null);
    setFormValidationError(null);
    setFieldErrors({});
    setFormOpen(true);
  }

  // Open form for Editing
  function openEditForm(post: Post) {
    setEditingPostId(post.id);
    setFormTitleAr(post.titleAr);
    setFormTitleEn(post.titleEn);
    setFormExcerptAr(post.excerptAr);
    setFormExcerptEn(post.excerptEn);
    setFormContentAr(post.contentAr);
    setFormContentEn(post.contentEn);
    setFormSectionSlug(post.sectionSlug);
    setFormDate(post.date);
    setFormIsPublished(post.isPublished);
    setFormImageFile(null);
    setFormImagePreview(null);
    setExistingImageUrl(post.imageUrl);
    setFormValidationError(null);
    setFieldErrors({});
    setFormOpen(true);
  }

  // Handle image selection
  function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setFormImageFile(file);
      setFormImagePreview(URL.createObjectURL(file));
    }
  }

  // Form submission
  async function handleSavePost(e: React.FormEvent) {
    e.preventDefault();
    setFormValidationError(null);
    setFieldErrors({});

    // Basic Client-side Validation (non-empty strings check)
    const clientErrors: Record<string, string> = {};
    if (!formTitleAr.trim()) clientErrors.titleAr = lang === "ar" ? "العنوان بالعربية مطلوب" : "Arabic title is required";
    if (!formTitleEn.trim()) clientErrors.titleEn = lang === "ar" ? "العنوان بالإنجليزية مطلوب" : "English title is required";
    if (!formExcerptAr.trim()) clientErrors.excerptAr = lang === "ar" ? "الملخص بالعربية مطلوب" : "Arabic excerpt is required";
    if (!formExcerptEn.trim()) clientErrors.excerptEn = lang === "ar" ? "الملخص بالإنجليزية مطلوب" : "English excerpt is required";
    if (!formContentAr.trim()) clientErrors.contentAr = lang === "ar" ? "المحتوى بالعربية مطلوب" : "Arabic content is required";
    if (!formContentEn.trim()) clientErrors.contentEn = lang === "ar" ? "المحتوى بالإنجليزية مطلوب" : "English content is required";

    if (Object.keys(clientErrors).length > 0) {
      setFieldErrors(clientErrors);
      setFormValidationError(
        lang === "ar"
          ? "يرجى تعبئة الحقول المطلوبة."
          : "Please fill in the required fields."
      );
      return;
    }

    if (!editingPostId && !formImageFile) {
      setFormValidationError(
        lang === "ar"
          ? "يرجى اختيار صورة للمنشور الجديد."
          : "Please choose an image for the new post."
      );
      return;
    }

    setIsSaving(true);
    try {
      const formData = new FormData();
      formData.append("titleAr", formTitleAr);
      formData.append("titleEn", formTitleEn);
      formData.append("excerptAr", formExcerptAr);
      formData.append("excerptEn", formExcerptEn);
      formData.append("contentAr", formContentAr);
      formData.append("contentEn", formContentEn);
      formData.append("sectionSlug", formSectionSlug);
      formData.append("date", formDate);
      formData.append("isPublished", String(formIsPublished));

      if (formImageFile) {
        formData.append("image", formImageFile);
      }

      if (editingPostId) {
        await postsService.updatePost(editingPostId, formData);
      } else {
        await postsService.createPost(formData);
      }

      setFormOpen(false);
      loadAllPosts();
    } catch (err) {
      if (err && typeof err === "object" && "errors" in err && Array.isArray((err as any).errors)) {
        const errorsList = (err as any).errors as Array<{ field: string; message: string }>;
        const errs: Record<string, string> = {};
        errorsList.forEach((e) => {
          errs[e.field] = e.message;
        });
        setFieldErrors(errs);
        setFormValidationError(
          lang === "ar"
            ? "فشل التحقق من صحة البيانات. يرجى تصحيح الأخطاء الموضحة أدناه."
            : "Validation failed. Please correct the errors shown below."
        );
      } else {
        setFormValidationError(
          err instanceof Error ? err.message : "An error occurred while saving the post."
        );
      }
    } finally {
      setIsSaving(false);
    }
  }

  // Delete Post
  async function handleDeletePost(id: string) {
    const confirmMessage =
      lang === "ar"
        ? "هل أنت متأكد من رغبتك في حذف هذا المنشور؟ لا يمكن التراجع عن هذا الإجراء."
        : "Are you sure you want to delete this post? This action cannot be undone.";

    if (window.confirm(confirmMessage)) {
      try {
        await postsService.deletePost(id);
        loadAllPosts();
      } catch (err) {
        alert(err instanceof Error ? err.message : "Failed to delete post.");
      }
    }
  }

  // Get Section Name
  function getSectionName(slug: string) {
    const sect = sectionsList.find((s) => s.slug === slug);
    if (!sect) return slug;
    return lang === "ar" ? sect.ar : sect.en;
  }

  // Render Login view if not authenticated
  if (!authenticated) {
    return (
      <div className="flex min-h-[calc(100vh-8rem)] items-center justify-center px-4 py-12">
        <div className="w-full max-w-md overflow-hidden rounded-[2rem] border border-border bg-card p-8 shadow-card">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-foreground">
              {lang === "ar" ? "تسجيل دخول المشرف" : "Admin Login"}
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              {lang === "ar"
                ? "لوحة إدارة أكاديمية بيليه الرياضية"
                : "Management Portal for Pele Sports Academy"}
            </p>
          </div>

          <form className="mt-8 space-y-6" onSubmit={handleLogin}>
            {loginError && (
              <div className="flex items-center gap-2 rounded-xl bg-red-500/10 p-4 text-sm text-red-600 dark:bg-red-500/5">
                <AlertCircle className="h-5 w-5 shrink-0" />
                <span>{loginError}</span>
              </div>
            )}

            <div className="space-y-4 rounded-md shadow-sm">
              <div>
                <label className="block text-sm font-semibold text-foreground mb-1">
                  {lang === "ar" ? "البريد الإلكتروني" : "Email Address"}
                </label>
                <input
                  type="email"
                  required
                  className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm focus:border-[var(--brand-green)] focus:ring-1 focus:ring-[var(--brand-green)] focus:outline-none"
                  placeholder={lang === "ar" ? "name@example.com" : "name@example.com"}
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-foreground mb-1">
                  {lang === "ar" ? "كلمة المرور" : "Password"}
                </label>
                <input
                  type="password"
                  required
                  className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm focus:border-[var(--brand-green)] focus:ring-1 focus:ring-[var(--brand-green)] focus:outline-none"
                  placeholder="••••••••"
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoggingIn}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-[var(--brand-green)] py-3.5 text-sm font-bold text-white transition-colors hover:bg-[var(--brand-green)]/90 disabled:opacity-50"
            >
              {isLoggingIn ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  {lang === "ar" ? "جاري تسجيل الدخول..." : "Logging in..."}
                </>
              ) : lang === "ar" ? (
                "تسجيل الدخول"
              ) : (
                "Log In"
              )}
            </button>
          </form>
        </div>
      </div>
    );
  }

  // Render Dashboard view if authenticated
  return (
    <div className="mx-auto max-w-7xl px-4 py-12">
      {/* Dashboard Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-border pb-6">
        <div>
          <h1 className="text-3xl font-black text-foreground">
            {lang === "ar" ? "لوحة تحكم المشرف" : "Admin Dashboard"}
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            {lang === "ar" ? "مرحباً بك،" : "Welcome,"} {authService.getAdminEmail()}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={openAddForm}
            className="flex items-center gap-2 rounded-xl bg-[var(--brand-green)] px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-[var(--brand-green)]/90 shadow-soft"
          >
            <Plus className="h-5 w-5" />
            {lang === "ar" ? "إضافة منشور جديد" : "Add New Post"}
          </button>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 rounded-xl border border-border bg-card px-4 py-3 text-sm font-bold text-red-500 transition-colors hover:bg-red-500/5"
            title={lang === "ar" ? "تسجيل الخروج" : "Log Out"}
          >
            <LogOut className="h-5 w-5" />
            <span className="hidden md:inline">{lang === "ar" ? "خروج" : "Logout"}</span>
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-3 mt-8">
        <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
          <p className="text-sm font-semibold text-muted-foreground">
            {lang === "ar" ? "إجمالي المنشورات" : "Total Posts"}
          </p>
          <h3 className="text-3xl font-black mt-2">{posts.length}</h3>
        </div>
        <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
          <p className="text-sm font-semibold text-muted-foreground">
            {lang === "ar" ? "المنشورات العامة" : "Published Posts"}
          </p>
          <h3 className="text-3xl font-black text-[var(--brand-green)] mt-2">
            {posts.filter((p) => p.isPublished).length}
          </h3>
        </div>
        <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
          <p className="text-sm font-semibold text-muted-foreground">
            {lang === "ar" ? "المسودات" : "Drafts"}
          </p>
          <h3 className="text-3xl font-black text-amber-500 mt-2">
            {posts.filter((p) => !p.isPublished).length}
          </h3>
        </div>
      </div>

      {/* Form Section (Modal-like overlay or conditional area) */}
      {formOpen && (
        <div className="mt-8 rounded-[2rem] border border-border bg-card p-6 md:p-8 shadow-card">
          <div className="flex items-center justify-between border-b border-border pb-4 mb-6">
            <h2 className="text-2xl font-extrabold text-foreground">
              {editingPostId
                ? lang === "ar"
                  ? "تعديل المنشور الحالي"
                  : "Edit Post"
                : lang === "ar"
                ? "إضافة منشور جديد"
                : "Create Post"}
            </h2>
            <button
              onClick={() => setFormOpen(false)}
              className="rounded-full border border-border p-2 hover:bg-muted"
            >
              <XCircle className="h-5 w-5 text-muted-foreground" />
            </button>
          </div>

          <form onSubmit={handleSavePost} className="space-y-6">
            {formValidationError && (
              <div className="flex items-center gap-2 rounded-xl bg-red-500/10 p-4 text-sm text-red-600 dark:bg-red-500/5">
                <AlertCircle className="h-5 w-5 shrink-0" />
                <span>{formValidationError}</span>
              </div>
            )}

            {/* Bilingual Side-by-Side Columns */}
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
              {/* Arabic Inputs */}
              <div className="space-y-4" dir="rtl">
                <div className="flex items-center gap-2 border-b border-border pb-2 mb-2 text-[var(--brand-green)] font-bold text-lg">
                  <Globe className="h-5 w-5" />
                  <span>البيانات باللغة العربية</span>
                </div>

                <div>
                  <label className="block text-sm font-bold mb-1">العنوان بالعربية *</label>
                  <input
                    type="text"
                    className={`w-full rounded-xl border bg-background px-4 py-2.5 text-sm focus:outline-none ${
                      fieldErrors.titleAr
                        ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                        : "border-border focus:border-[var(--brand-green)]"
                    }`}
                    placeholder="أدخل عنوان المنشور..."
                    value={formTitleAr}
                    onChange={(e) => setFormTitleAr(e.target.value)}
                  />
                  {fieldErrors.titleAr && (
                    <p className="text-red-500 text-xs mt-1">{fieldErrors.titleAr}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-bold mb-1">ملخص قصير بالعربية *</label>
                  <textarea
                    rows={2}
                    className={`w-full rounded-xl border bg-background px-4 py-2.5 text-sm focus:outline-none ${
                      fieldErrors.excerptAr
                        ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                        : "border-border focus:border-[var(--brand-green)]"
                    }`}
                    placeholder="ملخص قصير للمنشور يظهر في صفحة الأخبار..."
                    value={formExcerptAr}
                    onChange={(e) => setFormExcerptAr(e.target.value)}
                  />
                  {fieldErrors.excerptAr && (
                    <p className="text-red-500 text-xs mt-1">{fieldErrors.excerptAr}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-bold mb-1">المحتوى الكامل بالعربية *</label>
                  <textarea
                    rows={6}
                    className={`w-full rounded-xl border bg-background px-4 py-2.5 text-sm focus:outline-none ${
                      fieldErrors.contentAr
                        ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                        : "border-border focus:border-[var(--brand-green)]"
                    }`}
                    placeholder="أدخل تفاصيل المنشور بالكامل هنا..."
                    value={formContentAr}
                    onChange={(e) => setFormContentAr(e.target.value)}
                  />
                  {fieldErrors.contentAr && (
                    <p className="text-red-500 text-xs mt-1">{fieldErrors.contentAr}</p>
                  )}
                </div>
              </div>

              {/* English Inputs */}
              <div className="space-y-4" dir="ltr">
                <div className="flex items-center gap-2 border-b border-border pb-2 mb-2 text-[var(--brand-green)] font-bold text-lg">
                  <Globe className="h-5 w-5" />
                  <span>English Fields</span>
                </div>

                <div>
                  <label className="block text-sm font-bold mb-1">Title in English *</label>
                  <input
                    type="text"
                    className={`w-full rounded-xl border bg-background px-4 py-2.5 text-sm focus:outline-none ${
                      fieldErrors.titleEn
                        ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                        : "border-border focus:border-[var(--brand-green)]"
                    }`}
                    placeholder="Enter post title..."
                    value={formTitleEn}
                    onChange={(e) => setFormTitleEn(e.target.value)}
                  />
                  {fieldErrors.titleEn && (
                    <p className="text-red-500 text-xs mt-1">{fieldErrors.titleEn}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-bold mb-1">Short Excerpt in English *</label>
                  <textarea
                    rows={2}
                    className={`w-full rounded-xl border bg-background px-4 py-2.5 text-sm focus:outline-none ${
                      fieldErrors.excerptEn
                        ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                        : "border-border focus:border-[var(--brand-green)]"
                    }`}
                    placeholder="Short summary displayed on news cards..."
                    value={formExcerptEn}
                    onChange={(e) => setFormExcerptEn(e.target.value)}
                  />
                  {fieldErrors.excerptEn && (
                    <p className="text-red-500 text-xs mt-1">{fieldErrors.excerptEn}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-bold mb-1">Full Content in English *</label>
                  <textarea
                    rows={6}
                    className={`w-full rounded-xl border bg-background px-4 py-2.5 text-sm focus:outline-none ${
                      fieldErrors.contentEn
                        ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                        : "border-border focus:border-[var(--brand-green)]"
                    }`}
                    placeholder="Enter the full post content details..."
                    value={formContentEn}
                    onChange={(e) => setFormContentEn(e.target.value)}
                  />
                  {fieldErrors.contentEn && (
                    <p className="text-red-500 text-xs mt-1">{fieldErrors.contentEn}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Config & Image Row */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3 border-t border-border pt-6">
              {/* Category */}
              <div>
                <label className="flex items-center gap-1.5 text-sm font-bold mb-1.5">
                  <Layers className="h-4 w-4 text-muted-foreground" />
                  {lang === "ar" ? "القسم الرئيسي" : "Section"}
                </label>
                <select
                  className="w-full rounded-xl border border-border bg-background px-3 py-2.5 text-sm focus:border-[var(--brand-green)] focus:outline-none"
                  value={formSectionSlug}
                  onChange={(e) => setFormSectionSlug(e.target.value)}
                >
                  {sectionsList.map((sect) => (
                    <option key={sect.slug} value={sect.slug}>
                      {lang === "ar" ? sect.ar : sect.en}
                    </option>
                  ))}
                </select>
              </div>

              {/* Date */}
              <div>
                <label className="flex items-center gap-1.5 text-sm font-bold mb-1.5">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  {lang === "ar" ? "التاريخ" : "Publish Date"}
                </label>
                <input
                  type="date"
                  className="w-full rounded-xl border border-border bg-background px-3 py-2.5 text-sm focus:border-[var(--brand-green)] focus:outline-none"
                  value={formDate}
                  onChange={(e) => setFormDate(e.target.value)}
                />
              </div>

              {/* Publish Toggle */}
              <div className="flex flex-col justify-center">
                <span className="text-sm font-bold mb-2 block text-muted-foreground">
                  {lang === "ar" ? "حالة النشر" : "Publication"}
                </span>
                <label className="relative inline-flex items-center cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={formIsPublished}
                    onChange={(e) => setFormIsPublished(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-muted peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-border after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[var(--brand-green)]"></div>
                  <span className="ms-3 text-sm font-medium text-foreground">
                    {formIsPublished
                      ? lang === "ar"
                        ? "منشور للعامة"
                        : "Published"
                      : lang === "ar"
                      ? "مسودة فقط"
                      : "Draft"}
                  </span>
                </label>
              </div>
            </div>

            {/* Image Uploader */}
            <div className="border-t border-border pt-6">
              <label className="flex items-center gap-1.5 text-sm font-bold mb-3">
                <ImageIcon className="h-4 w-4 text-muted-foreground" />
                {lang === "ar" ? "صورة المنشور *" : "Post Image *"}
              </label>

              <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="flex h-36 w-full md:w-64 cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-border bg-muted/30 transition-colors hover:bg-muted/60"
                >
                  <Plus className="h-8 w-8 text-muted-foreground" />
                  <span className="mt-2 text-xs font-semibold text-muted-foreground">
                    {lang === "ar" ? "اضغط لرفع صورة" : "Click to upload image"}
                  </span>
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleImageChange}
                    className="hidden"
                    accept="image/*"
                  />
                </div>

                {/* Preview image */}
                {(formImagePreview || existingImageUrl) && (
                  <div className="relative h-36 w-full md:w-64 overflow-hidden rounded-2xl border border-border">
                    <img
                      src={formImagePreview || existingImageUrl || ""}
                      alt="Post preview"
                      className="h-full w-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                      <button
                        type="button"
                        onClick={() => {
                          setFormImageFile(null);
                          setFormImagePreview(null);
                          if (!editingPostId) {
                            setExistingImageUrl(null);
                          }
                        }}
                        className="rounded-xl bg-red-600 px-3 py-1.5 text-xs font-bold text-white hover:bg-red-700"
                      >
                        {lang === "ar" ? "إزالة" : "Remove"}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex items-center justify-end gap-3 border-t border-border pt-6">
              <button
                type="button"
                onClick={() => setFormOpen(false)}
                className="rounded-xl border border-border bg-card px-5 py-2.5 text-sm font-semibold text-foreground hover:bg-muted"
              >
                {lang === "ar" ? "إلغاء" : "Cancel"}
              </button>
              <button
                type="submit"
                disabled={isSaving}
                className="flex items-center gap-2 rounded-xl bg-[var(--brand-green)] px-6 py-2.5 text-sm font-bold text-white transition-colors hover:bg-[var(--brand-green)]/90 disabled:opacity-50"
              >
                {isSaving ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    {lang === "ar" ? "جاري الحفظ..." : "Saving..."}
                  </>
                ) : lang === "ar" ? (
                  "حفظ المنشور"
                ) : (
                  "Save Post"
                )}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Posts List Section */}
      <div className="mt-10 rounded-[2rem] border border-border bg-card overflow-hidden shadow-sm">
        <div className="bg-muted/20 px-6 py-5 border-b border-border">
          <h2 className="text-xl font-bold text-foreground">
            {lang === "ar" ? "المنشورات المتاحة" : "Manage Posts"}
          </h2>
        </div>

        {isLoadingPosts ? (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 className="h-8 w-8 animate-spin text-[var(--brand-green)]" />
            <p className="mt-4 text-sm text-muted-foreground">
              {lang === "ar" ? "جاري تحميل المنشورات..." : "Loading posts list..."}
            </p>
          </div>
        ) : postsError ? (
          <div className="py-20 text-center">
            <AlertCircle className="h-10 w-10 text-red-500 mx-auto" />
            <p className="mt-4 text-red-600 font-semibold">{postsError}</p>
            <button
              onClick={loadAllPosts}
              className="mt-4 rounded-xl border border-border px-4 py-2 text-sm font-semibold hover:bg-muted"
            >
              {lang === "ar" ? "إعادة المحاولة" : "Try Again"}
            </button>
          </div>
        ) : posts.length === 0 ? (
          <div className="py-20 text-center text-muted-foreground">
            <FileText className="h-12 w-12 mx-auto mb-4 text-muted-foreground/50" />
            <p>{lang === "ar" ? "لا توجد أي منشورات حالياً." : "No posts found."}</p>
            <button
              onClick={openAddForm}
              className="mt-4 rounded-xl bg-[var(--brand-green)] px-4 py-2 text-sm font-bold text-white hover:bg-[var(--brand-green)]/90"
            >
              {lang === "ar" ? "أضف منشوراً الآن" : "Add one now"}
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-left text-sm text-foreground">
              <thead className="bg-muted/10 font-bold border-b border-border text-muted-foreground">
                <tr>
                  <th className="px-6 py-4">{lang === "ar" ? "الصورة" : "Image"}</th>
                  <th className="px-6 py-4">{lang === "ar" ? "العنوان" : "Title"}</th>
                  <th className="px-6 py-4">{lang === "ar" ? "القسم" : "Section"}</th>
                  <th className="px-6 py-4">{lang === "ar" ? "التاريخ" : "Date"}</th>
                  <th className="px-6 py-4">{lang === "ar" ? "الحالة" : "Status"}</th>
                  <th className="px-6 py-4 text-center">{lang === "ar" ? "الإجراءات" : "Actions"}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {posts.map((post) => (
                  <tr key={post.id} className="hover:bg-muted/10 transition-colors">
                    <td className="px-6 py-4">
                      <div className="h-12 w-20 overflow-hidden rounded-xl border border-border">
                        <img
                          src={post.imageUrl}
                          alt={post.titleAr}
                          className="h-full w-full object-cover"
                        />
                      </div>
                    </td>
                    <td className="px-6 py-4 font-semibold max-w-xs">
                      <div className="line-clamp-2">
                        {lang === "ar" ? post.titleAr : post.titleEn}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-xs font-semibold">
                      <span className="rounded-full bg-muted px-2.5 py-1 text-muted-foreground">
                        {getSectionName(post.sectionSlug)}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-muted-foreground whitespace-nowrap">
                      {post.date}
                    </td>
                    <td className="px-6 py-4">
                      {post.isPublished ? (
                        <span className="inline-flex items-center gap-1 text-xs font-bold text-[var(--brand-green)]">
                          <CheckCircle className="h-4 w-4" />
                          {lang === "ar" ? "منشور" : "Published"}
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-xs font-bold text-amber-500">
                          <AlertCircle className="h-4 w-4" />
                          {lang === "ar" ? "مسودة" : "Draft"}
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-center">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={() => window.open(`/posts/${post.id}`, "_blank")}
                          className="rounded-xl border border-border p-2 text-muted-foreground hover:bg-muted"
                          title={lang === "ar" ? "عرض التفاصيل" : "Preview Details"}
                        >
                          <Eye className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => openEditForm(post)}
                          className="rounded-xl border border-border p-2 text-blue-500 hover:bg-blue-500/5 hover:border-blue-500/30"
                          title={lang === "ar" ? "تعديل" : "Edit"}
                        >
                          <Edit2 className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleDeletePost(post.id)}
                          className="rounded-xl border border-border p-2 text-red-500 hover:bg-red-500/5 hover:border-red-500/30"
                          title={lang === "ar" ? "حذف" : "Delete"}
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
