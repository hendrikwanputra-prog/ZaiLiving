
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

function Properties() {
  const [location, setLocation] = useState('All')
  const [search, setSearch] = useState('')
  const [priceRange, setPriceRange] = useState('All')
  const [properties, setProperties] = useState([])

  const defaultProperties = [
    {
      id: 1,
      name: 'Cozy Modern Kos',
      location: 'Jakarta, Indonesia',
      price: 'Rp1.500.000 / month',
      rating: '4.8',
      rooms: 5,
      status: 'Active',
      image:
        'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267',
    },
    {
      id: 2,
      name: 'Comfort Living Kos',
      location: 'Yogyakarta, Indonesia',
      price: 'Rp1.200.000 / month',
      rating: '4.8',
      rooms: 3,
      status: 'Active',
      image:
        'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267',
    },
    {
      id: 3,
      name: 'Premium Stay',
      location: 'Bandung, Indonesia',
      price: 'Rp2.000.000 / month',
      rating: '4.8',
      rooms: 2,
      status: 'Active',
      image:
        'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267',
    },
  ]

  useEffect(() => {
    const savedProperties = JSON.parse(
      localStorage.getItem('zaiLivingProperties') || '[]'
    )

    const mergedProperties = defaultProperties.map(
      (defaultProperty) => {
        const savedProperty = savedProperties.find(
          (property) =>
            String(property.id) === String(defaultProperty.id)
        )

        return savedProperty
          ? {
              ...defaultProperty,
              ...savedProperty,
            }
          : defaultProperty
      }
    )

    const customProperties = savedProperties
      .filter(
        (property) =>
          !defaultProperties.some(
            (defaultProperty) =>
              String(defaultProperty.id) === String(property.id)
          )
      )
      .map((property) => ({
        ...property,
        price: property.price?.includes('/ month')
          ? property.price
          : `${property.price} / month`,
        rating: property.rating || 'New',
        status: property.status || 'Active',
        image:
          property.image ||
          'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267',
      }))

    const allProperties = [
      ...mergedProperties,
      ...customProperties,
    ].map((property) => ({
      ...property,
      price: property.price?.includes('/ month')
        ? property.price
        : `${property.price} / month`,
      rating: property.rating || 'New',
      status: property.status || 'Active',
      image:
        property.image ||
        'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267',
    }))

    setProperties(allProperties)
  }, [])

  const handleResetFilters = () => {
  setLocation('All')
  setSearch('')
  setPriceRange('All')
}

  const filteredProperties = properties.filter((property) => {
    const keyword = search.toLowerCase().trim()

    const isActive = property.status === 'Active'

    const matchesSearch =
      property.name.toLowerCase().includes(keyword) ||
      property.location.toLowerCase().includes(keyword)

    const matchesLocation =
      location === 'All' ||
      property.location
        .toLowerCase()
        .includes(location.toLowerCase())

    const numericPrice = Number(
      String(property.price).replace(/[^0-9]/g, '')
    )

    const matchesPrice =
      priceRange === 'All' ||
      (priceRange === 'under1500' &&
        numericPrice <= 1500000) ||
      (priceRange === '1500to2000' &&
        numericPrice > 1500000 &&
        numericPrice <= 2000000) ||
      (priceRange === 'above2000' &&
        numericPrice > 2000000)

    return (
      isActive &&
      matchesSearch &&
      matchesLocation &&
      matchesPrice
    )
  })

  return (
    <div className="properties-page">
      <div className="properties-container">
     

        <div className="properties-header">
          <h1>Find Your Perfect Kos</h1>

          <p>
            Explore comfortable places to stay
            that match your needs.
          </p>
        </div>

        <div className="search-container">
          <div className="filter-container">
            <select
              value={location}
              onChange={(event) =>
                setLocation(event.target.value)
              }
              className="location-filter"
            >
              <option value="All">
                All Locations
              </option>

              <option value="Jakarta">
                Jakarta
              </option>

              <option value="Yogyakarta">
                Yogyakarta
              </option>

              <option value="Bandung">
                Bandung
              </option>
            </select>

            <select
              value={priceRange}
              onChange={(event) =>
                setPriceRange(event.target.value)
              }
              className="price-filter"
            >
              <option value="All">
                All Prices
              </option>

              <option value="under1500">
                Under Rp1.500.000
              </option>

              <option value="1500to2000">
                Rp1.500.000 - Rp2.000.000
              </option>

              <option value="above2000">
                Above Rp2.000.000
              </option>
            </select>
          </div>

          <input
            type="text"
            placeholder="Search kos by name or location..."
            value={search}
            onChange={(event) =>
              setSearch(event.target.value)
            }
            className="search-input"
          />
          <button
            type="button"
            className="reset-filter-btn"
            onClick={handleResetFilters}
          >
            ↻ Reset Filter
          </button>
        </div>

        <div className="properties-list">
          {filteredProperties.length > 0 ? (
            filteredProperties.map((property) => (
              <div
                className="kos-card"
                key={property.id}
              >
                <img
                  className="kos-image"
                  src={property.image}
                  alt={property.name}
                />

                <h3>{property.name}</h3>

                <p>
                  📍 {property.location}
                </p>

                <strong>
                  {property.price}
                </strong>

                {property.rooms !== undefined && (
                  <p>
                    🛏️ {property.rooms} rooms available
                  </p>
                )}

                <div className="kos-rating">
                  ★ {property.rating}
                </div>

                <Link
                  to={`/property/${property.id}`}
                  className="details-btn"
                >
                  View Details
                </Link>
              </div>
            ))
          ) : (
            <div className="no-results">
              <h3>No kos found</h3>

              <p>
                Try searching for another name or location.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Properties