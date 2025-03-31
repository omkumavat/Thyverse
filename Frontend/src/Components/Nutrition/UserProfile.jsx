import React from 'react';
import { useForm } from 'react-hook-form';
import { User, Scale, Activity, Target } from 'lucide-react';

const UserProfile = () => {
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    // TODO: Handle form submission
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
        <User className="w-8 h-8 text-primary" />
        Profile Settings
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
              Age
            </label>
            <input
              type="number"
              {...register('age', { required: true })}
              className="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2 text-gray-900 dark:text-gray-100 focus:border-primary focus:ring-2 focus:ring-primary focus:ring-opacity-50"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
              Gender
            </label>
            <select
              {...register('gender', { required: true })}
              className="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2 text-gray-900 dark:text-gray-100 focus:border-primary focus:ring-2 focus:ring-primary focus:ring-opacity-50"
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
              <Scale className="w-4 h-4 inline mr-1" />
              Height (cm)
            </label>
            <input
              type="number"
              {...register('height', { required: true })}
              className="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2 text-gray-900 dark:text-gray-100 focus:border-primary focus:ring-2 focus:ring-primary focus:ring-opacity-50"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
              <Scale className="w-4 h-4 inline mr-1" />
              Weight (kg)
            </label>
            <input
              type="number"
              {...register('weight', { required: true })}
              className="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2 text-gray-900 dark:text-gray-100 focus:border-primary focus:ring-2 focus:ring-primary focus:ring-opacity-50"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
              <Activity className="w-4 h-4 inline mr-1" />
              Activity Level
            </label>
            <select
              {...register('activityLevel', { required: true })}
              className="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2 text-gray-900 dark:text-gray-100 focus:border-primary focus:ring-2 focus:ring-primary focus:ring-opacity-50"
            >
              <option value="1.2">Sedentary</option>
              <option value="1.375">Lightly Active</option>
              <option value="1.55">Moderately Active</option>
              <option value="1.725">Very Active</option>
              <option value="1.9">Extra Active</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
              <Target className="w-4 h-4 inline mr-1" />
              Goal
            </label>
            <select
              {...register('goal', { required: true })}
              className="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2 text-gray-900 dark:text-gray-100 focus:border-primary focus:ring-2 focus:ring-primary focus:ring-opacity-50"
            >
              <option value="weight-loss">Weight Loss</option>
              <option value="maintenance">Maintenance</option>
              <option value="muscle-gain">Muscle Gain</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
            Dietary Restrictions
          </label>
          <div className="mt-2 space-y-2">
            {['vegetarian', 'vegan', 'gluten-free', 'dairy-free', 'nut-free'].map((restriction) => (
              <div key={restriction} className="flex items-center">
                <input
                  type="checkbox"
                  {...register('dietaryRestrictions')}
                  value={restriction}
                  className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                />
                <label className="ml-2 block text-sm text-gray-700 dark:text-gray-200 capitalize">
                  {restriction}
                </label>
              </div>
            ))}
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-primary text-white py-2 px-4 rounded-md hover:bg-primary-dark transition-colors"
        >
          Save Profile
        </button>
      </form>
    </div>
  );
};

export default UserProfile;
