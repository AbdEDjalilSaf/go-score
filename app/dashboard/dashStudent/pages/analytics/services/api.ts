import { SkillApiResponse } from '../types/assessment';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8080';

export async function fetchSkills(): Promise<SkillApiResponse> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/Skill/GetAllSkills`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching skills:', error);
    // Return mock data for development
    return {
      meta: "Mock data for development",
      succeeded: true,
      message: "تم جلب البيانات بنجاح",
      errors: [],
      data: [
        // { id: 1, value: "الرياضيات المتقدمة", testClassId: 1 },
        // { id: 2, value: "اللغة العربية", testClassId: 1 },
        // { id: 3, value: "العلوم الطبيعية", testClassId: 2 },
        // { id: 4, value: "التاريخ والجغرافيا", testClassId: 2 },
        // { id: 5, value: "اللغة الإنجليزية", testClassId: 3 },
        // { id: 6, value: "علوم الحاسوب", testClassId: 3 },
      ]
    };
  }
}