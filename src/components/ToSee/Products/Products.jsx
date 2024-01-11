import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getProducts } from '../../../features/Promises/product/productSlice';
import { useNavigate } from 'react-router-dom';
import Searcher from './Searcher/Searcher';

const Products = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { products } = useSelector((state) => state.product);
  const itemsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  const indexOfLastProduct = currentPage * itemsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
  const currentProducts = products ? products.slice(indexOfFirstProduct, indexOfLastProduct) : [];

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const onClick = (id) => {
    navigate(`/productInd/${id}`);
  };

  return (
    <div className="container mt-5">
      <div>
        <Searcher />
      </div>
      <div>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Modelo</th>
              <th scope="col">Número</th>
            </tr>
          </thead>
          <tbody>
            {currentProducts &&
              currentProducts.map((product) => (
                <tr onClick={() => onClick(product._id)} key={product._id}>
                  <td>{product.modelName}</td>
                  <td>{product.number}</td>
                </tr>
              ))}
          </tbody>
        </table>
        <ul className="pagination">
        {Array.from({ length: Math.ceil(products.length / itemsPerPage) }).map((_, index) => (
           <li key={index + 1} className={`page-item ${index + 1 === currentPage ? 'active' : ''}`}>
             <a className="page-link" onClick={() => paginate(index + 1)} href="#">
               {index + 1}
             </a>
           </li>
         ))}
        </ul>
      </div>
    </div>
  );
};

export default Products;
