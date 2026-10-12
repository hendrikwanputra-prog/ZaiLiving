import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

function Register() {
  const navigate = useNavigate()

  const [role, setRole] = useState('tenant')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  })

  function handleChange(event) {
    const { name, value } = event.target

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }))

    setError('')
  }

  function handleSubmit(event) {
    event.preventDefault()

    setError('')

    const fullName = formData.fullName.trim()
    const email = formData.email.trim().toLowerCase()
    const phone = formData.phone.trim()

    if (fullName.length < 3) {
      setError('Full name must contain at least 3 characters.')
      return
    }

    if (formData.password.length < 8) {
      setError('Password must contain at least 8 characters.')
      return
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match.')
      return
    }

    const phonePattern = /^[0-9+\s-]{8,15}$/

    if (!phonePattern.test(phone)) {
      setError('Please enter a valid phone number.')
      return
    }

    const savedUsers = JSON.parse(
      localStorage.getItem('zaiLivingUsers') || '[]'
    )

    const emailExists = savedUsers.some(
      (user) => user.email.toLowerCase() === email
    )

    if (emailExists) {
      setError(
        'This email is already registered. Please use another email.'
      )
      return
    }

    setIsLoading(true)

    const newUser = {
      id: `USR-${Date.now()}`,
      fullName,
      email,
      phone,
      password: formData.password,
      role: role === 'owner' ? 'Owner' : 'Tenant',
      createdAt: new Date().toISOString(),
    }

    localStorage.setItem(
      'zaiLivingUsers',
      JSON.stringify([
        ...savedUsers,
        newUser,
      ])
    )

    setIsLoading(false)

    navigate('/login', {
      state: {
        message:
          'Account created successfully. Please login.',
        email,
      },
    })
  }

  return (
    <div className="register-page">

      {/* LEFT BRAND PANEL */}
      <div className="register-brand">

        <Link to="/" className="register-logo">
          <span className="register-logo-mark">Z</span>
          <span>
            Zai<span>Living</span>
          </span>
        </Link>

        <div className="register-brand-content">
          <p className="register-eyebrow">
            START YOUR JOURNEY
          </p>

          <h1>
            Find a place
            <br />
            <span>you can call home.</span>
          </h1>

          <p className="register-brand-description">
            Create your ZaiLiving account and discover
            comfortable, strategic, and suitable places
            to stay.
          </p>

          <div className="register-benefits">

            <div className="register-benefit">
              <div className="benefit-icon">✓</div>
              <div>
                <strong>Find the right place</strong>
                <p>
                  Explore stays that fit your needs.
                </p>
              </div>
            </div>

            <div className="register-benefit">
              <div className="benefit-icon">✓</div>
              <div>
                <strong>Simple & convenient</strong>
                <p>
                  Manage your stay in one platform.
                </p>
              </div>
            </div>

            <div className="register-benefit">
              <div className="benefit-icon">✓</div>
              <div>
                <strong>Built for tenants & owners</strong>
                <p>
                  One platform for both sides.
                </p>
              </div>
            </div>

          </div>
        </div>

        <div className="register-brand-footer">
          Your place. Your comfort. Your living.
        </div>

      </div>

      {/* RIGHT FORM */}
      <div className="register-content">

       

        <div className="register-card">

          <div className="register-header">

            <div className="register-mobile-logo">
              <span className="register-logo-mark">Z</span>
              <span>
                Zai<span>Living</span>
              </span>
            </div>

            <p className="register-label">
              GET STARTED
            </p>

            <h2>Create your account</h2>

            <p>
              Join ZaiLiving and find your ideal place to stay.
            </p>

          </div>

          {error && (
            <div className="register-error" role="alert">
              {error}
            </div>
          )}

          <form
            className="register-form"
            onSubmit={handleSubmit}
          >

            <div className="register-form-group">
              <label htmlFor="role">
                Account Type
              </label>

              <select
                id="role"
                value={role}
                onChange={(event) => {
                  setRole(event.target.value)
                  setError('')
                }}
              >
                <option value="tenant">
                  Tenant (Penyewa)
                </option>

                <option value="owner">
                  Property Owner (Pemilik Kos)
                </option>
              </select>

              <small>
                Choose how you want to use ZaiLiving.
              </small>
            </div>

            <div className="register-form-row">

              <div className="register-form-group">
                <label htmlFor="fullName">
                  Full Name
                </label>

                <input
                  id="fullName"
                  type="text"
                  name="fullName"
                  placeholder="Your full name"
                  value={formData.fullName}
                  onChange={handleChange}
                  autoComplete="name"
                  required
                />
              </div>

              <div className="register-form-group">
                <label htmlFor="phone">
                  Phone Number
                </label>

                <input
                  id="phone"
                  type="tel"
                  name="phone"
                  placeholder="Your phone number"
                  value={formData.phone}
                  onChange={handleChange}
                  autoComplete="tel"
                  inputMode="tel"
                  required
                />
              </div>

            </div>

            <div className="register-form-group">
              <label htmlFor="email">
                Email Address
              </label>

              <input
                id="email"
                type="email"
                name="email"
                placeholder="you@example.com"
                value={formData.email}
                onChange={handleChange}
                autoComplete="email"
                required
              />
            </div>

            <div className="register-form-row">

              <div className="register-form-group">
                <label htmlFor="password">
                  Password
                </label>

                <input
                  id="password"
                  type="password"
                  name="password"
                  placeholder="Minimum 8 characters"
                  value={formData.password}
                  onChange={handleChange}
                  autoComplete="new-password"
                  minLength="8"
                  required
                />
              </div>

              <div className="register-form-group">
                <label htmlFor="confirmPassword">
                  Confirm Password
                </label>

                <input
                  id="confirmPassword"
                  type="password"
                  name="confirmPassword"
                  placeholder="Repeat your password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  autoComplete="new-password"
                  minLength="8"
                  required
                />
              </div>

            </div>

            <button
              type="submit"
              className="register-submit"
              disabled={isLoading}
            >
              {isLoading
                ? 'Creating Account...'
                : 'Create Account'}
            </button>

          </form>

          <p className="register-footer">
            Already have an account?
            <Link to="/login">
              Login
            </Link>
          </p>

        </div>

      </div>

    </div>
  )
}

export default Register