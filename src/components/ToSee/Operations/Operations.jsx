import React,{ useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { getOTF} from '../../../features/Promises/operationToFollow/operationToFollowSlice';
import { useNavigate } from 'react-router-dom';
import Searcher from './Searcher/Searcher';
const Operations = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { operationsTF } = useSelector((state) => state.operationToFollow);
    const itemsPerPage = 5;
    const [currentPage, setCurrentPage] = useState(1);
  
    useEffect(() => {
      dispatch(getOTF());
    }, []);
    const indexOfLastOTF = currentPage * itemsPerPage;
    const indexOfFirstOTF = indexOfLastOTF - itemsPerPage;
    const currentOTF = operationsTF.slice(indexOfFirstOTF, indexOfLastOTF);
    const paginate = (pageNumber) => setCurrentPage(pageNumber);
    const onClick = (id) => {
      navigate(`/operationInd/${id}`);
    };
    return (
        <div className="container mt-5">
          <div>
            <Searcher />
          </div>
          <h1>Operaciones</h1>
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Código operación</th>
                <th scope="col">Nombre</th>
                <th scope="col">Precio/h(€)</th>
              </tr>
            </thead>
            <tbody>
              {currentOTF.map((OTF) => (
                <tr onClick={() => onClick(OTF._id)} key={OTF._id}>
                  <td>{OTF.codeOperation}</td>
                  <td>{OTF.name}</td>
                  <td>{OTF.priceHourEur}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <nav aria-label="Page navigation">
            <ul className="pagination">
              {Array.from({ length: Math.ceil(operationsTF.length / itemsPerPage) }).map((_, index) => (
                <li key={index + 1} className={`page-item ${index + 1 === currentPage ? 'active' : ''}`}>
                  <a className="page-link" onClick={() => paginate(index + 1)} href="#">
                    {index + 1}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      );
}

export default Operations
