import Layout from "components/Layout";
import Link from "next/link";
import axios from "axios";
import ResourceLabel from "components/ResourceLabel";
import moment from "moment";
//import { useRouter } from "next/router";

const ResourceDetail = ({ resource }) => {

  
  // Useful if fallback route is true whnen using getStaticPaths()
  //const router = useRouter();
  // if (router.isFallback) {
  //   return <div>Loading data...</div>
  // }

  // Re-use the patch to update the reosurce with a changed status field
  // Allow only one active resource at a time.
  const activateResource = () => {
    axios.patch("/api/resources", {...resource, status: "active"})
    .then(_ => location.reload())
      .catch((err) => {
        alert(`Error: Cannot activate resource: ${err?.response?.data}`)  // Weird
      })
  }

  return (

    <Layout>
      <section className="hero ">
        <div className="hero-body">
          <div className="container">
            
            <section className="section">
              <div className="columns">
                <div className="column is-8 is-offset-2">
                  <div className="content is-medium">

                    { (resource.status === "inactive") &&
                        <>
                          <Link href={`/resources/${resource.id}/edit`}>
                            <a className="button is-link is-small">Edit</a>
                          </Link>

                          <button 
                            onClick={activateResource}
                            className="ml-1 button is-success is-link is-small">
                            Activate
                          </button>
                        </>
                        
                      }
                    
                    <h2 
                      className="subtitle is-4">{moment(resource.createdAt).format("LLLL")}
                      <ResourceLabel status={resource.status} />
                    </h2>
                    <h1 className="title">{resource.title}</h1>
                    <p>{resource.description}</p>
                    <p>{`Duration (minutes): ${resource.timeToFinish}`}</p>
                  </div>
                </div>
              </div>
            </section>
              
          </div>
        </div>
      </section>
    </Layout>

  )
}

// Using getServerSideProps() to get data from dynamic page id
export async function getServerSideProps({params}) {
  const resData = await fetch(`${process.env.API_URL}/resources/${params.id}`);
  const data = await resData.json();
  //console.log("index.js - Data: ", data)
  return {
    props: {
      resource: data
    }
  }
}


// export async function getStaticPaths() {

//   const resData = await fetch(`http://localhost:3001/api/resources`);
//   const data = await resData.json();
//   const paths = data.map(resource => {
//     return {
//       params: { id: resource.id}
//     }
//   });

//   return {
//     paths,
//     // Other routes should resolve to a 404 error
//     fallback: false
//   }
// }

// // Using getStaticProps() to get data from dynamic page id
// // In this case, the params are provided by getStaticPaths() above.
// export async function getStaticProps({params}) {
//   const resData = await fetch(`http://localhost:3001/api/resources/${params.id}`);
//   const data = await resData.json();
  
//   return {
//     props: {
//       resource: data
//     }   // time in seconds
//   }
// }

// Using getInitialProps() to get data from dynamic page id
// Likely wil be deprecated!
// This function runs on BOTH the client (when page is first loaded) 
// and server (when page is refreshed). Since the fetch() is to the server,
// the page load fails due to CORS policy; a refresh will work, however.
// ResourceDetail.getInitialProps = async ({ query }) => {     // Must use component name!
//   const resData = await fetch(`http://localhost:3001/api/resources/${query.id}`);
//   const data = await resData.json();
//   console.log("Data: ", data)
//   return {
//     resource: data
//   }
// }


export default ResourceDetail;