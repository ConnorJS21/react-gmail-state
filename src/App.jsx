import Header from './components/Header'
import initialEmails from './data/emails'
import { useState } from 'react';
import './styles/App.css'

function App() {
  const [emails, setEmails] = useState(initialEmails);
  const [originalEmails, setOriginalEmails] = useState(initialEmails);
  const [hideRead, setHideRead] = useState(false);

  const toggleStar = (id) => {
    const updatedEmails = emails.map(email =>
      email.id === id ? { ...email, starred: !email.starred } : email
    );
    setEmails(updatedEmails);
  };

  const toggleRead = (id) => {
    const updatedEmails = emails.map(email =>
      email.id === id ? { ...email, read: !email.read } : email
    );
    setEmails(updatedEmails);
  };
  const toggleHideRead = () => {
    if (!hideRead) {
      const unreadEmails = emails.filter(email => !email.read);
      setEmails(unreadEmails);
    } else {
      setEmails(originalEmails);
    }
    setHideRead(!hideRead);
  };

  const unreadCount = emails.filter(email => !email.read).length;
  const starredCount = emails.filter(email => email.starred).length;

  return (
    <div className="app">
      <Header />
      <nav className="left-menu">
        <ul className="inbox-list">
          <li className="item active">
            <span className="label">Inbox</span>
            <span className="count">{emails.length}</span>
          </li>
          <li className="item">
            <span className="label">Starred</span>
            <span className="count">{starredCount}</span>
          </li>
          <li className="item toggle">
            <label htmlFor="hide-read">Hide read</label>

            <input
              id="hide-read"
              type="checkbox"
              onChange={() => toggleHideRead()}
            />
          </li>
        </ul>
      </nav>
      <main className="emails">
        <ul>
          {emails.map((email) => (
            <li
              key={email.id}
              className={`email ${email.read ? 'read' : 'unread'}`}
            >
              <div className="select">
                <input
                  className="select-checkbox"
                  type="checkbox"
                  onChange={() => toggleRead(email.id)}
                />
              </div>
              <div className="star">
                <input
                  className="star-checkbox"
                  type="checkbox"
                  checked={email.starred}
                  onChange={() => toggleStar(email.id)}
                />
              </div>
              <div className="sender">{email.sender}</div>
              <div className="title">{email.title}</div>
            </li>
          ))}
        </ul>
      </main>
    </div>
  )
}

export default App