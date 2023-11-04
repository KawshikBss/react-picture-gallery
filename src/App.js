import { useEffect, useState } from "react";
import Card from "./components/Card/Card";
import "./styles/gallery.css";
import { BsCardImage } from "react-icons/bs";

function App() {
    const [uploadedFiles, setUploadedFiles] = useState([]); // state for storing the uploaded files in queue
    const [selectedFilesCount, setSelectedFilesCount] = useState(0); // state for keeping track of selected files from queue

    // function to handle file uploading
    const handleFileUpload = (event) => {
        var file = event?.target?.files?.[0];
        if (file)
            setUploadedFiles((prev) => [
                ...prev,
                { file: file, selected: false },
            ]);
    };
    // function to extract the number of selected files from queue
    const getSelectedFilesCount = () => {
        if (!uploadedFiles?.length) return 0;
        return uploadedFiles.filter((item) => item.selected).length;
    };
    // function to handle selecting the file
    const handleFileSelect = (file) => {
        setUploadedFiles((prev) =>
            prev.map((item) =>
                item.file === file.file
                    ? { ...item, selected: !item.selected }
                    : item
            )
        );
    };
    // function to handle selecting all files
    const handleSelectAll = (event) => {
        if (!event.target.checked) return;
        setUploadedFiles((prev) =>
            prev.map((item) => {
                return { ...item, selected: true };
            })
        );
    };
    // function to handle deleting all selected files
    const handleFileDelete = () => {
        setUploadedFiles((prev) =>
            prev.filter((item) => item.selected !== true)
        );
    };
    const swapFiles = (targetFileIndex, destinationFileIndex) => {
        if (targetFileIndex === destinationFileIndex) return;
        setUploadedFiles((prev) => {
            var tmp = prev[targetFileIndex];
            prev[targetFileIndex] = prev[destinationFileIndex];
            prev[destinationFileIndex] = tmp;
            return prev;
        });
    };

    useEffect(() => {
        setSelectedFilesCount(getSelectedFilesCount());
    }, [uploadedFiles]);
    const [currentItem, setCurrentItem] = useState(null);

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
                                      index={index}
                                      item={item}
                                      handleFileSelect={handleFileSelect}
                                      currentItem={currentItem}
                                      setCurrentItem={setCurrentItem}
                                      swapItems={swapFiles}
                                  />
                              ))
                            : null}
                        <label className="gallery-add-btn">
                            <input
                                hidden
                                type="file"
                                onChange={handleFileUpload}
                                accept="image/*"
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
