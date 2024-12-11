'use client'
import React, { useState, useEffect, useRef } from 'react';
import { 
  Input, 
  Card, 
  Dropdown, 
  Menu, 
  Checkbox, 
  Slider, 
  Empty, 
  Tag, 
  Divider, 
  Select,
  Button
} from 'antd';
import { 
  SearchOutlined, 
  FilterOutlined, 
  BookOutlined, 
  UserOutlined, 
  DollarOutlined,
  CloseOutlined 
} from '@ant-design/icons';

// Mock data - replace with your actual API call
const mockSearchData = {
  subjects: [
    { 
      id: 1, 
      name: 'Mathematics', 
      topics: ['Algebra', 'Geometry', 'Calculus'],
      teachers: [
        { id: 101, name: 'John Smith', price: 50 },
        { id: 102, name: 'Emily Johnson', price: 75 }
      ]
    },
    { 
      id: 2, 
      name: 'Computer Science', 
      topics: ['Web Development', 'Machine Learning', 'Cybersecurity'],
      teachers: [
        { id: 201, name: 'Michael Chen', price: 80 },
        { id: 202, name: 'Sarah Rodriguez', price: 65 }
      ]
    }
  ]
};

const AdvancedSearchComponent = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [filters, setFilters] = useState({
    subjects: [],
    topics: [],
    priceRange: [0, 200],
    teacherNames: []
  });
  const [activeFilters, setActiveFilters] = useState([]);

  const performSearch = () => {
    // Simulate search with filter logic
    const filteredResults = mockSearchData.subjects.filter(subject => {
      const matchesSearchTerm = subject.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesSubjectFilter = filters.subjects.length === 0 || 
        filters.subjects.includes(subject.name);
      const matchesTopicFilter = filters.topics.length === 0 || 
        subject.topics.some(topic => filters.topics.includes(topic));
      const matchesPriceFilter = subject.teachers.some(teacher => 
        teacher.price >= filters.priceRange[0] && 
        teacher.price <= filters.priceRange[1]
      );
      const matchesTeacherFilter = filters.teacherNames.length === 0 || 
        subject.teachers.some(teacher => 
          filters.teacherNames.includes(teacher.name)
        );

      return matchesSearchTerm && 
             matchesSubjectFilter && 
             matchesTopicFilter && 
             matchesPriceFilter && 
             matchesTeacherFilter;
    });

    setSearchResults(filteredResults);
  };

  useEffect(() => {
    performSearch();
  }, [searchTerm, filters]);

  const renderFilterDropdown = () => (
    <Menu className="p-4 w-[300px]">
      <div className="mb-4">
        <h4 className="font-bold mb-2 flex items-center">
          <BookOutlined className="mr-2 text-blue-500" /> Subjects
        </h4>
        <Checkbox.Group
          options={['Mathematics', 'Computer Science', 'Physics']}
          value={filters.subjects}
          onChange={(selected) => setFilters(prev => ({
            ...prev, 
            subjects: selected.map(String)
          }))}
        />
      </div>

      <Divider />

      <div className="mb-4">
        <h4 className="font-bold mb-2 flex items-center">
          <DollarOutlined className="mr-2 text-green-500" /> Price Range
        </h4>
        <Slider
          range
          min={0}
          max={200}
          value={filters.priceRange}
          onChange={(value) => setFilters(prev => ({
            ...prev, 
            priceRange: value
          }))}
        />
        <div className="text-center text-gray-500">
          ${filters.priceRange[0]} - ${filters.priceRange[1]}
        </div>
      </div>

      <Divider />

      <div>
        <h4 className="font-bold mb-2 flex items-center">
          <UserOutlined className="mr-2 text-purple-500" /> Teachers
        </h4>
        <Select
          mode="multiple"
          style={{ width: '100%' }}
          placeholder="Select Teachers"
          value={filters.teacherNames}
          onChange={(selected) => setFilters(prev => ({
            ...prev, 
            teacherNames: selected
          }))}
        >
          {mockSearchData.subjects.flatMap(subject => 
            subject.teachers.map(teacher => (
              <Select.Option key={teacher.id} value={teacher.name}>
                {teacher.name}
              </Select.Option>
            ))
          )}
        </Select>
      </div>
    </Menu>
  );

  const removeFilter = (filterType, value) => {
    switch(filterType) {
      case 'subject':
        setFilters(prev => ({
          ...prev, 
          subjects: prev.subjects.filter(s => s !== value)
        }));
        break;
      case 'teacherName':
        setFilters(prev => ({
          ...prev, 
          teacherNames: prev.teacherNames.filter(t => t !== value)
        }));
        break;
    }
  };

  const renderActiveFilters = () => (
    <div className="flex flex-wrap gap-2 mb-4">
      {filters.subjects.map(subject => (
        <Tag 
          key={subject} 
          color="blue" 
          closable 
          onClose={() => removeFilter('subject', subject)}
        >
          Subject: {subject}
        </Tag>
      ))}
      {filters.teacherNames.map(teacher => (
        <Tag 
          key={teacher} 
          color="purple" 
          closable 
          onClose={() => removeFilter('teacherName', teacher)}
        >
          Teacher: {teacher}
        </Tag>
      ))}
      {filters.priceRange[0] > 0 || filters.priceRange[1] < 200 ? (
        <Tag color="green">
          Price: ${filters.priceRange[0]} - ${filters.priceRange[1]}
        </Tag>
      ) : null}
    </div>
  );

  const renderSearchResults = () => {
    if (searchResults.length === 0) {
      return (
        <Empty 
          description="No results found" 
          className="my-8" 
        />
      );
    }

    return searchResults.map(subject => (
      <Card 
        key={subject.id} 
        className="mb-4 hover:shadow-lg transition-shadow"
        hoverable
      >
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-xl font-bold text-blue-600 mb-2">
              {subject.name}
            </h3>
            <div className="mb-2">
              <strong>Topics:</strong>
              <div className="flex flex-wrap gap-2 mt-1">
                {subject.topics.map(topic => (
                  <Tag key={topic} color="cyan">{topic}</Tag>
                ))}
              </div>
            </div>
            <div>
              <strong>Teachers:</strong>
              <div className="grid grid-cols-2 gap-2 mt-1">
                {subject.teachers.map(teacher => (
                  <Card 
                    key={teacher.id} 
                    size="small" 
                    className="bg-gray-50 hover:bg-blue-50 transition-colors"
                  >
                    <div className="flex justify-between items-center">
                      <span className="font-medium">{teacher.name}</span>
                      <Tag color="green">${teacher.price}/hr</Tag>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Card>
    ));
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <div className="mb-6 relative">
        <Input 
          size="large"
          placeholder="Search subjects, teachers, or topics..."
          prefix={<SearchOutlined />}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full"
          suffix={
            <Dropdown 
              overlay={renderFilterDropdown()} 
              trigger={['click']}
            >
              <Button 
                type="text" 
                icon={<FilterOutlined />} 
                className="text-gray-500 hover:text-blue-500"
              />
            </Dropdown>
          }
        />
      </div>

      {renderActiveFilters()}

      <div className="search-results">
        {renderSearchResults()}
      </div>
    </div>
  );
};

export default AdvancedSearchComponent;