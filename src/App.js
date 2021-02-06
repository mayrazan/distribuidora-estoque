import { Routes } from "./pages/routes";
import { Router } from "react-router-dom";
import { AuthProvider } from "./Context/contextAuthentication";
import history from "./utils/history";

function App() {
  return (
    <AuthProvider>
      <Router history={history}>
        <Routes />
      </Router>
    </AuthProvider>
  );
}

export default App;
