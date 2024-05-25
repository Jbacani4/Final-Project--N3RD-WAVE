import React, { createContext, useState } from 'react';

export const DataContext = createContext({});

const DataProvider = ({ children }) => {
  const [userId, setUserId] = useState('');
  const [creatorId, setCreatorId] = useState('');
  const [visitProfile, setVisitProfile] =useState(false);

  return (
    <DataContext.Provider value={{ userId, setUserId, creatorId, setCreatorId, visitProfile, setVisitProfile }}>
      {children}
    </DataContext.Provider>
  );
};

export default DataProvider;
