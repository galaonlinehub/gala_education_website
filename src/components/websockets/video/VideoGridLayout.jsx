import React from 'react';
import ParticipantVideo from './ParticipantComponent';

const VideoGridLayout = ({ participants, instructor }) => {
  return (
    <div className="h-full p-4 flex flex-col gap-4">
      {/* Instructor Video */}
      {instructor && (
        <div className="w-full h-[60%] bg-gray-800 rounded-lg overflow-hidden">
          <ParticipantVideo
            participant={instructor}
            isInstructor={true}
            className="w-full h-full object-cover"
          />
        </div>
      )}

      {/* Participants Grid */}
      <div 
        className={`grid gap-4 flex-1 ${
          participants.length <= 2 
            ? 'grid-cols-1 md:grid-cols-2'
            : participants.length <= 4
            ? 'grid-cols-2 md:grid-cols-2'
            : 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4'
        }`}
      >
        {participants.map((participant) => (
          <div key={participant.id} className="bg-gray-800 rounded-lg overflow-hidden">
            <ParticipantVideo
              participant={participant}
              isInstructor={false}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default VideoGridLayout;