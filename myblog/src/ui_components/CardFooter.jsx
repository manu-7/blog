import { FormatDate } from '@/services/formatDate';
import React from 'react';

const CardFooter = ({ blog }) => {
  if (!blog || !blog.author) {
    return null; // or a loading spinner or placeholder
  }

  const imageURL = `http://127.0.0.1:8001${blog.author.profile_picture}`;

  console.log("CardFooter blog:", blog); // This should be inside the function

  return (
    <div className="flex items-center gap-4">
      <span className="flex items-center gap-2">
        <div className="w-[40px] h-[40px] rounded-full overflow-hidden">
          <img
            src={imageURL}
            alt="Author"
            className="rounded-full w-full h-full object-cover"
          />
        </div>

        <small className="text-[#97989F] text-[12px] font-semibold">
          {blog.author.first_name} {blog.author.last_name}
        </small>
      </span>

      <small className="text-[#97989F] text-[12px] font-semibold ml-3">
        {FormatDate(blog.published_date)}
      </small>
    </div>
  );
};

export default CardFooter;
