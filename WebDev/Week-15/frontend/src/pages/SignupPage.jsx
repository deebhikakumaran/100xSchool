import { useState } from 'react';

const API_URL = 'http://localhost:3000';

function SignupPage() {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        firstName: '',
        lastName: '',
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const response = await fetch(`${API_URL}/user/signup`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (!response.ok) {
                setError(data.error || 'signup failed');
                return;
            }

        } catch (err) {
            setError('error occurred. make sure the backend is running.');
        } finally {
            setLoading(false);
        }
    };

    const styles = {
        page: {
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#ffffff',
            fontFamily: 'Arial, sans-serif',
            padding: '20px',
        },
        card: {
            width: '100%',
            maxWidth: '360px',
            border: '1px solid #000000',
            borderRadius: '8px',
            padding: '32px',
            backgroundColor: '#ffffff',
            boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
        },
        heading: {
            color: '#000000',
            textAlign: 'center',
            margin: '0 0 24px 0',
            fontSize: '22px',
            fontWeight: 600,
        },
        error: {
            border: '1px solid #000000',
            backgroundColor: '#000000',
            color: '#ffffff',
            padding: '10px 12px',
            borderRadius: '4px',
            marginBottom: '16px',
            fontSize: '14px',
            textAlign: 'center',
        },
        form: {
            display: 'flex',
            flexDirection: 'column',
            gap: '14px',
        },
        input: {
            width: '100%',
            padding: '12px 14px',
            border: '1px solid #000000',
            borderRadius: '4px',
            fontSize: '14px',
            color: '#000000',
            backgroundColor: '#ffffff',
            boxSizing: 'border-box',
            outline: 'none',
        },
        button: {
            width: '100%',
            padding: '12px 14px',
            border: '1px solid #000000',
            borderRadius: '4px',
            fontSize: '15px',
            fontWeight: 600,
            color: '#ffffff',
            backgroundColor: '#000000',
            cursor: loading ? 'not-allowed' : 'pointer',
            opacity: loading ? 0.6 : 1,
            marginTop: '6px',
        },
    };

    return (
        <div style={styles.page}>
            <div style={styles.card}>
                <h3 style={styles.heading}>Create Account</h3>
                {error && <div style={styles.error}>{error}</div>}
                <form onSubmit={handleSubmit} style={styles.form}>
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        style={styles.input}
                    />
                    <input
                        type="text"
                        name="firstName"
                        placeholder="First Name"
                        value={formData.firstName}
                        onChange={handleChange}
                        required
                        style={styles.input}
                    />
                    <input
                        type="text"
                        name="lastName"
                        placeholder="Last Name"
                        value={formData.lastName}
                        onChange={handleChange}
                        required
                        style={styles.input}
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                        style={styles.input}
                    />
                    <button type="submit" disabled={loading} style={styles.button}>
                        {loading ? 'Creating...' : 'Sign Up'}
                    </button>
                </form>
            </div>
        </div>
    )
}

export default SignupPage