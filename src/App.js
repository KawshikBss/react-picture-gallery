import "./styles/gallery.css";

function App() {
    return (
        <div className="container">
            <div className="container-inner">
                <div className="top-bar">
                    <span className="top-bar-fileinfo">
                        <input
                            type="checkbox"
                            id="select-all-btn"
                        />
                        3 Files Selected
                    </span>
                    <span className="topbar-delete-btn">Delete Files</span>
                </div>
                <div className="gallery-wrapper"></div>
            </div>
        </div>
    );
}

export default App;
