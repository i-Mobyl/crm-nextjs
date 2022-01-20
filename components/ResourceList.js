import Link from "next/link";
import ResourceLabel from "components/ResourceLabel";
import moment from "moment";

const ResourceList = ({ resources }) => {


  const renderResources = () => {
    return resources.map(resource => 
        <div key={resource.id} className="column is-5 is-offset-1">
          <div className="content is-medium">
            <h2 
              className="subtitle is-7 has-text-grey mt-4">{moment(resource.createdAt).format("LL")}
              <ResourceLabel status={resource.status} />
            </h2>
            
            <h1 className="title has-text-black is-3 mb-2">{resource.title}</h1>
            <p className="mb-2 has-text-dark">{resource.description}</p>
            <Link href={`/resources/${resource.id}`}>
              <a className="button is-text is-small is-light">Learn more</a>
            </Link>
          </div>
        </div>
    )
  }

  return(
   
    <section className="hero ">
      <div className="hero-body">
        <div className="container">

          <section className="section pt-0">
            <div className="columns is-multiline is-variable is-8">

            { renderResources() }
              
            </div>
          </section>

          


        </div>
      </div>
    </section>
  )
  
}

export default ResourceList;