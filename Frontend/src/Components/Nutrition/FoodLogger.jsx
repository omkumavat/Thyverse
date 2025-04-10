import React, { useState } from 'react';
import { Plus, Search, Clock, ChevronDown, X } from 'lucide-react';
import { format } from 'date-fns';

const FoodLogger = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMeal, setSelectedMeal] = useState('breakfast');
  const [expandedMeal, setExpandedMeal] = useState(null);
  const [mealLogs, setMealLogs] = useState([]);
  const [showAddCustom, setShowAddCustom] = useState(false);
  const [newFoodItem, setNewFoodItem] = useState({
    name: '',
    calories: 0,
    protein: 0,
    carbs: 0,
    fats: 0,
    portion: '100g'
  });

  const mockFoodItems = [
    {
      id: '1',
      name: 'Chicken Breast',
      calories: 165,
      protein: 31,
      carbs: 0,
      fats: 3.6,
      portion: '100g'
    },
    {
      id: '2',
      name: 'Brown Rice',
      calories: 216,
      protein: 4.5,
      carbs: 45,
      fats: 1.8,
      portion: '100g'
    },
  ];

  const meals = ['breakfast', 'lunch', 'dinner', 'snacks'];

  const toggleMeal = (meal) => {
    setExpandedMeal(expandedMeal === meal ? null : meal);
  };

  const addFoodToMeal = (food, mealType) => {
    const newLog = {
      id: Math.random().toString(36).substr(2, 9),
      mealType,
      foodItem: food,
      portions: 1
    };
    setMealLogs([...mealLogs, newLog]);
    setExpandedMeal(null);
  };

  const removeFoodFromMeal = (logId) => {
    setMealLogs(mealLogs.filter((log) => log.id !== logId));
  };

  const getMealCalories = (mealType) => {
    return mealLogs
      .filter((log) => log.mealType === mealType)
      .reduce((total, log) => total + log.foodItem.calories * log.portions, 0);
  };

  const handleAddCustomFood = () => {
    const customFood = {
      id: Math.random().toString(36).substr(2, 9),
      ...newFoodItem
    };
    mockFoodItems.push(customFood);
    setShowAddCustom(false);
    setNewFoodItem({
      name: '',
      calories: 0,
      protein: 0,
      carbs: 0,
      fats: 0,
      portion: '100g'
    });
  };

  const filteredFoodItems = mockFoodItems.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <div className="space-y-6 mt-16">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white">Food Logger</h1>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mb-6">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search foods..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-gray-700 dark:text-white"
                  />
                </div>
                <button
                  onClick={() => setShowAddCustom(true)}
                  className="bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-lg flex items-center gap-2 justify-center"
                >
                  <Plus className="w-5 h-5" />
                  <span>Add Custom</span>
                </button>
              </div>
              {showAddCustom && (
                <div className="mb-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-medium">Add Custom Food</h3>
                    <button onClick={() => setShowAddCustom(false)} className="text-gray-500">
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <input
                      type="text"
                      placeholder="Food name"
                      value={newFoodItem.name}
                      onChange={(e) => setNewFoodItem({ ...newFoodItem, name: e.target.value })}
                      className="rounded-lg border border-gray-300 p-2"
                    />
                    <input
                      type="number"
                      placeholder="Calories"
                      value={newFoodItem.calories}
                      onChange={(e) => setNewFoodItem({ ...newFoodItem, calories: Number(e.target.value) })}
                      className="rounded-lg border border-gray-300 p-2"
                    />
                    <input
                      type="number"
                      placeholder="Protein (g)"
                      value={newFoodItem.protein}
                      onChange={(e) => setNewFoodItem({ ...newFoodItem, protein: Number(e.target.value) })}
                      className="rounded-lg border border-gray-300 p-2"
                    />
                    <input
                      type="number"
                      placeholder="Carbs (g)"
                      value={newFoodItem.carbs}
                      onChange={(e) => setNewFoodItem({ ...newFoodItem, carbs: Number(e.target.value) })}
                      className="rounded-lg border border-gray-300 p-2"
                    />
                    <input
                      type="number"
                      placeholder="Fats (g)"
                      value={newFoodItem.fats}
                      onChange={(e) => setNewFoodItem({ ...newFoodItem, fats: Number(e.target.value) })}
                      className="rounded-lg border border-gray-300 p-2"
                    />
                    <input
                      type="text"
                      placeholder="Portion (e.g., 100g)"
                      value={newFoodItem.portion}
                      onChange={(e) => setNewFoodItem({ ...newFoodItem, portion: e.target.value })}
                      className="rounded-lg border border-gray-300 p-2"
                    />
                  </div>
                  <button
                    onClick={handleAddCustomFood}
                    className="mt-4 bg-primary text-white px-4 py-2 rounded-lg"
                  >
                    Add Food
                  </button>
                </div>
              )}
              <div className="space-y-4">
                {filteredFoodItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors gap-4"
                  >
                    <div>
                      <h3 className="font-medium text-gray-900 dark:text-white">{item.name}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-300">{item.portion}</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <p className="font-medium text-gray-900 dark:text-white">{item.calories} kcal</p>
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                          P: {item.protein}g | C: {item.carbs}g | F: {item.fats}g
                        </p>
                      </div>
                      <button
                        onClick={() => addFoodToMeal(item, selectedMeal)}
                        className="bg-primary text-white p-2 rounded-lg"
                      >
                        <Plus className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="space-y-6">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
              <div className="flex items-center gap-2 mb-4">
                <Clock className="w-5 h-5 text-primary" />
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Today's Log</h2>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                {format(new Date(), 'EEEE, MMMM d, yyyy')}
              </p>
              <div className="space-y-4">
                {meals.map((meal) => (
                  <div key={meal} className="space-y-2">
                    <button
                      onClick={() => toggleMeal(meal)}
                      className={`w-full text-left p-4 rounded-lg transition-colors flex items-center justify-between ${
                        selectedMeal === meal
                          ? 'bg-primary text-white'
                          : 'bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-600'
                      }`}
                    >
                      <div>
                        <h3 className="font-medium capitalize">{meal}</h3>
                        <p className="text-sm opacity-90">{getMealCalories(meal)} kcal</p>
                      </div>
                      <ChevronDown
                        className={`w-5 h-5 transform transition-transform ${
                          expandedMeal === meal ? 'rotate-180' : ''
                        }`}
                      />
                    </button>
                    {expandedMeal === meal && (
                      <div className="pl-4 space-y-2">
                        {mealLogs
                          .filter((log) => log.mealType === meal)
                          .map((log) => (
                            <div
                              key={log.id}
                              className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-700 rounded"
                            >
                              <div>
                                <p className="font-medium">{log.foodItem.name}</p>
                                <p className="text-sm text-gray-600 dark:text-gray-300">
                                  {log.foodItem.calories * log.portions} kcal
                                </p>
                              </div>
                              <button
                                onClick={() => removeFoodFromMeal(log.id)}
                                className="text-red-500 hover:text-red-700"
                              >
                                <X className="w-4 h-4" />
                              </button>
                            </div>
                          ))}
                        <button
                          className="w-full p-2 text-left text-sm text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600 rounded"
                          onClick={() => setSelectedMeal(meal)}
                        >
                          + Add food to {meal}
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FoodLogger;
