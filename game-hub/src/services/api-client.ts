import axios from "axios";

export default axios.create({
  baseURL: "https://api.rawg.io/api",
  params: {
    // TODO: implement security best practice
    key: "42080ec1cbf94f4d8a782aefd59a20e8",
  },
});
