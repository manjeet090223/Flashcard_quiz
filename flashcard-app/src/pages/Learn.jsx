import React, { useState, useEffect } from 'react';
import { FlaskConical, BookOpen, Landmark, Sigma, Sun, Moon } from 'lucide-react';
import '../styles/Learn.css';

const subjectsData = [
  { name: 'Math', icon: <Sigma size={32} />, className: 'math' },
  { name: 'Science', icon: <FlaskConical size={32} />, className: 'science' },
  { name: 'History', icon: <Landmark size={32} />, className: 'history' },
  { name: 'English', icon: <BookOpen size={32} />, className: 'english' },
];

const Learn = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(true);

  const filteredSubjects = subjectsData.filter(subject =>
    subject.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      document.documentElement.setAttribute('data-theme', 'light');
    }
  }, [isDarkMode]);

  return (
    <div className={`learn-page`}>
      <div className="header">
        <h1>Explore Subjects</h1>
        <button onClick={toggleTheme} className="theme-toggle-icon">
          {isDarkMode ? <Sun size={24} /> : <Moon size={24} />}
        </button>
      </div>

      <input
        type="text"
        placeholder="Search subjects..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-input"
      />

      <div className="subjects">
        {filteredSubjects.map((subject, index) => (
          <div key={index} className={`subject-card ${subject.className}`}>
            <div className="subject-icon">{subject.icon}</div>
            {subject.name}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Learn;
