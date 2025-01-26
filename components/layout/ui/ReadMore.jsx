import React, { useState } from "react";

const ReadMore = ({ children }) => {
  const text = children;
  const [isReadMore, setIsReadMore] = useState(true);
  const toggleReadMore = () => {
    setIsReadMore(!isReadMore);
  };
  return (
    <p>
      {isReadMore ? text.slice(0, 220) : text}
      <span onClick={toggleReadMore} className="text-blue-600 font-semibold text-sm cursor-pointer">
        {isReadMore ? "...Learn more" : " show less"}
      </span>
    </p>
  );
};

const Content = () => {
  return (
    <div className="text-xs w-3/4">
      {/* <h2> */}
      <ReadMore>You’ve successfully logged in to your Student Dashboard! Here, you can view your classes, access assignments, join live sessions, and keep track of your progress as you move forward in your learning journey. Explore a variety of resources, including course materials, lecture recordings, and interactive activities designed to enhance your learning experience. You can also communicate with your instructors, connect with fellow students through discussion forums, and receive personalized feedback on your performance. Stay organized by managing your schedule, setting reminders for upcoming deadlines, and tracking your achievements as you work towards your academic goals. Enjoy your learning experience and make the most of the tools available to you!</ReadMore>
      {/* </h2> */}
      {/* //sa */}
    </div>
  );
};

export default Content;
