import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getBlog } from "@/services/apiBlog";
import Spinner from "@/ui_components/Spinner";
import Badge from "@/ui_components/Badge";
import { FormatDate } from "@/services/formatDate";

const DetailPage = () => {
  const { slug } = useParams();
  const { isLoading, isError, error, data } = useQuery({
    queryKey: ["blogs", slug],
    queryFn: () => getBlog(slug),
  });

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return (
      <div className="text-center text-red-500">
        <h2>Error fetching blog details: {error.message}</h2>
      </div>
    );
  }

  const imageURL = `http://127.0.0.1:8001${data?.author.profile_picture}`;
  const featuredImageURL = `http://127.0.0.1:8001${data?.featured_image}`;

  return (
    <div className="max-w-7xl mx-auto py-10 px-6 md:px-12">
      
      {/* Blog Author Badge */}
      <div className="mb-6">
        <Badge blog={data} />
      </div>

      {/* Blog Title */}
      <h1 className="font-bold text-4xl text-[#181A2A] mb-6 dark:text-white">
        {data?.title}
      </h1>

      {/* Author Info */}
      <div className="flex items-center gap-4 mb-6">
        <div className="w-12 h-12 rounded-full overflow-hidden">
          <img
            src={imageURL}
            alt="Author"
            className="w-full h-full object-cover"
          />
        </div>

        <div>
          <small className="text-[#97989F] text-sm font-semibold">
            {data?.author.first_name} {data?.author.last_name}
          </small>
          <small className="text-[#97989F] text-sm font-semibold ml-3">
            {FormatDate(data?.created_at)}
          </small>
        </div>
      </div>

      {/* Featured Image */}
      <div className="w-full overflow-hidden rounded-xl shadow-lg mb-10">
        <img
          src={featuredImageURL}
          alt="Featured"
          className="w-full h-[450px] object-cover object-center"
        />
      </div>

      {/* Blog Content */}
      <div className="prose prose-lg max-w-none text-[#3B3C4A] dark:text-[#BABABF]">
        <p>{data?.content}</p>
      </div>
    </div>
  );
};

export default DetailPage;
