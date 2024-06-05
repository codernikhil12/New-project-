import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import ApiHandler from "../Api/ApiHandler";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate, useParams } from "react-router-dom";

const EditProduct = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const queryClient = useQueryClient();

  //fetch product by Id
  const { data, isError, isLoading } = useQuery({
    queryKey: ["products", id],
    queryFn: () => ApiHandler.fetchProductDetail(id),
  });

  //  console.log(data)
  //Upadate method

  const { mutate } = useMutation({
    mutationFn: ApiHandler?.updateProduct,
    onSuccess: (response) => {
      if (response?.status === 200) {
        toast.success(response?.message, {
          onClose: () => navigate("/productList"),
        });
        queryClient.invalidateQueries({ queryKey: ["products"] });
      } else {
        toast.error(response?.message);
      }
    },
  });

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const [img, setImg] = useState(null);

  const onSubmit = (data) => {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("description", data.description);
    if (img) {
      formData.append("image", img);
    }
    formData.append("id", id);
    mutate(formData);
  };

  //for show data in the input box
  useEffect(() => {
    if (!isLoading && !isError && data) {
      setValue("title", data.title);
      setValue("description", data.description);
    }
  }, [data, setValue, isLoading, isError]);

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error loading product details</p>;

  return (
    <>
      <div className="container mt-5">
        <h2 className="text-center text-info">Edit Product</h2>
        <form
          className="shadow p-4 bg-white rounded"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="mb-3">
            <label htmlFor="title" className="form-label">
              Title
            </label>
            <input
              type="text"
              name="title"
              className="form-control"
              id="title"
              {...register("title", { required: true })}
            />
            {errors.title && <span>This field is required</span>}
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">
              Description
            </label>
            <textarea
              name="description"
              className="form-control"
              id="description"
              rows="3"
              {...register("description", { required: true })}
            />
            {errors.description && <span>This field is required</span>}
          </div>
          <div className="mb-3">
            <label htmlFor="image" className="form-label">
              Image
            </label>
            <input
              type="file"
              onChange={(e) => setImg(e.target.files[0])}
              accept="image/*"
              className="form-control"
            />
            {img && (
              <img
                style={{ height: "180px", marginTop: "10px" }}
                src={URL.createObjectURL(img)}
                alt="Preview"
                className="upload-img"
              />
            )}
          </div>
          <button type="submit" className="btn btn-primary">
            Update
          </button>
        </form>
      </div>
      <ToastContainer />
    </>
  );
};

export default EditProduct;
