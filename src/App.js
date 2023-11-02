import { useEffect, useState } from "react";
import Card from "./components/Card/Card";
import "./styles/gallery.css";
import { BsCardImage } from "react-icons/bs";

function App() {
    const [uploadedFiles, setUploadedFiles] = useState([]);
    const [selectedFilesCount, setSelectedFilesCount] = useState(0);
    const handleFileUpload = (event) => {
        var file = event?.target?.files?.[0];
        if (file)
            setUploadedFiles((prev) => [
                ...prev,
                { file: file, selected: false },
            ]);
    };
    const getSelectedFilesCount = () => {
        if (!uploadedFiles?.length) return 0;
        return uploadedFiles.filter((item) => item.selected).length;
    };
    const handleFileSelect = (file) => {
        setUploadedFiles((prev) =>
            prev.map((item) =>
                item.file === file.file
                    ? { ...item, selected: !item.selected }
                    : item
            )
        );
    };
    const handleSelectAll = (event) => {
        if (!event.target.checked) return;
        setUploadedFiles((prev) =>
            prev.map((item) => {
                return { ...item, selected: true };
            })
        );
    };
    const handleFileDelete = () => {
        setUploadedFiles((prev) =>
            prev.filter((item) => item.selected !== true)
        );
    };
    useEffect(() => {
        setSelectedFilesCount(getSelectedFilesCount());
    }, [uploadedFiles]);
    console.table(uploadedFiles);
    return (
        <div className="container">
            <div className="container-inner">
                <div className="top-bar">
                    <span className="top-bar-fileinfo">
                        {selectedFilesCount ? (
                            <>
                                <input
                                    type="checkbox"
                                    id="select-all-btn"
                                    onChange={handleSelectAll}
                                />
                                {selectedFilesCount} Files Selected
                            </>
                        ) : (
                            "Gallery"
                        )}
                    </span>
                    <span
                        className="topbar-delete-btn"
                        onClick={handleFileDelete}
                    >
                        {selectedFilesCount
                            ? selectedFilesCount > 1
                                ? "Delete Files"
                                : "Delete File"
                            : ""}
                    </span>
                </div>
                <div className="gallery-wrapper">
                    <div className="gallery-items">
                        {uploadedFiles?.length
                            ? uploadedFiles.map((item, index) => (
                                  <Card
                                      key={index}
                                      firstItem={index === 0}
                                      item={item}
                                      handleFileSelect={handleFileSelect}
                                  />
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
