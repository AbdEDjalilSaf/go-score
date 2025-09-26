export interface SkillTestStatistic {
    id: number;
    value: string;
    questionsCount: number;
    correctAnswersCount: number;
    ratio: number;
    selected?: boolean;
  }
  
  export interface TestClass {
    id: number;
    value: string;
    skillTestsStatistics: SkillTestStatistic[];
    selectAll?: boolean;
  }
  
  export interface TestType {
    id: number;
    value: string;
    testClasses: TestClass[];
  }
  
  export interface ApiResponse {
    data: {
      testTypes: TestType[];
    };
  }
  
  export interface Setting {
    id: string;
    label: string;
    description: string;
    icon: string;
    defaultValue: boolean;
    color: string;
  }
  
  export interface TestInfo {
    title: string;
    expectedTime: string;
    numberOfQuestions: number;
    startButtonText: string;
    labels: {
      expectedTime: string;
      numberOfQuestions: string;
    };
  }
  
  export interface AppConfig {
    header: {
      title: string;
      subtitle: string;
      description: string[];
      buttons: Array<{
        text: string;
        variant: string;
      }>;
    };
    title: string;
    settings: Setting[];
    resetButton: string;
    questionsBank: {
      lastUpdated: string;
      filterLabels: {
        newest: string;
        oldest: string;
      };
    };
    testInfo: TestInfo;
  }





  // export interface SkillTestStatistic {
  //   id: number;
  //   value: string;
  //   questionsCount?: number;
  //   correctAnswersCount?: number;
  //   ratio?: number;
  //   selected?: boolean;
  // }
  
  export interface TestClass {
    id: number;
    value: string;
    skillTestsStatistics: SkillTestStatistic[];
    selectAll?: boolean;
  }
  
  export interface TestType {
    id: number;
    value: string;
    testClasses: TestClass[];
  }
  
  export interface Setting {
    id: string;
    label: string;
    description: string;
    icon: string;
    color: string;
    defaultValue: boolean;
  }
  
  // export interface TestInfo {
  //   title: string;
  //   expectedTime: string;
  //   numberOfQuestions: string;
  //   startButtonText: string;
  //   labels: {
  //     expectedTime: string;
  //     numberOfQuestions: string;
  //   };
  // }
  
  // New types for Questions API
  export interface Choice {
    id: string;
    value: string;
  }
  
  export interface Question {
    id: string;
    value: string;
    answer: string;
    skillId: number;
    choices: Choice[];
  }
  
  export interface QuestionsResponse {
    meta: string;
    succeeded: boolean;
    message: string;
    errors: string[];
    data: Question[];
  }
  
  // Training session types
  export interface TrainingSession {
    questions: Question[];
    currentQuestionIndex: number;
    answers: Record<string, string>;
    startTime: Date;
    isActive: boolean;
  }










  export interface Skill {
    id: number;
    value: string;
  }

// Existing interfaces
export interface TestClass {
  id: number;
  value: string;
  skillTestsStatistics: SkillTestStatistic[];
  selectAll?: boolean;
}

export interface SkillTestStatistic {
  id: number;
  value: string;
  questionsCount: number;
  correctAnswersCount: number;
  ratio: number;
  selected?: boolean;
}

export interface TestType {
  value: string;
  testClasses: TestClass[];
}

export interface Setting {
  id: string;
  label: string;
  description: string;
  icon: string;
  color: string;
  defaultValue: boolean;
}

// export interface TestInfo {
//   title: string;
//   expectedTime: string;
//   numberOfQuestions: string;
//   startButtonText: string;
//   labels: {
//     expectedTime: string;
//     numberOfQuestions: string;
//   };
// }

// New interfaces for Questions API
export interface Choice {
  id: string;
  value: string;
}

export interface Question {
  id: string;
  value: string;
  answer: string;
  skillId: number;
  choices: Choice[];
}

export interface QuestionsResponse {
  meta: string;
  succeeded: boolean;
  message: string;
  errors: string[];
  data: Question[];
}

// Enhanced interface for skills with questions
export interface SkillWithQuestions extends SkillTestStatistic {
  questions?: Question[];
  availableQuestions?: number;
}

export interface TestClassWithQuestions extends Omit<TestClass, 'skillTestsStatistics'> {
  skillTestsStatistics: SkillWithQuestions[];
}