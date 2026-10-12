
import { Link, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'

function PropertyDetail() {
  const { id } = useParams()

  const defaultProperties = [
    {
      id: '1',
      name: 'Cozy Modern Kos',
      location: 'Jakarta, Indonesia',
      price: 'Rp1.500.000',
      rating: '4.8',
      rooms: 5,
      availableRooms: 5,
      status: 'Active',
      image:
        'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267',
      description:
        'Cozy Modern Kos offers a comfortable and convenient place to stay. This property is suitable for students and professionals looking for a peaceful living environment.',
    },
    {
      id: '2',
      name: 'Comfort Living Kos',
      location: 'Yogyakarta, Indonesia',
      price: 'Rp1.200.000',
      rating: '4.8',
      rooms: 3,
      availableRooms: 3,
      status: 'Active',
      image:
        'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267',
      description:
        'Comfort Living Kos provides a convenient living environment for students and professionals in Yogyakarta.',
    },
    {
      id: '3',
      name: 'Premium Stay',
      location: 'Bandung, Indonesia',
      price: 'Rp2.000.000',
      rating: '4.8',
      rooms: 2,
      availableRooms: 2,
      status: 'Active',
      image:
        'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267',
      description:
        'Premium Stay offers a comfortable and modern room for people looking for a quality living experience in Bandung.',
    },
  ]

  const [properties, setProperties] = useState(defaultProperties)

  useEffect(() => {
    const savedProperties = JSON.parse(
      localStorage.getItem('zaiLivingProperties') || '[]'
    )

    const savedPropertiesMap = new Map(
      savedProperties.map((property) => [
        String(property.id),
        property,
      ])
    )

    const mergedDefaultProperties = defaultProperties.map(
      (property) => {
        const savedProperty = savedPropertiesMap.get(
          String(property.id)
        )

        if (!savedProperty) {
          return property
        }

        return {
          ...property,
          ...savedProperty,
          id: String(property.id),
          rating: savedProperty.rating || property.rating,
          availableRooms:
            savedProperty.availableRooms ??
            savedProperty.rooms ??
            property.availableRooms,
          image:
            savedProperty.image || property.image,
          description:
            savedProperty.description ||
            property.description,
        }
      }
    )

    const customProperties = savedProperties
      .filter(
        (property) =>
          !defaultProperties.some(
            (defaultProperty) =>
              String(defaultProperty.id) ===
              String(property.id)
          )
      )
      .map((property) => ({
        ...property,
        id: String(property.id),
        rating: property.rating || 'New',
        availableRooms:
          property.availableRooms ??
          property.rooms ??
          0,
        image:
          property.image ||
          'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267',
        description:
          property.description ||
          'This property offers a comfortable living environment for tenants.',
        status: property.status || 'Active',
      }))

    setProperties([
      ...mergedDefaultProperties,
      ...customProperties,
    ])
  }, [])

  const property = properties.find(
    (item) => String(item.id) === String(id)
  )

  if (!property) {
    return (
      <div className="property-detail">
        <div className="property-container">
          <h1>Property Not Found</h1>

          <Link
            to="/properties"
            className="back-link"
          >
            ← Back to Properties
          </Link>
        </div>
      </div>
    )
  }

  const isActive = property.status === 'Active'
  const hasAvailableRooms = property.availableRooms > 0

  const canApply =
    isActive && hasAvailableRooms

  const encodedLocation = encodeURIComponent(
    property.location
  )

  return (
    <div className="property-detail">
      <div className="property-container">

        {/* Back Link */}
        <Link
          to="/properties"
          className="back-link"
        >
          ← Back to Properties
        </Link>

        {/* Property Header */}
        <div className="property-header">

          <img
            src={property.image}
            alt={property.name}
            className="property-main-image"
          />

          {/* Property Information */}
          <div className="property-info">

            <span
              className={`property-badge ${
                !isActive ? 'inactive' : ''
              }`}
            >
              {!isActive
                ? 'Inactive'
                : hasAvailableRooms
                  ? 'Available'
                  : 'Fully Booked'}
            </span>

            <p className="available-rooms">
              🛏️ {property.availableRooms} rooms available
            </p>

            <h1>{property.name}</h1>

          <p className="property-address">
            📍 {property.location}
          </p>
            <div className="property-rating">
              ★ {property.rating}

              <span>
                {property.rating === 'New'
                  ? ' New property'
                  : ' Excellent rating'}
              </span>
            </div>

            <div className="property-price">
              <h2>{property.price}</h2>

              <p className="price-period">
                per month
              </p>
            </div>

            {canApply ? (
              <Link
                to={`/apply/${property.id}`}
                className="apply-btn"
              >
                Apply for This Room
              </Link>
            ) : (
              <button
                className="apply-btn disabled"
                disabled
              >
                {!isActive
                  ? 'Property Inactive'
                  : 'Fully Booked'}
              </button>
            )}

          </div>
        </div>

        {/* Property Content */}
        <div className="property-content">

          {/* About Property */}
          <section className="property-section">
            <h2>About This Property</h2>

            <p>{property.description}</p>
          </section>

          {/* Facilities */}
          <section className="property-section">
            <h2>Facilities</h2>

            <div className="facilities">
              <span>🛏️ Furnished Room</span>
              <span>📶 Free WiFi</span>
              <span>🚿 Private Bathroom</span>
              <span>🅿️ Parking Area</span>
              <span>❄️ Air Conditioning</span>
              <span>🔒 24/7 Security</span>
            </div>
          </section>

          {/* Property Information */}
          <section className="property-section">
            <h2>Property Information</h2>

            <div className="property-details-grid">

              <div>
                <strong>Room Type</strong>
                <p>Private Room</p>
              </div>

              <div>
                <strong>Room Size</strong>
                <p>3 × 4 meters</p>
              </div>

              <div>
                <strong>Gender</strong>
                <p>Mixed</p>
              </div>

              <div>
                <strong>Minimum Stay</strong>
                <p>1 Month</p>
              </div>

            </div>
          </section>

          {/* Location */}
          <section className="location-section">

            <div className="location-heading">
              <div>
                <span className="section-eyebrow">
                  LOCATION
                </span>

                <h2>Find Us Here</h2>
              </div>

              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodedLocation}`}
                target="_blank"
                rel="noreferrer"
                className="maps-link"
              >
                Open in Google Maps ↗
              </a>
            </div>

            <p className="location-address">
              📍 {property.location}
            </p>

            <div className="map-wrapper">
              <iframe
                title={`${property.name} Location`}
                src={`https://www.google.com/maps?q=${encodedLocation}&output=embed`}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>

          </section>

        </div>
      </div>
    </div>
  )
}

export default PropertyDetail