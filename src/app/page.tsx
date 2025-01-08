'use client';

import DropdownWithReset from '../components/DropdownWithReset';
import DropdownWithoutCreateAfterSelect from '../components/DropdownWithoutCreateAfterSelect';
import DropdownWithAutoSave from '../components/DropdownWithAutoSave';
import DropdownWithCaseSensitive from '../components/DropdownWithCaseSensitive';

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
    // Here you would typically update your backend or state management
  };

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-2xl">
        <h1 className="text-2xl font-bold mb-8">Proposed Behavior</h1>
        
        <div className="flex flex-col w-2/3">
          <div className="mb-16">
            <DropdownWithoutCreateAfterSelect 
              label="Label" 
              options={initialOptions}
              onSave={handleSave}
            />
          </div>
          
          <h2 className="text-xl font-bold mb-8">Behavior Options</h2>
          
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
