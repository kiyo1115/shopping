import { useContext, useState } from "react";
import {
  Button,
  Col,
  Container,
  Form,
  FormGroup,
  Input,
  Label,
  Row,
} from "reactstrap";
import AppContext from "../context/AppContext";
import { registerUser } from "../lib/auth";

const register = () => {
  const appContext = useContext(AppContext);
  const [data, setData] = useState({ username: "", email: "", password: "" });
  const [accountCheck, setAccountCheck] = useState(null);
  const [variCheck, setVariCheck] = useState(null);

  const handleRegister = () => {
    if (
      data.username.length >= 3 &&
      data.email.indexOf("@") != -1 &&
      data.password.length >= 6
    ) {
    } else {
      setVariCheck(
        "ユーザー名またはメールアドレスまたはパスワードに入力ミスがあります"
      );
      return;
    }

    registerUser(data.username, data.email, data.password)
      .then((res) => {
        //auth.jsでもthenで処理しているため、こちらでも成功or失敗の記述をする
        appContext.setUser(res.data.user); //_app.jsのステートのデータを参照
      })
      .catch((err) => {
        setAccountCheck("ユーザー名が存在します");
        setVariCheck("")
        // console.log(err);
      });
  };

  return (
    <Container>
      <Row>
        <Col>
          <div className="paper">
            <div className="header" style={{ height: "10px"  }}>
              <h2>ユーザー登録</h2>
            </div>
          </div>
          <section className="wrapper">
            <Form>
              <fieldset>
                <FormGroup>
                  <Label>ユーザー名：</Label>
                  <Input
                    type="text"
                    name="username"
                    minLength="3"
                    placeholder="3文字以上で入力してください"
                    style={{ height: 40, fontSize: "1.2rem" }}
                    onChange={(e) => {
                      setData({ ...data, username: e.target.value });
                    }}
                  />
                </FormGroup>
                <FormGroup>
                  <Label>メールアドレス：</Label>
                  <Input
                    type="email"
                    name="email"
                    placeholder="@マークをつけて入力してください"
                    style={{ height: 40, fontSize: "1.2rem" }}
                    onChange={(e) => {
                      setData({ ...data, email: e.target.value });
                    }}
                  />
                </FormGroup>
                <FormGroup>
                  <Label>パスワード：</Label>
                  <Input
                    type="password"
                    name="password"
                    minLength="6"
                    placeholder="6文字以上で入力してください"
                    style={{ height: 40, fontSize: "1.2rem" }}
                    onChange={(e) => {
                      setData({ ...data, password: e.target.value });
                    }}
                  />
                </FormGroup>
                {variCheck ? (
                  <div style={{ color: "red" }}>
                    <span style={{ fontSize: "0.8rem" }}>※</span>
                    {variCheck}
                  </div>
                ) : (
                  <div></div>
                )}
                {accountCheck ? (
                  <div style={{ color: "red" }}>
                    <span style={{ fontSize: "0.8rem" }}>※</span>
                    {accountCheck}
                  </div>
                ) : (
                  <div></div>
                )}

                <Button
                  style={{ float: "right", width: "120px", marginTop: "0px" }}
                  color="primary"
                  onClick={() => {
                    handleRegister();
                  }}
                >
                  登録
                </Button>
              </fieldset>
            </Form>
          </section>
        </Col>
      </Row>
      <style jsx>
        {`
          .paper {
            text-align: center;
            margin-top: 50px;
          }
          .header {
            width: 100%;
            margin-bottom: 30px;
          }
          .wrapper {
            padding: 10px 30px 20px 30px;
          }
        `}
      </style>
    </Container>
  );
};

export default register;
