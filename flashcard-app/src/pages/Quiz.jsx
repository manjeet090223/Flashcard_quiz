import React, { useEffect, useState } from 'react';
import { FlaskConical, BookOpen, Landmark, Sigma, Sun, Moon } from 'lucide-react';
import ChatQuiz from './ChatQuiz'; 
import '../styles/Learn.css';

const subjectsData = [
  { name: 'Math', icon: <Sigma size={32} />, className: 'math' },
  { name: 'Science', icon: <FlaskConical size={32} />, className: 'science' },
  { name: 'History', icon: <Landmark size={32} />, className: 'history' },
  { name: 'English', icon: <BookOpen size={32} />, className: 'english' },
];

const Quiz = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [concepts, setConcepts] = useState([]);
  const [selectedConcept, setSelectedConcept] = useState(null);

  const filteredSubjects = subjectsData.filter(s =>
    s.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  useEffect(() => {
    if (selectedSubject) {
      fetch('/full_concepts.json')
        .then(res => res.json())
        .then(data => {
          const conceptList = data[selectedSubject] || [];
          setConcepts(conceptList);
        })
        .catch(err => console.error('Error fetching concepts:', err));
    }
  }, [selectedSubject]);

  const handleConceptClick = (concept) => {
    setSelectedConcept(concept);
  };

  return (
    <div className="learn-page">
      <div className="header">
        <h1 className="title">
          {selectedConcept
            ? `${selectedConcept} Quiz`
            : selectedSubject
            ? `${selectedSubject} Concepts`
            : 'Choose Subject for Quiz'}
        </h1>
        <button onClick={() => setIsDarkMode(!isDarkMode)} className="theme-toggle-icon">
          {isDarkMode ? <Sun size={24} /> : <Moon size={24} />}
        </button>
      </div>

      {!selectedSubject && (
        <>
          <input
            type="text"
            placeholder="Search subjects..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="search-input"
          />
          <div className="subjects">
            {filteredSubjects.map((subj, i) => (
              <div
                key={i}
                className={`subject-card ${subj.className}`}
                onClick={() => setSelectedSubject(subj.name)}
              >
                <div className="subject-icon">{subj.icon}</div>
                {subj.name}
              </div>
            ))}
          </div>
        </>
      )}

      {selectedSubject && !selectedConcept && (
        <div className="subjects">
          {concepts.length > 0 ? (
            concepts.map((item, index) => (
              <div
                key={index}
                className={`subject-card ${selectedSubject.toLowerCase()}`}
                onClick={() => handleConceptClick(item.concept)}
              >
                <div className="subject-icon">📘</div>
                {item.concept}
              </div>
            ))
          ) : (
            <p>No concepts found for {selectedSubject}</p>
          )}
        </div>
      )}

     
      {selectedConcept && (
        <ChatQuiz subject={selectedSubject} concept={selectedConcept} />
      )}
    </div>
  );
};

export default Quiz;
