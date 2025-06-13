import React, { useState, useEffect } from 'react';
import { FlaskConical, BookOpen, Landmark, Sigma, Sun, Moon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
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
  const navigate = useNavigate();

  const filteredSubjects = subjectsData.filter(subject =>
    subject.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  const handleSubjectClick = (subjectName) => {
    navigate(`/learn/${subjectName.toLowerCase()}`);
  };

  return (
    <div className={`learn-page`}>
      <div className="header">
        <h1 className="title">Explore Subjects</h1>
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
          <div
            key={index}
            className={`subject-card ${subject.className}`}
            onClick={() => handleSubjectClick(subject.name)}
            style={{ cursor: 'pointer' }}
          >
            <div className="subject-icon">{subject.icon}</div>
            {subject.name}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Learn;
