
import React, { useState } from 'react';
import { Layout } from './components/Layout';
import { Dashboard } from './components/Dashboard';
import { Notes } from './components/Notes';
import { Settings } from './components/Settings';
import { Scanner } from './components/Scanner';
import { Login } from './components/Login';
import { Directory } from './components/Directory';
import { AppSection, User } from './types';

const App: React.FC = () => {
  const [activeSection, setActiveSection] = useState<AppSection>('dashboard');
  const [user, setUser] = useState<User | null>(null);

  const handleLogin = (authenticatedUser: User) => {
    setUser(authenticatedUser);
    setActiveSection('dashboard');
  };

  const handleLogout = () => {
    setUser(null);
    setActiveSection('dashboard');
  };

  if (!user) {
    return <Login onLogin={handleLogin} />;
  }

  const renderContent = () => {
    switch (activeSection) {
      case 'dashboard':
        return <Dashboard 
          user={user} 
          onScanRequest={() => user.role === 'teacher' && setActiveSection('scan')} 
        />;
      case 'scan':
        return user.role === 'teacher' 
          ? <Scanner onComplete={() => setActiveSection('dashboard')} />
          : <Dashboard user={user} />;
      case 'notes':
        return <Notes user={user} />;
      case 'directory':
        return <Directory user={user} />;
      case 'settings':
        return <Settings user={user} onLogout={handleLogout} />;
      default:
        return <Dashboard user={user} onScanRequest={() => user.role === 'teacher' && setActiveSection('scan')} />;
    }
  };

  return (
    <Layout activeSection={activeSection} onNavigate={setActiveSection} userRole={user.role}>
      {renderContent()}
    </Layout>
  );
};

export default App;
