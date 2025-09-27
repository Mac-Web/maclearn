import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import Hero from "../components/Hero";
import "./Playground.css";

function Playground() {
  const [htmlInput, setHtmlInput] = useState("");
  const [cssInput, setCssInput] = useState("");
  const [jsInput, setJsInput] = useState("");
  const outputRef = useRef();

  useEffect(() => {
    const output = outputRef.current.contentWindow.document;
    output.open();
    output.writeln("<style>" + cssInput + "</style>" + "<body>" + htmlInput + "<script>" + jsInput + "</script>" + "</body>");
    output.close();
  }, [htmlInput, cssInput, jsInput]);

  return (
    <>
      <title>Playground | MacLearn</title>
      <motion.div
        initial={{ y: 150, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, type: "spring" }}
        className="wrap"
      >
        <Hero
          title="Code Playground"
          description="Test, experiment, and apply the coding skills you've learned in the code playground."
        />
        <div class="wrap">
          <div class="wrapper">
            <div class="inputs">
              <div class="input">
                <textarea value={htmlInput} onInput={(e) => setHtmlInput(e.target.value)} placeholder="HTML"></textarea>
              </div>
              <div class="input">
                <textarea value={cssInput} onInput={(e) => setCssInput(e.target.value)} placeholder="CSS"></textarea>
              </div>
              <div class="input">
                <textarea value={jsInput} onInput={(e) => setJsInput(e.target.value)} placeholder="JavaScript"></textarea>
              </div>
            </div>
            <iframe
              ref={outputRef}
              className="output"
              sandbox="allow-forms allow-scripts allow-same-origin allow-popups"
            ></iframe>
          </div>
        </div>
      </motion.div>
    </>
  );
}

export default Playground;
