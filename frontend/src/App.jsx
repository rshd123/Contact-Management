import { useState, useEffect } from 'react';
import ContactForm from './components/ContactForm/ContactForm';
import ContactList from './components/ContactList/ContactList';
import contactService from './services/contactService';
import './App.css';

function App() {
  const [contacts, setContacts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [deletingId, setDeletingId] = useState(null);
  const [notification, setNotification] = useState(null);


  useEffect(() => {
    fetchContacts();
  }, []);


  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => {
        setNotification(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  const showNotification = (message, type = 'success') => {
    setNotification({ message, type });
  };

  const fetchContacts = async () => {
    setIsLoading(true);
    try {
      const response = await contactService.getAllContacts();
      if (response.success) {
        setContacts(response.data);
      }
    } catch (error) {
      const errorMsg = error.response?.data?.message || error.message || 'Failed to fetch contacts';
      showNotification(errorMsg, 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateContact = async (contactData) => {
    setIsSubmitting(true);
    try {
      const response = await contactService.createContact(contactData);
      if (response.success) {
        setContacts((prev) => [response.data, ...prev]);
        showNotification('Contact created successfully', 'success');
      }
    } catch (error) {
      const errorMsg = error.response?.data?.message || error.message || 'Failed to create contact';
      showNotification(errorMsg, 'error');
      throw error;
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteContact = async (contactId) => {
    setDeletingId(contactId);
    try {
      const response = await contactService.deleteContact(contactId);
      if (response.success) {
        setContacts((prev) => prev.filter((contact) => contact._id !== contactId));
        showNotification('Contact deleted successfully', 'success');
      }
    } catch (error) {
      const errorMsg = error.response?.data?.message || error.message || 'Failed to delete contact';
      showNotification(errorMsg, 'error');
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="app">
      {notification && (
        <div className={`notification ${notification.type}`}>
          <span>{notification.message}</span>
          <button
            className="notification-close"
            onClick={() => setNotification(null)}
          >
            ×
          </button>
        </div>
      )}

      <header className="app-header">
        <div className="container">
          <h1 className="app-title">Contact Management System</h1>
          <p className="app-subtitle">Manage your contacts efficiently</p>
        </div>
      </header>

      <main className="app-main">
        <div className="container">
          <ContactForm onSubmit={handleCreateContact} isLoading={isSubmitting} />
          <ContactList
            contacts={contacts}
            onDelete={handleDeleteContact}
            isLoading={isLoading}
            deletingId={deletingId}
          />
        </div>
      </main>

      <footer className="app-footer">
        <div className="container">
          <p>&copy; {new Date().getFullYear()} Contact Management System. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
