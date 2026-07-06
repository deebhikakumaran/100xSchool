import React, { Component } from 'react';
import './AdopterData.css'; 

export class AdopterData extends Component {
  render() {
    const { formData, handleGoBack } = this.props;

    return (
      <div className="table-container">
        <table className="adopter-table">
          <thead>
            <tr>
              <th>Pet Name</th>
              <th>Pet Type</th>
              <th>Adopter Name</th>
              <th>Email</th>
              <th>Phone</th>
            </tr>
          </thead>
          <tbody>
            {formData.map((f, i) => (
              <tr key={i}>
                <td>{f.name}</td>
                <td>{f.type}</td>
                <td>{f.adopterName}</td>
                <td>{f.email}</td>
                <td>{f.phone}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="button-container">
          <button className="go-back-btn" onClick={handleGoBack}>
            Go Back
          </button>
        </div>
      </div>
    );
  }
}

export default AdopterData;