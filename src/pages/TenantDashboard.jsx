
import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

function TenantDashboard() {
  const navigate = useNavigate()

  const [applications, setApplications] = useState([])
  const [currentUser, setCurrentUser] = useState(null)

  useEffect(() => {
    const loggedInUser = JSON.parse(
      localStorage.getItem('zaiLivingCurrentUser') || 'null'
    )

    const savedApplications = JSON.parse(
      localStorage.getItem('zaiLivingApplications') || '[]'
    )

    if (!loggedInUser) {
      setApplications([])
      return
    }

    setCurrentUser(loggedInUser)

    // Hubungkan aplikasi lama yang belum memiliki userId
    const updatedApplications = savedApplications.map(
      (application) => {
        if (!application.userId) {
          return {
            ...application,
            userId: loggedInUser.id,
          }
        }

        return application
      }
    )

    // Simpan perubahan ke localStorage
    localStorage.setItem(
      'zaiLivingApplications',
      JSON.stringify(updatedApplications)
    )

    // Tampilkan aplikasi milik akun yang sedang login
    const userApplications = updatedApplications.filter(
      (application) =>
        application.userId === loggedInUser.id
    )

    setApplications([...userApplications].reverse())
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('zaiLivingCurrentUser')

    navigate('/login', {
      replace: true,
    })
  }

  const totalApplications = applications.length

  const approvedApplications = applications.filter(
    (application) =>
      application.status === 'Approved'
  ).length

  const pendingApplications = applications.filter(
    (application) =>
      application.status === 'Pending Review'
  ).length

  const rejectedApplications = applications.filter(
    (application) =>
      application.status === 'Rejected'
  ).length

  const getStatusClass = (status) => {
    if (status === 'Approved') {
      return 'status-approved'
    }

    if (status === 'Rejected') {
      return 'status-rejected'
    }

    return 'status-pending'
  }

  return (
    <div className="dashboard-page">
      <div className="dashboard-container">

        <div className="dashboard-topbar">
  
        </div>

        <section className="tenant-welcome-section">
          <div className="tenant-welcome-content">
            <span className="section-label">
              TENANT DASHBOARD
            </span>

            <h1>
              Welcome back,
              <br />
              <span>
                {currentUser?.fullName || 'Tenant'}.
              </span>
            </h1>

            <p>
              Manage your rental applications
              and find your next home with ease.
            </p>

            <Link
              to="/properties"
              className="dashboard-btn primary-dashboard-btn"
            >
              Explore Properties →
            </Link>
          </div>

          <div className="tenant-welcome-decoration">
            <span>⌂</span>
          </div>
        </section>

        <section className="tenant-stat-grid">

          <div className="tenant-stat-card">
            <span className="tenant-stat-label">
              Total Applications
            </span>

            <strong>{totalApplications}</strong>

            <span className="tenant-stat-description">
              All your applications
            </span>
          </div>

          <div className="tenant-stat-card">
            <span className="tenant-stat-label">
              Approved
            </span>

            <strong>{approvedApplications}</strong>

            <span className="tenant-stat-description">
              Approved applications
            </span>
          </div>

          <div className="tenant-stat-card">
            <span className="tenant-stat-label">
              Pending Review
            </span>

            <strong>{pendingApplications}</strong>

            <span className="tenant-stat-description">
              Waiting for review
            </span>
          </div>

          <div className="tenant-stat-card">
            <span className="tenant-stat-label">
              Rejected
            </span>

            <strong>{rejectedApplications}</strong>

            <span className="tenant-stat-description">
              Rejected applications
            </span>
          </div>

        </section>

        <section className="tenant-applications-section">

          <div className="tenant-section-heading">
            <div>
              <span className="section-label">
                RENTAL ACTIVITY
              </span>

              <h2>Your Applications</h2>

              <p>
                Track the status of your rental applications.
              </p>
            </div>

            <span className="tenant-application-count">
              {totalApplications} Applications
            </span>
          </div>

          {applications.length === 0 ? (
            <div className="dashboard-card empty-applications-card">
              <div className="empty-applications-icon">
                ⌂
              </div>

              <h3>No Applications Yet</h3>

              <p>
                You haven't submitted any rental applications.
                Start exploring properties and find your next home.
              </p>

              <Link
                to="/properties"
                className="dashboard-btn"
              >
                Browse Properties
              </Link>
            </div>
          ) : (
            <div className="tenant-application-list">

              {applications.map((application) => (
                <article
                  className="tenant-application-card"
                  key={application.id}
                >

                  <div className="tenant-application-top">
                    <div>
                      <span className="dashboard-label">
                        APPLICATION ID
                      </span>

                      <h3>{application.id}</h3>
                    </div>

                    <span
                      className={`status-badge ${getStatusClass(
                        application.status
                      )}`}
                    >
                      {application.status || 'Pending Review'}
                    </span>
                  </div>

                  <div className="tenant-property-heading">
                    <div className="tenant-property-icon">
                      ⌂
                    </div>

                    <div>
                      <h3>
                        {application.propertyName || '-'}
                      </h3>

                      <p>
                        {application.propertyLocation ||
                          application.location ||
                          '-'}
                      </p>
                    </div>
                  </div>

                  <div className="tenant-application-details">

                    <div>
                      <span>Room Type</span>
                      <strong>
                        {application.roomType || '-'}
                      </strong>
                    </div>

                    <div>
                      <span>Duration</span>
                      <strong>
                        {application.rentalDuration || '-'}
                      </strong>
                    </div>

                    <div>
                      <span>Move-in Date</span>
                      <strong>
                        {application.moveInDate || '-'}
                      </strong>
                    </div>

                    <div>
                      <span>Submitted</span>
                      <strong>
                        {application.submittedAt
                          ? new Date(
                              application.submittedAt
                            ).toLocaleDateString('id-ID')
                          : '-'}
                      </strong>
                    </div>

                  </div>

                </article>
              ))}

            </div>
          )}

        </section>

        <div className="tenant-dashboard-footer-action">
          <Link
            to="/properties"
            className="dashboard-btn"
          >
            Browse More Properties →
          </Link>
        </div>

      </div>
    </div>
  )
}

export default TenantDashboard