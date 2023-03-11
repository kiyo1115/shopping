import axios from "axios";
import Cookie from "js-cookie";

const API_URL = process.env.NEXT_PUBLIC_API_URL; // デプロイしたときにも正常にAPIデータが取得できる

//新しいユーザーを登録
export const registerUser = (username, email, password) => {
  return new Promise((resolve, reject) => {
    axios
      .post(`${API_URL}/auth/local/register`, {
        username: username,
        email: email,
        password: password,
      })
      .then((res) => {
        // Handle success.
        Cookie.set("token", res.data.jwt, { expires: 7 });//jwtは暗号化された文字列をセット
        resolve(res);
        //７日間クッキーに保存する
        //確認は検証からcookieを開くと７日間後の日付で設定されている
        window.location.href = "/";
      })
      .catch((err) => {
        // Handle error.
        reject(err);
        // console.log(err);
      });
  });
};

export const login = (identifier, password) => {
  return new Promise((resolve, reject) => {
    // Request API.
    axios
      .post(`${API_URL}/auth/local`, {
        identifier: identifier,
        password: password,
      })
      .then((res) => {
        // Handle success.
        Cookie.set("token", res.data.jwt, { expires: 7 });//jwtは暗号化された文字列をセット
        resolve(res);
        window.location.href = "/";
      })
      .catch((err) => {
        // Handle error.
        reject(err);
        // console.log(err);
      });
  });
};

