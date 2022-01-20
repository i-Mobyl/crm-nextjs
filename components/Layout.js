import Navbar from "components/Navbar"
import ActiveResource from "components/ActiveResource"
import Footer from "components/Footer"

const Layout = ({ children, page }) => {
  
  return (
    <>
    <Navbar />
    <ActiveResource page={page}/>
    <div style={{minHeight: "800px"}}>
      { children }
    </div>
    <Footer />
  </>
  )
  
}

export default Layout;