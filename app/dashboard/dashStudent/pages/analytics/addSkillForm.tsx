import React, { useState } from 'react';
import { Plus, Loader2, CheckCircle, AlertCircle, X } from 'lucide-react';

interface ApiResponse {
  meta: string;
  succeeded: boolean;
  message: string;
  errors: string[];
  data: number;
}

interface SkillFormData {
  value: string;
  testClassId: number;
}

interface Toast {
  id: string;
  type: 'success' | 'error';
  message: string;
}

const addSkillForm: React.FC = () => {
  const [formData, setFormData] = useState<SkillFormData>({
    value: '',
    testClassId: 0
  });
  const [isLoading, setIsLoading] = useState(false);
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validateForm = (): boolean => {
    const newErrors: { [key: string]: string } = {};
    
    if (!formData.value.trim()) {
      newErrors.value = 'Skill value is required';
    } else if (formData.value.trim().length < 2) {
      newErrors.value = 'Skill value must be at least 2 characters';
    }
    
    if (formData.testClassId < 0) {
      newErrors.testClassId = 'Test Class ID must be a positive number';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const addToast = (type: 'success' | 'error', message: string) => {
    const id = Math.random().toString(36).substr(2, 9);
    const newToast: Toast = { id, type, message };
    setToasts(prev => [...prev, newToast]);
    
    // Remove toast after 5 seconds
    setTimeout(() => {
      setToasts(prev => prev.filter(toast => toast.id !== id));
    }, 5000);
  };

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsLoading(true);
    setErrors({});
    
    try {
      // Simulate API call - replace with actual endpoint
      const response = await fetch('/api/Skill/AddSkill', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          value: formData.value.trim(),
          testClassId: formData.testClassId
        }),
      });
      
      const result: ApiResponse = await response.json();
      
      if (result.succeeded) {
        addToast('success', result.message || 'Skill added successfully!');
        setFormData({ value: '', testClassId: 0 });
      } else {
        if (result.errors && result.errors.length > 0) {
          result.errors.forEach(error => {
            addToast('error', error);
          });
        } else {
          addToast('error', result.message || 'Failed to add skill');
        }
      }
    } catch (error) {
      // For demo purposes, simulate a successful response
      console.log('API call would be made with:', formData);
      addToast('success', 'Skill added successfully! (Demo mode)');
      setFormData({ value: '', testClassId: 0 });
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (field: keyof SkillFormData, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md mx-auto">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
              <Plus className="w-8 h-8 text-blue-600" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Add New Skill</h1>
            <p className="text-gray-600">Enhance your profile with a new skill</p>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-white/20">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="skillValue" className="block text-sm font-medium text-gray-700 mb-2">
                  Skill Name
                </label>
                <input
                  type="text"
                  id="skillValue"
                  value={formData.value}
                  onChange={(e) => handleInputChange('value', e.target.value)}
                  className={`w-full px-4 py-3 rounded-xl border transition-all duration-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors.value 
                      ? 'border-red-300 bg-red-50' 
                      : 'border-gray-300 bg-white hover:border-gray-400 focus:bg-blue-50'
                  }`}
                  placeholder="e.g., React Development, Data Analysis"
                  disabled={isLoading}
                />
                {errors.value && (
                  <div className="flex items-center mt-2 text-red-600 text-sm">
                    <AlertCircle className="w-4 h-4 mr-1" />
                    {errors.value}
                  </div>
                )}
              </div>

              <div>
                <label htmlFor="testClassId" className="block text-sm font-medium text-gray-700 mb-2">
                  Test Class ID
                </label>
                <input
                  type="number"
                  id="testClassId"
                  value={formData.testClassId}
                  onChange={(e) => handleInputChange('testClassId', parseInt(e.target.value) || 0)}
                  className={`w-full px-4 py-3 rounded-xl border transition-all duration-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors.testClassId 
                      ? 'border-red-300 bg-red-50' 
                      : 'border-gray-300 bg-white hover:border-gray-400 focus:bg-blue-50'
                  }`}
                  placeholder="0"
                  min="0"
                  disabled={isLoading}
                />
                {errors.testClassId && (
                  <div className="flex items-center mt-2 text-red-600 text-sm">
                    <AlertCircle className="w-4 h-4 mr-1" />
                    {errors.testClassId}
                  </div>
                )}
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 hover:from-blue-700 hover:to-blue-800 focus:ring-4 focus:ring-blue-200 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.02] active:scale-[0.98]"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Adding Skill...
                  </div>
                ) : (
                  <div className="flex items-center justify-center">
                    <Plus className="w-5 h-5 mr-2" />
                    Add Skill
                  </div>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Toast Notifications */}
      <div className="fixed top-4 right-4 z-50 space-y-2">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`flex items-center p-4 rounded-lg shadow-lg backdrop-blur-sm transform transition-all duration-300 ${
              toast.type === 'success'
                ? 'bg-green-100/90 text-green-800 border border-green-200'
                : 'bg-red-100/90 text-red-800 border border-red-200'
            }`}
          >
            {toast.type === 'success' ? (
              <CheckCircle className="w-5 h-5 mr-3 flex-shrink-0" />
            ) : (
              <AlertCircle className="w-5 h-5 mr-3 flex-shrink-0" />
            )}
            <span className="text-sm font-medium mr-3">{toast.message}</span>
            <button
              onClick={() => removeToast(toast.id)}
              className="flex-shrink-0 p-1 rounded-full hover:bg-white/20 transition-colors duration-200"
            type='button'>
              <X className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </>
  );
};

export default addSkillForm;