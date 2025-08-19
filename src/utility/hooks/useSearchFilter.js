import { useState } from 'react'

const useFilter = (originalData = [], filterKeys = []) => {
  const [searchValue, setSearchValue] = useState('')
  const [filteredData, setFilteredData] = useState([])

  const handleFilter = e => {
    const value = e.target.value.toLowerCase()
    setSearchValue(value)

    if (value.trim().length === 0) {
      setFilteredData([])
      return
    }

    const keysToSearch = filterKeys.length ? filterKeys : Object.keys(originalData[0] || {})

    const filtered = originalData.filter(item =>
      keysToSearch.some(key => {
        const val = item[key]
        return val && val.toString().toLowerCase().includes(value)
      })
    )

    setFilteredData(filtered)
  }

  return {
    searchValue,
    filteredData,
    handleFilter
  }
}

export default useFilter
