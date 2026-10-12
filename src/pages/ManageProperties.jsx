
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

function ManageProperties() {
  const defaultProperties = [
    {
      id: 1,
      name: 'Cozy Modern Kos',
      location: 'Jakarta, Indonesia',
      price: 'Rp1.500.000',
      rooms: 5,
      status: 'Active',
      isDefault: true,
    },
    {
      id: 2,
      name: 'Comfort Living Kos',
      location: 'Yogyakarta, Indonesia',
      price: 'Rp1.200.000',
      rooms: 3,
      status: 'Active',
      isDefault: true,
    },
    {
      id: 3,
      name: 'Premium Stay',
      location: 'Bandung, Indonesia',
      price: 'Rp2.000.000',
      rooms: 2,
      status: 'Active',
      isDefault: true,
    },
  ]

  const [properties, setProperties] = useState([])
  const [editingId, setEditingId] = useState(null)

  const [editForm, setEditForm] = useState({
    name: '',
    location: '',
    price: '',
    rooms: '',
    description: '',
    status: 'Active',
  })

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

    const customProperties = savedProperties.filter(
      (property) =>
        !defaultProperties.some(
          (defaultProperty) =>
            String(defaultProperty.id) === String(property.id)
        )
    )

    setProperties([
      ...mergedProperties,
      ...customProperties,
    ])
  }, [])

  const handleEdit = (property) => {
    setEditingId(property.id)

    setEditForm({
      name: property.name || '',
      location: property.location || '',
      price: property.price
        ? String(property.price).replace(/\D/g, '')
        : '',
      rooms: property.rooms ?? '',
      description: property.description || '',
      status: property.status || 'Active',
    })
  }

  const handleChange = (event) => {
    const { name, value } = event.target

    setEditForm((previous) => ({
      ...previous,
      [name]: value,
    }))
  }

  const handleSave = (id) => {
    if (
      !editForm.name.trim() ||
      !editForm.location.trim() ||
      !editForm.price ||
      editForm.rooms === ''
    ) {
      alert('Please complete all required fields.')
      return
    }

    if (
      Number(editForm.price) <= 0 ||
      Number(editForm.rooms) < 0
    ) {
      alert('Please enter valid price and room values.')
      return
    }

    const currentProperty = properties.find(
      (property) =>
        String(property.id) === String(id)
    )

    const updatedProperty = {
      id,
      name: editForm.name.trim(),
      location: editForm.location.trim(),
      price: `Rp${Number(
        editForm.price
      ).toLocaleString('id-ID')}`,
      rooms: Number(editForm.rooms),
      description: editForm.description.trim(),
      status: editForm.status,
      isDefault: currentProperty?.isDefault || false,
    }

    const savedProperties = JSON.parse(
      localStorage.getItem('zaiLivingProperties') || '[]'
    )

    const existingIndex = savedProperties.findIndex(
      (property) =>
        String(property.id) === String(id)
    )

    let updatedProperties

    if (existingIndex !== -1) {
      updatedProperties = savedProperties.map(
        (property, index) =>
          index === existingIndex
            ? {
                ...property,
                ...updatedProperty,
              }
            : property
      )
    } else {
      updatedProperties = [
        ...savedProperties,
        updatedProperty,
      ]
    }

    localStorage.setItem(
      'zaiLivingProperties',
      JSON.stringify(updatedProperties)
    )

    setProperties((previous) =>
      previous.map((property) =>
        String(property.id) === String(id)
          ? {
              ...property,
              ...updatedProperty,
            }
          : property
      )
    )

    setEditingId(null)

    alert('Property updated successfully!')
  }

  const handleDelete = (id) => {
    const property = properties.find(
      (item) =>
        String(item.id) === String(id)
    )

    if (property?.isDefault) {
      alert(
        'Default properties cannot be deleted in this prototype.'
      )
      return
    }

    const confirmDelete = window.confirm(
      'Are you sure you want to delete this property?'
    )

    if (!confirmDelete) {
      return
    }

    const savedProperties = JSON.parse(
      localStorage.getItem('zaiLivingProperties') || '[]'
    )

    const updatedProperties = savedProperties.filter(
      (item) =>
        String(item.id) !== String(id)
    )

    localStorage.setItem(
      'zaiLivingProperties',
      JSON.stringify(updatedProperties)
    )

    setProperties((previous) =>
      previous.filter(
        (item) =>
          String(item.id) !== String(id)
      )
    )

    alert('Property deleted successfully!')
  }

  return (
    <div className="dashboard-page">
      <div className="dashboard-container">
        <Link to="/owner-dashboard" className="back-link">
          ← Back to Owner Dashboard
        </Link>

        <div className="dashboard-header">
          <span className="section-label">
            PROPERTY MANAGEMENT
          </span>

          <h1>Manage Properties</h1>

          <p>
            View and manage your rental properties.
          </p>
        </div>

        <div className="properties-management">
          {properties.map((property) => (
            <div
              className="management-card"
              key={property.id}
            >
              {editingId === property.id ? (
                <div className="edit-property-form">
                  <h3>Edit Property</h3>

                  <div className="form-group">
                    <label htmlFor={`name-${property.id}`}>
                      Property Name
                    </label>

                    <input
                      id={`name-${property.id}`}
                      name="name"
                      value={editForm.name}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor={`location-${property.id}`}>
                      Location
                    </label>

                    <input
                      id={`location-${property.id}`}
                      name="location"
                      value={editForm.location}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor={`price-${property.id}`}>
                      Monthly Price
                    </label>

                    <input
                      id={`price-${property.id}`}
                      type="number"
                      name="price"
                      value={editForm.price}
                      onChange={handleChange}
                      min="1"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor={`rooms-${property.id}`}>
                      Available Rooms
                    </label>

                    <input
                      id={`rooms-${property.id}`}
                      type="number"
                      name="rooms"
                      value={editForm.rooms}
                      onChange={handleChange}
                      min="0"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor={`status-${property.id}`}>
                      Property Status
                    </label>

                    <select
                      id={`status-${property.id}`}
                      name="status"
                      value={editForm.status}
                      onChange={handleChange}
                    >
                      <option value="Active">
                        Active
                      </option>

                      <option value="Inactive">
                        Inactive
                      </option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label htmlFor={`description-${property.id}`}>
                      Description
                    </label>

                    <textarea
                      id={`description-${property.id}`}
                      name="description"
                      value={editForm.description}
                      onChange={handleChange}
                      rows="4"
                    />
                  </div>

                  <div className="management-actions">
                    <button
                      className="management-btn"
                      onClick={() =>
                        handleSave(property.id)
                      }
                    >
                      Save Changes
                    </button>

                    <button
                      className="management-btn secondary"
                      onClick={() => setEditingId(null)}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <div>
                    <span className="status-badge">
                      {property.status}
                    </span>

                    <h3>{property.name}</h3>

                    <p>
                      📍 {property.location}
                    </p>

                    <strong>
                      {property.price} / month
                    </strong>

                    <p>
                      🛏️ {property.rooms} rooms available
                    </p>

                    {property.description && (
                      <p>{property.description}</p>
                    )}

                    {property.image && (
                      <div className="image-preview">
                        <img
                          src={property.image}
                          alt={property.name}
                        />
                      </div>
                    )}
                  </div>

                  <div className="management-actions">
                    <Link
                      to={`/property/${property.id}`}
                      className="management-btn"
                    >
                      View
                    </Link>

                    <button
                      className="management-btn secondary"
                      onClick={() =>
                        handleEdit(property)
                      }
                    >
                      Edit
                    </button>

                    <button
                      className="management-btn danger"
                      onClick={() =>
                        handleDelete(property.id)
                      }
                    >
                      Delete
                    </button>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ManageProperties