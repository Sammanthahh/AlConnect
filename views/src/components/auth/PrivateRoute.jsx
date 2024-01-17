// import React from 'react';
// import { Route, Navigate } from 'react-router-dom';
// import { useAuth } from './AuthContext'; // Update the path to your AuthContext file

// const PrivateRoute = ({ element: Element, roles, ...rest }) => {
//   const { user } = useAuth();

//   if (!user) {
//     // Redirect or show an alert if the user is not logged in
//     return <Navigate to="/" />;
//   }

//   if (roles && roles.indexOf(user.role) === -1) {
//     // Show an alert or redirect if the user doesn't have the required role
//     console.log(user)
//     alert('You must be logged in as an admin.');
//     return <Navigate to="/" />;
//   }

//   return <Route {...rest} element={<Element />} />;
// };

// export default PrivateRoute;


// PrivateRoute.jsx

// PrivateRoute.jsx

// import React from 'react';
// import { Route, Navigate, Routes, Link } from 'react-router-dom';
// import { useAuth } from './AuthContext'; // Update the path to your AuthContext file

// const PrivateRoute = ({ element: Element, roles, ...rest }) => {
//   const { user } = useAuth();

//   if (!user) {
//     // Redirect or show an alert if the user is not logged in
//     return <Navigate to="/" />;
//   }

//   if (roles && roles.indexOf(user.role) === -1) {
//     // Show an alert or redirect if the user doesn't have the required role
//     console.log(user);
//     alert('You must be logged in as an admin.');
//     return (
//       <div>
//         <p>You must be logged in as an admin.</p>
//         <Link to="/">Go back to Home</Link>
//       </div>
//     );
//   }

//   return (
//     <Routes>
//       <Route {...rest} element={<Element />} />
//     </Routes>
//   );
// };

// export default PrivateRoute;

// PrivateRoute.jsx

import React from 'react';
import { Route, Navigate, Routes } from 'react-router-dom';
import { useAuth } from './AuthContext'; // Update the path to your AuthContext file

const PrivateRoute = ({ element: Element, roles, ...rest }) => {
  const { user } = useAuth();

  if (!user) {
    // Redirect or show an alert if the user is not logged in
    return <Navigate to="/" />;
  }

  if (roles && roles.indexOf(user.role) === -1) {
    // Show an alert or redirect if the user doesn't have the required role
    console.log(user);
    alert('You must be logged in as an admin.');
    return <Navigate to="/" />;
  }

  return (
    <Routes>
      <Route {...rest} element={<Element />} />
    </Routes>
  );
};

export default PrivateRoute;

