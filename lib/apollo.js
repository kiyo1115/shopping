import { HttpLink } from "apollo-link-http";
import { withData } from "next-apollo";
import Cookies from "js-cookie";

const API_URL = process.env.NEXT_PUBLIC_API_URL|| "http://localhost:1337"
const config = {
  link: new HttpLink({
    uri: `${API_URL}/graphql`,
    headers: {
      authorization: Cookies.get("token") ? `Bearer ${Cookies.get("token")}` : "",
    }
  }),
};

// console.log(config)

export default withData(config)