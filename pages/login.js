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
import { login } from "../lib/auth";

const Login = () => {
  const appContext = useContext(AppContext);
  const [mailCheck, setMailCheck] = useState(null);

  // console.log(appContext)

  const [data, setData] = useState({ identifier: "", password: "" });
  const handleLogin = () => {
      login(data.identifier, data.password)
        .then((res) => {
          appContext.setUser(res.data.user);
        })
        .catch((err) => {
          setMailCheck("メールアドレスまたはパスワードが違います");
          // console.log(err);
        });
  };
  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  return (
    <Container>
      <Row>
        <Col>
          <div className="paper">
            <div className="header">
              <h2>ログイン</h2>
            </div>
          </div>
          <section className="wrapper">
            <fieldset>
              {/* <fieldset> */}
              <FormGroup>
                <Label>メールアドレス：</Label>
                <Input
                  type="email"
                  name="identifier"
                  style={{ height: 50, fontSize: "1.2rem" }}
                  onChange={(e) => {
                    handleChange(e);
                  }}
                />

              </FormGroup>
              <FormGroup>
                <Label>パスワード：</Label>
                <Input
                  type="password"
                  name="password"
                  style={{ height: 50, fontSize: "1.2rem" }}
                  onChange={(e) => {
                    handleChange(e);
                  }}
                />
                {mailCheck ? (
                  <div style={{color:"red"}}><span style={{fontSize:"0.8rem"}}>※</span>{mailCheck}</div>
                ) : (
                  <div></div>
                )}

              </FormGroup>
              <span>
                <a href="/">
                  <small>パスワードをお忘れですか？</small>
                </a>
              </span>
              <Button
                type="submit"
                style={{ float: "right", width: 120 }}
                color="primary"
                onClick={() => {
                  handleLogin();
                }}
              >
                ログイン
              </Button>
              {/* </fieldset> */}
            </fieldset>
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

export default Login;
