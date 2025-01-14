'use client';

import { useState, useEffect, useRef } from 'react';

interface DropdownProps {
  label: string;
  options: string[];
  onSave?: (value: string) => void;
  createOptionStyle?: 'default' | 'icon' | 'divider' | 'icon-italic';
}

export default function DropdownWithReset({ label, options: initialOptions, onSave, createOptionStyle }: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [options, setOptions] = useState(initialOptions);
  const [filteredOptions, setFilteredOptions] = useState(options);
  const [pendingNewOption, setPendingNewOption] = useState<string | null>(null);
  const [isTyping, setIsTyping] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const selectedOptionRef = useRef<HTMLDivElement>(null);

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

  useEffect(() => {
    if (isOpen && selectedOption && selectedOptionRef.current) {
      selectedOptionRef.current.scrollIntoView({ behavior: 'auto', block: 'nearest' });
    }
  }, [isOpen, selectedOption]);

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
    setSelectedOption(option);
    setIsOpen(false);
    setIsTyping(false);
  };

  const handleCreateOption = () => {
    if (searchText && !options.includes(searchText)) {
      const newOption = `Create "${searchText}"`;
      setPendingNewOption(searchText);
      setSearchText(searchText);
      setSelectedOption(newOption);
      setIsOpen(false);
      setIsTyping(false);
    }
  };

  const handleSave = () => {
    if (pendingNewOption) {
      const newOptions = [...options, pendingNewOption];
      setOptions(newOptions);
      setSelectedOption(pendingNewOption);
      onSave?.(pendingNewOption);
      setPendingNewOption(null);
    } else if (searchText) {
      onSave?.(searchText);
    }
  };

  const hasExactMatch = options.some(
    option => option.toLowerCase() === searchText.toLowerCase()
  );

  const renderCreateOption = (style?: string) => {
    if (style === 'icon' || style === 'icon-italic') {
      return (
        <div className="flex items-center text-gray-900">
          <svg 
            className="w-4 h-4 mr-1.5"
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M12 4v16m8-8H4"
            />
          </svg>
          <span className={style === 'icon-italic' ? 'italic' : ''}>
            Create &quot;{searchText}&quot;
          </span>
        </div>
      );
    }
    return <>Create &quot;{searchText}&quot;</>;
  };

  return (
    <div className="w-full" ref={dropdownRef}>
      <label className="block text-base mb-1 text-gray-900">
        {label}
      </label>
      <div className="relative">
        <input
          ref={inputRef}
          type="text"
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#055456] text-base text-gray-900"
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
            className={`w-5 h-5 text-gray-900 transition-transform ${isOpen ? 'rotate-180' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {isOpen && (
          <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg">
            {createOptionStyle !== 'divider' && (
              <div className="max-h-60 overflow-auto">
                {filteredOptions.map((option, index) => (
                  <div
                    key={index}
                    ref={option === selectedOption ? selectedOptionRef : null}
                    className={`px-4 py-2 cursor-pointer text-base text-gray-900 ${
                      option === selectedOption 
                        ? 'border-2 border-[#6E9A9B]'
                        : 'hover:bg-[#E6EDED] hover:text-[#055456]'
                    }`}
                    onClick={() => handleOptionClick(option)}
                  >
                    {option}
                  </div>
                ))}
                {searchText && !hasExactMatch && (
                  <div
                    ref={`Create "${searchText}"` === selectedOption ? selectedOptionRef : null}
                    className={`px-4 py-2 cursor-pointer text-base text-gray-900 ${
                      `Create "${searchText}"` === selectedOption 
                        ? 'border-2 border-[#6E9A9B]'
                        : 'hover:bg-[#E6EDED] hover:text-[#055456]'
                    }`}
                    onClick={handleCreateOption}
                  >
                    {renderCreateOption(createOptionStyle)}
                  </div>
                )}
              </div>
            )}
            
            {createOptionStyle === 'divider' && (
              <>
                <div className="max-h-60 overflow-auto">
                  {filteredOptions.map((option, index) => (
                    <div
                      key={index}
                      ref={option === selectedOption ? selectedOptionRef : null}
                      className={`px-4 py-2 cursor-pointer text-base text-gray-900 ${
                        option === selectedOption 
                          ? 'border-2 border-[#6E9A9B]'
                          : 'hover:bg-[#E6EDED] hover:text-[#055456]'
                      }`}
                      onClick={() => handleOptionClick(option)}
                    >
                      {option}
                    </div>
                  ))}
                </div>
                {searchText && !hasExactMatch && (
                  <>
                    <div className="border-t border-gray-200 my-1"></div>
                    <div
                      ref={`Create "${searchText}"` === selectedOption ? selectedOptionRef : null}
                      className={`px-4 py-2 cursor-pointer text-base text-gray-900 ${
                        `Create "${searchText}"` === selectedOption 
                          ? 'border-2 border-[#6E9A9B]'
                          : 'hover:bg-[#E6EDED] hover:text-[#055456]'
                      }`}
                      onClick={handleCreateOption}
                    >
                      Create &quot;{searchText}&quot;
                    </div>
                  </>
                )}
              </>
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