import Header from "./Header"
import Hero from "./Hero";
import Catalogo from "./Catalogo";
import Postazioni from "./Postazioni";
import Chat from "./Chat";
import Informazioni from "./Informazioni";
import Footer from "./Footer";
import {ThemeProvider} from "@mui/material/styles";
import {lightTheme, darkTheme} from "./Theme";
import { CssBaseline } from "@mui/material";
import WidgetChat from "./WidgetChat";
import { ThemeContextProvider, useThemeContext } from "./ThemeContext";



function AppContent() {
  const {isDark} = useThemeContext();
  const currentTheme = isDark ? darkTheme:lightTheme; 
  return(
    <>
      <ThemeProvider theme={currentTheme}>
        <CssBaseline /> {/* CssBaseline è FONDAMENTALE: resetta i margini del browser e applica automaticamente il colore background.default (scuro o chiaro) a tutta la pagina del sito */}
        <Header/>
        <Hero/>
        <Catalogo/>
        <Postazioni/>
        <Chat/>
        <Informazioni/>
        <Footer/>
        <WidgetChat/>
      </ThemeProvider>
    </>
  );
}

/**
 * App avvolge tutto nel ThemeContextProvider così ogni componente
 * dell'albero può leggere/modificare il tema tramite useThemeContext().
 */
function App() {
    return (
        <ThemeContextProvider>
            <AppContent />
        </ThemeContextProvider>
    );
}

export default App;
