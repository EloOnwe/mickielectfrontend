import React from "react";
import "../styles/admin.css";
import { Link, Outlet } from "react-router-dom";

const AdminPage = () => {
  return (
    <div className="admin-page">
      <aside>
        <nav>
          <ul>
            <li>
              <Link to="/admin/createproduct">Add Product</Link>
            </li>
            <li>
              <Link to="/admin/allproducts">All Products</Link>
            </li>
          </ul>
        </nav>
      </aside>
      <div className="admin-pages">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminPage;
