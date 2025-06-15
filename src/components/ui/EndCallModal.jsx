'use client';
import React, { useState } from 'react';
import { Modal, Button, Typography, Space, Avatar } from 'antd';
import { LuPhoneOff, LuUserSearch } from 'react-icons/lu';
import { BsClock } from 'react-icons/bs';
import { FiAlertTriangle } from 'react-icons/fi';


const { Title, Text } = Typography;

const EndCallModal = ({ 
  isOpen, 
  onClose, 
  onConfirm, 
  participantCount = 3,
  duration = "25:43" 
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleConfirm = async () => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    onConfirm();
    setIsLoading(false);
  };

  return (
    <Modal
      open={isOpen}
      onCancel={onClose}
      footer={null}
      centered
      width={420}
      closable={false}
      maskStyle={{
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        backdropFilter: 'blur(8px)',
      }}
      styles={{
        content: {
          borderRadius: '20px',
          padding: 0,
          overflow: 'hidden',
        }
      }}
    >
      {/* Custom Content */}
      <div className="relative">
        {/* Header with gradient background */}
        <div className="bg-gradient-to-br from-red-50 to-orange-50 p-8 text-center">
          {/* Icon with animated ring */}
          <div className="relative inline-flex items-center justify-center mb-6">
            <div className="absolute inset-0 bg-red-100 rounded-full animate-pulse" />
            <div className="relative bg-gradient-to-br from-red-500 to-red-600 p-4 rounded-full shadow-lg">
              <LuPhoneOff size={32} className="text-white" />
            </div>
          </div>

          <Title level={3} className="mb-2 text-gray-800">
            End Call Session?
          </Title>
          
          <Text className="text-gray-600 text-base">
            Are you sure you want to leave this lesson? Other participants will remain in the session.
          </Text>
        </div>

        {/* Body with session info */}
        <div className="p-6 bg-white">
         
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6">
            <div className="flex items-start space-x-3">
              <FiAlertTriangle size={18} className="text-amber-600 mt-0.5 flex-shrink-0" />
              <div>
                <Text className="text-sm text-amber-800 font-medium block mb-1">
                  Important Note
                </Text>
                <Text className="text-sm text-amber-700">
                  Once you leave, you'll be autmatically ending the lesson and marking it as completed.
                </Text>
              </div>
            </div>
          </div>

          {/* Action buttons */}
          <Space className="w-full" direction="vertical" size="middle">
            <Button
              type="primary"
              danger
              size="large"
              block
              loading={isLoading}
              onClick={handleConfirm}
              className="h-12 font-semibold text-base rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
              style={{
                background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
                borderColor: 'transparent',
              }}
            >
              {isLoading ? 'Ending Call...' : 'Yes, End Call'}
            </Button>
            
            <Button
              size="large"
              block
              onClick={onClose}
              className="h-12 font-semibold text-base rounded-xl border-2 hover:border-blue-400 hover:text-blue-600 transition-all duration-200"
            >
              Cancel, Return to call
            </Button>
          </Space>
        </div>
      </div>
    </Modal>
  );
};

export default EndCallModal;