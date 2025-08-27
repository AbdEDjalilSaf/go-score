// "use client"

// export interface CalendarDate {
//   date: number
//   isCurrentMonth: boolean
//   isSelected: boolean
// }

// export interface TimeSlot {
//   time: string
//   duration: number
// }

// export interface ProgramItem {
//   id: number
//   type: string
//   duration?: string
//   details?: string
//   icon: string
//   status: string
// }

// export const generateCalendarDates = (year: number, month: number, selectedDate: number): CalendarDate[] => {
//   const firstDay = new Date(year, month, 1)
//   const lastDay = new Date(year, month + 1, 0)
//   const daysInMonth = lastDay.getDate()
//   const startingDayOfWeek = firstDay.getDay()

//   const prevMonth = new Date(year, month - 1, 0)
//   const daysInPrevMonth = prevMonth.getDate()

//   const dates: CalendarDate[] = []

//   // Adjust for Monday start (0 = Sunday, 1 = Monday, etc.)
//   const startDay = startingDayOfWeek === 0 ? 6 : startingDayOfWeek - 1

//   // Add previous month's trailing days
//   for (let i = startDay - 1; i >= 0; i--) {
//     dates.push({
//       date: daysInPrevMonth - i,
//       isCurrentMonth: false,
//       isSelected: false,
//     })
//   }

//   // Add current month's days
//   for (let day = 1; day <= daysInMonth; day++) {
//     dates.push({
//       date: day,
//       isCurrentMonth: true,
//       isSelected: day === selectedDate,
//     })
//   }

//   // Add next month's leading days
//   const remainingCells = 35 - dates.length // 5 rows × 7 days
//   for (let day = 1; day <= remainingCells; day++) {
//     dates.push({
//       date: day,
//       isCurrentMonth: false,
//       isSelected: false,
//     })
//   }

//   return dates
// }

// export const formatMonthYear = (date: Date): string => {
//   return date.toLocaleDateString("en-US", {
//     month: "long",
//     year: "numeric",
//   })
// }

// export const DAYS_OF_WEEK = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]

// export const DEFAULT_TIME_SLOTS: TimeSlot[] = [
//   { time: "11:00", duration: 2 },
//   { time: "14:00", duration: 1 },
// ]

// export const DEFAULT_PROGRAM_ITEMS: ProgramItem[] = [
//   {
//     id: 1,
//     type: "Lesson",
//     duration: "40 min",
//     icon: "📚",
//     status: "scheduled",
//   },
//   {
//     id: 2,
//     type: "Test",
//     duration: "15 min",
//     details: "10 questions",
//     icon: "📚",
//     status: "scheduled",
//   },
//   {
//     id: 3,
//     type: "Homework",
//     duration: "",
//     details: "Nothing is here yet",
//     icon: "📚",
//     status: "empty",
//   },
//   {
//     id: 4,
//     type: "Lesson",
//     duration: "25 min",
//     icon: "📚",
//     status: "scheduled",
//   },
// ]











"use client"

export interface CalendarDate {
  date: number
  isCurrentMonth: boolean
  isSelected: boolean
}

export interface TimeSlot {
  time: string
  duration: number
}

export interface ProgramItem {
  id: number
  type: string
  duration?: string
  details?: string
  icon: string
  status: string
}

export const generateCalendarDates = (year: number, month: number, selectedDate: number): CalendarDate[] => {
  const firstDay = new Date(year, month, 1)
  const lastDay = new Date(year, month + 1, 0)
  const daysInMonth = lastDay.getDate()
  const startingDayOfWeek = firstDay.getDay()

  const prevMonth = new Date(year, month - 1, 0)
  const daysInPrevMonth = prevMonth.getDate()

  const dates: CalendarDate[] = []

  // Adjust for Monday start (0 = Sunday, 1 = Monday, etc.)
  const startDay = startingDayOfWeek === 0 ? 6 : startingDayOfWeek - 1

  // Add previous month's trailing days
  for (let i = startDay - 1; i >= 0; i--) {
    dates.push({
      date: daysInPrevMonth - i,
      isCurrentMonth: false,
      isSelected: false,
    })
  }

  // Add current month's days
  for (let day = 1; day <= daysInMonth; day++) {
    dates.push({
      date: day,
      isCurrentMonth: true,
      isSelected: day === selectedDate,
    })
  }

  // Add next month's leading days
  const remainingCells = 35 - dates.length // 5 rows × 7 days
  for (let day = 1; day <= remainingCells; day++) {
    dates.push({
      date: day,
      isCurrentMonth: false,
      isSelected: false,
    })
  }

  return dates
}

export const formatMonthYear = (date: Date): string => {
  return date.toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  })
}

export const DAYS_OF_WEEK = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]

export const DEFAULT_TIME_SLOTS: TimeSlot[] = [
  { time: "11:00", duration: 2 },
  { time: "14:00", duration: 1 },
]

export const DEFAULT_PROGRAM_ITEMS: ProgramItem[] = [
  {
    id: 1,
    type: "Lesson",
    duration: "40 min",
    icon: "📚",
    status: "scheduled",
  },
  {
    id: 2,
    type: "Test",
    duration: "15 min",
    details: "10 questions",
    icon: "📚",
    status: "scheduled",
  },
  {
    id: 3,
    type: "Homework",
    duration: "",
    details: "Nothing is here yet",
    icon: "📚",
    status: "empty",
  },
  {
    id: 4,
    type: "Lesson",
    duration: "25 min",
    icon: "📚",
    status: "scheduled",
  },
]
