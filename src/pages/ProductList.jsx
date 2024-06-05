import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import ApiHandler from "../Api/ApiHandler";
import { image } from "../Api/Endpoints";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const ProductList = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  // Pagination logic
  const [page, setPage] = useState(1);
  const perPage = 10;

  // Fetch all products
  const { data, isError, isLoading } = useQuery({
    queryKey: ["products", page, perPage],
    queryFn: () => ApiHandler.fetchProducts({ page, perPage }),
    keepPreviousData: true,
  });

  // Handle delete mutation
  const deleteMutation = useMutation({
    mutationFn: ({ id }) => ApiHandler.deleteProduct(id),
    onSuccess: () => {
      toast.success("Product deleted successfully");
      queryClient.invalidateQueries(["products"]);
    },
    onError: () => {
      toast.error("Error deleting product");
    },
  });

  // Handle delete
  const handleDelete = (id) => {
    deleteMutation.mutate({ id });
  };

  // Handle update
  const handleUpdate = (productId) => {
    navigate(`/editProduct/${productId}`);
  };

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error loading products</p>;

  // Pagination logic
  const handleNextPage = () => {
    if (page < data.totalPages) {
      setPage((prevPage) => prevPage + 1);
    } else {
      toast.info("You're on the last page");
    }
  };

  const handlePreviousPage = () => {
    if (page > 1) {
      setPage((prevPage) => prevPage - 1);
    } else {
      toast.info("You're on the first page");
    }
  };

  return (
    <div className="container mt-5">
      <Link className="btn btn-success mb-3" to="/createProduct">
        Create Product
      </Link>
      <h2 className="text-center text-info">Product List</h2>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Status</th>
            <th>Image</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.data.map((product) => (
            <tr key={product._id}>
              <td>{product.title}</td>
              <td>{product.description}</td>
              <td>{product.status}</td>
              <td>
                {product.image ? (
                  <img
                    src={image(product.image)}
                    alt={product.title}
                    style={{
                      width: "100px",
                      height: "100px",
                      objectFit: "cover",
                    }}
                  />
                ) : (
                  "No image available"
                )}
              </td>
              <td>
                <div className="d-flex">
                  <button
                    className="btn btn-danger me-2"
                    onClick={() => handleDelete(product._id)}
                  >
                    Delete
                  </button>
                  <button
                    className="btn btn-warning"
                    onClick={() => handleUpdate(product._id)}
                  >
                    Update
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="d-flex justify-content-between">
        <button
          className="btn btn-primary"
          onClick={handlePreviousPage}
          disabled={page === 1}
        >
          Previous
        </button>
        <span>
          Page {page} of {data.totalPages}
        </span>
        <button
          className="btn btn-primary"
          onClick={handleNextPage}
          disabled={page === data.totalPages}
        >
          Next
        </button>
      </div>
      <ToastContainer />
    </div>
  );
};

export default ProductList;
