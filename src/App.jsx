import Footer from "./components/Footer";
import Header from "./components/Header";
import SiteRoutes from "./SiteRoutes";

function App() {
  return (
    <>
      <Header />
      <div className="container d-flex justify-content-center p-5" style={{ border: "1px solid red" }}>
        <SiteRoutes />
      </div>
      <Footer />
    </>
  );
}

export default App;
