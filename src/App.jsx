import OwnerApplications from './pages/OwnerApplications'
import AddProperty from './pages/AddProperty'
import ManageProperties from './pages/ManageProperties'
import OwnerDashboard from './pages/OwnerDashboard'
import TenantDashboard from './pages/TenantDashboard'
import { useState } from 'react'
import Register from './pages/Register'
import Login from './pages/Login'
import Properties from './pages/Properties'
import ApplyRoom from './pages/ApplyRoom'
import {
  Routes,
  Route,
  Link,
  Navigate,
  useLocation,
  useNavigate,
} from 'react-router-dom'
import PropertyDetail from './pages/PropertyDetail'

function ProtectedRoute({ children, allowedRole }) {
  const location = useLocation()

  const currentUser = JSON.parse(
    localStorage.getItem('zaiLivingCurrentUser') || 'null'
  )

  if (!currentUser) {
    return (
      <Navigate
        to="/login"
        replace
        state={{
          from: location.pathname,
          message: 'Please login to access this page.',
        }}
      />
    )
  }

  if (
    allowedRole &&
    currentUser.role !== allowedRole
  ) {
    const dashboardPath =
      currentUser.role === 'Owner'
        ? '/owner-dashboard'
        : '/tenant-dashboard'

    return (
      <Navigate
        to={dashboardPath}
        replace
      />
    )
  }

  return children
}

/* =========================
   GLOBAL NAVBAR
========================= */

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const navigate = useNavigate()

  const currentUser = JSON.parse(
    localStorage.getItem('zaiLivingCurrentUser') || 'null'
  )

  const dashboardPath =
    currentUser?.role === 'Owner'
      ? '/owner-dashboard'
      : '/tenant-dashboard'

  const handleLogout = () => {
    localStorage.removeItem('zaiLivingCurrentUser')

    setIsMenuOpen(false)

    navigate('/login', {
      replace: true,
    })
  }

  const handleHomeClick = (event) => {
    event.preventDefault()

    setIsMenuOpen(false)

    if (window.location.pathname === '/') {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      })
    } else {
      navigate('/')
    }
  }

  const handleAboutClick = (event) => {
    event.preventDefault()

    setIsMenuOpen(false)

    if (window.location.pathname === '/') {
      document
        .getElementById('about')
        ?.scrollIntoView({
          behavior: 'smooth',
        })
    } else {
      navigate('/')

      setTimeout(() => {
        document
          .getElementById('about')
          ?.scrollIntoView({
            behavior: 'smooth',
          })
      }, 100)
    }
  }

  return (
    <nav>
      <h2>ZaiLiving</h2>

      <button
        className="menu-toggle"
        onClick={() =>
          setIsMenuOpen(!isMenuOpen)
        }
      >
        ☰
      </button>

      <div
        className={`nav-links ${
          isMenuOpen ? 'active' : ''
        }`}
      >

        {/* HOME */}
        <Link
          to="/"
          onClick={handleHomeClick}
        >
          Home
        </Link>

        {/* FIND A KOS */}
        <Link
          to="/properties"
          onClick={() =>
            setIsMenuOpen(false)
          }
        >
          Find a Kos
        </Link>

        {/* DASHBOARD */}
        {currentUser && (
          <Link
            to={dashboardPath}
            onClick={() =>
              setIsMenuOpen(false)
            }
          >
            Dashboard
          </Link>
        )}

        {/* ABOUT */}
        <a
          href="#about"
          onClick={handleAboutClick}
        >
          About
        </a>

        {/* USER LOGIN STATE */}
        {currentUser ? (
          <>
            <span className="nav-user">
              Hi, {currentUser.fullName}
            </span>

            <button
              type="button"
              className="nav-logout-btn"
              onClick={handleLogout}
            >
              Logout
            </button>
          </>
        ) : (
          <>
            {/* LOGIN */}
            <Link
              to="/login"
              onClick={() =>
                setIsMenuOpen(false)
              }
            >
              Login
            </Link>

            {/* REGISTER */}
            <Link
              to="/register"
              onClick={() =>
                setIsMenuOpen(false)
              }
            >
              Register
            </Link>
          </>
        )}

      </div>
    </nav>
  )
}

/* =========================
   HOME PAGE
========================= */

function HomePage() {
  return (
    <div>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">

          <span className="hero-eyebrow">
            YOUR NEXT HOME
          </span>

          <h1>
            Find Your
            <br />
            Perfect Place
            <br />
            to Stay.
          </h1>

          <p>
            Discover comfortable and affordable
            places to stay, designed to feel
            like home.
          </p>

          <div className="hero-actions">
            <Link
              to="/properties"
              className="hero-btn"
            >
              Find Your Kos
              <span>↗</span>
            </Link>
          </div>

          <div className="hero-note">
            <span className="hero-note-dot"></span>
            Find a place that feels like home.
          </div>

        </div>
      </section>

{/* About Section */}
<section
  id="about"
  className="about-section"
>
  <div className="about-container">

    <div className="about-heading">
      <span className="section-label">
        ABOUT ZAILIVING
      </span>

      <h2>
        More Than Just
        <br />
        Finding a Room.
      </h2>
    </div>

    <div className="about-description">
      <p className="about-lead">
        ZaiLiving is a modern accommodation platform
        designed to make finding a comfortable place
        to stay simple, clear, and convenient.
      </p>

      <p>
        We connect tenants with property owners through
        an easy-to-use platform where you can discover
        available rooms, explore property details, and
        submit rental applications in one place.
      </p>

      <Link
        to="/properties"
        className="about-btn"
      >
        Explore Properties →
      </Link>
    </div>

  </div>

  <div className="about-values">

    <div className="about-value">
      <span>01</span>

      <div>
        <h3>Easy to Discover</h3>
        <p>
          Find available kos based on your
          preferred location and budget.
        </p>
      </div>
    </div>

    <div className="about-value">
      <span>02</span>

      <div>
        <h3>Clear Information</h3>
        <p>
          Explore property details, room types,
          pricing, and available facilities.
        </p>
      </div>
    </div>

    <div className="about-value">
      <span>03</span>

      <div>
        <h3>Simple Application</h3>
        <p>
          Submit your rental application
          without complicated processes.
        </p>
      </div>
    </div>

  </div>
</section>
      {/* Featured Kos */}
      <section className="featured">

        <h2>Featured Kos</h2>

        <p>
          Explore comfortable places to stay.
        </p>

        <div className="kos-list">

          {/* Kos 1 */}
          <div className="kos-card">

            <img
              className="kos-image"
              src="https://images.unsplash.com/photo-1522708323590-d24dbb6b0267"
              alt="Modern kos room"
            />

            <h3>
              Cozy Modern Kos
            </h3>

            <p>
              Jakarta, Indonesia
            </p>

            <strong>
              Rp1.500.000 / month
            </strong>

            <div className="kos-rating">
              ★ 4.8
            </div>

            <Link
              className="details-btn"
              to="/property/1"
            >
              View Details
            </Link>

          </div>

          {/* Kos 2 */}
          <div className="kos-card">

            <img
              className="kos-image"
              src="https://images.unsplash.com/photo-1522708323590-d24dbb6b0267"
              alt="Modern kos room"
            />

            <h3>
              Comfort Living Kos
            </h3>

            <p>
              Yogyakarta, Indonesia
            </p>

            <strong>
              Rp1.200.000 / month
            </strong>

            <div className="kos-rating">
              ★ 4.8
            </div>

            <Link
              className="details-btn"
              to="/property/2"
            >
              View Details
            </Link>

          </div>

          {/* Kos 3 */}
          <div className="kos-card">

            <img
              className="kos-image"
              src="https://images.unsplash.com/photo-1522708323590-d24dbb6b0267"
              alt="Modern kos room"
            />

            <h3>
              Premium Stay
            </h3>

            <p>
              Bandung, Indonesia
            </p>

            <strong>
              Rp2.000.000 / month
            </strong>

            <div className="kos-rating">
              ★ 4.8
            </div>

            <Link
              className="details-btn"
              to="/property/3"
            >
              View Details
            </Link>

          </div>

        </div>

        <div className="view-all-container">

          <Link
            to="/properties"
            className="view-all-btn"
          >
            View All Kos
          </Link>

        </div>

      </section>

      {/* How It Works */}
      <section
        id="how-it-works"
        className="how-it-works"
      >

        <h2>
          How ZaiLiving Works
        </h2>

        <p>
          Find your next home in three simple steps.
        </p>

        <div className="steps">

          <div className="step">

            <span>01</span>

            <h3>
              Search Your Kos
            </h3>

            <p>
              Find a kos that matches your
              needs and budget.
            </p>

          </div>

          <div className="step">

            <span>02</span>

            <h3>
              Explore Details
            </h3>

            <p>
              Check the location, facilities,
              and room information.
            </p>

          </div>

          <div className="step">

            <span>03</span>

            <h3>
              Apply for a Room
            </h3>

            <p>
              Submit your rental application
              easily.
            </p>

          </div>

        </div>

      </section>

      {/* Footer */}
      <footer>

        <div>

          <h2>
            ZaiLiving
          </h2>

          <p>
            Find a place that feels like home.
          </p>

        </div>

        <div>

          <h3>
            Quick Links
          </h3>

          <Link to="/">
            Home
          </Link>

          <Link to="/properties">
            Find a Kos
          </Link>

          <a href="#about">
            About
          </a>

          <Link to="/login">
            Login
          </Link>

        </div>

        <div>

          <h3>
            Contact
          </h3>

          <p>
            Email: hello@zailiving.com
          </p>

          <p>
            Jakarta, Indonesia
          </p>

        </div>

      </footer>

    </div>
  )
}

/* =========================
   APP
========================= */

function App() {
  return (
    <>
      {/* GLOBAL NAVBAR */}
      <Navbar />

      <Routes>

        {/* HOME */}
        <Route
          path="/"
          element={<HomePage />}
        />

        {/* PROPERTY DETAIL */}
        <Route
          path="/property/:id"
          element={<PropertyDetail />}
        />

        {/* APPLY ROOM */}
        <Route
          path="/apply/:id"
          element={<ApplyRoom />}
        />

        {/* FIND A KOS */}
        <Route
          path="/properties"
          element={<Properties />}
        />

        {/* LOGIN */}
        <Route
          path="/login"
          element={<Login />}
        />

        {/* REGISTER */}
        <Route
          path="/register"
          element={<Register />}
        />

        {/* TENANT DASHBOARD */}
        <Route
          path="/tenant-dashboard"
          element={
            <ProtectedRoute allowedRole="Tenant">
              <TenantDashboard />
            </ProtectedRoute>
          }
        />

        {/* OWNER DASHBOARD */}
        <Route
          path="/owner-dashboard"
          element={
            <ProtectedRoute allowedRole="Owner">
              <OwnerDashboard />
            </ProtectedRoute>
          }
        />

        {/* MANAGE PROPERTIES */}
        <Route
          path="/manage-properties"
          element={
            <ProtectedRoute allowedRole="Owner">
              <ManageProperties />
            </ProtectedRoute>
          }
        />

        {/* ADD PROPERTY */}
        <Route
          path="/add-property"
          element={
            <ProtectedRoute allowedRole="Owner">
              <AddProperty />
            </ProtectedRoute>
          }
        />

        {/* OWNER APPLICATIONS */}
        <Route
          path="/owner-applications"
          element={
            <ProtectedRoute allowedRole="Owner">
              <OwnerApplications />
            </ProtectedRoute>
          }
        />

      </Routes>
    </>
  )
}

export default App