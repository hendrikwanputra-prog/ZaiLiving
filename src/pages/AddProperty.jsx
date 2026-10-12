
import { useState } from 'react'
import { Link } from 'react-router-dom'

function AddProperty() {
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    price: '',
    rooms: '',
    description: '',
  })

  const [isSubmitted, setIsSubmitted] = useState(false)
  const [imagePreview, setImagePreview] = useState('')

  function handleChange(event) {
    const { name, value } = event.target

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }))
  }

  function handleImageChange(event) {
    const file = event.target.files[0]

    if (!file) {
      return
    }

    const imageUrl = URL.createObjectURL(file)

    setImagePreview(imageUrl)
  }

  function handleSubmit(event) {
    event.preventDefault()

    const existingProperties = JSON.parse(
      localStorage.getItem('zaiLivingProperties') || '[]'
    )

    const newProperty = {
      id: Date.now(),
      name: formData.name,
      location: formData.location,
      price: `Rp${Number(formData.price).toLocaleString('id-ID')}`,
      rooms: Number(formData.rooms),
      description: formData.description,
      image: imagePreview,
      status: 'Active',
    }

    const updatedProperties = [
      ...existingProperties,
      newProperty,
    ]

    localStorage.setItem(
      'zaiLivingProperties',
      JSON.stringify(updatedProperties)
    )

    setIsSubmitted(true)

    setFormData({
      name: '',
      location: '',
      price: '',
      rooms: '',
      description: '',
    })

    setImagePreview('')
  }

  return (
    <div className="dashboard-page">
      <div className="dashboard-container">
        <Link to="/manage-properties" className="back-link">
          ← Back to Properties
        </Link>

        <div className="dashboard-header">
          <span className="section-label">
            PROPERTY MANAGEMENT
          </span>

          <h1>Add New Property</h1>

          <p>
            Add your rental property to ZaiLiving.
          </p>
        </div>

        {isSubmitted && (
          <div className="success-message">
            <strong>
              Property Added Successfully!
            </strong>

            <p>
              Your property has been saved successfully.
            </p>
          </div>
        )}

        <form
          className="application-form"
          onSubmit={handleSubmit}
        >
          <div className="form-group">
            <label htmlFor="name">
              Property Name
            </label>

            <input
              id="name"
              type="text"
              name="name"
              placeholder="Enter property name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="image">
              Property Image
            </label>

            <input
              id="image"
              type="file"
              name="image"
              accept="image/*"
              onChange={handleImageChange}
            />

            {imagePreview && (
              <div className="image-preview">
                <img
                  src={imagePreview}
                  alt="Property preview"
                />
              </div>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="location">
              Location
            </label>

            <input
              id="location"
              type="text"
              name="location"
              placeholder="Enter property location"
              value={formData.location}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="price">
              Monthly Price
            </label>

            <input
              id="price"
              type="number"
              name="price"
              placeholder="Enter monthly price"
              value={formData.price}
              onChange={handleChange}
              min="0"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="rooms">
              Available Rooms
            </label>

            <input
              id="rooms"
              type="number"
              name="rooms"
              placeholder="Enter available rooms"
              value={formData.rooms}
              onChange={handleChange}
              min="1"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">
              Property Description
            </label>

            <textarea
              id="description"
              name="description"
              placeholder="Describe your property..."
              value={formData.description}
              onChange={handleChange}
              rows="5"
              required
            />
          </div>

          <button
            type="submit"
            className="submit-application"
          >
            Add Property
          </button>
        </form>
      </div>
    </div>
  )
}

export default AddProperty