import React, { createContext, useState } from 'react'
export const DataContext = createContext({})


const DataProvider = ({children}) => {
  const [userId, setUserId] = useState('')
    return (
    <DataContext.Provider value={{userId, setUserId}}> 
        {children}
    </DataContext.Provider>
  )
}

export default DataProvider