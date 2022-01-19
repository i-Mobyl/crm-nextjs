import Navbar from "components/Navbar"
import ActiveResource from "components/ActiveResource"
import Footer from "components/Footer"

const Layout = ({ children }) => {

  return (
    <>
    <Navbar />
    <ActiveResource />
    <div style={{minHeight: "800px"}}>
      { children }
    </div>
    <Footer />
  </>
  )
  
}

export default Layout;