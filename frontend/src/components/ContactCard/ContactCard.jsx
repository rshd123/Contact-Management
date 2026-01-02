import React from 'react';
import './ContactCard.css';

const ContactCard = ({ contact, onDelete, isDeleting }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const formatPhoneNumber = (phone) => {
    const phoneStr = phone.toString();
    if (phoneStr.length === 10) {
      return `${phoneStr.slice(0, 5)} ${phoneStr.slice(5)}`;
    }
    return phoneStr;
  };

  const handleDelete = () => {
    if (window.confirm(`Are you sure you want to delete ${contact.name}?`)) {
      onDelete(contact._id);
    }
  };

  return (
    <div className="contact-card">
      <div className="contact-card-header">
        <div className="contact-avatar">
          {contact.name.charAt(0).toUpperCase()}
        </div>
        <div className="contact-info">
          <h3 className="contact-name">{contact.name}</h3>
          <p className="contact-date">{formatDate(contact.createdAt)}</p>
        </div>
      </div>

      <div className="contact-details">
        <div className="contact-detail-item">
          <svg
            className="detail-icon"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
            />
          </svg>
          <span className="detail-text">{contact.email}</span>
        </div>

        <div className="contact-detail-item">
          <svg
            className="detail-icon"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
            />
          </svg>
          <span className="detail-text">{formatPhoneNumber(contact.phone)}</span>
        </div>

        {contact.message && (
          <div className="contact-message">
            <svg
              className="detail-icon"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
              />
            </svg>
            <p className="message-text">{contact.message}</p>
          </div>
        )}
      </div>

      <button
        className="delete-button"
        onClick={handleDelete}
        disabled={isDeleting}
      >
        {isDeleting ? (
          'Deleting...'
        ) : (
          <>
            <svg
              className="delete-icon"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
            Delete
          </>
        )}
      </button>
    </div>
  );
};

export default ContactCard;
