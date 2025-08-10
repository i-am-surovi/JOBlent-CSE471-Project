import { createContext, useState } from 'react'

export const AppContext = createContext()

export const AppContextProvider = ({ children }) => {
    // Add the missing state and functions that Hero component needs
    const [searchFilter, setSearchFilter] = useState({ title: '', location: '' })
    const [isSearched, setISSearched] = useState(false)
    
    // Add any other state you need for your app
    const [user, setUser] = useState(null)
    const [jobs, setJobs] = useState([])

    const value = {
        // Search functionality
        searchFilter,
        setSearchFilter,
        isSearched,
        setISSearched, // Note: keeping your naming convention
        
        // Other app state
        user,
        setUser,
        jobs,
        setJobs,
    }

    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    )
}
    
