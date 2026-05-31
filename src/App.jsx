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


function App() {
  const currentTheme =lightTheme;
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
      </ThemeProvider>
    </>
  );
}

export default App;
