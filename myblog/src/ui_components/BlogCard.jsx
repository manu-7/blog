// src/ui_components/BlogCard.jsx
import Badge from "./Badge";
import CardFooter from "./CardFooter";
import { Link } from "react-router-dom";

const BlogCard = ({ blog }) => {
  const imageURL = `http://127.0.0.1:8001${blog.featured_image}`;
  
  return (
    <div className="px-3 py-3 rounded-md w-[350px] h-auto flex flex-col gap-4 dark:border-gray-800 border shadow-lg"> {/* Increased width */}

      <div className="w-full h-[200px] border rounded-md overflow-hidden">
        <img
          src={imageURL}
          alt="Blog Thumbnail"
          className="w-full h-full object-cover rounded-lg"
        />
      </div>

      <p className="text-sm font-large text-gray-600 dark:text-gray-300">
        {blog.title}
      </p>
     
      <Badge blog={blog}/>

      <Link to={`blogs/${blog.slug}`}>
        <h3 className="font-bold leading-normal text-[#181A2A] mb-0 dark:text-white">
          {blog.title}
        </h3>
      </Link>

      <CardFooter blog={blog} />
    </div>
  );
};

export default BlogCard;
