"use client"

interface CalendarGridProps {
  dates: Array<{
    date: number
    isCurrentMonth: boolean
    isSelected?: boolean
  }>
  onDateSelect: (date: number) => void
}

export function CalendarGrid({ dates, onDateSelect }: CalendarGridProps) {
  return (
    <div className="grid grid-cols-7 gap-1">
      {dates.map((dateObj, index) => (
        <button
          key={index}
          onClick={() => onDateSelect(dateObj.date)}
          className={`
            aspect-square flex items-center justify-center text-sm rounded-lg transition-all
            ${
              dateObj.isSelected
                ? "bg-blue-600 text-white font-semibold shadow-md"
                : dateObj.isCurrentMonth
                  ? "text-gray-900 hover:bg-gray-100 active:bg-gray-200"
                  : "text-gray-400 cursor-default"
            }
          `}
          disabled={!dateObj.isCurrentMonth}
        type="button">
          {dateObj.date}
        </button>
      ))}
    </div>
  )
}
