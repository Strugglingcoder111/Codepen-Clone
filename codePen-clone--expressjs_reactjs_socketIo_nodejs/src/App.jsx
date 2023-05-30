import { useState, useEffect } from "react";
import "./App.css";
import { generateSrcDoc } from "./helper";
import EditorsSection from "./components/EditorsSection";
import { io } from "socket.io-client";

let socket = null;

const App = () => {
  const [editorState, setEditorState] = useState({
    html: "",
    css: "",
    js: "",
  });
  const [srcDoc, setSrcDoc] = useState(``);
  const [isSocketConnected, setIsSocketConnected] = useState(false);

  const handleChange = ({ name, value }) => {
    const dataToSave = { ...editorState, [name]: value };
    socket.emit("onChange", dataToSave);
    setEditorState(dataToSave);
  };

  const onSocketConnect = () => {
    setIsSocketConnected(true);
  };

  const onSocketDisconnect = () => {
    setIsSocketConnected(false);
  };

  const onSycnUp = (value) => {
    setEditorState(value);
  };

  useEffect(() => {
    (async () => {
      const response = await fetch("http://localhost:3000/sync");
      const data = await response.json();
      setEditorState(data.data);
    })();
    
    socket = io("http://localhost:3000");

    socket.on("connect", onSocketConnect);
    socket.on("onSyncUp", onSycnUp);
    socket.on("disconnect", onSocketDisconnect);

    return () => {
      socket.off("connect", onSocketConnect);
      socket.off("onSyncUp", onSycnUp);
      socket.off("disconnect", onSocketDisconnect);
    };
  }, []);

  useEffect(() => {
    setSrcDoc(generateSrcDoc(editorState));
  }, [editorState]);

  return (
    <>
      {isSocketConnected ? (
        <>
          <EditorsSection
            editorState={editorState}
            handleChange={handleChange}
          />
          <iframe srcDoc={srcDoc} border="3"></iframe>
        </>
      ) : (
        <h1>Connecting...</h1>
      )}
    </>
  );
};

export default App;
