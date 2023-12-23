import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <ul className="navbar-nav">
        <li className="nav-item">
          <Link to="/" className="nav-link">Home</Link>
        </li>
        <li className="nav-item dropdown">
          <span className="nav-link dropdown-toggle" id="pedidosDropdown" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            Nuevo
          </span>
          <ul className="dropdown-menu" aria-labelledby="pedidosDropdown">
            <li className="nav-item">
              <Link to="/create/order" className="dropdown-item">Pedido</Link>
            </li>
            <li className="nav-item">
              <Link to="/create/product" className="dropdown-item">Producto</Link>
            </li>
            <li className="nav-item">
              <Link to="/create/rawMaterial" className="dropdown-item">Materia prima</Link>
            </li>
            <li className="nav-item">
              <Link to="/create/operationToFollow" className="dropdown-item">Operación</Link>
            </li>
            <li className="nav-item">
              <Link to="/create/contact" className="dropdown-item">Contacto</Link>
            </li>
          </ul>
        </li>

        <li className="nav-item dropdown">
          <span className="nav-link dropdown-toggle" id="productosDropdown" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            Buscar
          </span>
          <ul className="dropdown-menu" aria-labelledby="productosDropdown">
          <li className="nav-item">
              <Link to="/see/contacts" className="dropdown-item">Contactos</Link>
            </li>
            <li className="nav-item">
              <Link to="/productos/crear" className="dropdown-item">Pedido</Link>
            </li>
            <li className="nav-item">
              <Link to="/productos/actualizar" className="dropdown-item">Producto</Link>
            </li>
            <li className="nav-item">
              <Link to="/see/rawMaterials" className="dropdown-item">Materias primas</Link>
            </li>
            <li className="nav-item">
              <Link to="/see/operations" className="dropdown-item">Operación</Link>
            </li>
          </ul>
        </li>

      </ul>
    </nav>
  );
};

export default NavBar;
