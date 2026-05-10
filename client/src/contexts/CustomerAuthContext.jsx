import { createContext, useContext, useState } from 'react';

const CustomerAuthContext = createContext(null);

export function CustomerAuthProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem('customerToken'));
  const [customer, setCustomer] = useState(() => {
    const stored = localStorage.getItem('customerData');
    return stored ? JSON.parse(stored) : null;
  });

  const login = (tokenValue, customerData) => {
    localStorage.setItem('customerToken', tokenValue);
    localStorage.setItem('customerData', JSON.stringify(customerData));
    setToken(tokenValue);
    setCustomer(customerData);
  };

  const logout = () => {
    localStorage.removeItem('customerToken');
    localStorage.removeItem('customerData');
    setToken(null);
    setCustomer(null);
  };

  const isLoggedIn = !!token;

  return (
    <CustomerAuthContext.Provider value={{ token, customer, login, logout, isLoggedIn }}>
      {children}
    </CustomerAuthContext.Provider>
  );
}

export const useCustomerAuth = () => useContext(CustomerAuthContext);
