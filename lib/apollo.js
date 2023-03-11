import { HttpLink } from "apollo-link-http";
import { withData } from "next-apollo";

const API_URL = "http://localhost:1337" || process.env.NEXT_PUBLIC_API_URL
const config = {
  link: new HttpLink({
    uri: `${API_URL}/graphql`
  }),
};

// console.log(config)

export default withData(config)