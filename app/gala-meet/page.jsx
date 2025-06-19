
'use client';
import { JaaSMeeting } from '@jitsi/react-sdk';
import { JITSI_API_KEY } from '@/src/config/settings';
import { useSearchParams } from 'next/navigation';
import { sessionStorageFn } from '@/src/utils/fns/client';
import { decrypt } from '@/src/utils/fns/encryption';
import notificationService from '@/src/components/ui/notification/Notification';
import { useRouter } from 'next/navigation';
import { useUser } from '@/src/hooks/useUser';
import { apiPost } from '@/src/services/api/api_service';
import { LuBell, LuBellRing, LuBrain } from 'react-icons/lu';
import EndCallModal from '@/src/components/ui/EndCallModal';
import { useState, useRef, useEffect } from 'react';

const VideoConference = () => {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [pendingHangup, setPendingHangup] = useState(false);
  const externalApiRef = useRef(null);

  const router = useRouter();
  const { user } = useUser();

  const appId = JITSI_API_KEY;
  const searchParams = useSearchParams();

  const userName = searchParams.get("name");
  const userEmail = searchParams.get("email");
  const jwtToken = sessionStorageFn.get("lessonToken");
  const isModerator = sessionStorageFn.get("isModerator");
  const lessonId = sessionStorageFn.get("lessonId");
  const room = sessionStorageFn.get("roomName");

  const decryptedUserName = decrypt(userName);
  const decryptedUserEmail = decrypt(userEmail);
  const decryptedJwtToken = decrypt(jwtToken);
  const decryptedRoomName = decrypt(room);
  const decryptedModerator = decrypt(isModerator);
  const decryptedLessonId = decrypt(lessonId);

  console.log("roomname:..", decryptedRoomName);

  const handleSendLessonId = (lessonId) => {
    apiPost("/complete-lesson", { lesson_id: lessonId });
  };

  const handleEndCall = () => {
    if (pendingHangup && externalApiRef.current) {
      // Actually end the call now
      externalApiRef.current.executeCommand("hangup");
      setPendingHangup(false);
    }

    if (user?.role == "instructor") {
      router.replace("/instructor/live-classes");
    } else {
      router.replace("/student/live-lessons");
    }
  };

  const handleCancelEndCall = () => {
    setIsModalOpen(false);
    setPendingHangup(false);
    window.location.reload();
  };

  // Handle before unload (when user closes tab/browser)
  const handleBeforeUnload = () => {
    const isModerator =
      decryptedModerator === "true" || user?.role === "instructor";

    if (isModerator && externalApiRef.current) {
      // End conference for all participants when moderator closes tab
      externalApiRef.current.executeCommand("endConference");
    }
  };

  // Function to intercept hangup attempts
  const interceptHangup = () => {
    setPendingHangup(true);
    setIsModalOpen(true);
    return false; // Prevent the default hangup action
  };

  useEffect(() => {
    // Add global click listener to intercept hangup button clicks
    const handleToolbarClick = (event) => {
      // Check if the clicked element or its parent is the hangup button
      const target = event.target;
      const hangupButton =
        target.closest('[data-testid="hangup"]') ||
        target.closest('.toolbox-button[aria-label*="Leave"]') ||
        target.closest('.toolbox-button[aria-label*="Hang up"]') ||
        target.closest(".hangup-button") ||
        (target.classList.contains("toolbox-button") &&
          target.getAttribute("aria-label")?.includes("Leave"));

      if (hangupButton && !pendingHangup) {
        event.preventDefault();
        event.stopPropagation();
        interceptHangup();
      }
    };

    // Use capture phase to intercept before Jitsi handles the click
    document.addEventListener("click", handleToolbarClick, true);

    return () => {
      document.removeEventListener("click", handleToolbarClick, true);
    };
  }, [pendingHangup]);

  const handleEndCall = () => {
    if (pendingHangup && externalApiRef.current) {
      // Actually end the call now
      externalApiRef.current.executeCommand('hangup');
      setPendingHangup(false);
    }

    if (user?.role == 'instructor') {
      router.replace('/instructor/live-classes');
    } else {
      router.replace('/student/live-lessons');
    }
  }

  const handleCancelEndCall = () => {
    setIsModalOpen(false);
    setPendingHangup(false);
    window.location.reload();
  }


  // Handle before unload (when user closes tab/browser)
  const handleBeforeUnload = () => {
    const isModerator = decryptedModerator === 'true' || user?.role === 'instructor';

    if (isModerator && externalApiRef.current) {
      // End conference for all participants when moderator closes tab
      externalApiRef.current.executeCommand('endConference');
    }
  }

  // Function to intercept hangup attempts
  const interceptHangup = () => {
    setPendingHangup(true);
    setIsModalOpen(true);
    return false; // Prevent the default hangup action
  }

  useEffect(() => {
    // Add global click listener to intercept hangup button clicks
    const handleToolbarClick = (event) => {
      // Check if the clicked element or its parent is the hangup button
      const target = event.target;
      const hangupButton = target.closest('[data-testid="hangup"]') ||
        target.closest('.toolbox-button[aria-label*="Leave"]') ||
        target.closest('.toolbox-button[aria-label*="Hang up"]') ||
        target.closest('.hangup-button') ||
        (target.classList.contains('toolbox-button') && target.getAttribute('aria-label')?.includes('Leave'));

      if (hangupButton && !pendingHangup) {
        event.preventDefault();
        event.stopPropagation();
        interceptHangup();
      }
    };

    // Use capture phase to intercept before Jitsi handles the click
    document.addEventListener('click', handleToolbarClick, true);

    return () => {
      document.removeEventListener('click', handleToolbarClick, true);
    };
  }, [pendingHangup]);

  return (
    <div className="w-screen h-screen p-4">
      {decryptedJwtToken?.token ? (
        <JaaSMeeting
          appId={appId}
          lang="en"
          roomName={`${decryptedRoomName}-${decryptedLessonId}`}
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

            toolbarButtons: [
              "microphone",
              "whiteboard",
              "camera",
              "closedcaptions",
              "desktop",
              "fullscreen",
              "fodeviceselection",
              "hangup",
              "profile",
              "chat",
              "recording",
              "livestreaming",
              "etherpad",
              "sharedvideo",
              "settings",
              "raisehand",
              "videoquality",
              "filmstrip",
              "feedback",
              "stats",
              "shortcuts",
              "tileview",
              "select-background",
              "download",
              "help",
              "mute-everyone",
            ],
          }}
          interfaceConfigOverwrite={{
            DISABLE_JOIN_LEAVE_NOTIFICATIONS: true,
            MOBILE_APP_PROMO: false,
            HIDE_INVITE_MORE_HEADER: true,
            VIDEO_LAYOUT_FIT: "nocrop",
            TILE_VIEW_MAX_COLUMNS: 3,
            TOOLBAR_ALWAYS_VISIBLE: false,
            TOOLBAR_TIMEOUT: 4000,
          }}
          userInfo={{
            displayName: decryptedUserName,
            email: decryptedUserEmail,

            moderator: decryptedModerator === 'true' || user?.role === 'instructor'
          }}
          onApiReady={(externalApi) => {
            // Store the API reference for later use
            externalApiRef.current = externalApi;

            // Override the hangup command to show confirmation first

            const originalExecuteCommand = externalApi.executeCommand.bind(externalApi);
            externalApi.executeCommand = (command, ...args) => {
              if (command === 'hangup' && !pendingHangup) {
                interceptHangup();
                return;
              }
              return originalExecuteCommand(command, ...args);
            };


            externalApi.addListener('participantJoined', (participant) => {
              console.log('Participant joined:', participant);

              const isModerator = decryptedModerator === 'true' || user?.role === 'instructor';

              if (isModerator) {
                const participantName = participant.displayName || 'Unknown User';


                notificationService.info({
                  message: "User joined",
                  description: `${participantName} joined the lesson meeting!`,
                  duration: 3,
                  position: "topRight",
                  icon: <LuBellRing size={18} />,
                  customStyle: {
                    paddingLeft: "8px",
                    backgroundColor: '#001840',
                    color: "white"
                  }
                });



              }
            });

            externalApi.addListener('participantLeft', (participant) => {
              const isModerator = decryptedModerator === 'true' || user?.role === 'instructor';

              if (isModerator) {
                const student = participant.displayName || 'A student';

                if (!participant.moderator) {
                  notificationService.info({
                    message: "User left",
                    description: `${student} left the lesson meeting!`,
                    duration: 3,
                    icon: <LuBellRing size={18} />,
                    position: "topRight",
                    customStyle: {
                      paddingLeft: "8px",

                      backgroundColor: '#001840',
                      color: "white"
                    }
                  });
                }
              }
            });

            externalApi.addListener('videoConferenceLeft', () => {
              if (user?.role == 'instructor' && !pendingHangup) {
                setIsModalOpen(true);
              } else {
                router.replace("/student/live-lessons");
              }

            });

            // Listen for when the conference ends (for all participants)
            externalApi.addListener('videoConferenceEnded', () => {
              console.log('Conference ended by moderator');
              if (!pendingHangup) {
                setIsModalOpen(true);
              }
            });


            // Add beforeunload event listener for moderator
            const isModerator = decryptedModerator === 'true' || user?.role === 'instructor';
            if (isModerator) {
              window.addEventListener('beforeunload', handleBeforeUnload);
            }

            setTimeout(() => {
              externalApi.executeCommand("toggleToolbox");
            }, 1000);
          }}
          getIFrameRef={(iframeRef) => {
            if (iframeRef) {
              iframeRef.style.height = "100%";
              iframeRef.style.width = "100%";
              iframeRef.style.border = "none";
              iframeRef.style.borderRadius = "12px";
              iframeRef.style.overflow = "hidden";
            }
          }}
        />
      ) : (

        <div className='w-full flex items-center font-semibold bg-black text-white justify-center'>
          <span className='text-xs md:text-sm'>You are not authorized to join this session!</span>
        </div>
      )}

      <EndCallModal
        isOpen={isModalOpen}
        onClose={handleCancelEndCall}
        onConfirm={handleEndCall}
        participantCount={5}
        duration="32:15"
      />
    </div>
  );
};

export default VideoConference;
