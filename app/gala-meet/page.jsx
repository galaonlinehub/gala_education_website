"use client";
import { JaaSMeeting } from "@jitsi/react-sdk";
import { JITSI_API_KEY } from "@/src/config/settings";
import { useSearchParams } from "next/navigation";
import { sessionStorageFn } from "@/src/utils/fns/client";
import { decrypt } from "@/src/utils/fns/encryption";
import notificationService from "@/src/components/ui/notification/Notification";
import { useRouter } from "next/navigation";
import { useUser } from "@/src/hooks/useUser";
import { apiPost } from "@/src/services/api/api_service";

const VideoConference = () => {
  const router = useRouter();
  const { user } = useUser();

  const appId = JITSI_API_KEY;
  const searchParams = useSearchParams();

  const roomName = searchParams.get("room");
  const userName = searchParams.get("name");
  const userEmail = searchParams.get("email");
  const jwtToken = sessionStorageFn.get("lessonToken");
  const isModerator = sessionStorageFn.get("isModerator");
  const lessonId = sessionStorageFn.get("lessonId");

  const decryptedRoomName = decrypt(roomName);
  const decryptedUserName = decrypt(userName);
  const decryptedUserEmail = decrypt(userEmail);
  const decryptedJwtToken = decrypt(jwtToken);
  const decryptedModerator = decrypt(isModerator);
  const decryptedLessonId = decrypt(lessonId);

  const handleSendLessonId = (lessonId) => {
    apiPost("/complete-lesson", { lesson_id: lessonId });
  };

  return (
    <div className="w-screen h-screen p-4">
      {decryptedJwtToken?.token ? (
        <JaaSMeeting
          appId={appId}
          lang="en"
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
          }}
          interfaceConfigOverwrite={{
            DISABLE_JOIN_LEAVE_NOTIFICATIONS: true,
            MOBILE_APP_PROMO: false,
            HIDE_INVITE_MORE_HEADER: true,
            VIDEO_LAYOUT_FIT: "nocrop",
            TILE_VIEW_MAX_COLUMNS: 3,
            TOOLBAR_BUTTONS: [
              "microphone",
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
              "security",
            ],
          }}
          userInfo={{
            displayName: decryptedUserName,
            email: decryptedUserEmail,
          }}
          onApiReady={(externalApi) => {
            // Store API reference if needed
            console.log("Jitsi Meet API ready");

            externalApi.addListener("participantJoined", (participant) => {
              notificationService.info({
                message: "User joined",
                description: `${participant} joined the lesson meeting!`,
                duration: null,
                position: "topRight",
                customStyle: {},
              });
            });

            externalApi.addListener("videoConferenceLeft", () => {
              // const response = handleSendLessonId(decryptedLessonId);
              // console.log("response", response);
              if (user?.role == "instructor") {
                router.replace("/instructor/live-classes");
              } else {
                router.replace("/student/live-lessons");
              }
            });
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
        <div>Unable to obtain authentication token</div>
      )}
    </div>
  );
};

export default VideoConference;
