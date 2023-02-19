import React, { useState } from "react";
import { ChakraProvider } from "@chakra-ui/react";

import { Route } from "react-router";
import { BrowserRouter, Routes, Navigate } from "react-router-dom";

import theme from "./theme/theme";
import AuthContext from "./contexts/AuthContext";

import AuthPage from "./pages/AuthPage";
import NewProfilePage from "./pages/NewProfilePage";
import MatchPage from "./pages/MatchPage";
import { PrefSelectionPage } from "./pages/PrefSelectionPage";
import { url } from "./url";

function App({ idToken }: any) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
    localStorage.getItem("isAuthenticated") === "true"
  );
  const [userId, setUserId] = useState<number>(-1);

  const signup = async (email: string, password: string) => {
    const res = await fetch(`${url}/signup`, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({
        email,
        password,
      }),
    });
    const json = await res.json();
    setUserId(json.id);
    setIsAuthenticated(true);
  };

  const login = async (email: string, password: string) => {
    console.log(email, password);
    const res = await fetch(`${url}/login`, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({
        email,
        password,
      }),
    });
    const json = await res.json();
    setUserId(json.id);
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.setItem("isAuthenticated", "false");
    setUserId(-1);
    setIsAuthenticated(false);
  };

  return (
    <ChakraProvider theme={theme}>
      <AuthContext.Provider
        value={{ isAuthenticated, userId, signup, login, logout }}
      >
        <BrowserRouter>
          <Routes>
            <Route path="/auth" element={<AuthPage />} />
            <Route path="/new" element={<NewProfilePage />} />
            <Route path="/prefs" element={<PrefSelectionPage />} />
            <Route path="/match" element={<MatchPage />} />
            <Route path="*" element={<Navigate to="/auth" replace />} />
          </Routes>
        </BrowserRouter>
      </AuthContext.Provider>
    </ChakraProvider>
  );
}

export default App;
