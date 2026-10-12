import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

function OwnerDashboard() {
  const navigate = useNavigate()

  const [stats, setStats] = useState({
    totalProperties: 0,
    availableRooms: 0,
    applications: 0,
    pendingApplications: 0,
  })

  useEffect(() => {
    const savedProperties = JSON.parse(
      localStorage.getItem('zaiLivingProperties') || '[]'
    )

    const savedApplications = JSON.parse(
      localStorage.getItem('zaiLivingApplications') || '[]'
    )

    const defaultProperties = [
      {
        id: 1,
        rooms: 4,
      },
      {
        id: 2,
        rooms: 3,
      },
      {
        id: 3,
        rooms: 3,
      },
    ]

    const allProperties = [
      ...defaultProperties,
      ...savedProperties,
    ]

    const totalProperties = allProperties.length

    const availableRooms = allProperties.reduce(
      (total, property) =>
        total +
        Number(
          property.availableRooms ?? property.rooms ?? 0
        ),
      0
    )

    const applications = savedApplications.length

    const pendingApplications = savedApplications.filter(
      (application) =>
        !application.status ||
        application.status === 'Pending Review'
    ).length

    setStats({
      totalProperties,
      availableRooms,
      applications,
      pendingApplications,
    })
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('zaiLivingCurrentUser')

    navigate('/login', {
      replace: true,
    })
  }

  return (
    <div className="dashboard-page">
      <div className="dashboard-container">
        <div className="dashboard-topbar">
    

          <button
            type="button"
            className="logout-btn"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>

        <div className="dashboard-header">
          <span className="section-label">
            OWNER DASHBOARD
          </span>

          <h1>Welcome, Property Owner</h1>

          <p>
            Manage your properties and rental applications.
          </p>
        </div>

        <div className="owner-stats">
          <div className="stat-card">
            <span>Total Properties</span>
            <h2>{stats.totalProperties}</h2>
          </div>

          <div className="stat-card">
            <span>Available Rooms</span>
            <h2>{stats.availableRooms}</h2>
          </div>

          <div className="stat-card">
            <span>Applications</span>
            <h2>{stats.applications}</h2>
          </div>
        </div>

        <div className="dashboard-card">
          <div>
            <span className="dashboard-label">
              Property Management
            </span>

            <h3>Manage Your Properties</h3>

            <p>
              Add, edit, and manage your rental properties.
            </p>
          </div>

          <Link
            to="/manage-properties"
            className="dashboard-btn"
          >
            Manage Properties
          </Link>

          <Link
            to="/add-property"
            className="dashboard-btn"
          >
            Add New Property
          </Link>
        </div>

        <div className="dashboard-card">
          <div>
            <span className="dashboard-label">
              Rental Applications
            </span>

            <h3>Review Applications</h3>

            <p>
              You currently have{' '}
              <strong>{stats.pendingApplications}</strong>{' '}
              pending applications.
            </p>
          </div>

          <Link
            to="/owner-applications"
            className="dashboard-btn"
          >
            View Applications
          </Link>
        </div>
      </div>
    </div>
  )
}

export default OwnerDashboard