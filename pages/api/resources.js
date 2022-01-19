import axios from "axios";

// Proxy: Requests from the app are sent here, and we forward them to the server;
// Also forward the response back to the calling component.
// This gets run on the App's BACK-END (server), not from the browser.
export default async function (req, res) {

  // GET existing resources from the server
  if (req.method === "GET") {
    const dataRes = await fetch(`${process.env.API_URL}/resources`);
    const data = await dataRes.json();
  
    return res.send(data);
  } 
  

  
  // POST or PATCH new resource to the server
  if (req.method === "POST" || "PATCH"){
    //console.log("This should appear on the back-end terminal, not the browser console.")
   
    // Validate data
    const { id, title, description, link, timeToFinish, priority } = req.body
    
    if (!title || !description || !link || !timeToFinish || !priority) {
      return(res.status(422).send("Missing data. Please ensure all fields are filled."))
    }

    const url = req.method === "POST"
      ? `${process.env.API_URL}/resources`
      : `${process.env.API_URL}/resources/${id}`;



    //return res.send("data has been rec'd");
    try {
      // const axiosRes = await axios.post(url, req.body) // If using axios package to replace fetch calls
      const axiosRes = await axios[req.method.toLowerCase()](url, req.body)
      return res.send(axiosRes.data)
    } catch {
      return res.status(422).send("Unable to save data.")
    }
    

  }

}