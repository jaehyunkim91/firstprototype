'use client';

import { useState, useEffect, useRef } from 'react';

interface DropdownProps {
  label: string;
  options: string[];
  onSave?: (value: string) => void;
  onCancel?: () => void;
}

export default function DropdownWithReset({ label, options: initialOptions, onSave, onCancel }: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [options, setOptions] = useState(initialOptions);
  const [filteredOptions, setFilteredOptions] = useState(options);
  const [pendingNewOption, setPendingNewOption] = useState<string | null>(null);
  const [isTyping, setIsTyping] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setIsTyping(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (isTyping) {
      const filtered = options.filter(option => 
        option.toLowerCase().includes(searchText.toLowerCase())
      );
      setFilteredOptions(filtered);
    } else {
      setFilteredOptions(options);
    }
  }, [searchText, options, isTyping]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
    setIsOpen(true);
    setIsTyping(true);
  };

  const handleInputClick = () => {
    setIsOpen(true);
    setIsTyping(false);
    setFilteredOptions(options);
    if (inputRef.current) {
      inputRef.current.select();
    }
  };

  const handleOptionClick = (option: string) => {
    setSearchText(option);
    setIsOpen(false);
    setIsTyping(false);
  };

  const handleCreateOption = () => {
    if (searchText && !options.includes(searchText)) {
      setPendingNewOption(searchText);
      setSearchText(searchText);
      setIsOpen(false);
      setIsTyping(false);
    }
  };

  const handleSave = () => {
    if (pendingNewOption) {
      const newOptions = [...options, pendingNewOption];
      setOptions(newOptions);
      onSave?.(pendingNewOption);
      setPendingNewOption(null);
    } else if (searchText) {
      onSave?.(searchText);
    }
  };

  const hasExactMatch = options.some(
    option => option.toLowerCase() === searchText.toLowerCase()
  );

  return (
    <div className="w-full" ref={dropdownRef}>
      <label className="block text-base mb-1">
        {label}
      </label>
      <div className="relative">
        <input
          ref={inputRef}
          type="text"
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-base"
          placeholder="Search or create new"
          value={searchText}
          onChange={handleInputChange}
          onClick={handleInputClick}
        />
        <button
          className="absolute right-2 top-1/2 transform -translate-y-1/2"
          onClick={() => {
            setIsOpen(!isOpen);
            if (!isOpen) {
              setIsTyping(false);
              setFilteredOptions(options);
            }
          }}
        >
          <svg
            className={`w-5 h-5 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {isOpen && (
          <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-80 overflow-auto">
            {filteredOptions.map((option, index) => (
              <div
                key={index}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-base"
                onClick={() => handleOptionClick(option)}
              >
                {option}
              </div>
            ))}
            {searchText && !hasExactMatch && (
              <div
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-base"
                onClick={handleCreateOption}
              >
                Create "{searchText}"
              </div>
            )}
          </div>
        )}
      </div>
      <div className="flex justify-end mt-2">
        <button
          onClick={handleSave}
          className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 text-base"
        >
          Save
        </button>
      </div>
    </div>
  );
} 