
import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'

function ApplyRoom() {
  const { id } = useParams()

const currentUser = JSON.parse(
  localStorage.getItem('zaiLivingCurrentUser') || 'null'
)

  const today = new Date().toISOString().split('T')[0]

  const [isSubmitted, setIsSubmitted] = useState(false)
  const [applicationId, setApplicationId] = useState('')

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    moveInDate: '',
    rentalDuration: '',
    roomType: '',
    message: '',
  })

  const defaultProperties = [
    {
      id: '1',
      name: 'Cozy Modern Kos',
      location: 'Jakarta, Indonesia',
      price: 'Rp1.500.000',
      availableRooms: 5,
      status: 'Active',
    },
    {
      id: '2',
      name: 'Comfort Living Kos',
      location: 'Yogyakarta, Indonesia',
      price: 'Rp1.200.000',
      availableRooms: 3,
      status: 'Active',
    },
    {
      id: '3',
      name: 'Premium Stay',
      location: 'Bandung, Indonesia',
      price: 'Rp2.000.000',
      availableRooms: 2,
      status: 'Active',
    },
  ]

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
        price: savedProperty.price || property.price,
        availableRooms:
          savedProperty.availableRooms ??
          savedProperty.rooms ??
          property.availableRooms,
        status: savedProperty.status || property.status,
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
      price: property.price || 'Price not available',
      availableRooms:
        property.availableRooms ??
        property.rooms ??
        0,
      status: property.status || 'Active',
    }))

  const properties = [
    ...mergedDefaultProperties,
    ...customProperties,
  ]

  const property = properties.find(
    (item) => String(item.id) === String(id)
  )

  const isActive = property?.status === 'Active'
  const hasAvailableRooms =
    Number(property?.availableRooms || 0) > 0

  const canApply = isActive && hasAvailableRooms

  function handleChange(event) {
    const { name, value } = event.target

    if (name === 'phone') {
      const phoneValue = value.replace(/[^\d+\s-]/g, '')

      if (phoneValue.indexOf('+') > 0) {
        return
      }

      setFormData((previous) => ({
        ...previous,
        [name]: phoneValue,
      }))

      return
    }

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }))
  }

  function handleSubmit(event) {
    event.preventDefault()

    if (!canApply) {
      return
    }

    const newApplicationId = `ZL-${Date.now()
      .toString()
      .slice(-6)}`

    const newApplication = {
      id: newApplicationId,
      userId: currentUser?.id || null,
      propertyId: property.id,
      propertyName: property.name,
      propertyLocation: property.location,
      propertyPrice: property.price,
      ...formData,
      status: 'Pending Review',
      submittedAt: new Date().toISOString(),
    }

    const existingApplications = JSON.parse(
      localStorage.getItem('zaiLivingApplications') || '[]'
    )

    localStorage.setItem(
      'zaiLivingApplications',
      JSON.stringify([
        ...existingApplications,
        newApplication,
      ])
    )

    setApplicationId(newApplicationId)
    setIsSubmitted(true)
  }

  if (!property) {
    return (
      <div className="apply-page">
        <div className="apply-container">
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

  if (!canApply) {
    return (
      <div className="apply-page">
        <div className="apply-container">
          <Link
            to={`/property/${property.id}`}
            className="back-link"
          >
            ← Back to Property
          </Link>

          <div className="apply-card">
            <div className="apply-header">
              <h1>Application Unavailable</h1>

              <p>
                This property is currently unavailable
                for new applications.
              </p>
            </div>

            <div className="selected-property">
              <h3>{property.name}</h3>

              <p>📍 {property.location}</p>

              <strong>{property.price}</strong>

              <p>
                Status:{' '}
                <strong>
                  {!isActive
                    ? 'Inactive'
                    : 'Fully Booked'}
                </strong>
              </p>
            </div>

            <Link
              to="/properties"
              className="success-btn"
            >
              Browse Other Properties
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="apply-page">
      <div className="apply-container">

        <Link
          to={`/property/${property.id}`}
          className="back-link"
        >
          ← Back to Property
        </Link>

        <div className="apply-card">

          <div className="apply-header">
            <h1>Apply for a Room</h1>

            <p>
              Submit your application to rent this room.
            </p>
          </div>

          <div className="selected-property">
            <h3>{property.name}</h3>

            <p>📍 {property.location}</p>

            <strong>
              {property.price.includes('/ month')
                ? property.price
                : `${property.price} / month`}
            </strong>
          </div>

          {isSubmitted ? (
            <div className="success-message">

              <h3>
                Application Submitted Successfully!
              </h3>

              <p>
                Thank you for submitting your application.
                The property owner will review your request.
              </p>

              <div className="application-status">

                <div className="summary-item">
                  <span>Application ID</span>
                  <strong>{applicationId}</strong>
                </div>

                <div className="summary-item">
                  <span>Status</span>
                  <strong>Pending Review</strong>
                </div>

                <div className="summary-item">
                  <span>Property</span>
                  <strong>{property.name}</strong>
                </div>

              </div>

              <div className="success-actions">

                <Link
                  to="/properties"
                  className="success-btn"
                >
                  Browse More Properties
                </Link>

   

              </div>
            </div>
          ) : (
            <form
              className="application-form"
              onSubmit={handleSubmit}
            >

              <div className="form-group">
                <label htmlFor="fullName">
                  Full Name
                </label>

                <input
                  id="fullName"
                  type="text"
                  name="fullName"
                  placeholder="Enter your full name"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="rentalDuration">
                  Rental Duration
                </label>

                <select
                  id="rentalDuration"
                  name="rentalDuration"
                  value={formData.rentalDuration}
                  onChange={handleChange}
                  required
                >
                  <option value="">
                    Select rental duration
                  </option>

                  <option value="1 Month">
                    1 Month
                  </option>

                  <option value="3 Months">
                    3 Months
                  </option>

                  <option value="6 Months">
                    6 Months
                  </option>

                  <option value="12 Months">
                    12 Months
                  </option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="roomType">
                  Room Type
                </label>

                <select
                  id="roomType"
                  name="roomType"
                  value={formData.roomType}
                  onChange={handleChange}
                  required
                >
                  <option value="">
                    Select room type
                  </option>

                  <option value="Standard Room">
                    Standard Room
                  </option>

                  <option value="Deluxe Room">
                    Deluxe Room
                  </option>

                  <option value="Premium Room">
                    Premium Room
                  </option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="email">
                  Email Address
                </label>

                <input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="phone">
                  Phone Number
                </label>

                <input
                  id="phone"
                  type="tel"
                  name="phone"
                  placeholder="Enter your phone number"
                  value={formData.phone}
                  onChange={handleChange}
                  inputMode="tel"
                  pattern="^\+?[0-9\s-]{8,15}$"
                  title="Enter a valid phone number"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="moveInDate">
                  Move-in Date
                </label>

                <input
                  id="moveInDate"
                  type="date"
                  name="moveInDate"
                  value={formData.moveInDate}
                  onChange={handleChange}
                  min={today}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="message">
                  Message
                </label>

                <textarea
                  id="message"
                  name="message"
                  placeholder="Write a message to the property owner"
                  rows="5"
                  value={formData.message}
                  onChange={handleChange}
                ></textarea>
              </div>

              <div className="application-summary">
                <h3>Application Summary</h3>

                <div className="summary-item">
                  <span>Property</span>
                  <strong>{property.name}</strong>
                </div>

                <div className="summary-item">
                  <span>Location</span>
                  <strong>{property.location}</strong>
                </div>

                <div className="summary-item">
                  <span>Price</span>
                  <strong>{property.price}</strong>
                </div>

                <div className="summary-item">
                  <span>Room Type</span>
                  <strong>
                    {formData.roomType || 'Not selected'}
                  </strong>
                </div>

                <div className="summary-item">
                  <span>Rental Duration</span>
                  <strong>
                    {formData.rentalDuration ||
                      'Not selected'}
                  </strong>
                </div>

                <div className="summary-item">
                  <span>Move-in Date</span>
                  <strong>
                    {formData.moveInDate || 'Not selected'}
                  </strong>
                </div>
              </div>

              <button
                type="submit"
                className="submit-application"
              >
                Submit Application
              </button>

            </form>
          )}

        </div>
      </div>
    </div>
  )
}

export default ApplyRoom