import { getUserInfo } from "@/services/apiBlog";
import BlogContainer from "@/ui_components/BlogContainer";
import Hero from "@/ui_components/Hero";
import Spinner from "@/ui_components/Spinner";
import Modal from "@/ui_components/Modal";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import SignupPage from "./SignupPage";
import { useState } from "react";

const ProfilePage = ({ authUsername }) => {
  const [showModal, setShowModal] = useState(false);
  const { username } = useParams();

  const toggleModal = () => {
    setShowModal(curr => !curr);
  };

  // Handle missing username in URL
  if (!username) {
    return <div className="text-center mt-10 text-red-500">Invalid profile URL: Username not provided.</div>;
  }

  const { isPending, isError, error, data } = useQuery({
    queryKey: ["users", username],
    queryFn: () => getUserInfo(username),
    enabled: !!username, // Avoid fetching with null/undefined
  });

  if (isPending) {
    return <Spinner />;
  }

  if (isError) {
    return <div className="text-center mt-10 text-red-500">Failed to load profile: {error.message}</div>;
  }

  const blogs = data?.author_posts;

  return (
    <>
      <Hero userInfo={data} authUsername={authUsername} toggleModal={toggleModal} />
      <BlogContainer blogs={blogs} title={`🍔 ${username}'s Posts`} />

      {showModal && (
        <Modal toggleModal={toggleModal}>
          <SignupPage userInfo={data} updateForm={true} toggleModal={toggleModal} />
        </Modal>
      )}
    </>
  );
};

export default ProfilePage;
