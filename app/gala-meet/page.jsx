'use client';
import { JaaSMeeting } from '@jitsi/react-sdk';
import { JITSI_API_KEY } from '@/src/config/settings';
import { useSearchParams } from 'next/navigation';
import { sessionStorageFn } from '@/src/utils/fns/client';
import { decrypt } from '@/src/utils/fns/encryption';
import notificationService from '@/src/components/ui/notification/Notification';
import { useRouter } from 'next/navigation';
import { useUser } from '@/src/hooks/useUser';
import { apiPost } from '@/src/services/api_service';

const VideoConference = () => {

  const router = useRouter();
  const { user } = useUser();

  const appId = JITSI_API_KEY;
  const searchParams = useSearchParams();


  const userName = searchParams.get('name');
  const userEmail = searchParams.get('email');
  const jwtToken = sessionStorageFn.get('lessonToken');
  const isModerator = sessionStorageFn.get('isModerator');
  const lessonId = sessionStorageFn.get('lessonId');
  const room = sessionStorageFn.get('roomName');


  const decryptedUserName = decrypt(userName);
  const decryptedUserEmail = decrypt(userEmail);
  const decryptedJwtToken = decrypt(jwtToken);
  const decryptedRoomName = decrypt(room);
  const decryptedModerator = decrypt(isModerator);
  const decryptedLessonId = decrypt(lessonId);

  console.log("roomname:..", decryptedRoomName)


  const handleSendLessonId = (lessonId) => {
    apiPost('/complete-lesson', { 'lesson_id': lessonId });
  }


  return (
    <div className="w-screen h-screen p-4">
      {decryptedJwtToken?.token ? (
        <JaaSMeeting
          appId={appId}
          lang='en'
          roomName={decryptedRoomName}
          jwt={decryptedJwtToken?.token}
          configOverwrite={{
            prejoinPageEnabled: false,
            startWithAudioMuted: true,
            startWithVideoMuted: false,
            enableWelcomePage: false,
            enableClosePage: false,
            disableThirdPartyRequests: true,
            disableLocalVideoFlip: true,
            backgroundAlpha: 0.5,

            // Logo configuration (config.js options)
            defaultLogoUrl: '/gala_logo.png', // Your logo file in public folder
            toolbarButtons: [
              'microphone', 'camera', 'closedcaptions', 'desktop',
              'fullscreen', 'fodeviceselection', 'hangup', 'profile',
              'chat', 'recording', 'livestreaming', 'etherpad',
              'sharedvideo', 'settings', 'raisehand', 'videoquality',
              'filmstrip', 'feedback', 'stats', 'shortcuts',
              'tileview', 'select-background', 'download', 'help',
              'mute-everyone', 'security', 'whiteboard'
            ]
          }}
          interfaceConfigOverwrite={{
            DISABLE_JOIN_LEAVE_NOTIFICATIONS: true,
            MOBILE_APP_PROMO: false,
            HIDE_INVITE_MORE_HEADER: true,
            VIDEO_LAYOUT_FIT: 'nocrop',
            TILE_VIEW_MAX_COLUMNS: 3,

            // Brand watermark configuration
            SHOW_BRAND_WATERMARK: true,
            BRAND_WATERMARK_LINK: 'https://edu.galahub.org/', // Optional: URL when logo is clicked

            // Welcome page logo (if prejoin is enabled)
            DEFAULT_WELCOME_PAGE_LOGO_URL: '/gala_logo.png', // Place logo.svg in your public folder

            // Jitsi watermark settings
            SHOW_JITSI_WATERMARK: false, // Hide default Jitsi logo
            JITSI_WATERMARK_LINK: '', // Remove default Jitsi link

            TOOLBAR_BUTTONS: [
              'microphone', 'camera', 'closedcaptions', 'desktop',
              'fullscreen', 'fodeviceselection', 'hangup', 'profile',
              'chat', 'recording', 'livestreaming', 'etherpad',
              'sharedvideo', 'settings', 'raisehand', 'videoquality',
              'filmstrip', 'feedback', 'stats', 'shortcuts',
              'tileview', 'select-background', 'download', 'help',
              'mute-everyone', 'security', 'whiteboard'
            ]
          }}
          userInfo={{
            displayName: decryptedUserName,
            email: decryptedUserEmail,
          }}
          onApiReady={(externalApi) => {
            // Store API reference if needed
            console.log('Jitsi Meet API ready');

            externalApi.addListener('participantJoined', (participant) => {
              notificationService.info({
                message: "User joined",
                description: `${participant} joined the lesson meeting!`,
                duration: 3,
                position: "topRight",
                customStyle: {},
              });
            });

            externalApi.addListener('videoConferenceLeft', () => {
              if (user?.role == 'instructor') {
                router.replace('/instructor/live-classes');
              } else {
                router.replace('/student/live-lessons');
              }
            });
          }}
          getIFrameRef={(iframeRef) => {
            if (iframeRef) {
              iframeRef.style.height = '100%';
              iframeRef.style.width = '100%';
              iframeRef.style.border = 'none';
              iframeRef.style.borderRadius = '12px';
              iframeRef.style.overflow = 'hidden';
            }
          }}
        />
      ) : (
        <div>Unable to obtain authentication token</div>
      )}
    </div>
  );
};

export default VideoConference;