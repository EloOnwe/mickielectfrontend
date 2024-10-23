import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updatePhoto, updateUserData } from "../redux/features/updateUserSlice";

import "../styles/profilePage.css";
import { toast } from "react-toastify";

const ProfilePage = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    username: "",
    phone: "",
  });
  const { user } = useSelector((state) => state.user);
  const { isLoading } = useSelector((state) => state.updateUser);
  const [profilePhoto, setProfilePhoto] = useState("");

  useEffect(() => {
    if (user) {
      setFormData({
        username: formData.username || user.username,
        phone: formData.phone || user.phone,
      });

      setProfilePhoto(profilePhoto || user.photo);
    }
  }, [user]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmitPoto = async (event) => {
    event.preventDefault();
    try {
      const photo = profilePhoto;
      await dispatch(updatePhoto(photo));
      toast.success("successfully updated");
    } catch (error) {
      toast.error(error);
    }
  };

  const handleImgChange = (event) => {
    const file = event.target.files[0];
    transformFile(file);
  };

  const transformFile = (file) => {
    const reader = new FileReader();
    if (file) {
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setProfilePhoto(reader.result);
      };
    } else {
      setProfilePhoto("");
    }
  };

  const handleSubmitFormData = async (e) => {
    e.preventDefault();

    try {
      const values = {
        username: formData.username,
        phone: formData.phone,
      };

      await dispatch(updateUserData(values));
      toast.success("Successfully updated");
    } catch (error) {
      console.log(error);
    }
  };

  if (user) {
    return (
      <div className="profileContainer">
        <div className="profileInfo">
          <div className="profilePic">
            <form onSubmit={handleSubmitPoto}>
              <div className="profileImage">
                {profilePhoto ? (
                  <img src={profilePhoto} alt="" />
                ) : (
                  <img src={user?.photo} alt="photo" />
                )}
              </div>
              <input
                type="file"
                accept="image/*"
                onChange={handleImgChange}
                required
              />
              {isLoading ? (
                <button type="submit" style={{ width: "100%" }}>
                  Uploading
                </button>
              ) : (
                <button type="submit" style={{ width: "100%" }}>
                  Upload
                </button>
              )}
            </form>
          </div>
          <div className="formData">
            <form onSubmit={handleSubmitFormData}>
              <label htmlFor="username">Username</label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
              />
              <label htmlFor="email">Email</label>
              <input type="email" name="email" value={user.email} readOnly />
              <label htmlFor="role">Role</label>
              <input type="text" name="role" value={user.role} readOnly />

              <label htmlFor="phone">Phone</label>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
              />
              {isLoading ? (
                <button type="submit">Uploading ...</button>
              ) : (
                <button type="submit">Update</button>
              )}
            </form>
          </div>
        </div>
      </div>
    );
  }
};

export default ProfilePage;
