import Layout from "components/Layout";
import ResourceForm from "components/ResourceForm"
import axios from "axios";
import { useRouter } from "next/router";


const ResourceCreate = () => {  

  // Router
  const router = useRouter();

  const createResource = (formData) => {

    // Add new resource. If successful, redirect to home page
    // If using axios package to replace fetch calls
    // This is using the proxy method, e.g., calling the post method 
    // in resources.js which makes the call to the NodeJS server
    axios.post("/api/resources", formData) 
      .then(_ => router.push("/"))
      .catch((err) => {
        alert("Error: " + err?.response?.data)  // Weird
      })

    // fetch("/api/resources", {
    //   body: JSON.stringify(form),
    //   headers: { "Content-Type": "application/json" },
    //   method: "POST"
    // })
  }

  return (
    <Layout>

      <div className="container">
        <div className="columns">  
          <div className="column is-6 is-offset-3">
            <ResourceForm 
              onFormSubmit={createResource}
              formTitle={"Add New Resource"}
            />
          </div>
        </div>
      </div>

    </Layout>
  )
}

export default ResourceCreate;