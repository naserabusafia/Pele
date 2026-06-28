import type { Post } from "@/types/Post";

const API_BASE_URL = import.meta.env.VITE_API_URL ?? "/api";

type GetPostsOptions = {
  published?: boolean;
  sectionSlug?: string;
};

// Static initial data including user-requested posts
const STATIC_POSTS: Post[] = [
  {
    id: "static-1",
    titleAr: "أكاديمية بيليه تبدأ فعاليات النادي الصيفي للأطفال",
    titleEn: "Pele Academy Starts Summer Club Activities for Children",
    excerptAr: "أجواء حماسية وأنشطة متنوعة في انطلاق النادي الصيفي للأطفال بمشاركة واسعة.",
    excerptEn: "Enthusiastic atmosphere and diverse activities at the launch of the children's summer club with wide participation.",
    contentAr: "بدأت أكاديمية بيليه الألمانية الفلسطينية فعاليات النادي الصيفي المخصص للأطفال.\nيتضمن النادي العديد من الأنشطة الترفيهية، الرياضية، والتطويرية التي تهدف إلى تنمية مهارات الأطفال واستغلال العطلة الصيفية بشكل إيجابي ومثمر لجميع الأعمار.",
    contentEn: "Pele German Palestinian Academy started the summer club activities dedicated to children.\nThe club includes many recreational, sports, and development activities aimed at developing children's skills and using the summer vacation positively and productively for all age groups.",
    sectionSlug: "general-sports-activities",
    imageUrl: "/post-summer-club.jpg",
    date: "2026-06-25",
    isPublished: true,
  },
  {
    id: "static-2",
    titleAr: "أكاديمية بيليه تشارك في بطولة نابلس الرمضانية لكرة القدم",
    titleEn: "Pele Academy Participates in Nablus Ramadan Football Tournament",
    excerptAr: "مشاركة مميزة لفرق الأكاديمية في بطولة نابلس الرمضانية وسط أجواء تنافسية رائعة.",
    excerptEn: "A distinguished participation of the academy teams in the Nablus Ramadan tournament amidst a great competitive atmosphere.",
    contentAr: "شاركت فرق الفئات العمرية لأكاديمية بيليه في بطولة نابلس الرمضانية لكرة القدم.\nقدم لاعبو الأكاديمية أداءً فنياً مميزاً عكس مستوى التدريب المتقدم والروح الرياضية العالية التي يتحلى بها لاعبو بيليه في البطولة وجذب اهتمام المتابعين.",
    contentEn: "Pele Academy age groups participated in the Nablus Ramadan Football Tournament.\nThe academy players delivered a distinguished technical performance reflecting the advanced training and sportsmanship of Pele players in the tournament, drawing positive attention.",
    sectionSlug: "football-academy",
    imageUrl: "/post-football-ramadan.jpg",
    date: "2026-06-18",
    isPublished: true,
  },
  {
    id: "static-3",
    titleAr: "مركز التدريب المهني: الأكاديمية تنهي دورة الإسعافات الأولية",
    titleEn: "Vocational Training Center: Academy Completes First Aid Course",
    excerptAr: "تخريج فوج جديد من المشاركين في دورة الإسعافات الأولية بالتعاون مع الدفاع المدني.",
    excerptEn: "Graduating a new cohort of participants in the first aid course in cooperation with the Civil Defense.",
    contentAr: "اختتم مركز التدريب والتطوير التابع لأكاديمية بيليه دورة متقدمة في الإسعافات الأولية.\nتلقى المشاركون تدريبات عملية ونظرية مكثفة حول كيفية التعامل مع الحالات الطارئة والإصابات الرياضية، بمشاركة مدربين معتمدين من الدفاع المدني.",
    contentEn: "The Training & Development Center at Pele Academy concluded an advanced course in first aid.\nParticipants received intensive practical and theoretical training on how to handle emergencies and sports injuries, with certified trainers from the Civil Defense.",
    sectionSlug: "training-development",
    imageUrl: "/post-training-firstaid.jpg",
    date: "2026-06-20",
    isPublished: true,
  },
  {
    id: "seed-3",
    titleAr: "حملة توعوية حول التعامل مع الحرائق واستخدام طفايات الحريق",
    titleEn: "Awareness Campaign on Dealing with Fires and Using Fire Extinguishers",
    excerptAr: "نظم متطوعو الدفاع المدني حملة توعوية وتدريبية عمليّة للأطفال والشباب حول كيفية التعامل مع الحرائق واستخدام طفايات الحريق.",
    excerptEn: "Civil Defense Volunteers organized an awareness and practical training campaign for children and youth on how to deal with fires and use fire extinguishers.",
    contentAr: "اشتمَل النشاط على تدريبات عملية مكثفة لمحاكاة إطفاء الحرائق باستخدام خراطيم المياه التابعة لسيارات الدفاع المدني، بالإضافة إلى شرح مفصل حول أنواع طفايات الحريق وكيفية استخدامها بأمان.\nتفاعل المشاركون بشكل رائع وتعلموا كيفية التصرف السليم في حالات الطوارئ المنزلية.",
    contentEn: "The activity included intensive practical training to simulate extinguishing fires using Civil Defense truck water hoses, in addition to a detailed explanation of fire extinguisher types and how to use them safely.\nParticipants interacted wonderfully and learned proper action during home emergencies.",
    sectionSlug: "civil-defense-volunteers",
    imageUrl: "/post-civil-new.jpg",
    date: "2025-05-18",
    isPublished: true,
  }
];

// Mutable local copy for mock in-memory CRUD in static mode
let inMemoryPosts: Post[] = [...STATIC_POSTS];

async function parseResponse<T>(response: Response): Promise<T> {
  const payload = await response.json();

  if (!response.ok) {
    const error = new Error(payload.message ?? "Request failed.");
    (error as any).errors = payload.errors;
    throw error;
  }

  return payload.data as T;
}

function getAuthHeader(): Record<string, string> {
  const token = localStorage.getItem("admin_token");
  return token ? { Authorization: `Bearer ${token}` } : {};
}

// Convert FormData to Post object for in-memory mock storage
function formDataToPost(formData: FormData, id?: string, existing?: Post): Post {
  const titleAr = (formData.get("titleAr") as string) || "";
  const titleEn = (formData.get("titleEn") as string) || "";
  const excerptAr = (formData.get("excerptAr") as string) || "";
  const excerptEn = (formData.get("excerptEn") as string) || "";
  const contentAr = (formData.get("contentAr") as string) || "";
  const contentEn = (formData.get("contentEn") as string) || "";
  const sectionSlug = (formData.get("sectionSlug") as string) || "football-academy";
  const date = (formData.get("date") as string) || new Date().toISOString().split("T")[0];
  const isPublished = formData.get("isPublished") === "true";

  let imageUrl = existing?.imageUrl || "https://images.unsplash.com/photo-1547347298-4074fc3086f0?auto=format&fit=crop&w=1200&q=80";
  const imageFile = formData.get("image") as File;
  if (imageFile && imageFile.size > 0) {
    imageUrl = URL.createObjectURL(imageFile);
  }

  return {
    id: id || `mock-${Date.now()}`,
    titleAr,
    titleEn,
    excerptAr,
    excerptEn,
    contentAr,
    contentEn,
    sectionSlug,
    imageUrl,
    date,
    isPublished,
    createdAt: existing?.createdAt || new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
}

export const postsService = {
  async getPosts(options: GetPostsOptions = {}): Promise<Post[]> {
    const searchParams = new URLSearchParams();

    if (typeof options.published === "boolean") {
      searchParams.set("published", String(options.published));
    }

    if (options.sectionSlug) {
      searchParams.set("sectionSlug", options.sectionSlug);
    }

    const query = searchParams.toString();
    try {
      const response = await fetch(`${API_BASE_URL}/posts${query ? `?${query}` : ""}`);
      return await parseResponse<Post[]>(response);
    } catch (err) {
      console.warn("⚠️ Backend connection failed. Returning local in-memory posts:", err);
      
      let filtered = [...inMemoryPosts];
      if (typeof options.published === "boolean") {
        filtered = filtered.filter(p => p.isPublished === options.published);
      }
      if (options.sectionSlug) {
        filtered = filtered.filter(p => p.sectionSlug === options.sectionSlug);
      }
      
      return filtered.sort((a, b) => b.date.localeCompare(a.date));
    }
  },

  async getPublishedPosts(): Promise<Post[]> {
    return this.getPosts({ published: true });
  },

  async getPostsBySection(sectionSlug: string): Promise<Post[]> {
    return this.getPosts({ published: true, sectionSlug });
  },

  async getPostById(id: string): Promise<Post> {
    try {
      const response = await fetch(`${API_BASE_URL}/posts/${id}`);
      return await parseResponse<Post>(response);
    } catch (err) {
      console.warn(`⚠️ Backend connection failed. Searching in local posts for ID: ${id}`, err);
      const post = inMemoryPosts.find((p) => p.id === id);
      if (!post) {
        throw new Error("المنشور غير موجود / Post not found.");
      }
      return post;
    }
  },

  async createPost(formData: FormData): Promise<Post> {
    try {
      const response = await fetch(`${API_BASE_URL}/posts`, {
        method: "POST",
        headers: {
          ...getAuthHeader(),
        },
        body: formData,
      });
      return await parseResponse<Post>(response);
    } catch (err) {
      console.warn("⚠️ Backend connection failed. Simulating post creation in-memory:", err);
      const newPost = formDataToPost(formData);
      inMemoryPosts.push(newPost);
      return newPost;
    }
  },

  async updatePost(id: string, formData: FormData): Promise<Post> {
    try {
      const response = await fetch(`${API_BASE_URL}/posts/${id}`, {
        method: "PATCH",
        headers: {
          ...getAuthHeader(),
        },
        body: formData,
      });
      return await parseResponse<Post>(response);
    } catch (err) {
      console.warn(`⚠️ Backend connection failed. Simulating post update in-memory for ID: ${id}`, err);
      const index = inMemoryPosts.findIndex((p) => p.id === id);
      if (index === -1) {
        throw new Error("المنشور غير موجود / Post not found.");
      }
      const updatedPost = formDataToPost(formData, id, inMemoryPosts[index]);
      inMemoryPosts[index] = updatedPost;
      return updatedPost;
    }
  },

  async deletePost(id: string): Promise<void> {
    try {
      const response = await fetch(`${API_BASE_URL}/posts/${id}`, {
        method: "DELETE",
        headers: {
          ...getAuthHeader(),
        },
      });
      
      const payload = await response.json();
      if (!response.ok) {
        throw new Error(payload.message ?? "Delete request failed.");
      }
    } catch (err) {
      // If it's a real server error returned by the server (has response status), throw it
      if (err instanceof Error && !err.message.includes("Failed to fetch")) {
        throw err;
      }
      console.warn(`⚠️ Backend connection failed. Simulating post deletion in-memory for ID: ${id}`);
      inMemoryPosts = inMemoryPosts.filter((p) => p.id !== id);
    }
  },
};
