"use client"
import React, { useState } from 'react';
import { CheckCircle, Circle, ChevronDown, ChevronUp } from 'lucide-react';

interface Category {
  id: string;
  text: string;
  selected: boolean;
  questionsCount?: number;
  correctAnswersCount?: number;
  ratio?: number;
}

interface QuizSectionsProps {
  title: string;
  categories: Category[];
  id: string;
  onSelectionChange?: (selectedCategories: string[]) => void;
}

const QuizSections: React.FC<QuizSectionsProps> = ({ 
  title, 
  categories, 
  id, 
  onSelectionChange 
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedItems, setSelectedItems] = useState<Set<string>>(new Set());
  const [selectAll, setSelectAll] = useState(false);

  const handleItemToggle = (itemId: string) => {
    const newSelected = new Set(selectedItems);
    if (newSelected.has(itemId)) {
      newSelected.delete(itemId);
    } else {
      newSelected.add(itemId);
    }
    setSelectedItems(newSelected);
    setSelectAll(newSelected.size === categories.length);
    
    if (onSelectionChange) {
      onSelectionChange(Array.from(newSelected));
    }
  };

  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedItems(new Set());
      setSelectAll(false);
      if (onSelectionChange) onSelectionChange([]);
    } else {
      const allIds = new Set(categories.map(cat => cat.id));
      setSelectedItems(allIds);
      setSelectAll(true);
      if (onSelectionChange) onSelectionChange(Array.from(allIds));
    }
  };

  return (
    <div className="bg-white w-full rounded-lg border border-gray-200 overflow-hidden">
      <div className="flex justify-between items-center p-4 bg-purple-50">
        <div className="flex items-center gap-3">
          <button
            onClick={handleSelectAll}
            className="flex items-center gap-2"
            type="button"
          >
            {selectAll ? (
              <CheckCircle className="w-5 h-5 text-green-600" />
            ) : (
              <Circle className="w-5 h-5 text-gray-400" />
            )}
          </button>
          <h3 className="font-semibold text-gray-800">{title}</h3>
          <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded-full">
            {selectedItems.size} من {categories.length}
          </span>
        </div>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          type="button"
        >
          {isExpanded ? (
            <ChevronUp className="w-5 h-5 text-gray-600" />
          ) : (
            <ChevronDown className="w-5 h-5 text-gray-600" />
          )}
        </button>
      </div>

      {isExpanded && (
        <div className="p-4 space-y-2">
          {categories.map((category) => (
            <div
              key={category.id}
              className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 border border-gray-100"
            >
              <div className="flex items-center gap-3">
                <button
                  onClick={() => handleItemToggle(category.id)}
                  type="button"
                >
                  {selectedItems.has(category.id) ? (
                    <CheckCircle className="w-5 h-5 text-green-600" />
                  ) : (
                    <Circle className="w-5 h-5 text-gray-400" />
                  )}
                </button>
                <span className="text-sm font-medium text-gray-700">
                  {category.text}
                </span>
              </div>
              
              {category.questionsCount !== undefined && (
                <div className="flex items-center gap-3 text-xs text-gray-500">
                  {/* <span>{category.questionsCount} سؤال</span>
                  {category.ratio !== undefined && (
                    <span className={`px-2 py-1 rounded-full ${
                      category.ratio >= 70 
                        ? 'bg-green-100 text-green-700'
                        : category.ratio >= 50
                        ? 'bg-yellow-100 text-yellow-700'
                        : 'bg-red-100 text-red-700'
                    }`}>
                      {Math.round(category.ratio)}%
                    </span>
                  )} */}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default QuizSections;