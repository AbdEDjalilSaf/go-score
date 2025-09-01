import type { ExamData } from "@/app/dashboard/dashStudent/pages/exam-simulator/CapacitiesFull/types/exam"

export const examData: ExamData = {
  title: "محاكي الاختبار",
  description:
    "بناءًا على ما هو متاح من الاختبار الحقيقي، يجب أن يكون لديك فهم جيد أو إلمام تام بالمعلومات وحل المشكلات وتوفير وقتك. ستساعدك ورقة مسودة كتابة الملاحظات وحل المسائلات بالتوقيت.",
  instructions:
    "يجب عليك أيضًا تخصيص جدول ساعتين لحل الاختبار اخبر عائلتك وأصدقائك بعدم مقاطعتك خلال هذا الوقت. نوصي بإجراء الاختبار بالكامل في جلسة واحدة للتدرب على سرعتك وبناء قدرتك على التحمل أثناء إجراء الاختبار وهو ما ستحتاج إليه في يوم الاختبار.",
  remainingAttempts: 1,
  examInfo: {
    quantitative: "كامل القسم",
    verbal: "كامل القسم",
    questionCount: 120,
    expectedTime: "02:05 ساعة",
  },
}
