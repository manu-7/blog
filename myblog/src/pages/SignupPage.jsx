import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { registerUser, updateProfile } from "@/services/apiBlog";
import InputError from "@/ui_components/InputError";
import SmallSpinner from "@/ui_components/SmallSpinner";
import SmallSpinnerText from "@/ui_components/SmallSpinnerText";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const SignupPage = ({ userInfo = {}, updateForm = false, toggleModal }) => {
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm({
    defaultValues: updateForm
      ? {
          username: userInfo.username || "",
          first_name: userInfo.first_name || "",
          last_name: userInfo.last_name || "",
          job_title: userInfo.job_title || "",
          bio: userInfo.bio || "",
        }
      : {},
  });

  const password = watch("password");

  const updateProfileMutation = useMutation({
    mutationFn: updateProfile,
    onSuccess: () => {
      toast.success("Profile updated successfully!");
      toggleModal?.();
      queryClient.invalidateQueries({ queryKey: ["users", userInfo?.username] });
    },
    onError: (err) => {
      toast.error(err.message || "Failed to update profile");
    },
  });

  const mutation = useMutation({
    mutationFn: registerUser,
    onSuccess: () => {
      toast.success("You have successfully created an account!");
      reset();
    },
    onError: (err) => {
      toast.error(err.message || "Failed to sign up");
    },
  });

  function onSubmit(data) {
    if (updateForm) {
      const formData = new FormData();
      formData.append("username", data.username);
      formData.append("first_name", data.first_name);
      formData.append("last_name", data.last_name);
      formData.append("job_title", data.job_title);
      formData.append("bio", data.bio);

      const file = data.profile_picture?.[0];
      if (file && file instanceof File) {
        formData.append("profile_picture", file);
      }

      updateProfileMutation.mutate(formData);
    } else {
      mutation.mutate(data);
    }
  }

  return (
    <form
      className={`${
        updateForm && "h-[90%] overflow-auto"
      } md:px-16 px-8 py-6 flex flex-col mx-auto my-9 items-center gap-4 w-fit 
    rounded-lg bg-[#FFFFFF] shadow-xl dark:text-white dark:bg-[#141624]`}
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex flex-col gap-2 justify-center items-center mb-2">
        <h3 className="font-semibold text-2xl">
          {updateForm ? "Update Profile Form" : "SignUp Form"}
        </h3>
        <p>
          {updateForm
            ? "You can tell us more about you."
            : "Create your account to get started!"}
        </p>
      </div>

      {/* Username */}
      <div>
        <Label htmlFor="username">Username</Label>
        <Input
          type="text"
          id="username"
          placeholder="Enter username"
          {...register("username", {
            required: "Username is required",
            minLength: {
              value: 3,
              message: "Username must be at least 3 characters",
            },
          })}
        />
        {errors?.username && <InputError error={errors.username.message} />}
      </div>

      {/* First Name */}
      <div>
        <Label htmlFor="first_name">First Name</Label>
        <Input
          type="text"
          id="first_name"
          placeholder="Enter first name"
          {...register("first_name", {
            required: "First name is required",
            minLength: {
              value: 3,
              message: "First name must be at least 3 characters",
            },
          })}
        />
        {errors?.first_name && <InputError error={errors.first_name.message} />}
      </div>

      {/* Last Name */}
      <div>
        <Label htmlFor="last_name">Last Name</Label>
        <Input
          type="text"
          id="last_name"
          placeholder="Enter last name"
          {...register("last_name", {
            required: "Last name is required",
            minLength: {
              value: 3,
              message: "Last name must be at least 3 characters",
            },
          })}
        />
        {errors?.last_name && <InputError error={errors.last_name.message} />}
      </div>

      {/* Update-specific Fields */}
      {updateForm && (
        <>
          {/* Job Title */}
          <div>
            <Label htmlFor="job_title">Job Title</Label>
            <Input
              type="text"
              id="job_title"
              placeholder="Enter job title"
              {...register("job_title", {
                required: "Job title is required",
                minLength: {
                  value: 3,
                  message: "Job title must be at least 3 characters",
                },
              })}
            />
            {errors?.job_title && <InputError error={errors.job_title.message} />}
          </div>

          {/* Bio */}
          <div>
            <Label htmlFor="bio">Bio</Label>
            <Textarea
              id="bio"
              placeholder="Tell us more about you"
              {...register("bio", {
                required: "Your bio is required",
                minLength: {
                  value: 10,
                  message: "The bio must be at least 10 characters",
                },
              })}
              className="h-[180px]"
            />
            {errors?.bio && <InputError error={errors.bio.message} />}
          </div>

          {/* Profile Picture */}
          <div className="w-full">
            <Label htmlFor="profile_picture">Profile Picture</Label>
            <Input
              type="file"
              id="profile_picture"
              accept="image/*"
              {...register("profile_picture")}
            />
          </div>
        </>
      )}

      {/* Signup-only Fields */}
      {!updateForm && (
        <>
          {/* Password */}
          <div>
            <Label htmlFor="password">Password</Label>
            <Input
              type="password"
              id="password"
              placeholder="Enter password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 8,
                  message: "Password must be at least 8 characters",
                },
              })}
            />
            {errors?.password && <InputError error={errors.password.message} />}
          </div>

          {/* Confirm Password */}
          <div>
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <Input
              type="password"
              id="confirmPassword"
              placeholder="Confirm password"
              {...register("confirmPassword", {
                required: "Confirm your password",
                validate: (value) =>
                  value === password || "Passwords do not match",
              })}
            />
            {errors?.confirmPassword && (
              <InputError error={errors.confirmPassword.message} />
            )}
          </div>
        </>
      )}

      {/* Submit Button */}
      <div className="w-full flex items-center justify-center flex-col my-4">
        <button className="bg-[#4B6BFB] text-white w-full py-3 px-2 rounded-md flex items-center justify-center gap-2">
          {updateForm
            ? updateProfileMutation.isPending
              ? <>
                  <SmallSpinner />
                  <SmallSpinnerText text="Updating user..." />
                </>
              : <SmallSpinnerText text="Update user profile" />
            : mutation.isPending
              ? <>
                  <SmallSpinner />
                  <SmallSpinnerText text="Creating user..." />
                </>
              : <SmallSpinnerText text="Signup" />
          }
        </button>

        {!updateForm && (
          <p className="text-[14px] mt-2">
            Already have an account? <Link to="/signin">Sign In</Link>
          </p>
        )}
      </div>
    </form>
  );
};

export default SignupPage;
