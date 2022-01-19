

const ResourceLabel = ({ status }) => {

  return (
    <span className={`tag is-normal ml-4 resource-${status}`}>{status}</span>
  )
}

export default ResourceLabel;