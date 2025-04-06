import React from 'react';
import { Card, List, Avatar, Typography, Badge, Divider } from 'antd';
import { UserOutlined, CrownOutlined } from '@ant-design/icons';

export const ParticipantsSection = () => {
  const { Title } = Typography;
  
  // Dummy participants data
  const dummyParticipants = [
    { id: 1, first_name: 'John', last_name: 'Doe', isCreator: true },
    { id: 2, first_name: 'Jane', last_name: 'Smith', isCreator: false },
    { id: 3, first_name: 'Mike', last_name: 'Johnson', isCreator: false },
    { id: 4, first_name: 'Sarah', last_name: 'Williams', isCreator: false },
  ];

  return (
    <Card 
      title={
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Title level={5} style={{ margin: 0 }}>Participants</Title>
          <Badge count={dummyParticipants.length} style={{ backgroundColor: '#1890ff' }} />
        </div>
      }
      style={{ height: '100%' }}
    >
      <List
        dataSource={dummyParticipants}
        renderItem={(participant) => {
          const fullName = `${participant.first_name} ${participant.last_name}`;
          
          return (
            <>
              <List.Item>
                <List.Item.Meta
                  avatar={
                    <Badge dot color="green">
                      <Avatar 
                        icon={<UserOutlined />} 
                        style={{ 
                          backgroundColor: participant.isCreator ? '#faad14' : '#bfbfbf' 
                        }}
                      />
                    </Badge>
                  }
                  title={
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      {fullName}
                      {participant.isCreator && (
                        <CrownOutlined style={{ color: '#faad14', marginLeft: '8px' }} />
                      )}
                    </div>
                  }
                  description={participant.isCreator ? 'Room Creator' : 'Participant'}
                />
              </List.Item>
              <Divider style={{ margin: '4px 0' }} />
            </>
          );
        }}
      />
    </Card>
  );
};