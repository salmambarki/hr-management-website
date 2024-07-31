import React from 'react';
import { Link } from 'react-router-dom';

const headerStyles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    backgroundColor: '#343a40',
    padding: '1rem',
    height: '100vh', // Full height of the viewport
    position: 'fixed', // Fix the position to the left
    top: 0,
    left: 0,
    width: '250px', // Set a width for the sidebar
  },
  link: {
    color: '#fff',
    marginBottom: '1rem',
    textDecoration: 'none',
    width: '100%', // Ensure full width for links
    padding: '0.5rem',
  },
  linkHover: {
    color: '#007bff',
  }
};

const HeaderUserComponent = ({ employeeId }) => {
  return (
    <header>
      <div style={headerStyles.container}>
        <Link
          to={`/profiluser/${employeeId}`}
          className="navbar-brand"
          style={headerStyles.link}
          onMouseOver={(e) => e.currentTarget.style.color = headerStyles.linkHover.color}
          onMouseOut={(e) => e.currentTarget.style.color = headerStyles.link.color}
        >
          Profile
        </Link>
        <Link
          to={`/leave-management/${employeeId}`}
          className="navbar-brand"
          style={headerStyles.link}
          onMouseOver={(e) => e.currentTarget.style.color = headerStyles.linkHover.color}
          onMouseOut={(e) => e.currentTarget.style.color = headerStyles.link.color}
        >
           request
        </Link>
        <Link
          to={`/liste-leave/${employeeId}`}
          className="navbar-brand"
          style={headerStyles.link}
          onMouseOver={(e) => e.currentTarget.style.color = headerStyles.linkHover.color}
          onMouseOut={(e) => e.currentTarget.style.color = headerStyles.link.color}
        >
          my requests
        </Link>
        <Link
          to="/"
          className="navbar-brand"
          style={headerStyles.link}
          onMouseOver={(e) => e.currentTarget.style.color = headerStyles.linkHover.color}
          onMouseOut={(e) => e.currentTarget.style.color = headerStyles.link.color}
        >
          Disconnect
        </Link>
      </div>
    </header>
  );
}

export default HeaderUserComponent;
