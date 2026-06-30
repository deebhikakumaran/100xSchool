import { useState, useEffect } from 'react';

const API_URL = 'http://localhost:3000';

function DashboardPage() {
  const [balance, setBalance] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [transferAmount, setTransferAmount] = useState('');
  const [selectedRecipient, setSelectedRecipient] = useState(null);
  const [transferStatus, setTransferStatus] = useState('');

  useEffect(() => {
    fetchBalance();
  }, []);

  const fetchBalance = async () => {
    try {
      const response = await fetch(`${API_URL}/account/balance`, {
        credentials: "include",
      });
      const data = await response.json();
      setBalance(data.balance);
    } catch (err) {
      setError('Failed to fetch balance');
    }
  };

  const handleSearch = async (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (query.trim() === '') {
      setSearchResults([]);
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/user/bulk?filter=${encodeURIComponent(query)}`, {
        credentials: "include",
      });
      const data = await response.json();
      const filtered = data.users.filter(u => u._id !== localStorage.getItem("user-id"));
      setSearchResults(filtered);
    } catch (err) {
      setError('search failed');
    } finally {
      setLoading(false);
    }
  };

  const handleTransfer = async (recipientId) => {
    if (!transferAmount || parseFloat(transferAmount) <= 0) {
      setError('enter a valid amount');
      return;
    }

    setLoading(true);
    setTransferStatus('');

    try {
      const response = await fetch(`${API_URL}/account/transfer`, {
        method: 'POST',
        credentials: "include",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          to: recipientId,
          amount: parseFloat(transferAmount),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || 'transfer failed');
        return;
      }

      setTransferStatus('transfer successful!');
      setTransferAmount('');
      setSelectedRecipient(null);
      setSearchQuery('');
      setSearchResults([]);
      await fetchBalance();
      setTimeout(() => setTransferStatus(''), 3000);
    } catch (err) {
      setError('transfer failed');
    } finally {
      setLoading(false);
    }
  };

  const styles = {
    page: {
      minHeight: '100vh',
      backgroundColor: '#ffffff',
      fontFamily: 'Arial, sans-serif',
      padding: '24px',
      color: '#000000',
      boxSizing: 'border-box',
    },
    container: {
      maxWidth: '640px',
      margin: '0 auto',
      display: 'flex',
      flexDirection: 'column',
      gap: '20px',
    },
    balanceCard: {
      border: '1px solid #000000',
      borderRadius: '8px',
      padding: '24px',
      backgroundColor: '#000000',
      color: '#ffffff',
    },
    balanceLabel: {
      margin: '0 0 8px 0',
      fontSize: '16px',
      fontWeight: 600,
      letterSpacing: '0.5px',
    },
    balanceValue: {
      fontSize: '32px',
      fontWeight: 700,
    },
    error: {
      border: '1px solid #000000',
      backgroundColor: '#000000',
      color: '#ffffff',
      padding: '10px 12px',
      borderRadius: '4px',
      fontSize: '14px',
      textAlign: 'center',
    },
    status: {
      border: '1px solid #000000',
      backgroundColor: '#ffffff',
      color: '#000000',
      padding: '10px 12px',
      borderRadius: '4px',
      fontSize: '14px',
      textAlign: 'center',
      fontWeight: 600,
    },
    sectionCard: {
      border: '1px solid #000000',
      borderRadius: '8px',
      padding: '24px',
      backgroundColor: '#ffffff',
    },
    sectionHeading: {
      margin: '0 0 16px 0',
      fontSize: '20px',
      fontWeight: 600,
      color: '#000000',
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
    resultsList: {
      marginTop: '12px',
      border: '1px solid #000000',
      borderRadius: '4px',
      overflow: 'hidden',
    },
    resultItem: {
      padding: '12px 14px',
      borderBottom: '1px solid #000000',
      cursor: 'pointer',
      backgroundColor: '#ffffff',
    },
    resultName: {
      margin: 0,
      fontSize: '14px',
      color: '#000000',
    },
    recipientBox: {
      marginTop: '16px',
      border: '1px solid #000000',
      borderRadius: '4px',
      padding: '16px',
      backgroundColor: '#ffffff',
    },
    recipientText: {
      margin: '0 0 12px 0',
      fontSize: '14px',
      color: '#000000',
    },
    transferRow: {
      display: 'flex',
      gap: '10px',
    },
    amountInput: {
      flex: 1,
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
      padding: '12px 18px',
      border: '1px solid #000000',
      borderRadius: '4px',
      fontSize: '14px',
      fontWeight: 600,
      color: '#ffffff',
      backgroundColor: '#000000',
      cursor: loading || !transferAmount ? 'not-allowed' : 'pointer',
      opacity: loading || !transferAmount ? 0.6 : 1,
      whiteSpace: 'nowrap',
    },
  };

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <div style={styles.balanceCard}>
          <h2 style={styles.balanceLabel}>Balance</h2>
          <div style={styles.balanceValue}>
            ${balance !== null ? balance.toFixed(2) : 'Loading...'}
          </div>
        </div>

        {error && <div style={styles.error}>{error}</div>}
        {transferStatus && <div style={styles.status}>{transferStatus}</div>}

        <div style={styles.sectionCard}>
          <h2 style={styles.sectionHeading}>Send Money</h2>
          <div>
            <input
              type="text"
              placeholder="Search users by email, first name, or last name..."
              value={searchQuery}
              onChange={handleSearch}
              style={styles.input}
            />
          </div>

          {searchResults.length > 0 && (
            <div style={styles.resultsList}>
              {searchResults.map((result) => (
                <div
                  key={result._id}
                  onClick={() => setSelectedRecipient(result)}
                  style={styles.resultItem}
                >
                  <div>
                    <p style={styles.resultName}>
                      {result.firstName} {result.lastName}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {selectedRecipient && (
            <div style={styles.recipientBox}>
              <div>
                <p style={styles.recipientText}>Sending to: <strong>{selectedRecipient.firstName} {selectedRecipient.lastName}</strong></p>
              </div>
              <div style={styles.transferRow}>
                <input
                  type="number"
                  placeholder="Amount"
                  value={transferAmount}
                  onChange={(e) => setTransferAmount(e.target.value)}
                  min="0.01"
                  step="0.01"
                  style={styles.amountInput}
                />
                <button
                  onClick={() => handleTransfer(selectedRecipient._id)}
                  disabled={loading || !transferAmount}
                  style={styles.button}
                >
                  {loading ? 'Processing...' : 'Send Money'}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default DashboardPage