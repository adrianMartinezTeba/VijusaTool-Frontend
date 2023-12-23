import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getRM } from '../../../features/Promises/rawMaterial/rawMaterialSlice';
import { useNavigate } from 'react-router-dom';
import Searcher from './Searcher/Searcher';

const RawMaterials = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { rawMaterials } = useSelector((state) => state.rawMaterial);
  const itemsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    dispatch(getRM());
  }, [dispatch]);

  // Verifica si rawMaterials tiene un valor antes de usar slice
  const currentRM = rawMaterials ? rawMaterials.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage) : [];

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const onClick = (id) => {
    navigate(`/rawMaterialInd/${id}`);
  };

  return (
    <div className="container mt-5">
      <div>
        <Searcher />
      </div>
      <h1>Materias primas</h1>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Forma</th>
            <th scope="col">Material</th>
            <th scope="col">D.Externo</th>
            <th scope="col">D.Interno</th>
            <th scope="col">Precio por 1kg(€)</th>
            <th scope="col">Precio por 1 metro(€)</th>
            {/* <th scope="col">Stock</th> */}
          </tr>
        </thead>
        <tbody>
          {/* Verifica si currentRM tiene un valor antes de realizar el mapeo */}
          {currentRM &&
            currentRM.map((RM) => (
              <tr onClick={() => onClick(RM._id)} key={RM._id}>
                <td>{RM.shape}</td>
                <td>{RM.material}</td>
                <td>{RM.externalDiameter}</td>
                <td>{RM.internalDiameter}</td>
                <td>{RM.priceKg}</td>
                <td>{RM.wheightMeter}</td>
                <td>{RM.priceMeter}</td>
              </tr>
            ))}
        </tbody>
      </table>
      <nav aria-label="Page navigation">
       {
         rawMaterials && 
         <ul className="pagination">
         {Array.from({ length: Math.ceil(rawMaterials.length / itemsPerPage) }).map((_, index) => (
           <li key={index + 1} className={`page-item ${index + 1 === currentPage ? 'active' : ''}`}>
             <a className="page-link" onClick={() => paginate(index + 1)} href="#">
               {index + 1}
             </a>
           </li>
         ))}
       </ul>
       }
      </nav>
    </div>
  );
};

export default RawMaterials;
