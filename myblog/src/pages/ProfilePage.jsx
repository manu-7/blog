import { getUserInfo } from "@/services/apiBlog";
import BlogContainer from "@/ui_components/BlogContainer";
import Hero from "@/ui_components/Hero";
import Spinner from "@/ui_components/Spinner";
import Modal from "@/ui_components/Modal";
import { useQuery } from "@tanstack/react-query";
import { useParams, Link } from "react-router-dom";  // Import Link for navigation
import SignUpPage from "./SignUpPage";
import { useState } from "react";

const ProfilePage = ({ authUsername }) => {
  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => {
    setShowModal((curr) => !curr);
  };

  const { username } = useParams();

  const { isPending, data } = useQuery({
    queryKey: ["users", username],
    queryFn: () => getUserInfo(username),
  });
  console.log("User data:", data);

  const blogs = data?.author_posts;

  if (isPending) {
    return <Spinner />;
  }

  return (
    <>
      <Hero userInfo={data} authUsername={authUsername} toggleModal={toggleModal} />
      {/* BlogContainer renders blog list, passing the slug correctly */}
      <BlogContainer blogs={blogs} title={`🍔 ${username}'s Posts`} />

      {showModal && (
        <Modal toggleModal={toggleModal}>
          <SignUpPage userInfo={data} updateForm={true} toggleModal={toggleModal} />
        </Modal>
      )}
    </>
  );
};

export default ProfilePage;
