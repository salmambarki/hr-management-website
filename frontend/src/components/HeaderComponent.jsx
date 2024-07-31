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

const HeaderComponent = () => {
  return (
    <header>
      <div style={headerStyles.container}>
        <Link
          to="/users"
          className="navbar-brand"
          style={headerStyles.link}
          onMouseOver={(e) => e.currentTarget.style.color = headerStyles.linkHover.color}
          onMouseOut={(e) => e.currentTarget.style.color = headerStyles.link.color}
        >
          Admin Management
        </Link>
        <Link
          to="/employees"
          className="navbar-brand"
          style={headerStyles.link}
          onMouseOver={(e) => e.currentTarget.style.color = headerStyles.linkHover.color}
          onMouseOut={(e) => e.currentTarget.style.color = headerStyles.link.color}
        >
          Employees Management
        </Link>
        <Link
          to="/roles"
          className="navbar-brand"
          style={headerStyles.link}
          onMouseOver={(e) => e.currentTarget.style.color = headerStyles.linkHover.color}
          onMouseOut={(e) => e.currentTarget.style.color = headerStyles.link.color}
        >
          Roles Management
        </Link>
        <Link
          to="/departments"
          className="navbar-brand"
          style={headerStyles.link}
          onMouseOver={(e) => e.currentTarget.style.color = headerStyles.linkHover.color}
          onMouseOut={(e) => e.currentTarget.style.color = headerStyles.link.color}
        >
          Department Management
        </Link>
        <Link
          to="/leave-management"
          className="navbar-brand"
          style={headerStyles.link}
          onMouseOver={(e) => e.currentTarget.style.color = headerStyles.linkHover.color}
          onMouseOut={(e) => e.currentTarget.style.color = headerStyles.link.color}
        >
          leave management
        </Link>
        <Link
          to="/"
          className="navbar-brand"
          style={headerStyles.link}
          onMouseOver={(e) => e.currentTarget.style.color = headerStyles.linkHover.color}
          onMouseOut={(e) => e.currentTarget.style.color = headerStyles.link.color}
        >
          disconnect
        </Link>
      </div>
    </header>
  );
}

export default HeaderComponent;
