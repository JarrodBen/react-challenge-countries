import React, { useRef, useEffect, useState } from 'react'
import { useGlobalContext } from './Context'
import { Link, useHistory, useLocation } from "react-router-dom"

export const Detail = ({ match }) => {   
    const history = useHistory()
    const location = useLocation()
    const { AllCountries, setSearchFilter, setRegionFilter } = useGlobalContext()
    const [flag, setFlag] = useState('')
    const [name, setName] = useState('')
    const [nativeName, setNativeName] = useState('')
    const [population, setPopulation] = useState(0)
    const [region, setRegion] = useState('')
    const [subregion, setSubregion] = useState('')
    const [capital, setCapital] = useState('')
    const [topleveldomain, setTopleveldomain] = useState('')
    const [currencyName, setCurrencyName] = useState('')
    const [languagesStr, setLanguagesStr] = useState('')
    const [borderCountries, setBorderCountries] = useState('')
    const selectedCountry = useRef(null)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        
        fetch(`https://restcountries.eu/rest/v2/all`)
            .then(response => response.json())
            .then(data => {
                AllCountries.current = data
                selectedCountry.current = AllCountries.current.filter(item => item.name === match.params.name)[0]
                console.log(selectedCountry.current)
                setName(selectedCountry.current.name)
                setFlag(selectedCountry.current.flag)
                setNativeName(selectedCountry.current.nativeName)
                setPopulation(selectedCountry.current.population)
                setRegion(selectedCountry.current.region)
                setSubregion(selectedCountry.current.subregion)
                setCapital(selectedCountry.current.capital)
                setTopleveldomain(selectedCountry.current.topleveldomain)
                setCurrencyName(selectedCountry.current.currencies[0].name)
                setLanguagesStr(selectedCountry.current.languages.map(lang => lang.name).join(', '))
                let borders = selectedCountry.current.borders
                
                setBorderCountries(AllCountries
                    .current
                    .filter(item => {
                        let isBorder = false
                        borders.forEach(border => {
                            if (border === item.alpha3Code) isBorder = true
                        })
                        if (isBorder) return true
                        else return false
                    })
                    .map(item => item.name))
                
                console.log(borderCountries)
                setIsLoading(false)
                console.log('completed')
            })
            .catch(error => console.log(error))
    }, [match.params])

    if (isLoading) return <section className="container dark-container"></section>

    return (
        <section className="container dark-container">
            <div className="detail-country-container">
                <div className="back-btn-container">
                    <Link to="/">
                        <button className="dark-element dark-shadow" onClick={() => {
                            setSearchFilter('')
                            setRegionFilter('All')
                        }}>
                            Back
                        </button>
                    </Link>
                </div>
                <div className="detail-wrapper">
                    <div className="detail-country-flag dark-shadow">
                        <img src={flag} alt="" className="detail-flag" />
                    </div>
                    <div className="detail-country-info">
                        <div className="detail-name-div">
                            <h2>{name}</h2>
                        </div>
                        <div className="detail-country-stats">
                            <div className="stats-ul1">
                                <ul>
                                    <li><span className="stats">Native Name:</span> {nativeName}</li>
                                    <li><span className="stats">Population:</span> {population}</li>
                                    <li><span className="stats">Region:</span> {region}</li>
                                    <li><span className="stats">Sub Region:</span> {subregion}</li>
                                    <li><span className="stats">Capital:</span> {capital}</li>
                                </ul>
                            </div>
                            <div className="stats-ul2">
                                <ul>
                                    <li><span className="stats">Top Level Domain:</span> {topleveldomain}</li>
                                    <li><span className="stats">Currencies:</span> {currencyName}</li>
                                    <li><span className="stats">Languages:</span> {languagesStr}</li>
                                </ul>
                            </div>
                        </div>
                        <div className="detail-borders">
                            <h3>Border Countries:</h3>
                            <ul className="borders-list">
                                {
                                    borderCountries.map((name,index) => (
                                        
                                        <button className="dark-element dark-shadow" onClick={() => history.push(`/details/${name}`)}>
                                            {name}
                                        </button>
                                    ))
                                }
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}