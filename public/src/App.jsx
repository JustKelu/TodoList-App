import Home from "./components/Home"
import Login from "./components/Login"
import Todos from "./components/Todos"
import Navbar from "./components/NavBar";
import TodosCards from "./components/TodosCards";
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { AuthProvider, useAuth } from "./context/AuthContexts";

function AppRoutes() {
  const { isSignIn } = useAuth();
  
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/todos" element={isSignIn ? <Todos /> : <Login />}/>
      </Routes>
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
