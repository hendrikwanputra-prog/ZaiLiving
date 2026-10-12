import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

function Login() {
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  function handleSubmit(event) {
    event.preventDefault()

    setError('')
    setIsLoading(true)

    const savedUsers = JSON.parse(
      localStorage.getItem('zaiLivingUsers') || '[]'
    )

    const normalizedEmail = email.trim().toLowerCase()

    const user = savedUsers.find(
      (item) =>
        item.email.toLowerCase() === normalizedEmail &&
        item.password === password
    )

    if (!user) {
      setError(
        'Email atau password salah. Silakan periksa kembali.'
      )
      setIsLoading(false)
      return
    }

    const currentUser = {
      id: user.id,
      fullName: user.fullName,
      email: user.email,
      role: user.role,
    }

    localStorage.setItem(
      'zaiLivingCurrentUser',
      JSON.stringify(currentUser)
    )

    setIsLoading(false)

    if (user.role === 'Owner') {
      navigate('/owner-dashboard')
    } else {
      navigate('/tenant-dashboard')
    }
  }

  return (
    <div className="zl-login-page">

      {/* LEFT SIDE */}
      <section className="zl-login-hero">

        <div className="zl-hero-overlay"></div>

        <div className="zl-hero-content">

          <Link to="/" className="zl-brand">
            <span className="zl-brand-icon">⌂</span>
            <span>
              Zai<span>Living</span>
            </span>
          </Link>

          <div className="zl-hero-text">
            <p className="zl-eyebrow">
              FIND YOUR NEXT HOME
            </p>

            <h1>
              More Than Just
              <br />
              <span>A Place to Stay.</span>
            </h1>

            <p className="zl-hero-description">
              Temukan tempat tinggal yang nyaman,
              strategis, dan sesuai dengan kebutuhanmu
              bersama ZaiLiving.
            </p>

            <div className="zl-features">

              <div className="zl-feature">
                <div className="zl-feature-icon">⌂</div>
                <div>
                  <strong>Pilihan Kos Terbaik</strong>
                  <p>Temukan hunian sesuai kebutuhanmu.</p>
                </div>
              </div>

              <div className="zl-feature">
                <div className="zl-feature-icon">✓</div>
                <div>
                  <strong>Aman & Terpercaya</strong>
                  <p>Pengalaman mencari hunian yang lebih mudah.</p>
                </div>
              </div>

              <div className="zl-feature">
                <div className="zl-feature-icon">⌖</div>
                <div>
                  <strong>Lokasi Strategis</strong>
                  <p>Dekat dengan kampus, kantor, dan fasilitas umum.</p>
                </div>
              </div>

            </div>
          </div>

          <p className="zl-hero-footer">
            Your place. Your comfort. Your living.
          </p>

        </div>
      </section>


      {/* RIGHT SIDE */}
      <section className="zl-login-form-section">

     

        <div className="zl-login-box">

          <div className="zl-mobile-brand">
            <span className="zl-brand-icon">⌂</span>
            <span>
              Zai<span>Living</span>
            </span>
          </div>

          <div className="zl-form-header">
            <p className="zl-form-eyebrow">
              WELCOME BACK
            </p>

            <h2>Welcome Back</h2>

            <p>
              Login to your ZaiLiving account and
              continue your journey.
            </p>
          </div>

          {error && (
            <div className="zl-error" role="alert">
              {error}
            </div>
          )}

          <form
            className="zl-login-form"
            onSubmit={handleSubmit}
          >

            {/* EMAIL */}
            <div className="zl-input-group">

              <label htmlFor="email">
                Email Address
              </label>

              <div className="zl-input-wrapper">

                <span className="zl-input-icon">
                  ✉
                </span>

                <input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(event) => {
                    setEmail(event.target.value)
                    setError('')
                  }}
                  autoComplete="email"
                  required
                />

              </div>
            </div>


            {/* PASSWORD */}
            <div className="zl-input-group">

              <label htmlFor="password">
                Password
              </label>

              <div className="zl-input-wrapper">

                <span className="zl-input-icon">
                  🔒
                </span>

                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(event) => {
                    setPassword(event.target.value)
                    setError('')
                  }}
                  autoComplete="current-password"
                  required
                />

                <button
                  type="button"
                  className="zl-password-toggle"
                  onClick={() =>
                    setShowPassword(!showPassword)
                  }
                  aria-label={
                    showPassword
                      ? 'Hide password'
                      : 'Show password'
                  }
                >
                  {showPassword ? '◉' : '◌'}
                </button>

              </div>
            </div>


            {/* LOGIN BUTTON */}
            <button
              type="submit"
              className="zl-login-button"
              disabled={isLoading}
            >
              {isLoading ? (
                'Logging in...'
              ) : (
                <>
                  Login
                  <span>→</span>
                </>
              )}
            </button>

          </form>


          {/* REGISTER */}
          <div className="zl-register">
            <span>Don't have an account?</span>

            <Link to="/register">
              Register
            </Link>
          </div>

        </div>

      </section>

    </div>
  )
}

export default Login