import { Badge, Button, Card, CardBody, CardTitle } from "reactstrap";
import Link from "next/link";
import { useContext } from "react";
import { useMedia } from "use-media";
import AppContext from "../../context/AppContext";

const Cart = () => {
  const appContext = useContext(AppContext);

  const { cart } = appContext; //appContext経由でオブジェクトの一部cartを抽出し代入

  const mediaSize = useMedia({ minWidth: "600px" });

  return (
    <div>
      {mediaSize ? (
        <div className="max">
          <Card style={{ padding: "10px 5px" }}>
            <CardTitle
              style={{
                margin: 10,
                textAlign: "center",
                fontWeight: 600,
                fontSize: 25,
              }}
            >
              注文一覧
            </CardTitle>
            <hr />
            <CardBody style={{ padding: 10 }}>
              <div style={{ marginBottom: 6 }}>
                <small>料理：</small>
              </div>
              <div>
                {cart.items
                  ? cart.items.map((item) => {
                      if (item.quantity > 0) {
                        return (
                          <div
                            className="items-one"
                            style={{ marginBottom: 15 }}
                            key={item.id}
                          >
                            <div>
                              <span id="item-price">&nbsp;{item.price}円</span>
                              <span id="item-name">&nbsp;{item.name}</span>
                            </div>
                            <div style={{ display: "flex" }}>
                              <Button
                                style={{
                                  height: 25,
                                  padding: 0,
                                  width: 15,
                                  marginRight: 5,
                                  marginLeft: 10,
                                }}
                                color="link"
                                onClick={() => appContext.addItem(item)}
                                //ここをクリックすることでadditem関数のelse文が走るようになる
                              >
                                +
                              </Button>
                              <Button
                                style={{
                                  height: 25,
                                  padding: 0,
                                  width: 15,
                                  marginRight: 5,
                                  marginLeft: 10,
                                }}
                                color="link"
                                onClick={() => appContext.removeItem(item)}
                              >
                                -
                              </Button>
                              <span
                                id="item-quantity"
                                style={{ margin: "0px 10px" }}
                              >
                                {item.quantity}つ
                              </span>
                            </div>
                          </div>
                        );
                      }
                    })
                  : null}

                <div>
                  <Badge
                    style={{
                      width: "100%",
                      padding: "10px",
                      margin: "20px 0",
                    }}
                    color="light"
                  >
                    <div className="total">
                      <h5>合計：</h5>
                      <h4>{cart.total}円</h4>
                    </div>
                  </Badge>

                  <div className="order">
                    <Button style={{ width: "100%" }} color="primary">
                      {appContext.user ? (
                        <a href="/checkout">注文する</a>
                      ) : (
                        <a href="/login">ログインして注文する</a>
                      )}
                    </Button>
                  </div>
                </div>
              </div>
            </CardBody>
          </Card>

          <style jsx>{`
            .total {
              display: flex;
              margin-right: 15px;
              align-items: center;
            }
            .items-one {
              font-size: 16px;
            }
            #item-price {
              font-size: 1.3em;
              color: rgba(97, 97, 97, 1);
            }
            #item-quantity {
              font-size: 0.95em;
              padding-bottom: 4px;
              color: rgba(158, 158, 158, 1);
            }
            #item-name {
              font-size: 1.3em;
              color: rgba(97, 97, 97, 1);
            }
          `}</style>
        </div>
      ) : (
        <div className="min" style={{ margin: "30px auto", width: "400px" }}>
          <Card >
            <CardTitle
              style={{
                margin: 10,
                textAlign: "center",
                fontWeight: 600,
                fontSize: 25,
              }}
            >
              注文一覧
            </CardTitle>
            <hr style={{ margin: "0" }} />
            <CardBody style={{ padding: "20px" }}>
              <div style={{ marginBottom: 6 }}>
                <small>料理：</small>
              </div>

              <div>
                {cart.items
                  ? cart.items.map((item) => {
                      if (item.quantity > 0) {
                        return (
                          <div className="items-one" key={item.id}>
                            <div>
                              <span id="item-price">&nbsp;{item.price}円</span>
                              <span id="item-name">&nbsp;{item.name}</span>
                            </div>
                            <div style={{ display: "flex" }}>
                              <Button
                                style={{
                                  height: 25,
                                  padding: 0,
                                  width: 15,
                                  marginRight: 5,
                                  marginLeft: 10,
                                }}
                                color="link"
                                onClick={() => appContext.addItem(item)}
                                //ここをクリックすることでadditem関数のelse文が走るようになる
                              >
                                +
                              </Button>
                              <Button
                                style={{
                                  height: 25,
                                  padding: 0,
                                  width: 15,
                                  marginRight: 5,
                                  marginLeft: 10,
                                }}
                                color="link"
                                onClick={() => appContext.removeItem(item)}
                              >
                                -
                              </Button>
                              <span
                                id="item-quantity"
                                style={{ margin: "0px 10px" }}
                              >
                                {item.quantity}つ
                              </span>
                            </div>
                          </div>
                        );
                      }
                    })
                  : null}

                <div>
                  <Badge
                    style={{
                      width: "100%",
                      padding: "10px",
                      margin: "20px 0",
                    }}
                    color="light"
                  >
                    <div className="total">
                      <h5>合計：</h5>
                      <h4>{cart.total}円</h4>
                    </div>
                  </Badge>

                  <div className="order">
                    <Button style={{ width: "100%" }} color="primary">
                      <a href="/checkout">注文する</a>
                    </Button>
                  </div>
                </div>
              </div>
            </CardBody>
          </Card>

          <style jsx>{`
            .total {
              display: flex;
              margin-right: 15px;
              align-items: center;
            }
            .items-one {
              font-size: 16px;
            }
            #item-price {
              font-size: 1.3em;
              color: rgba(97, 97, 97, 1);
            }
            #item-quantity {
              font-size: 0.95em;
              padding-bottom: 4px;
              color: rgba(158, 158, 158, 1);
            }
            #item-name {
              font-size: 1.3em;
              color: rgba(97, 97, 97, 1);
            }
          `}</style>
        </div>
      )}
    </div>
  );
};

export default Cart;
