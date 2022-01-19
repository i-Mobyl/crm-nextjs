
import axios from "axios";

export default async function activeResource(req, res) {
  console.log("HERE!")
  const axiosRes = await axios.get(`${process.env.API_URL}/activeresource`)
  const resource = axiosRes.data;

  return res.send(resource);
}