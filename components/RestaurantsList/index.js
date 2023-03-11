import { Card, CardBody, CardImg, CardTitle, Col, Row } from "reactstrap";
import Link from "next/link";
import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";
import useMedia from "use-media";

const QUERY = gql`
  {
    restaurants {
      id
      name
      description
      image {
        url
      }
    }
  }
`;

const RestaurantList = (props) => {
  const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:1337"; // デプロイしたときにも正常にAPIデータが取得できる

  const { loading, error, data } = useQuery(QUERY);
  const mediaSize = useMedia({minWidth:"600px"});

  if (error) return <h1>Failured</h1>;

  if (loading) return <h1>Fetching...</h1>;

  if (data) {
    const searchQuery = data.restaurants.filter(
      (restaurant) => restaurant.name.toLowerCase().includes(props.search)
      //queryで引っ張ってきた名前を抽出（＝＞restaurant.name）し、
      // 全て小文字で判定。（＝＞.toLowerCase()）
      // 含まれているかどうかを判定するincludes関数（＝＞.includes）
      // で入力しているデータを入力するたびに（＝＞estaurant.name　と　.includes）
      // props名searchから呼び出し当てはまったものをsearchQueryへ返している
    );
    // console.log(searchQuery)
    return (
      <Row>
        {searchQuery.map((res) => {
          return (
            <Col xs="6" sm="4" key={res.id}>
              <Card style={{ margin: "0 0.5rem 20px 0.5rem" }}>
                <CardImg
                  src={`${API_URL}${res.image[0].url}`}
                  //process.env.NEXT_PUBLIC_API_URLは設定ファイルから読み込んでいる
                  top={true}
                  style={{ height: 250,objectFit: "cover" }}
                />
                <CardBody>
                  <CardTitle>{res.name} </CardTitle>
                  <CardTitle>{res.description}</CardTitle>
                </CardBody>
                <div className="card-footer">
                  <Link
                    as={`/restaurants/${res.id}`}
                    href={`/restaurants?id=${res.id}`}
                  >
                    <a className="btn btn-primary">もっと見る</a>
                  </Link>
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
      </Row>
    );
  } else {
    return <h1>No Restaurants Found</h1>;
  }
};

export default RestaurantList;
