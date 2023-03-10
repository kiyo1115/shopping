import { useState } from "react";
import { Col, Input, InputGroup, InputGroupText, Row } from "reactstrap";
import RestaurantList from "../components/RestaurantsList";
import useMedia from "use-media";

const index = () => {
  const mediaSize = useMedia({ minWidth: "600px" });

  const [query, setQuery] = useState("");
  return (
    <div className="container-fluid">
      <Row>
        <Col>
          {mediaSize ? (
            <div className="search">
              <InputGroup>
                <InputGroupText>探す</InputGroupText>
                <Input
                  placeholder="レストラン名を入力してください"
                  onChange={(e) => {
                    //toLocaleLowerCaseは大文字入力でも小文字で入力
                    setQuery(e.target.value.toLocaleLowerCase());
                  }}
                />
              </InputGroup>
            </div>
          ) : (
            <div className="search2" style={{margin:"10px 10px "}}>
              <InputGroup style={{ width: "300px", textAlign: "center" }}>
                <InputGroupText style={{ fontSize: "14px" }}>
                  探す
                </InputGroupText>
                <Input
                style={{ fontSize: "13px" }}
                  placeholder="レストラン名を入力してください"
                  onChange={(e) => {
                    //toLocaleLowerCaseは大文字入力でも小文字で入力
                    setQuery(e.target.value.toLocaleLowerCase());
                  }}
                />
              </InputGroup>
            </div>
          )}
          <RestaurantList search={query} />
        </Col>
      </Row>
      <style jsx>
        {`
          .search {
            margin-top: 40px;
            margin-bottom: 20px;
            width: 500px;
          }

          .search2 {
            margin-top: 40px;
            margin-bottom: 20px;
          }

          .container {
            margin: 0 160px;
            padding: 0;
          }
        `}
      </style>
    </div>
  );
};

export default index;
