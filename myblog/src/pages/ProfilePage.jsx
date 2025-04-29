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

  const { isLoading, data, error } = useQuery({
    queryKey: ["users", username],
    queryFn: () => getUserInfo(username),
    enabled: !!username,  // Ensures query runs only when `username` is available
  });

  // Handle loading and error states
  if (isLoading) {
    return <Spinner />;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const blogs = data?.author_posts || [];

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
