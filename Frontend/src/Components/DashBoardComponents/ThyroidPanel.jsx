import React, { useState, useEffect } from 'react';
// import { format } from 'date-fns';

const ThyroidPanel = () => {
  const [values, setValues] = useState({
    tsh: 0,
    t3: 0,
    t4: 0,
    date: new Date().toISOString(),
  });

  useEffect(() => {
    const storedData = localStorage.getItem('thyroidPanel');
    if (storedData) {
      setValues(JSON.parse(storedData));
    }
  }, []);

  const handleSave = () => {
    const updatedValues = { ...values, date: new Date().toISOString() };
    setValues(updatedValues);
    localStorage.setItem('thyroidPanel', JSON.stringify(updatedValues));
  };

  const getStatus = (type) => {
    const ranges = {
      tsh: { min: 0.4, max: 4.0 },
      t3: { min: 2.3, max: 4.2 },
      t4: { min: 0.8, max: 1.8 },
    };
    const value = values[type];
    const range = ranges[type];

    if (value < range.min) return 'Low';
    if (value > range.max) return 'High';
    return 'Normal';
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Low':
        return 'text-blue-500';
      case 'High':
        return 'text-red-500';
      default:
        return 'text-green-500';
    }
  };

  return (
    <div className="space-y-8 animate-in">
      <div className="grid gap-6 md:grid-cols-2">
        <div className="bg-card p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-4">Update Thyroid Panel</h2>
          <div className="space-y-4">
            {['tsh', 't3', 't4'].map((type) => (
              <div key={type}>
                <label className="block text-sm font-medium text-muted-foreground mb-1">
                  {type.toUpperCase()} ({type === 'tsh' ? 'mIU/L' : type === 't3' ? 'pmol/L' : 'ng/dL'})
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={values[type]}
                  onChange={(e) => setValues({ ...values, [type]: Number(e.target.value) })}
                  className="w-full p-2 rounded-md border bg-background"
                />
              </div>
            ))}
            <button
              onClick={handleSave}
              className="w-full bg-primary text-primary-foreground py-2 rounded-md hover:bg-primary/90 transition-colors"
            >
              Save Results
            </button>
          </div>
        </div>

        <div className="bg-card p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-4">Current Results</h2>
          <div className="space-y-6">
            {['tsh', 't3', 't4'].map((type) => (
              <div key={type}>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-muted-foreground">{type.toUpperCase()}</span>
                  <span className={`font-medium ${getStatusColor(getStatus(type))}`}>
                    {getStatus(type)}
                  </span>
                </div>
                <div className="h-2 bg-secondary rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary transition-all duration-500"
                    style={{ width: `${(values[type] / (type === 'tsh' ? 10 : type === 't3' ? 6 : 3)) * 100}%` }}
                  />
                </div>
                <div className="mt-1 text-sm text-muted-foreground">
                  {values[type]} {type === 'tsh' ? 'mIU/L' : type === 't3' ? 'pmol/L' : 'ng/dL'}
                </div>
              </div>
            ))}
            <div className="text-sm text-muted-foreground text-center mt-4">
              Last updated: {format(new Date(values.date), 'MMM d, yyyy')}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThyroidPanel;
