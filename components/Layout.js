import react, { useContext } from "react";
import Head from "next/head";
import Link from "next/link";
import { Container, Nav, NavItem } from "reactstrap";
import AppContext from "../context/AppContext";
import useMedia from "use-media";


const layout = (props) => {
  const { user, userOut } = useContext(AppContext);
  //見た目はusestateのようだが、内部は
  // グローバルのデータ管理をしているAppContext.Providerの第一引数と第二引数を引っ張ってきている
  //第一引数には今現在入っているnullもしくは以前更新された値、第二引数は登録したときのデータ？

  const mediaSize = useMedia({minWidth:"600px"}); 

  return (
    <div>
      <Head>
        <title>フードデリバリーサービス</title>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap@4.0.0/dist/css/bootstrap.min.css" //varは5.1.0から4.0.0に変更した
        />
      </Head>
      <header>
        <style jsx>
          {`
            a {
              color: white;
            }
          `}
        </style>
        <Nav className="navbar navbar-dark bg-dark">


          <NavItem>
            <Link href="/">
              <a className="navbar-brand">フードデリバリーサービス</a>
            </Link>
          </NavItem>
          <NavItem className="ml-auto">
            {user ? (
              <Link href="/">
                <a
                  className="nav-link"
                  onClick={() => {
                    userOut();
                  }}
                >
                  ログアウト
                </a>
              </Link>
            ) : (
              <Link href="/login">
                <a className="nav-link">ログイン</a>
              </Link>
            )}
          </NavItem>
          <NavItem>
          {user ? (
            <h5 style={{marginTop:"8px", color: "white"}}>{user.username}</h5>
          ) : (
            <Link href="/register">
              <a className="nav-link">新規登録</a>
            </Link>
          )}

          </NavItem>
        </Nav>
        <style jsx>
        {`
          h5 {
            color:white
          }
          
        `}
      </style>
      </header>
      <Container>{props.children}</Container>
      {/* props.childrenのindex.jsからもってきた文字が入る */}

      <footer>
        <Nav className="navbar navbar-dark bg-dark">
          <div className="navbar-footer">
            <Link href="/">
              <a className="navbar-footer">フードデリバリーサービス</a>
            </Link>
          </div>
        </Nav>

        <style jsx>
          {`
            footer {
              position: fixed;
              width: 100%;
              bottom: 0;
            }
            .navbar-footer{
              color: orange;
              margin: 0 0 0 auto;
              font-size: 13px;
            }
          `}
        </style>
      </footer>
    </div>
  );
};

export default layout;
