import React from 'react';
import ContactCard from '../ContactCard/ContactCard';
import './ContactList.css';

const ContactList = ({ contacts, onDelete, isLoading, deletingId }) => {
  if (isLoading) {
    return (
      <div className="contact-list-container">
        <div className="loading-state">
          <div className="spinner"></div>
          <p>Loading contacts...</p>
        </div>
      </div>
    );
  }

  if (!contacts || contacts.length === 0) {
    return (
      <div className="contact-list-container">
        <div className="empty-state">
          <svg
            className="empty-icon"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
            />
          </svg>
          <h3>No Contacts Yet</h3>
          <p>Start by adding your first contact using the form above.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="contact-list-container">
      <div className="contact-list-header">
        <h2 className="list-title">All Contacts</h2>
        <span className="contact-count">{contacts.length} {contacts.length === 1 ? 'Contact' : 'Contacts'}</span>
      </div>
      <div className="contact-grid">
        {contacts.map((contact) => (
          <ContactCard
            key={contact._id}
            contact={contact}
            onDelete={onDelete}
            isDeleting={deletingId === contact._id}
          />
        ))}
      </div>
    </div>
  );
};

export default ContactList;
