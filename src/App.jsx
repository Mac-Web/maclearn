import { HashRouter, Routes, Route } from "react-router";
import Home from "./pages/Home";
import Html from "./pages/HtmlPage";
import Css from "./pages/Css";
import References from "./pages/References";
import Playground from "./pages/Playground";
import Me from "./pages/Me";
import Article from "./pages/Article";
import Quiz from "./pages/Quiz";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import ScrollTop from "./components/ScrollTop";

function App() {
  return (
    <>
      <HashRouter>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/html" element={<Html />} />
          <Route path="/html/:id" element={<Article course="html" />} />
          <Route path="/html/q/:id" element={<Quiz course="html" />} />
          <Route path="/css" element={<Css />} />
          <Route path="/css/:id" element={<Article course="css" />} />
          <Route path="/css/q/:id" element={<Quiz course="css" />} />
          <Route path="/references" element={<References />} />
          <Route path="/references/:id" element={<Article course="references" />} />
          <Route path="/playground" element={<Playground />} />
          <Route path="/me" element={<Me />} />
        </Routes>
        <Footer />
        <ScrollTop />
      </HashRouter>
    </>
  );
}

export default App;
