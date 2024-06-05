import React from "react";
import { Form, Button } from "react-bootstrap";
import "./signin.css";
import { useForm } from "react-hook-form";
import BackgroundImage from "../assets/images/background.png";
import Logo from "../assets/images/logo.png";
import { useNavigate } from "react-router-dom";
import ApiHandler from "../Api/ApiHandler";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { login } from "../redux/slice/authSlice";
import { toast } from "react-toastify";

const Signin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  //handle signIn method
  const { mutate } = useMutation({
    mutationFn: ApiHandler.userSignIn,
    onSuccess: (response) => {
      if (response?.status == 200) {
        const token = response?.token;
        const name = response?.data?.first_name;
        const profileImage = response?.data?.profile_pic;

        localStorage.setItem("token", token);
        localStorage.setItem("Name", name);
        localStorage.setItem("proimg", profileImage);

        dispatch(login({ token, user: name, profileImage }));
        toast.success(response?.message, {
          onClose: () => navigate("/"),
        });
      } else {
        toast.error(response?.message);
      }
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });

  const onSubmit = (data) => mutate(data);

  return (
    <>
      <div
        className="sign-in__wrapper"
        style={{ backgroundImage: `url(${BackgroundImage})` }}
      >
        <div className="sign-in__backdrop"></div>
        <Form
          className="shadow p-4 bg-white rounded"
          onSubmit={handleSubmit(onSubmit)}
        >
          <img
            className="img-thumbnail mx-auto d-block mb-2"
            src={Logo}
            alt="logo"
          />
          <div className="h4 mb-2 text-center">Sign In</div>
          <Form.Group className="mb-2" controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Email"
              required
              {...register("email", { required: true })}
            />
            {errors.email && <span>This field is required</span>}
          </Form.Group>
          <Form.Group className="mb-2" controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              required
              {...register("password", { required: true })}
            />
            {errors.password && <span>This field is required</span>}
          </Form.Group>
          <Form.Group className="mb-2" controlId="checkbox">
            <Form.Check type="checkbox" label="Remember me" />
          </Form.Group>
          <Button className="w-100" variant="primary" type="submit">
            Log In
          </Button>
          <div className="d-grid justify-content-end">
            <Button
              className="text-muted px-0"
              variant="link"
              onClick={() => navigate("/signup")}
            >
              Create an Account
            </Button>
          </div>
        </Form>
        <div className="w-100 mb-2 position-absolute bottom-0 start-50 translate-middle-x text-white text-center">
          Made by Webskitters Academy| &copy;2024
        </div>
      </div>
    </>
  );
};

export default Signin;
