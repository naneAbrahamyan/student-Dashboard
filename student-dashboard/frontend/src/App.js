import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import "./assets/globalStyles.css";
import ThemeProvider from "./context/ThemeProvider";
import MainPage from "./pages/MainPage";
import DataProvider from "./context/DataProvider";

function App() {
  return (
    <DataProvider>
      <ThemeProvider>
        <BrowserRouter>
          <div style={{ height: "100vh" }}>
            <Header />
            <Routes>
              <Route path="/students" element={<MainPage />} />
              <Route path="*" element={<Navigate to="/students" replace />} />
            </Routes>
          </div>
        </BrowserRouter>
      </ThemeProvider>
    </DataProvider>
  );
}

export default App;
