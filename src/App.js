import { useState } from "react";
import Card from "./components/Card/Card";
import "./styles/gallery.css";
import { BsCardImage } from "react-icons/bs";

function App() {
    const [uploadedFiles, setUploadedFiles] = useState([]);
    const handleFileUpload = (event) => {
        var file = event?.target?.files?.[0];
        if (file) setUploadedFiles((prev) => [...prev, file]);
    };
    return (
        <div className="container">
            <div className="container-inner">
                <div className="top-bar">
                    <span className="top-bar-fileinfo">
                        <input type="checkbox" id="select-all-btn" />3 Files
                        Selected
                    </span>
                    <span className="topbar-delete-btn">Delete Files</span>
                </div>
                <div className="gallery-wrapper">
                    <div className="gallery-items">
                        {uploadedFiles?.length
                            ? uploadedFiles.map((segment, index) => (
                                  <Card key={index} firstItem={index === 0} />
                              ))
                            : null}
                        <label className="gallery-add-btn">
                            <input
                                hidden
                                type="file"
                                onChange={handleFileUpload}
                            />
                            <BsCardImage />
                            Add Images
                        </label>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
