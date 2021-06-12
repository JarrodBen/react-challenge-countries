import React, { useState, useContext, useEffect, useRef } from 'react'

const AppContext = React.createContext();

export const AppProvider = ({children}) => {
    const [loading, setLoading] = useState(true)
    const AllCountries = useRef(null)
    const AllRegions = useRef([])

    useEffect(() => {
        fetch('https://restcountries.eu/rest/v2/all')
            .then(response => response.json())
            .then(data => {
                AllCountries.current = data
                AllRegions.current = [
                    ...new Set(
                        AllCountries.current
                            .map(item => item.region)
                            // .filter(item => item !== "")
                            .sort((a,b) => a.localeCompare(b))
                    )
                ]
                setLoading(false)
            })
            .catch(error => console.log(error))
    }, [])
    
    const [searchFilter, setSearchFilter] = useState('')
    const [regionFilter, setRegionFilter] = useState('All')
    
    return (
        <AppContext.Provider value={{
            AllCountries, AllRegions, searchFilter, setSearchFilter, regionFilter, setRegionFilter, loading
        }}>
            {children}
        </AppContext.Provider>
    )
}

export const useGlobalContext = () => {
    return useContext(AppContext)
}

export { AppContext }
