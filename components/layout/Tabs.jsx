import React, { useState } from 'react';

const GalaTabs = () => {
  const [activeTab, setActiveTab] = useState(0);

  const tabs = [
    {
      key: 'tab1',
      label: 'Tab 1',
      content: 'Content of Tab 1'
    },
    {
      key: 'tab2',
      label: 'Tab 2',
      content: 'Content of Tab 2'
    },
    {
      key: 'tab3',
      label: 'Tab 3',
      content: 'Content of Tab 3'
    }
  ];

  const TabPane = ({ children, isActive }) => (
    <div className={`${isActive ? 'block' : 'hidden'} p-4`}>
      {children}
    </div>
  );

  return (
    <div className="w-full max-w-3xl p-4">
      {/* Tab Headers */}
      <div className="relative">
        {/* Bottom border container */}
        <div className="absolute rounded-sm bottom-0 w-full h-2 bg-gray-300"></div>
        <nav className="relative flex justify-around">
          {tabs.map((tab, index) => (
            <div key={tab.key} className="relative">
              <button
                onClick={() => setActiveTab(index)}
                className={`
                  relative py-4 px-8 text-sm font-medium
                  ${
                    activeTab === index
                      ? 'text-blue-600'
                      : 'text-gray-500 hover:text-gray-700'
                  }
                  focus:outline-none focus:text-blue-800
                  transition-colors duration-200
                `}
              >
                {tab.label}
                {/* Active indicator */}
                {activeTab === index && (
                  <div className="absolute bottom-0 left-0 right-0 h-2 bg-[#010798] rounded-sm"></div>
                )}
              </button>
            </div>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      <div className="mt-4">
        {tabs.map((tab, index) => (
          <TabPane key={tab.key} isActive={activeTab === index}>
            {tab.content}
          </TabPane>
        ))}
      </div>
    </div>
  );
};

export default GalaTabs;