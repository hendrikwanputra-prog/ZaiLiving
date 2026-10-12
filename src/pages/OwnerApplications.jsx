
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

function OwnerApplications() {
  const [statusFilter, setStatusFilter] = useState('All')
  const [expandedApplication, setExpandedApplication] = useState(null)

  const defaultApplications = [
    {
      id: 'ZL-790453',
      tenant: 'Hendrikwan Putra',
      property: 'Cozy Modern Kos',
      roomType: 'Deluxe Room',
      duration: '6 Months',
      moveInDate: '2026-10-01',
      email: 'hendrikwan@example.com',
      phone: '081234567890',
      status: 'Pending Review',
    },
    {
      id: 'ZL-790454',
      tenant: 'Andi Pratama',
      property: 'Comfort Living Kos',
      roomType: 'Standard Room',
      duration: '3 Months',
      moveInDate: '2026-10-05',
      email: 'andi@example.com',
      phone: '081234567891',
      status: 'Pending Review',
    },
  ]

  const [applications, setApplications] = useState(
    defaultApplications
  )

  useEffect(() => {
    const savedApplications = JSON.parse(
      localStorage.getItem('zaiLivingApplications') || '[]'
    )

const formattedApplications = savedApplications.map(
  (application) => ({
    id: application.id,
    userId: application.userId || '-',
    tenant: application.fullName,
        id: application.id,
        userId: application.userId || '-',
        tenant: application.fullName,
        property: application.propertyName,
        location: application.propertyLocation,
        roomType: application.roomType,
        duration: application.rentalDuration,
        moveInDate: application.moveInDate,
        email: application.email,
        phone: application.phone,
        message: application.message,
        submittedAt: application.submittedAt,
        status: application.status || 'Pending Review',
      })
    )

    setApplications([
      ...defaultApplications,
      ...formattedApplications,
    ])
  }, [])

  function updateApplicationStatus(applicationId, newStatus) {
    const savedApplications = JSON.parse(
      localStorage.getItem('zaiLivingApplications') || '[]'
    )

    const updatedApplications = savedApplications.map(
      (application) => {
        if (application.id === applicationId) {
          return {
            ...application,
            status: newStatus,
          }
        }

        return application
      }
    )

    localStorage.setItem(
      'zaiLivingApplications',
      JSON.stringify(updatedApplications)
    )

    setApplications((previousApplications) =>
      previousApplications.map((application) => {
        if (application.id === applicationId) {
          return {
            ...application,
            status: newStatus,
          }
        }

        return application
      })
    )
  }

  function handleApprove(applicationId) {
    updateApplicationStatus(applicationId, 'Approved')
  }

  function handleReject(applicationId) {
    updateApplicationStatus(applicationId, 'Rejected')
  }

  function toggleDetails(applicationId) {
    setExpandedApplication((previousId) =>
      previousId === applicationId ? null : applicationId
    )
  }

  const filteredApplications = applications.filter(
    (application) =>
      statusFilter === 'All' ||
      application.status === statusFilter
  )

  return (
    <div className="dashboard-page">
      <div className="dashboard-container">
        <Link to="/owner-dashboard" className="back-link">
          ← Back to Owner Dashboard
        </Link>

        <div className="dashboard-header">
          <span className="section-label">
            RENTAL APPLICATIONS
          </span>

          <h1>Tenant Applications</h1>

          <p>
            Review rental applications from your tenants.
          </p>
        </div>

        <div className="form-group application-filter">
          <label htmlFor="statusFilter">
            Filter Applications
          </label>

          <select
            id="statusFilter"
            value={statusFilter}
            onChange={(event) =>
              setStatusFilter(event.target.value)
            }
          >
            <option value="All">
              All Applications
            </option>

            <option value="Pending Review">
              Pending Review
            </option>

            <option value="Approved">
              Approved
            </option>

            <option value="Rejected">
              Rejected
            </option>
          </select>
        </div>

        <div className="applications-list">
          {filteredApplications.length > 0 ? (
            filteredApplications.map((application) => (
              <div
                className="application-card"
                key={application.id}
              >
                <div className="application-card-header">
                  <div>
                    <span className="dashboard-label">
                      Application ID
                    </span>

                    <h3>{application.id}</h3>
                  </div>

                  <span className="status-badge">
                    {application.status}
                  </span>
                </div>

                <div className="application-card-details">
                  <p>
                    <strong>Tenant:</strong>{' '}
                    {application.tenant}
                  </p>

                  <p>
                    <strong>Property:</strong>{' '}
                    {application.property}
                  </p>

                  <p>
                    <strong>Room Type:</strong>{' '}
                    {application.roomType}
                  </p>

                  <p>
                    <strong>Move-in Date:</strong>{' '}
                    {application.moveInDate}
                  </p>
                </div>

                {expandedApplication === application.id && (
                  <div className="application-details-expanded">
                    <p>
                      <strong>Tenant ID:</strong>{' '}
                      {application.userId || '-'}
                    </p>
                    <p>
                      <strong>Email:</strong>{' '}
                      {application.email || '-'}
                    </p>

                    <p>
                      <strong>Phone:</strong>{' '}
                      {application.phone || '-'}
                    </p>

                    <p>
                      <strong>Location:</strong>{' '}
                      {application.location || '-'}
                    </p>

                    <p>
                      <strong>Duration:</strong>{' '}
                      {application.duration || '-'}
                    </p>

                    <p>
                      <strong>Message:</strong>{' '}
                      {application.message || '-'}
                    </p>

                    <p>
                      <strong>Submitted:</strong>{' '}
                      {application.submittedAt || '-'}
                    </p>
                  </div>
                )}

                <div className="application-actions">
                  <button
                    className="management-btn secondary"
                    onClick={() =>
                      toggleDetails(application.id)
                    }
                  >
                    {expandedApplication === application.id
                      ? 'Hide Details'
                      : 'View Details'}
                  </button>

                  <button
                    className="management-btn"
                    onClick={() =>
                      handleApprove(application.id)
                    }
                    disabled={
                      application.status !== 'Pending Review'
                    }
                  >
                    {application.status === 'Approved'
                      ? 'Approved'
                      : 'Approve'}
                  </button>

                  <button
                    className="management-btn secondary"
                    onClick={() =>
                      handleReject(application.id)
                    }
                    disabled={
                      application.status !== 'Pending Review'
                    }
                  >
                    {application.status === 'Rejected'
                      ? 'Rejected'
                      : 'Reject'}
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="no-results">
              <h3>No applications found</h3>

              <p>
                There are no applications with this status.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default OwnerApplications