"use client";

import React, { useEffect, useState } from 'react';
import { Tldraw } from '@tldraw/tldraw';

function WhiteBoard({ socketRef, roomId, role }) {
  const [app, setApp] = useState(null);

  const handleMount = (mountedApp) => {
    setApp(mountedApp);

    // Listen for app changes
    mountedApp.on('change', (changes) => {
      console.log('Detected changes:', changes);
      if (role === 'instructor' && socketRef.current) {
        socketRef.current.emit('tldraw-event', {
          roomId,
          changes, // Send changes to the server
        });
      }
    });
  };

  useEffect(() => {
    if (!socketRef.current) return;

    const socket = socketRef.current;

    const handleTldrawEvent = (event) => {
      if (event.roomId === roomId && app) {
        if (event.changes.shapes) {
          app.updateShapes(event.changes.shapes);
        } else if (event.changes.document) {
          app.updateDocument(event.changes.document);
        }
      }
    };

    socket.on('tldraw-event', handleTldrawEvent);

    return () => {
      socket.off('tldraw-event', handleTldrawEvent);
    };
  }, [socketRef, roomId, app]);

  return (
    <div className="w-full h-[90vh] basis-11/12 ">
      <Tldraw
        onMount={handleMount}
        readOnly={role !== 'instructor'} // Make board read-only for non-instructors
      />
    </div>
  );
}

export default WhiteBoard;
