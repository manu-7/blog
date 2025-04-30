import BlogCard from "./BlogCard";
import Spinner from "./Spinner";
import { Link } from "react-router-dom";  // Import Link for proper routing

const BlogContainer = ({ isPending, blogs = [], title = "🍔 Latest Posts" }) => {
  if (isPending) {
    return <Spinner />;
  }

  return (
    <section className="px-4 py-6 max-w-screen-xl mx-auto">
      <h2 className="font-semibold text-xl mb-6 dark:text-white text-center">
        {title}
      </h2>

      <div className="flex items-center gap-6 justify-center flex-wrap">
        {blogs.map((blog) => (
          <div key={blog.id}>
            {/* Ensure the blog links go to the correct absolute URL */}
            <Link to={`/blogs/${blog.slug}`} className="block">
              <BlogCard blog={blog} />
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
};

export default BlogContainer;
