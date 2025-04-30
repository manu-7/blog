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
    setShowModal((curr) => !curr);
  };

  const {
    isPending,
    isError,
    error,
    data,
  } = useQuery({
    queryKey: ["users", username],
    queryFn: () => getUserInfo(username),
    retry: 1,
  });

  if (isPending) return <Spinner />;

  if (isError || !data) {
    console.error("Error loading user profile:", error);
    return (
      <div className="text-center text-red-500 mt-10">
        ⚠️ Failed to load user profile. Please try again later.
      </div>
    );
  }

  const blogs = data?.author_posts || [];

  return (
    <>
      <Hero userInfo={data} authUsername={authUsername} toggleModal={toggleModal} />
      <BlogContainer blogs={blogs} title={`🍔 ${username}'s Posts`} />

      {showModal && (
        <Modal toggleModal={toggleModal}>
          {/* Only render if data is valid and updateForm expected by SignupPage */}
          <SignupPage
            userInfo={data}
            updateForm={true}
            toggleModal={toggleModal}
          />
        </Modal>
      )}
    </>
  );
};

export default ProfilePage;
