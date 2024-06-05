import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import ApiHandler from "../Api/ApiHandler";
import { ToastContainer, toast } from "react-toastify";
import "./signup.css";
import BackgroundImage from "../assets/images/register.jpg";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  //mutation nethod for signUp

  const { mutate } = useMutation({
    mutationFn: ApiHandler?.userSignUp,
    onSuccess: (response) => {
      if (response?.status === 200) {
        toast.success(response?.message, {
          onClose: () => navigate("/signin"),
        });
      } else {
        toast.error(response?.message);
      }
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  //image handle

  const [img, setImg] = useState(null);

  //form submit

  const onSubmit = (data) => {
    const formData = new FormData();
    formData.append("first_name", data.first_name);
    formData.append("last_name", data.last_name);
    formData.append("email", data.email);
    formData.append("password", data.password);
    if (img) {
      formData.append("profile_pic", img);
    }
    mutate(formData);
  };

  console.log();

  return (
    <>
      <div
        className="sign-in__wrapper text-center"
        style={{ backgroundImage: `url(${BackgroundImage})` }}
      >
        <h2 className="text-center text-info">Signup Page</h2>
        <form
          className="shadow p-4 bg-white rounded"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="mb-3">
            <label htmlFor="exampleInputFirstName" className="form-label">
              First Name
            </label>
            <input
              type="text"
              name="first_name"
              className="form-control"
              id="exampleInputFirstName"
              {...register("first_name", { required: true })}
            />
            {errors.first_name && <span>This field is required</span>}
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputLastName" className="form-label">
              Last Name
            </label>
            <input
              type="text"
              name="last_name"
              className="form-control"
              id="exampleInputLastName"
              {...register("last_name", { required: true })}
            />
            {errors.last_name && <span>This field is required</span>}
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Email address
            </label>
            <input
              type="email"
              name="email"
              className="form-control"
              id="exampleInputEmail1"
              {...register("email", { required: true })}
            />
            {errors.email && <span>This field is required</span>}
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Password
            </label>
            <input
              type="password"
              name="password"
              className="form-control"
              id="exampleInputPassword1"
              {...register("password", { required: true })}
            />
            {errors.password && <span>This field is required</span>}
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputProfilePic" className="form-label">
              Profile Picture
            </label>
            <input
              type="file"
              onChange={(e) => setImg(e.target.files[0])}
              accept="image/*"
              className="form-control"
            />
            {img && (
              <img
                style={{ height: "180px" }}
                src={URL.createObjectURL(img)}
                alt=""
                className="upload-img"
              />
            )}
          </div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
      <ToastContainer />
    </>
  );
};

export default Signup;
