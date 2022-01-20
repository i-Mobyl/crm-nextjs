import Layout from "components/Layout";
import ResourceForm from "components/ResourceForm"
import axios from "axios";
import { useRouter } from "next/router";

const ResourceEdit = ({ resource }) => {

  // Router
  const router = useRouter();

  const updateResource = (formData) => {
    
    // Send request by proxy (resources.js)
    axios.patch("/api/resources", formData) 
      .then(_ => router.push(`/resources/${formData.id}`))
      .catch((err) => {
        alert("Error: " + err?.response?.data)  // Weird
      })
  }

  return (
    <Layout>
      <div className="container">
        <div className="columns">  
          <div className="column is-6 is-offset-3">
            <ResourceForm 
              originalResource={resource}
              onFormSubmit={updateResource}
              formTitle={"Edit Resource"}
            />
          </div>
        </div>
      </div>
    </Layout>
  )
}



// Using getServerSideProps() to get data from dynamic page id
export async function getServerSideProps({params}) {
  const resData = await fetch(`${process.env.API_URL}/resources/${params.id}`);
  const data = await resData.json();
  
  return {
    props: {
      resource: data
    }
  }
}

export default ResourceEdit;