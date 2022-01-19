
import Link from "next/link";
import { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";

const ActiveResource = () => {

  const [resource, setResource] = useState({});
  const [seconds, setSeconds] = useState();

  // Run this once when loaded
  useEffect(() => {
    const fetchActiveResource = async () => {
      
      try {	
        const res = await axios.get("/api/activeresource");
        const resource = res.data;
      }
      catch(rejValue){
        //console.log('Err: ', rejValue);
      }
      const timeToFinish = parseInt(resource.timeToFinish, 10);
      
      const elapsedTimeInSeconds = moment().diff(moment(resource.activationTime, "YYYY-MM-DD"), "seconds");
      
      const updatedTimeToFinish = (timeToFinish * 60) - elapsedTimeInSeconds;
      
      if (updatedTimeToFinish >= 0){
        resource.timeToFinish = updatedTimeToFinish;

        // Here we change the seconds state, which triggers the next useEffect
        setSeconds(updatedTimeToFinish);
      }

      setResource(resource);
    }
    fetchActiveResource();
  }, [])


  // After every second, decrease the number of seconds (in state) by 1.
  useEffect(() => {
    
    // Change the state every second
    const interval = setTimeout(() => {
      setSeconds(seconds - 1);
    }, 1000)

    // Clear the timer if resource time expired
    if (seconds < 0) {
      clearTimeout(interval);
    }

    // This will be run when the component is unmounted, so also clear interval timer here.
    return () => clearTimeout(interval);

  }, [seconds]);

  // Re-use the patch to update the resource with a changed status field
  // Allow only one active resource at a time.
  const markResourceCompleted = () => {
    axios.patch("/api/resources", {...resource, status: "complete"})
    .then(_ => location.reload())
      .catch((err) => {
        alert(`Error: Cannot mark resource as completed: ${err?.response?.data}`)  // Weird
      })
  }

  const hasResource = resource && resource.id;

  return (

    <div className="active-resource" >
      <h1 className="resource-name">
        {hasResource ? resource.title : "No Active Resource"}
      </h1>
      <div className="time-wrapper">
        { hasResource &&
          ( seconds > 0 ?
            // Show seconds countdown
            <h2 className="elapsed-time">
              {seconds}
            </h2> :
            // Timer elapsed - offer user Done button
            <h2 className="elapsed-time">
              <button 
                onClick={markResourceCompleted}
                className="button is-success">
                Mark as complete
              </button>
            </h2>
          )
        }
      </div>
      {
        hasResource ?
        <Link href={`/resources/${resource.id}`}>
          <a className="button">
            Go to resource
          </a>
        </Link>:
        <Link href="/">
          <a className="button">
            Go to resources
          </a>
        </Link>
      }
    </div>

  )

}

export default ActiveResource;