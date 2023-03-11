import { HttpLink } from "apollo-link-http";
import { withData } from "next-apollo";

const API_URL = "https://shopping-cart7.fly.dev"; // デプロイしたときにも正常にAPIデータが取得できる
const config = {
  link: new HttpLink({
    uri: `${API_URL}/graphql`
  }),
};

// console.log(config)

export default withData(config)