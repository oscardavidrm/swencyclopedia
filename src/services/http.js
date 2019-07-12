import Axios from "axios";

function get(resource) {
  return Axios.get(resource);
}

export default {
  get
};
