'use client';

import DropdownWithReset from '../components/iteration1/DropdownWithReset';
import DropdownWithoutCreateAfterSelect from '../components/iteration1/DropdownWithoutCreateAfterSelect';
import DropdownWithAutoSave from '../components/iteration1/DropdownWithAutoSave';
import DropdownWithCaseSensitive from '../components/iteration1/DropdownWithCaseSensitive';


export default function Home() {
  const initialOptions = [
    'Apple',
    'Apricot',
    'Avocado',
    'Blackberry',
    'Cranberry',
    'Papaya'
  ];

  const handleSave = (newValue: string) => {
    console.log('New value saved:', newValue);
  };

  return (
    <div className="p-8 bg-white">
      <div className="max-w-2xl">
        <h1 className="text-2xl font-bold mb-8 text-gray-800">Iteration 1</h1>
        
        <div className="flex flex-col w-2/3">
          <div className="mb-16">
            <DropdownWithoutCreateAfterSelect 
              label="Label" 
              options={initialOptions}
              onSave={handleSave}
            />
          </div>
          
          <h2 className="text-xl font-bold mb-8 text-gray-800">Behavior Options</h2>
          
          <div className="flex flex-col gap-8">
            <DropdownWithReset 
              label="Dropdown_With_Create_After_Selection" 
              options={initialOptions}
              onSave={handleSave}
            />
            
            <DropdownWithAutoSave 
              label="Auto_Saved" 
              options={initialOptions}
              onSave={handleSave}
            />
            
            <DropdownWithCaseSensitive 
              label="Case_Sensitive" 
              options={initialOptions}
              onSave={handleSave}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
