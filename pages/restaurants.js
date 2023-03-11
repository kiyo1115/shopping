import {
  Button,
  Card,
  CardBody,
  CardImg,
  CardTitle,
  Col,
  Row,
} from "reactstrap";
import Link from "next/link";
import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";
import { useRouter } from "next/router";
import Cart from "../components/Cart";
import AppContext from "../context/AppContext";
import { useContext } from "react";
import useMedia from "use-media";

const GET_RESTAURANT_DISHES = gql`
  query ($id: ID!) {
    restaurant(id: $id) {
      id
      name
      dishes {
        id
        name
        description
        price
        image {
          url
        }
      }
    }
  }
`;

const restaurants = (props) => {
  const API_URL = process.env.NEXT_PUBLIC_API_URL; // デプロイしたときにも正常にAPIデータが取得できる

  const appContext = useContext(AppContext);
  const mediaSize = useMedia({ minWidth: "600px" });
  const router = useRouter();
  const { loading, error, data } = useQuery(GET_RESTAURANT_DISHES, {
    variables: { id: router.query.id }, //これでどこをクリックしたかを判別し、router変数へ代入？
  });

  if (error) return <h1>Failured</h1>;

  if (loading) return <h1>Fetching...</h1>;

  if (data) {
    const { restaurant } = data; //data変数からrestaurantオブジェクトを抽出

    return (
      <>
        <h1>{restaurant.name}</h1>
        <div>
          <Row>
            {restaurant.dishes.map((dish) => {
              return (
                <Col xs="6" sm="4" key={dish.id} style={{ padding: 0 }}>
                  <Card style={{ margin: "0 10px" }}>
                    <CardImg
                      src={`${API_URL}${dish.image.url}`}
                      //process.env.NEXT_PUBLIC_API_URLは設定ファイルから読み込んでいる
                      top={true}
                      style={{ height: "auto", width: "auto" }}
                    />
                    <CardBody>
                      <CardTitle>{dish.name} </CardTitle>
                      <CardTitle>{dish.description}</CardTitle>
                    </CardBody>
                    <div
                      className="card-footer"
                      // style={{ marginLeft: "-7.5px" }}
                    >
                      <Button
                        outline
                        color="primary"
                        onClick={() => appContext.addItem(dish)}
                      >
                        カートに入れる
                      </Button>
                    </div>
                  </Card>
                </Col>
              );
            })}

            <style>
              {`
                a{
                  color:white;
                }
                a:link{
                  text-decoration:none;
                  color:white;
                }
                a:hover{
                  color:white;
                }
                .card-colums{
                  column-count:3;
                }
              `}
            </style>

            <Col xs="3" style={{ padding: 0 }}>
              <div>
                <Cart />
              </div>
            </Col>
          </Row>
        </div>
      </>
    );
  } else {
    return <h1>No Restaurants Found</h1>;
  }
};

export default restaurants;
