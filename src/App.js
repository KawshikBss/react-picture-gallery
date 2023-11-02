import Card from "./components/Card/Card";
import "./styles/gallery.css";

function App() {
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
                        {[...Array(20)].map((segment, index) => (
                            <Card key={index} firstItem={index === 0} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
