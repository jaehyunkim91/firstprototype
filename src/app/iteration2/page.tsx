'use client';

import DropdownWithReset from '../../components/iteration2/DropdownWithReset';

export default function Iteration2() {
  const initialOptions = [
    'Apple',
    'Apricot',
    'Avocado',
    'Banana',
    'Blackberry',
    'Blueberry',
    'Cantaloupe',
    'Cherry',
    'Coconut',
    'Cranberry',
    'Dragon Fruit',
    'Fig',
    'Grape',
    'Guava',
    'Kiwi',
    'Lemon',
    'Lychee',
    'Mango',
    'Nectarine',
    'Orange',
    'Papaya',
    'Passion Fruit',
    'Peach',
    'Pear',
    'Pineapple',
    'Plum'
  ];

  const handleSave = (newValue: string) => {
    console.log('New value saved:', newValue);
  };

  return (
    <div className="p-8 bg-white">
      <div className="max-w-2xl">
        <h1 className="text-2xl font-bold mb-8 text-gray-800">Iteration 2</h1>
        
        <div className="flex flex-col w-2/3 space-y-8">
          <DropdownWithReset 
            label="Option 1: Default" 
            options={initialOptions}
            onSave={handleSave}
          />
          <DropdownWithReset 
            label="Option 2: Icon-only" 
            options={initialOptions}
            onSave={handleSave}
            createOptionStyle="icon"
          />
          <DropdownWithReset 
            label="Option 3: Divider" 
            options={initialOptions}
            onSave={handleSave}
            createOptionStyle="divider"
          />
          <DropdownWithReset 
            label="Option 4: Icon with Italic" 
            options={initialOptions}
            onSave={handleSave}
            createOptionStyle="icon-italic"
          />
        </div>
      </div>
    </div>
  );
} 