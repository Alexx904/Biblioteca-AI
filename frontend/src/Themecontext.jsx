import React, { createContext, useContext, useState } from "react";

const ThemeContext = createContext();

/**
 * Legge la preferenza dark/light da un cookie regolare (non httpOnly).
 * Viene salvato lato client così la scelta persiste tra sessioni.
 */

function leggiCookieDark() {
    const match = document.cookie.match(/(?:^|;\s*)darkMode=([^;]+)/);
    return match ? match[1] === "true" : false;
}

export function ThemeContextProvider({ children }) {
    const [isDark, setIsDark] = useState(leggiCookieDark);

    const toggleTheme = () => {
        setIsDark(prev => {
            const prossimo = !prev;
            // Cookie valido 1 anno, leggibile da JS (non httpOnly)
            const maxAge = 60 * 60 * 24 * 365;
            document.cookie = `darkMode=${prossimo}; path=/; max-age=${maxAge}; SameSite=Lax`;
            return prossimo;
        });
    };

    return (
        <ThemeContext.Provider value={{ isDark, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}

export const useThemeContext = () => useContext(ThemeContext);