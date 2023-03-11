import react from "react";
import App from "next/app";
import Head from "next/head";
import Layout from "../components/Layout";
import withData from "../lib/apollo";
import AppContext from "../context/AppContext";
import Cookies from "js-cookie";

const API_URL = process.env.NEXT_PUBLIC_API_URL|| "http://localhost:1337"
console.log(API_URL)
class MyApp extends App {
  
  // -------------------------------------------
  state = {
    user: null,
    cart: { items: [], total: 0 },
  };

  setUser = (user) => {
    this.setState({ user });
  };

  userOut = () => {
    this.setState({
      user: null,
      cart: {
        items: [],
        total: 0,
      },
    }),
      Cookies.remove("token");
  };
  // 上記はクラスで下記の処理と同様の処理をしている
  // const [state,setState] = usestate(null)
  // -------------------------------------------

  // ------------------------------------------------------------------------------
  //すでにユーザーのクッキー情報が残っているかを確認する
  // functionで書く場合はuseEffectと同様
  componentDidMount() {
    //useEffectと同様の関数のため、意味としては毎回アクセスして処理をしていく
    const token = Cookies.get("token"); //tokenの中にはjwtが入っている
    const cart = Cookies.get("cart");

    if (cart !== undefined && typeof cart === "string") {
      //クッキー情報がなにもない場合
      JSON.parse(cart).forEach((item) => {
        this.setState({
          cart: {
            items: JSON.parse(cart),
            total: (this.state.cart.total += item.price * item.quantity),
          },
        });
      });
    }

    if (token) {
      fetch(`${API_URL}/users/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then(async (res) => {
        //上記の処理にて正常に取得できたら
        if (!res.ok) {
          //データを取得できたが、有効期限が切れているならば
          //このokという記述は${process.env.NEXT_PUBLIC_API_URL}/users/me`のオブジェクトで用意されたものであり
          // 別のところで使おうとしてもほぼ使えない記述である
          Cookies.remove("token"); //期限が切れていたらクッキーを削除
          this.setState({ user: null }); //userも古い情報が入っているのでnullにする
          return null;
        }
        const user = await res.json(); //Cookiesのデータをjson形式に変更
        this.setUser(user);
      }); //strapiで用意されている宛先
    }
  }
  // ------------------------------------------------------------------------------

  //カートへ商品の追加
  addItem = (item) => {
    let { items } = this.state.cart;
    //これでstateオブジェクトのitemsを見に行っている
    //オブジェクトを取りに行くときはstateのオブジェクトを示すため、stateと指定する
    const newItem = items.find((i) => i.id === item.id);
    //クリックしたものと引数でもってきたidが同じであればnweItemに追加する
    if (!newItem) {
      //数量が0の時＝新しい商品を追加する時の条件分岐
      item.quantity = 1; //数量が0ならば数量を１追加する
      //cartに追加する
      this.setState(
        {
          cart: {
            //setStateを使う場合state.cart.といった書き方はしない。stateは除外する
            items: [...items, item], //スプレット構文での書き方で、今の配列に引数のitemを追加する
            total: this.state.cart.total + item.price,
          },
        },
        () => Cookies.set("cart", this.state.cart.items)
        //第一引数にはクッキー名を指定。つまり今回であれば「cart」という名前でクッキーが保存される
        //第二引数にはセットしたい情報を記載。今回はカートに追加しているものを保存する
      );
      //すでに同じ商品がカートに入っている時
    } else {
      this.setState(
        {
          cart: {
            items: this.state.cart.items.map(
              (item) =>
                item.id === newItem.id
                  ? //item.id(すでに入っている商品)
                    //newItem.id（ボタンを押してこれから入れようとしている商品）
                    Object.assign({}, item, { quantity: item.quantity + 1 })
                  : // Object.assignはjavascript側で用意している関数
                    // 第一引数に{}からオブジェクトを指定することでコピーするという意味がある
                    //第二引数はmap関数上でやっているのでここはthis.state.cart.itemsの配列を指している
                    //第三引数には第二引数に追加するものを記載。
                    //今回であればitems配列配下にquauntityオブジェクトを追加し、1を追加する
                    //条件分岐でtrueになった時なので、items(item)には必ず何かしらの商品が入っているので
                    //その商品の数量を1増やす処理を行っている
                    item //等しくない時はその商品を追加するだけ
            ),
            total: this.state.cart.total + item.price,
          },
        },
        () => Cookies.set("cart", this.state.cart.items)
      );
    }
  };

  //カートから商品を削除
  removeItem = (item) => {
    let { items } = this.state.cart;
    //これでstateオブジェクトのitemsを見に行っている
    //オブジェクトを取りに行くときはstateのオブジェクトを示すため、stateと指定する
    const newItem = items.find((i) => i.id === item.id);
    //クリックしたものと引数でもってきたidが同じであればnweItemに追加する
    if (newItem.quantity > 1) {
      //数量が0の時＝新しい商品を追加する時の条件分岐
      this.setState(
        {
          cart: {
            //setStateを使う場合state.cart.といった書き方はしない。stateは除外する
            items: this.state.cart.items.map(
              (item) =>
                item.id === newItem.id
                  ? //item.id(すでに入っている商品)
                    //newItem.id（ボタンを押してこれから入れようとしている商品）
                    Object.assign({}, item, { quantity: item.quantity - 1 })
                  : // Object.assignはjavascript側で用意している関数
                    // 第一引数に{}からオブジェクトを指定することでコピーするという意味がある
                    //第二引数はmap関数上でやっているのでここはthis.state.cart.itemsの配列を指している
                    //第三引数には第二引数に追加するものを記載。
                    //今回であればitems配列配下にquauntityオブジェクトを追加し、1を追加する
                    //条件分岐でtrueになった時なので、items(item)には必ず何かしらの商品が入っているので
                    //その商品の数量を1増やす処理を行っている
                    item //等しくない時はその商品を追加するだけ
            ), //スプレット構文での書き方で、今の配列に引数のitemを追加する
            total: this.state.cart.total - item.price,
          },
        },
        () => Cookies.set("cart", this.state.cart.items)
        //第一引数にはクッキー名を指定。つまり今回であれば「cart」という名前でクッキーが保存される
        //第二引数にはセットしたい情報を記載。今回はカートに追加しているものを保存する
      );
      //商品が一つの場合
    } else {
      const items = [...this.state.cart.items];
      const index = items.findIndex((i) => i.id === newItem.id);
      //findIndexは見つかったらその配列番号を返す関数。つまりindex変数には数値が入る

      items.splice(index, 1); //spliceでみつけたindexのところだけ削除する

      //ここの流れはどこに対象のものがあるかをfindIndex関数を使ってみつけ
      //その対象のものを削除するといったロジック

      this.setState(
        {
          cart: {
            items: items,
            total: this.state.cart.total - item.price,
          },
        },
        () => Cookies.set("cart", this.state.cart.items)
      );
    }
  };

  render() {
    const { Component, pageProps } = this.props; //AppのpropsにあるcomponentとpagePropsを当てはめる役目
    //イメージとしてはconst componentは関数を実行しており、pagePropsはデータと管理いているはず
    return (
      <AppContext.Provider
        value={{
          user: this.state.user,
          cart: this.state.cart,
          setUser: this.setUser,
          addItem: this.addItem, //thisはmyApp自身を指す
          removeItem: this.removeItem,
          userOut: this.userOut,
        }}
      >
        <>
          <Head>
            <link
              rel="stylesheet"
              href="https://cdn.jsdelivr.net/npm/bootstrap@4.0.0/dist/css/bootstrap.min.css" //varは5.1.0から4.0.0に変更した
            />
          </Head>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </>
      </AppContext.Provider>
    );
  }
}

export default withData(MyApp);

// npm run dev　これをバックエンド側で入力するとstrapi(localhost:1337)が立ち上がる(developからdevへ変更)
// npm run dev　これをフロントエンド側で入力するとlocalhost:3000が立ち上がる
