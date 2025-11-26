"use client";
import { JaaSMeeting } from "@jitsi/react-sdk";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import {useRef } from "react";


import { isDev, JITSI_APP_ID } from "@/config/settings";
import { useUser } from "@/hooks/data/useUser";
import { sessionStorageFn } from "@/utils/fns/client";
import { decrypt } from "@/utils/fns/encryption";


const VideoConference = () => {
  const externalApiRef = useRef(null);

  const router = useRouter();
  const { user } = useUser();

  const appId = JITSI_APP_ID;
  const searchParams = useSearchParams();

  const userName = searchParams.get("name");
  const userEmail = searchParams.get("email");
  const jwtToken = sessionStorageFn.get("lessonToken");
  const isModerator = sessionStorageFn.get("isModerator");

  const meetingLink = sessionStorageFn.get("meetingLink");

  const decryptedUserName = decrypt(userName);
  const decryptedUserEmail = decrypt(userEmail);
  const decryptedJwtToken = decrypt(jwtToken);
  const decryptedModerator = decrypt(isModerator);
  
  const decryptedMeetingLink = decrypt(meetingLink);


  // const handleEndCall = () => {
  //   if (pendingHangup && externalApiRef.current) {

  //     externalApiRef.current.executeCommand("hangup");
  //     setPendingHangup(false);
  //   }

  //   completeLessonMutation.mutate(decryptedLessonId);

  //   if (user?.role == "instructor") {
  //     router.replace("/instructor/live-classes");
  //   } else {
  //     router.replace("/student/live-lessons");
  //   }
  // };



  // Handle before unload (when user closes tab/browser)
  // const handleBeforeUnload = () => {
  //   const isModerator =
  //     decryptedModerator === "true" || user?.role === "instructor";

  //   if (isModerator && externalApiRef.current) {
  //     // End conference for all participants when moderator closes tab
  //     externalApiRef.current.executeCommand("endConference");
  //   }
  // };

  // Function to intercept hangup attempts
  // const interceptHangup = () => {
  //   setPendingHangup(true);
  //   return false; // Prevent the default hangup action
  // };

  // useEffect(() => {
  //   // Add global click listener to intercept hangup button clicks
  //   const handleToolbarClick = (event) => {
  //     // Check if the clicked element or its parent is the hangup button
  //     const target = event.target;
  //     const hangupButton =
  //       target.closest('[data-testid="hangup"]') ||
  //       target.closest('.toolbox-button[aria-label*="Leave"]') ||
  //       target.closest('.toolbox-button[aria-label*="Hang up"]') ||
  //       target.closest(".hangup-button") ||
  //       (target.classList.contains("toolbox-button") &&
  //         target.getAttribute("aria-label")?.includes("Leave"));

  //     if (hangupButton && !pendingHangup) {
  //       event.preventDefault();
  //       event.stopPropagation();
  //       interceptHangup();
  //     }
  //   };

  //   // Use capture phase to intercept before Jitsi handles the click
  //   document.addEventListener("click", handleToolbarClick, true);

  //   return () => {
  //     document.removeEventListener("click", handleToolbarClick, true);
  //   };
  // }, [pendingHangup]);

  // useEffect(() => {
  //   // Add global click listener to intercept hangup button clicks
  //   const handleToolbarClick = (event) => {
  //     // Check if the clicked element or its parent is the hangup button
  //     const target = event.target;
  //     const hangupButton =
  //       target.closest('[data-testid="hangup"]') ||
  //       target.closest('.toolbox-button[aria-label*="Leave"]') ||
  //       target.closest('.toolbox-button[aria-label*="Hang up"]') ||
  //       target.closest(".hangup-button") ||
  //       (target.classList.contains("toolbox-button") &&
  //         target.getAttribute("aria-label")?.includes("Leave"));

  //     if (hangupButton && !pendingHangup) {
  //       event.preventDefault();
  //       event.stopPropagation();
  //       interceptHangup();
  //     }
  //   };

  //   // Use capture phase to intercept before Jitsi handles the click
  //   document.addEventListener("click", handleToolbarClick, true);

  //   return () => {
  //     document.removeEventListener("click", handleToolbarClick, true);
  //   };
  // }, [pendingHangup]);

  return (
    <div className="w-screen h-screen p-4">
      {decryptedJwtToken?.token ? (
        <JaaSMeeting
          appId={appId}
          lang="en"
          roomName={isDev ? `${decryptedMeetingLink}_edutz` : `${decryptedMeetingLink}`}
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

            moderator:
              decryptedModerator === "true" || user?.role === "instructor",
          }}
          onApiReady={(externalApi) => {
            // Store the API reference for later use
            externalApiRef.current = externalApi;

            // Override the hangup command to show confirmation first

            const originalExecuteCommand =
              externalApi.executeCommand.bind(externalApi);
            externalApi.executeCommand = (command, ...args) => {
              // if (command === "hangup" && !pendingHangup) {
              //   interceptHangup();
              //   return;
              // }
              return originalExecuteCommand(command, ...args);
            };

            externalApi.addListener("videoConferenceLeft", () => {
              if(user?.role == 'instructor'){
                router.replace("/instructor/live-classes");
              }else{
                router.replace("/student/live-lessons");

              }
            });

            // Listen for when the conference ends (for all participants)
            externalApi.addListener("videoConferenceEnded", () => {
            });

            // Add beforeunload event listener for moderator
            // const isModerator =
            //   decryptedModerator === "true" || user?.role === "instructor";
            // if (isModerator) {
            //   window.addEventListener("beforeunload", handleBeforeUnload);
            // }

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
        <div className="w-full flex items-center font-semibold bg-black text-white justify-center">
          <span className="text-xs md:text-sm">
            You are not authorized to join this session!
          </span>
        </div>
      )}
    </div>
  );
};

export default VideoConference;
