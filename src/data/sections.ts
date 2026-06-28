import heromainImg from "@/assets/heromain.jpg";
import trainingImg from "@/assets/es3af.png";
import civilImg from "@/assets/defa3.jpg";
import sportsImg from "@/assets/dr.jpg";
import type { Section } from "@/types/Section";

export const sections: Section[] = [
  {
    slug: "football-academy",
    titleAr: "أكاديمية بيليه لكرة القدم",
    titleEn: "Pele Football Academy",
    descriptionAr:
      "أكاديمية رياضية متخصصة في تدريب وتطوير المواهب الكروية لمختلف الفئات العمرية، وفق أساليب تدريب حديثة تهدف إلى بناء لاعب متميز بدنياً ومهارياً وأخلاقياً. الأكاديمية مرخصة من الاتحاد الفلسطيني لكرة القدم، والمجلس الأعلى للشباب والرياضة، والاتحاد العربي لأكاديميات كرة القدم.",
    descriptionEn:
      "A specialized sports academy dedicated to training and developing football talents across different age groups through modern methods that build players physically, technically, and ethically. The academy is licensed by the Palestinian Football Association, the Higher Council for Youth and Sports, and the Arab Federation of Football Academies.",
    imageUrl: heromainImg,
    icon: "Trophy",
    accent: "green",
  },
  {
    slug: "training-development",
    titleAr: "مركز بيليه للتدريب",
    titleEn: "Pele Training Center",
    descriptionAr:
      "مركز تدريبي وتعليمي يقدم برامج تطويرية ومهنية ورياضية تهدف إلى تنمية مهارات الشباب ورفع كفاءاتهم في عدة مجالات. ويحمل المركز تراخيص واعتمادات من كلية أكسفورد الدولية وكلية كامبردج الدولية.",
    descriptionEn:
      "A training and educational center that offers professional, developmental, and sports programs aimed at enhancing youth skills and improving their competencies in multiple fields. The center holds licenses and accreditations from Oxford International College and Cambridge International College.",
    imageUrl: trainingImg,
    icon: "GraduationCap",
    accent: "gold",
  },
  {
    slug: "civil-defense-volunteers",
    titleAr: "مركز متطوعي بيليه للدفاع المدني",
    titleEn: "Pele Civil Defense Volunteers Center",
    descriptionAr:
      "مركز تطوعي يهدف إلى نشر ثقافة العمل الإنساني والتطوعي، من خلال تدريب المتطوعين على الإسعافات الأولية والسلامة العامة والاستجابة للطوارئ، بالتعاون مع الدفاع المدني الفلسطيني.",
    descriptionEn:
      "A volunteer center that promotes humanitarian and volunteer work by training participants in first aid, public safety, and emergency response in cooperation with the Palestinian Civil Defense.",
    imageUrl: civilImg,
    icon: "ShieldCheck",
    accent: "red",
  },
  {
    slug: "general-sports-activities",
    titleAr: "الأنشطة الرياضية والنوادي الصيفية",
    titleEn: "Sports Activities and Summer Clubs",
    descriptionAr:
      "تقدم أكاديمية بيليه الألمانية الفلسطينية أنشطة رياضية وترفيهية متنوعة للأطفال والشباب، تهدف إلى تنمية المهارات، تعزيز الثقة بالنفس، وتشجيع روح التعاون والانضباط، ضمن بيئة آمنة وممتعة تجمع بين التعلم والمرح.",
    descriptionEn:
      "The German-Palestinian Pele Academy offers a variety of sports and recreational activities for children and youth, aimed at developing skills, boosting self-confidence, and encouraging cooperation and discipline within a safe and enjoyable environment that combines learning and fun.",
    imageUrl: sportsImg,
    icon: "Activity",
    accent: "black",
  },
];

export const getSection = (slug: string) => sections.find((section) => section.slug === slug);
