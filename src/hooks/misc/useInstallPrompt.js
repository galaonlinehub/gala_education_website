import { useState, useEffect } from "react";

const useInstallPrompt = () => {
  const [installPrompt, setInstallPrompt] = useState(null);
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    // Debug logs
    // console.log('Current display mode:', window.matchMedia('(display-mode: standalone)').matches);

    if (window.matchMedia('(display-mode: standalone)').matches) {
      setIsInstalled(true);
      return;
    }

    const handleBeforeInstallPrompt = (e) => {
      // console.log('beforeinstallprompt event fired');
      e.preventDefault();
      setInstallPrompt(e);
    };

    // Check if PWA criteria are met
    // console.log('PWA criteria:', {
    //   https: window.location.protocol === 'https:',
    //   serviceWorker: 'serviceWorker' in navigator,
    //   manifest: !!document.querySelector('link[rel="manifest"]')
    // });

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    const handleAppInstalled = () => {
      console.log('App installed');
      setIsInstalled(true);
      setInstallPrompt(null);
    };

    window.addEventListener('appinstalled', handleAppInstalled);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!installPrompt) {
      console.log('No install prompt available');
      return;
    }

    try {
      const result = await installPrompt.prompt();
      console.log('Install prompt result:', result);
      
      if (result.outcome === 'accepted') {
        setIsInstalled(true);
        setInstallPrompt(null);
      }
    } catch (err) {
      console.error('Installation error:', err);
    }
  };

  return {
    installPrompt,
    isInstalled,
    handleInstallClick,
  };
};

export default useInstallPrompt;