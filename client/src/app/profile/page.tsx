"use client";

import React, { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Form, Input, Button, Select, Textarea, Alert } from "@/components/ui";
import { useToast } from "@/hooks/use-toast";
import { useAppSelector } from "@/hooks/useAppDispatch";
import { profileUpdateSchema } from "@/lib/validations";

const UserProfile = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const { showSuccess } = useToast();

  const { userProfile, loading, updating, error } = useAppSelector(
    (state) => state.profile
  );
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [isImageUploading, setIsImageUploading] = useState(false);

  // Fetch user profile data
  //   console.log(userProfile)
  //   useEffect(() => {
  //     if (session?.user?.id && !userProfile) {
  //       dispatch(fetchUserProfile(session.user.id));
  //     }
  //   }, [session, dispatch, userProfile]);

  // Set profile image when user profile loads
  //   useEffect(() => {
  //     if (userProfile) {
  //       if (
  //         userProfile.roleId === 3 &&
  //         userProfile.talentProfile?.profilePictureUrl
  //       ) {
  //         setProfileImage(userProfile.talentProfile.profilePictureUrl);
  //       } else if (
  //         userProfile.roleId === 2 &&
  //         userProfile.recruiterProfile?.imageUrl
  //       ) {
  //         setProfileImage(userProfile.recruiterProfile.imageUrl);
  //       }
  //     }
  //   }, [userProfile]);

  // Show error toast when error occurs
  //   useEffect(() => {
  //     if (error) {
  //       showError(error);
  //       dispatch(clearProfileError());
  //     }
  //   }, [error, showError, dispatch]);

  const handleProfileUpdate = async (data: {
    name: string;
    email: string;
    phoneNumber: string;
    gender: string;
    bio?: string;
  }) => {
    // if (!session?.user?.id) return;

    // try {
    //   const result = await dispatch(
    //     updateUserProfile({
    //       userId: session.user.id,
    //       data: {
    //         name: data.name,
    //         email: data.email,
    //         phoneNumber: data.phoneNumber,
    //         gender: data.gender,
    //       },
    //     })
    //   );

    //   if (updateUserProfile.fulfilled.match(result)) {
    //     showSuccess("Profile updated successfully!");
    //   }
    // } catch (error: any) {
    //   console.error("Error updating profile:", error);
    // }
    console.log(data);
  };

  const handleImageUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      setIsImageUploading(true);

      // Simulate image upload (in real app, you'd upload to cloud storage)
      const reader = new FileReader();
      reader.onload = (e) => {
        setTimeout(() => {
          setProfileImage(e.target?.result as string);
          setIsImageUploading(false);
          showSuccess("Profile image updated!");
        }, 1000);
      };
      reader.readAsDataURL(file);
    }
  };

  if (status === "loading" || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center animate-fade-in">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-blue"></div>
      </div>
    );
  }

  if (!session?.user) {
    return null;
  }

  return (
    <div className="min-h-screen py-8 animate-fade-in">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="overflow-hidden animate-slide-up">
          {/* Header */}
          <div className="bg-gradient-to-r from-primary-blue to-blue-600 px-6 py-8 animate-slide-down rounded-xl">
            <div className="flex items-center justify-center">
              <div className="text-center">
                <h1 className="text-3xl font-bold text-white mb-2">
                  Profile Settings
                </h1>
                <p className="text-blue-100">
                  Manage your account information and preferences
                </p>
              </div>
            </div>
          </div>

          <div className="p-6">
            {error && (
              <div className="mb-6 animate-slide-down">
                <Alert type="error">{error}</Alert>
              </div>
            )}

            <Form
              onSubmit={handleProfileUpdate}
              schema={profileUpdateSchema}
              defaultValues={{
                name: userProfile?.name || "",
                email: userProfile?.email || "",
                phoneNumber: userProfile?.phoneNumber || "",
                gender:
                  userProfile?.gender === "Male" ||
                  userProfile?.gender === "Female"
                    ? userProfile.gender
                    : "Male",
                bio: userProfile?.talentProfile?.bio || "",
                location: userProfile?.talentProfile?.location || "",
                hourlyRate: userProfile?.talentProfile?.hourlyRate || 0,
                yearOfExperience:
                  userProfile?.talentProfile?.yearOfExperience || 0,
                cvUrl: userProfile?.talentProfile?.cvUrl || "",
                companyName: userProfile?.recruiterProfile?.companyName || "",
                companyTitle: userProfile?.recruiterProfile?.companyTitle || "",
                description: userProfile?.recruiterProfile?.description || "",
              }}
            >
              {/* Profile Image Section */}
              <div className="flex justify-center mb-8 animate-slide-up">
                <div className="relative">
                  <div className="w-32 h-32 rounded-full overflow-hidden bg-gray-200 border-4 border-white shadow-lg relative transition-transform duration-300 hover:scale-105">
                    {profileImage ? (
                      <Image
                        src={profileImage}
                        alt="Profile"
                        width={128}
                        height={128}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <svg
                          className="w-16 h-16 text-gray-400"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                    )}

                    {isImageUploading && (
                      <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center animate-fade-in">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
                      </div>
                    )}
                  </div>

                  <label className="absolute bottom-0 right-0 bg-primary-blue text-white rounded-full p-2 cursor-pointer hover:bg-blue-600 transition-all duration-300 hover:scale-110 active:scale-95 shadow-lg">
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                      />
                    </svg>
                    <input
                      type="file"
                      className="hidden"
                      accept="image/*"
                      onChange={handleImageUpload}
                      disabled={isImageUploading}
                    />
                  </label>
                </div>
              </div>

              {/* Basic Information */}
              <div className="animate-slide-up">
                <div className="mb-6">
                  <div className="p-6">
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">
                      Basic Information
                    </h2>

                    <div className="grid grid-cols-1 gap-4">
                      <Input
                        name="name"
                        label="Full Name"
                        placeholder="Enter your full name"
                        required
                      />

                      <Input
                        name="email"
                        label="Email Address"
                        type="email"
                        placeholder="Enter your email address"
                        required
                      />

                      <Input
                        name="phoneNumber"
                        label="Phone Number"
                        type="tel"
                        placeholder="Enter your phone number"
                        required
                      />

                      <Select
                        name="gender"
                        label="Gender"
                        options={[
                          { value: "Male", label: "Male" },
                          { value: "Female", label: "Female" },
                        ]}
                        defaultValue={"Male"}
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Role-specific Information */}
              {userProfile?.roleId === 3 && (
                <div className="animate-slide-up">
                  <div className="mb-6">
                    <div className="p-6">
                      <h2 className="text-xl font-semibold text-gray-900 mb-4">
                        Talent Profile
                      </h2>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Input
                          name="location"
                          label="Location"
                          placeholder="Enter your location"
                        />

                        <Input
                          name="hourlyRate"
                          label="Hourly Rate ($)"
                          type="number"
                          placeholder="Enter your hourly rate"
                        />

                        <Input
                          name="yearOfExperience"
                          label="Years of Experience"
                          type="number"
                          placeholder="Enter years of experience"
                        />

                        <Input
                          name="cvUrl"
                          label="CV/Resume URL"
                          type="url"
                          placeholder="Enter your CV URL"
                        />
                      </div>

                      <Textarea
                        name="bio"
                        label="Bio"
                        placeholder="Tell us about yourself, your skills, and experience..."
                        rows={4}
                      />
                    </div>
                  </div>
                </div>
              )}

              {userProfile?.roleId === 2 && (
                <div className="animate-slide-up">
                  <div className="mb-6">
                    <div className="p-6">
                      <h2 className="text-xl font-semibold text-gray-900 mb-4">
                        Company Information
                      </h2>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Input
                          name="companyName"
                          label="Company Name"
                          placeholder="Enter your company name"
                        />

                        <Input
                          name="companyTitle"
                          label="Your Title"
                          placeholder="Enter your job title"
                        />
                      </div>

                      <Textarea
                        name="description"
                        label="Company Description"
                        placeholder="Tell us about your company..."
                        rows={4}
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex justify-end gap-4 animate-slide-up">
                <Button
                  type="button"
                  variant="secondary"
                  onClick={() => router.back()}
                >
                  Cancel
                </Button>
                <div className="transition-transform duration-300 hover:scale-105 active:scale-95">
                  <Button type="submit" variant="primary" disabled={updating}>
                    {updating ? "Updating..." : "Update Profile"}
                  </Button>
                </div>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
