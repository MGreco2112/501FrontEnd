import './App.css';
import AppRouter from "./components/routes/AppRouter";
import {BrowserRouter} from "react-router-dom";
import {AuthProvider} from "./components/poviders/AuthProvider";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRouter/>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
