import { useRef, useState, useEffect } from "react";

function Lab({ html, css = "", js = "" }) {
  const [htmlValue, setHtmlValue] = useState(html);
  const [cssValue, setCssValue] = useState(css);
  const [jsValue, setJsValue] = useState(js);
  const [openedTab, setOpenedTab] = useState("html");
  const outputRef = useRef();

  useEffect(() => {
    const output = outputRef.current.contentWindow.document;
    output.open();
    output.writeln(`<style>${cssValue}</style><body>${htmlValue}<script>${jsValue}</script></body>`);
    output.close();
  }, [htmlValue, cssValue, jsValue]);

  useEffect(() => {
    setHtmlValue(html);
    setCssValue(css);
    setJsValue(js);
    setOpenedTab("html");
  }, [html, css, js]);

  return (
    <div className="lab">
      <div className="tabs">
        <div
          className={openedTab == "html" ? "tab active" : "tab"}
          onClick={() => {
            setOpenedTab("html");
          }}
        >
          HTML
        </div>
        {css && (
          <div className={openedTab == "css" ? "tab active" : "tab"} onClick={() => setOpenedTab("css")}>
            CSS
          </div>
        )}
        {js && (
          <div className={openedTab == "js" ? "tab active" : "tab"} onClick={() => setOpenedTab("js")}>
            JavaScript
          </div>
        )}
        <div className={openedTab == "output" ? "tab active" : "tab"} onClick={() => setOpenedTab("output")}>
          Output
        </div>
      </div>
      <div className="contentt">
        {openedTab == "html" && (
          <textarea
            placeholder="Enter HTML here"
            className="lab-textarea"
            onChange={(e) => setHtmlValue(e.target.value)}
            value={htmlValue}
          ></textarea>
        )}
        {openedTab == "css" && (
          <textarea
            placeholder="Enter CSS here"
            className="lab-textarea"
            onChange={(e) => setCssValue(e.target.value)}
            value={cssValue}
          ></textarea>
        )}
        {openedTab == "js" && (
          <textarea
            placeholder="Enter JavaScript here"
            className="lab-textarea"
            onChange={(e) => setJsValue(e.target.value)}
            value={jsValue}
          ></textarea>
        )}
        <iframe className={openedTab == "output" ? "lab-output" : "hide"} ref={outputRef}></iframe>
      </div>
    </div>
  );
}

export default Lab;
