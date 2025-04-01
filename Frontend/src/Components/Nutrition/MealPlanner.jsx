import React, { useState } from 'react';
import { Calendar as CalendarIcon, ChefHat, Clock, Info, Plus, X } from 'lucide-react';
import { format, addDays, startOfWeek } from 'date-fns';

const MealPlanner = () => {
  const mealSuggestions = [
    {
      id: '1',
      name: 'High-Protein Breakfast Bowl',
      calories: 450,
      protein: 35,
      time: '15 min',
      image: 'https://images.unsplash.com/photo-1511690656952-34342bb7c2f2?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80'
    },
    {
      id: '2',
      name: 'Mediterranean Lunch Plate',
      calories: 550,
      protein: 25,
      time: '20 min',
      image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80'
    },
    {
      id: '3',
      name: 'Lean Dinner Stir-Fry',
      calories: 480,
      protein: 30,
      time: '25 min',
      image: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80'
    }
  ];

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [mealPlans, setMealPlans] = useState([]);
  const [selectedMealType, setSelectedMealType] = useState(null);
  const [selectedDay, setSelectedDay] = useState(null);

  const startOfCurrentWeek = startOfWeek(selectedDate);
  const weekDays = Array.from({ length: 7 }, (_, i) => addDays(startOfCurrentWeek, i));

  const mealTypes = ['Breakfast', 'Lunch', 'Dinner'];

  const addMealToPlan = (meal, day, mealType) => {
    // Remove existing meal for the same day and type if it exists
    const filteredPlans = mealPlans.filter(
      (plan) =>
        !(
          format(plan.day, 'yyyy-MM-dd') === format(day, 'yyyy-MM-dd') &&
          plan.mealType === mealType
        )
    );

    const newMealPlan = {
      id: Math.random().toString(36).substr(2, 9),
      day,
      mealType,
      meal
    };

    setMealPlans([...filteredPlans, newMealPlan]);
    setSelectedMealType(null);
    setSelectedDay(null);
  };

  const removeMealFromPlan = (mealPlanId) => {
    setMealPlans(mealPlans.filter((plan) => plan.id !== mealPlanId));
  };

  const getMealForDayAndType = (day, mealType) => {
    return mealPlans.find(
      (plan) =>
        format(plan.day, 'yyyy-MM-dd') === format(day, 'yyyy-MM-dd') &&
        plan.mealType === mealType
    );
  };

  return (
    <div className="space-y-6">
      <h1 className="text-4xl font-bold text-gray-900 dark:text-white">Meal Planner</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
            <div className="flex items-center justify-between gap-2 mb-6">
              <div className="flex items-center gap-2">
                <CalendarIcon className="w-6 h-6 text-primary" />
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Weekly Plan</h2>
              </div>
              {selectedMealType && selectedDay && (
                <div className="text-sm text-gray-600 dark:text-gray-300">
                  Selecting {selectedMealType} for {format(selectedDay, 'EEE, MMM d')}
                </div>
              )}
            </div>

            <div className="grid grid-cols-7 gap-4 mb-4">
              {weekDays.map((day, index) => (
                <div
                  key={index}
                  className={`text-center p-2 rounded-lg ${
                    selectedDay && format(selectedDay, 'yyyy-MM-dd') === format(day, 'yyyy-MM-dd')
                      ? 'bg-primary/10 dark:bg-primary/20'
                      : 'bg-gray-50 dark:bg-gray-700'
                  }`}
                >
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-300">
                    {format(day, 'EEE')}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{format(day, 'd MMM')}</p>
                </div>
              ))}
            </div>

            <div className="space-y-4">
              {mealTypes.map((mealType) => (
                <div key={mealType} className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <h3 className="font-medium text-gray-900 dark:text-white mb-2">{mealType}</h3>
                  <div className="grid grid-cols-7 gap-2">
                    {weekDays.map((day, index) => {
                      const existingMeal = getMealForDayAndType(day, mealType);
                      return (
                        <div key={index} className="relative">
                          {existingMeal ? (
                            <div className="h-20 bg-white dark:bg-gray-600 rounded p-2 text-xs">
                              <div className="flex justify-between items-start">
                                <span className="font-medium truncate">{existingMeal.meal.name}</span>
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    removeMealFromPlan(existingMeal.id);
                                  }}
                                  className="text-red-500 hover:text-red-700"
                                >
                                  <X className="w-4 h-4" />
                                </button>
                              </div>
                              <p className="text-gray-500 dark:text-gray-400 mt-1">
                                {existingMeal.meal.calories} kcal
                              </p>
                            </div>
                          ) : (
                            <button
                              onClick={() => {
                                setSelectedDay(day);
                                setSelectedMealType(mealType);
                              }}
                              className={`h-20 w-full bg-white dark:bg-gray-600 rounded border-2 border-dashed ${
                                selectedDay &&
                                selectedMealType === mealType &&
                                format(selectedDay, 'yyyy-MM-dd') === format(day, 'yyyy-MM-dd')
                                  ? 'border-primary'
                                  : 'border-gray-300 dark:border-gray-500 hover:border-primary dark:hover:border-primary'
                              } transition-colors`}
                            >
                              <Plus className="w-5 h-5 mx-auto text-gray-400" />
                            </button>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
            <div className="flex items-center gap-2 mb-6">
              <ChefHat className="w-6 h-6 text-primary" />
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                {selectedMealType && selectedDay
                  ? `Add ${selectedMealType} for ${format(selectedDay, 'EEE, MMM d')}`
                  : 'Meal Suggestions'}
              </h2>
            </div>

            <div className="space-y-4">
              {mealSuggestions.map((meal) => (
                <div
                  key={meal.id}
                  className={`relative group overflow-hidden rounded-lg transition-transform ${
                    selectedDay && selectedMealType ? 'cursor-pointer hover:scale-105' : ''
                  }`}
                  onClick={() => {
                    if (selectedDay && selectedMealType) {
                      addMealToPlan(meal, selectedDay, selectedMealType);
                    }
                  }}
                >
                  <img src={meal.image} alt={meal.name} className="w-full h-48 object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent p-4 flex flex-col justify-end">
                    <h3 className="text-white font-medium">{meal.name}</h3>
                    <div className="flex items-center gap-4 text-sm text-white/90">
                      <span className="flex items-center gap-1">
                        <Info className="w-4 h-4" />
                        {meal.calories} kcal
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {meal.time}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MealPlanner;
