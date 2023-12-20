import React from "react";
import { SnackbarProvider } from "notistack";
import LandingPage from "pages/landingPage";

function App() {
  return (
    <div className='App'>
      <SnackbarProvider>
        <LandingPage />
      </SnackbarProvider>
    </div>
  );
}

export default App;
