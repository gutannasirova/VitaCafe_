// // context/AuthContext.js
// import React, { createContext, useState } from "react";

// export const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [token, setToken] = useState(null);
//   const [userId, setUserId] = useState(null);

//   return (
//     <AuthContext.Provider value={{ token, setToken, userId, setUserId }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };