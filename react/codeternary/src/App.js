
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AuthForm from './AuthForm';
function App() {
  return (
    <div className="App">
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<AuthForm />} />
        <Route path="/register" element={<AuthForm />} />
        
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
