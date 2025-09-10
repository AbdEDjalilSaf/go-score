// // import { AppConfig } from '../types/api';

// // export const staticConfig: AppConfig = {
// //   header: {
// //     title: "واجهة التدريب",
// //     subtitle: "ابدأ التدريب الآن",
// //     description: [
// //       "اختر المواد التي تريد التدريب عليها",
// //       "يمكنك تخصيص إعدادات الاختبار حسب احتياجاتك"
// //     ],
// //     buttons: [
// //       { text: "ابدأ التدريب", variant: "primary" },
// //       { text: "إعدادات متقدمة", variant: "secondary" }
// //     ]
// //   },
// //   title: "إعدادات الاختبار",
// //   settings: [
// //     {
// //       id: "randomize",
// //       label: "ترتيب عشوائي للأسئلة",
// //       description: "عرض الأسئلة بترتيب عشوائي",
// //       icon: "settings",
// //       defaultValue: true,
// //       color: "blue"
// //     },
// //     {
// //       id: "timer",
// //       label: "توقيت الأسئلة",
// //       description: "تفعيل توقيت محدد لكل سؤال",
// //       icon: "star",
// //       defaultValue: false,
// //       color: "green"
// //     },
// //     {
// //       id: "hints",
// //       label: "إظهار التلميحات",
// //       description: "عرض تلميحات للمساعدة",
// //       icon: "x",
// //       defaultValue: true,
// //       color: "red"
// //     }
// //   ],
// //   resetButton: "إعادة تعيين الإعدادات",
// //   questionsBank: {
// //     lastUpdated: "آخر تحديث: منذ يومين",
// //     filterLabels: {
// //       newest: "الأحدث",
// //       oldest: "الأقدم"
// //     }
// //   },
// //   testInfo: {
// //     title: "معلومات الاختبار",
// //     expectedTime: "45 دقيقة",
// //     numberOfQuestions: 50,
// //     startButtonText: "ابدأ الاختبار",
// //     labels: {
// //       expectedTime: "الوقت المتوقع",
// //       numberOfQuestions: "عدد الأسئلة"
// //     }
// //   }
// // };













// export const staticConfig = {
//   header: {
//     title: "منصة التدريب التفاعلي",
//     buttons: [
//       { text: "ابدأ التدريب", type: "primary" },
//       { text: "تحديث البيانات", type: "secondary" }
//     ],
//     description: [
//       "اختر المهارات التي تريد التدرب عليها من الخيارات أدناه",
//       "سيتم تحديد عدد الأسئلة بناءً على اختيارك"
//     ]
//   },
//   settings: [
//     {
//       id: "shuffle_questions",
//       label: "ترتيب عشوائي للأسئلة",
//       description: "خلط ترتيب الأسئلة في كل جلسة تدريب",
//       icon: "settings",
//       color: "blue",
//       defaultValue: true
//     },
//     {
//       id: "show_explanations",
//       label: "إظهار الشروحات",
//       description: "عرض شرح مفصل للإجابات الصحيحة",
//       icon: "star",
//       color: "green",
//       defaultValue: true
//     },
//     {
//       id: "time_pressure",
//       label: "ضغط الوقت",
//       description: "تقييد الوقت المخصص لكل سؤال",
//       icon: "x",
//       color: "red",
//       defaultValue: false
//     }
//   ],
//   questionsBank: {
//     lastUpdated: "آخر تحديث: 15 يناير 2024",
//     filterLabels: {
//       newest: "الأحدث",
//       oldest: "الأقدم"
//     }
//   },
//   testInfo: {
//     title: "معلومات التدريب",
//     expectedTime: "45 دقيقة",
//     numberOfQuestions: "30 سؤال",
//     startButtonText: "ابدأ التدريب",
//     labels: {
//       expectedTime: "الوقت المتوقع",
//       numberOfQuestions: "عدد الأسئلة"
//     }
//   },
//   title: "إعدادات التدريب",
//   resetButton: "إعادة تعيين الإعدادات"
// };



 








export const staticConfig = {
  header: {
    title: "منصة التدريب التفاعلي",
    buttons: [
      { text: "ابدأ التدريب", type: "primary" },
      { text: "تحديث البيانات", type: "secondary" }
    ],
    description: [
      "اختر المهارات التي تريد التدرب عليها من الخيارات أدناه",
      "سيتم تحديد عدد الأسئلة بناءً على اختيارك"
    ]
  },
  settings: [
    {
      id: "shuffle_questions",
      label: "ترتيب عشوائي للأسئلة",
      description: "خلط ترتيب الأسئلة في كل جلسة تدريب",
      icon: "settings",
      color: "blue",
      defaultValue: true
    },
    {
      id: "show_explanations",
      label: "إظهار الشروحات",
      description: "عرض شرح مفصل للإجابات الصحيحة",
      icon: "star",
      color: "green",
      defaultValue: true
    },
    {
      id: "time_pressure",
      label: "ضغط الوقت",
      description: "تقييد الوقت المخصص لكل سؤال",
      icon: "x",
      color: "red",
      defaultValue: false
    }
  ],
  questionsBank: {
    lastUpdated: "آخر تحديث: 15 يناير 2024",
    filterLabels: {
      newest: "الأحدث",
      oldest: "الأقدم"
    }
  },
  testInfo: {
    title: "معلومات التدريب",
    expectedTime: "45 دقيقة",
    numberOfQuestions: "30 سؤال",
    startButtonText: "ابدأ التدريب",
    labels: {
      expectedTime: "الوقت المتوقع",
      numberOfQuestions: "عدد الأسئلة"
    }
  },
  title: "إعدادات التدريب",
  resetButton: "إعادة تعيين الإعدادات"
};