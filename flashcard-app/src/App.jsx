import { Routes, Route, Navigate, useParams } from 'react-router-dom';
import Home from './pages/Home';
import Learn from './pages/Learn';
import Quiz from './pages/Quiz';             
import ChatQuiz from './pages/ChatQuiz';    
import Result from './pages/Result';
import Flashcards from './pages/Flashcards';
import Welcome from './pages/Welcome';
import Login from './pages/Login';
import Signup from './pages/Signup';


import MiniGames from './pages/MiniGames';
import MatchGame from './games/MatchGame';
import DragDropGame from './games/DragDropGame';

const ProtectedRoute = ({ children }) => {
  const user = localStorage.getItem('user');
  return user ? children : <Navigate to="/welcome" />;
};

const FlashcardWrapper = () => {
  const { subject } = useParams();
  return <Flashcards subject={subject} />;
};

function App() {
  return (
    <Routes>
      <Route path="/welcome" element={<Welcome />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        }
      />
      <Route
        path="/learn"
        element={
          <ProtectedRoute>
            <Learn />
          </ProtectedRoute>
        }
      />
      <Route
        path="/learn/:subject"
        element={
          <ProtectedRoute>
            <FlashcardWrapper />
          </ProtectedRoute>
        }
      />
      <Route
        path="/quiz"
        element={
          <ProtectedRoute>
            <Quiz /> 
          </ProtectedRoute>
        }
      />
      <Route
        path="/quiz/:subject/:concept"
        element={
          <ProtectedRoute>
            <ChatQuiz />
          </ProtectedRoute>
        }
      />
      <Route
        path="/result"
        element={
          <ProtectedRoute>
            <Result />
          </ProtectedRoute>
        }
      />

      {/* ✅ Mini Games Routes */}
      <Route
        path="/mini-games"
        element={
          <ProtectedRoute>
            <MiniGames />
          </ProtectedRoute>
        }
      />
      <Route
        path="/mini-games/match"
        element={
          <ProtectedRoute>
            <MatchGame />
          </ProtectedRoute>
        }
      />
      <Route
        path="/mini-games/drag-drop"
        element={
          <ProtectedRoute>
            <DragDropGame />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;
