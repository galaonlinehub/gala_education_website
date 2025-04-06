"use client"
import React, { useState, useEffect } from "react";
import { 
  Button, 
  Tooltip, 
  Drawer, 
  Space, 
  Badge, 
  Modal, 
  Avatar, 
  ConfigProvider,
  theme
} from "antd";
import { 
  AudioOutlined, 
  AudioMutedOutlined,
  VideoCameraOutlined, 
  VideoCameraAddOutlined,
  UsergroupAddOutlined,
  MessageOutlined,
  UploadOutlined,
  FileOutlined,
  DesktopOutlined,
  ExclamationCircleOutlined,
  CloseCircleOutlined
} from "@ant-design/icons";
import useControlStore from "@/src/store/video/contols";

const { useToken } = theme;

const ControlItem = ({ icon: Icon, activeIcon: ActiveIcon, label, active = true, onClick, danger = false, color }) => {
  const { token } = useToken();
  
  return (
    <Tooltip title={label} placement="top">
      <Button
        type={active ? "primary" : "default"}
        shape="circle"
        size="large"
        icon={active ? <Icon /> : ActiveIcon ? <ActiveIcon /> : <Icon />}
        onClick={onClick}
        danger={danger}
        style={{
          backgroundColor: color ? color : active ? token.colorPrimary : undefined,
          borderColor: color ? color : active ? token.colorPrimary : undefined,
          width: 50,
          height: 50,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      />
    </Tooltip>
  );
};

function BottomVideoControls({ toggleScreenShare, role, audioProducerRef, videoProducerRef }) {
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [drawerContent, setDrawerContent] = useState('');
  const { controls, setControlVisibility } = useControlStore();
  const [confirmEndVisible, setConfirmEndVisible] = useState(false);
  const { token } = useToken();

  const toggleAudio = () => {
    if (audioProducerRef.current) {
      const audioTrack = audioProducerRef.current.track;
      if (audioTrack) {
        audioTrack.enabled = !audioTrack.enabled;
        setControlVisibility("audio", audioTrack.enabled);
      }
    }
  };
  
  const toggleVideo = () => {
    if (videoProducerRef.current) {
      const videoTrack = videoProducerRef.current.track;
      if (videoTrack) {
        videoTrack.enabled = !videoTrack.enabled;
        setControlVisibility("video", videoTrack.enabled);
      }
    }
  };

  const showDrawer = (content) => {
    setDrawerContent(content);
    setDrawerVisible(true);
  };

  const closeDrawer = () => {
    setDrawerVisible(false);
  };

  const showEndConfirm = () => {
    setConfirmEndVisible(true);
  };

  return (
    <ConfigProvider
      theme={{
        components: {
          Button: {
            colorPrimaryHover: token.colorPrimaryActive,
          },
        },
      }}
    >
      <div className="fixed bottom-0 left-0 right-0 flex justify-center pb-4 z-50">
        <div className="bg-black bg-opacity-50 backdrop-blur-sm px-6 py-3 rounded-full flex items-center gap-3">
          <Space size="middle">
            <ControlItem
              icon={AudioOutlined}
              activeIcon={AudioMutedOutlined}
              label={controls.audio ? "Mute Audio" : "Unmute Audio"}
              active={controls.audio}
              onClick={toggleAudio}
              danger={!controls.audio}
            />
            
            <ControlItem
              icon={VideoCameraOutlined}
              activeIcon={VideoCameraAddOutlined}
              label={controls.video ? "Turn Off Camera" : "Turn On Camera"}
              active={controls.video}
              onClick={toggleVideo}
              danger={!controls.video}
            />
            
            <Badge dot={false} count={12} size="small">
              <ControlItem
                icon={UsergroupAddOutlined}
                label="Participants"
                active={controls.attendees}
                onClick={() => {
                  setControlVisibility("attendees", !controls.attendees);
                  setControlVisibility("chat", false);
                  if (!controls.attendees) showDrawer('attendees');
                  else closeDrawer();
                }}
              />
            </Badge>
            
            <Badge dot={true} count={3} size="small">
              <ControlItem
                icon={MessageOutlined}
                label="Chat"
                active={controls.chat}
                onClick={() => {
                  setControlVisibility("attendees", false);
                  setControlVisibility("chat", !controls.chat);
                  if (!controls.chat) showDrawer('chat');
                  else closeDrawer();
                }}
              />
            </Badge>
            
            {role === "instructor" && (
              <ControlItem
                icon={UploadOutlined}
                label="Share Screen"
                color="#52c41a"
                onClick={toggleScreenShare}
              />
            )}
            
            <ControlItem
              icon={FileOutlined}
              label="Materials"
              onClick={() => showDrawer('materials')}
            />
            
            {role === "instructor" && (
              <ControlItem
                icon={DesktopOutlined}
                label="Whiteboard"
                active={controls.board}
                onClick={() => {
                  setControlVisibility("board", !controls.board);
                  if (!controls.board) showDrawer('board');
                  else closeDrawer();
                }}
              />
            )}
            
            <ControlItem
              icon={ExclamationCircleOutlined}
              label="Raise Hand"
              active={false}
              onClick={() => {}}
            />
            
            {role === "instructor" && (
              <ControlItem
                icon={CloseCircleOutlined}
                label="End Meeting"
                color="#ff4d4f"
                onClick={showEndConfirm}
              />
            )}
          </Space>
        </div>
      </div>

      <Modal
        title="End Meeting"
        open={confirmEndVisible}
        onOk={() => setConfirmEndVisible(false)}
        onCancel={() => setConfirmEndVisible(false)}
        okText="End for All"
        cancelText="Cancel"
        okButtonProps={{ danger: true }}
      >
        <p>Are you sure you want to end this meeting for all participants?</p>
      </Modal>
    </ConfigProvider>
  );
}

export default BottomVideoControls;