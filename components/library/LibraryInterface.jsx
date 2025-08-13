'use client';
import { BookOutlined, FileTextOutlined, ReadOutlined, CloudDownloadOutlined, MobileOutlined, SearchOutlined } from '@ant-design/icons';
import { Typography, Card, Space, Tag, Row, Col, Divider, Button } from 'antd';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import React, { useEffect, useState } from 'react';

import Animator from '../home/animations/Animator';

const { Title, Paragraph, Text } = Typography;

const LibraryInterface = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const libt = useTranslations('library');

  const features = [
    {
      icon: <BookOutlined style={{ fontSize: '24px', color: '#722ed1' }} />,
      title: libt('ebooks_collection'),
      description: libt('thousands_of_digital_books')
    },

    {
      icon: <MobileOutlined style={{ fontSize: '24px', color: '#722ed1' }} />,
      title: libt('cross_device_access'),
      description: libt('access_your_library_from_any_device')
    }
  ];


  const benefits = [
    {
      icon: <ReadOutlined style={{ fontSize: '32px', color: '#722ed1' }} />,
      title: libt('learn_faster'),
      description: libt('advanced_search_algorithms')
    },
    {
      icon: <CloudDownloadOutlined style={{ fontSize: '32px', color: '#722ed1' }} />,
      title: libt('access_anywhere'),
      description: libt('cloud_based_platform')
    },
    {
      icon: <BookOutlined style={{ fontSize: '32px', color: '#722ed1' }} />,
      title: libt('organized_content'),
      description: libt('smart_categorization')
    }
  ];


  return (
    <div className="min-h-screen bg-gradient-to-br  py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <Animator delay={0.2} direction="top">
            <Tag color="purple" className="mb-4 px-4 py-1 text-sm font-medium">
              {libt('coming_soon')}
            </Tag>
          </Animator>

          <Animator delay={0.3} direction="bottom">
            <Title level={1} className="!text-4xl !mb-6">
              {libt('your_digital_library')}
              <br />
            </Title>
          </Animator>

          <Animator delay={0.4} direction="bottom">
            <div className="max-w-4xl mx-auto mb-8">
              <Paragraph className="text-sm md:text-base text-gray-700 leading-relaxed">
                {libt('say_goodbye_to_limitations')}
              </Paragraph>

              <Text className="text-lg font-semibold" style={{ color: '#722ed1' }}>
                {libt('stay_tuned')}
              </Text>
            </div>
          </Animator>


        </div>

        {/* Main Image and Stats */}
        <Row gutter={[48, 48]} align="middle" className="mb-16">
          <Col xs={24} lg={14}>
            <Animator delay={0.4} direction="left">
              <div
                className="relative w-full max-w-2xl mx-auto"
                style={{
                  height: '500px',
                  animation: isVisible ? 'subtleBounce 3s ease-in-out infinite' : 'none'
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-purple-200 to-indigo-200 rounded-3xl blur-3xl opacity-30 transform rotate-6"></div>
                <div className="relative z-10 h-full">
                  <Image
                    src='/read-min.png'
                    alt='Online Library'
                    fill
                    className='object-contain drop-shadow-2xl'
                    sizes='(max-width: 640px) 90vw, (max-width: 768px) 80vw, (max-width: 1024px) 45vw, 40vw'
                    priority
                  />
                </div>
              </div>
            </Animator>
          </Col>

          <Col xs={24} lg={10}>
            <Animator delay={0.4} direction="right">
              <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
                <Title level={3} className="!mb-6 text-center">
                  {libt('why_digital_libraries_matter')}
                </Title>
                <Space direction="vertical" size="large" className="w-full">
                  {benefits.map((benefit, index) => (
                    <div key={index} className="flex items-start space-x-4 p-4 bg-gradient-to-r from-purple-50 to-indigo-50 rounded-lg">
                      <div className="flex-shrink-0 p-2 bg-white rounded-lg shadow-sm">
                        {benefit.icon}
                      </div>
                      <div>
                        <Title level={5} className="!mb-2">
                          {benefit.title}
                        </Title>
                        <Paragraph className="!mb-0 text-gray-600">
                          {benefit.description}
                        </Paragraph>
                      </div>
                    </div>
                  ))}
                </Space>
              </Card>
            </Animator>
          </Col>
        </Row>

        {/* Features Section */}
        <Animator delay={0.4} direction="bottom">
          <div className="mb-16">
            <Title level={2} className="text-center !mb-12">
              {libt('why_choose_our_digital_library')}
            </Title>

            <Row gutter={[32, 32]}>
              {features.map((feature, index) => (
                <Col xs={24} sm={12} lg={12} key={index}>
                  <Card
                    className="h-full text-center shadow-lg hover:shadow-xl transition-all duration-300 border-0 bg-white/70 backdrop-blur-sm hover:transform hover:scale-105"
                    bodyStyle={{ padding: '32px 24px' }}
                  >
                    <div className="mb-4 p-4 bg-gradient-to-br from-purple-50 to-indigo-50 rounded-full inline-block">
                      {feature.icon}
                    </div>
                    <Title level={4} className="!mb-3">
                      {feature.title}
                    </Title>
                    <Paragraph className="text-gray-600 !mb-0">
                      {feature.description}
                    </Paragraph>
                  </Card>
                </Col>
              ))}
            </Row>
          </div>
        </Animator>

        {/* Content Categories Section */}
        <Animator delay={0.4} direction="bottom">
          <Card className="shadow-xl border-0 bg-gradient-to-r from-purple-50 to-indigo-50">
            <Title level={2} className="text-center !mb-8">
              {libt('discover_content_categories')}
            </Title>
            <Row gutter={[24, 24]}>
              <Col xs={24} sm={12} md={8}>
                <div className="text-center p-6">
                  <div className="mb-4 p-4 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full inline-block">
                    <BookOutlined style={{ fontSize: '32px', color: '#1890ff' }} />
                  </div>
                  <Title level={4}>Academic Resources</Title>
                  <Paragraph className="text-gray-600">
                    {libt('research_papers_description')}
                  </Paragraph>
                </div>
              </Col>
              <Col xs={24} sm={12} md={8}>
                <div className="text-center p-6">
                  <div className="mb-4 p-4 bg-gradient-to-br from-green-100 to-green-200 rounded-full inline-block">
                    <ReadOutlined style={{ fontSize: '32px', color: '#52c41a' }} />
                  </div>
                  <Title level={4}>{libt('digital_books')}</Title>
                  <Paragraph className="text-gray-600">
                    {libt('books_variety')}
                  </Paragraph>
                </div>
              </Col>
              <Col xs={24} sm={12} md={8}>
                <div className="text-center p-6">
                  <div className="mb-4 p-4 bg-gradient-to-br from-orange-100 to-orange-200 rounded-full inline-block">
                    <FileTextOutlined style={{ fontSize: '32px', color: '#fa8c16' }} />
                  </div>
                  <Title level={4}>{libt('learning_materials')}</Title>
                  <Paragraph className="text-gray-600">
                    {libt('guides_tutorials')}
                  </Paragraph>
                </div>
              </Col>
            </Row>
          </Card>
        </Animator>

        {/* CTA Section */}
        <Animator delay={0.6} direction="bottom">
          <div className="text-center mt-16 p-12 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-3xl text-white">
            <div className="!text-white !mb-4 text-lg md:text-xl lg:text-2xl font-semibold">
              {libt('ready_to_transform_your_learning')}
            </div>
            <Paragraph className="text-sm !text-purple-100 !mb-8 max-w-2xl mx-auto">
              {libt('experience_future_digital_libraries')}
            </Paragraph>

          </div>
        </Animator>
      </div>

      <style jsx>{`
        @keyframes subtleBounce {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }
      `}</style>
    </div>
  );
};

export default LibraryInterface;