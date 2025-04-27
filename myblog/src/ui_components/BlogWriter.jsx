const BlogWriter = ({ author }) => {
  if (!author) {
    return <div>Loading author info...</div>;
  }

  return (
    <div className="flex items-center gap-2">
      {/* Optional: Add an avatar here if you have author.profile_picture */}
      <div>
        <h3 className="text-md font-semibold text-[#181A2A] dark:text-white">{author.username}</h3>
        <p className="text-xs text-[#7A7A7A] dark:text-[#A9A9A9]">{author.email}</p>
      </div>
    </div>
  );
};

export default BlogWriter;
