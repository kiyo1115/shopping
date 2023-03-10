import { Col, Row } from "reactstrap";
import Cart from "../components/Cart";
import CheckoutForm from "../components/checkout/checkOutFrom";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import useMedia from "use-media";



// //checkout→checkOutFrom→CardSectionの３つのコンポーネントで作成

const checkout = () => {
  const stripePromise = loadStripe(
    "pk_test_51MLeaCL5LvckWFaruQzdN4xS16TDB4a2Afhg6D4fJZPFL4ZuKfn9rma3K80QTQuLEi8J9nXwbhjf2EWFGISWlNmD00YQ4Ivqqi"
  );

  return (
    <Row>
      <Col style={{ paddingRight: 0 }} sm={{ size: 3, order: 1, offset: 2 }}>
        {/* sm = 576px以上の時 */}
        <h1 style={{ margin: 20, fontSize: 20, textAlign: "center" }}>
          チェックアウト
        </h1>
        <Cart />
      </Col>
      <Col style={{ paddingLeft: 5 }} sm={{ size: 6, order: 2 }}>
        {/* CardElementを使うには */}
        {/* カード番号導入にはelementでくくって上げる必要がある */}
        {/* さらにそれだけではなくloadStripeを使いstripeのキーと一致させる必要がある */}

        <Elements stripe={stripePromise}>
          <CheckoutForm />
          {/* checkOutFromを呼び出し */}
        </Elements>
      </Col>
    </Row>
  );
};

export default checkout;


// import { Col, Row } from "reactstrap";
// import { Elements } from "@stripe/react-stripe-js";
// import Cart from "../components/cart";
// import CheckOutForm from "../components/checkout/CheckoutForm";
// import { loadStripe } from "@stripe/stripe-js";

// const checkout = () => {
//   const stripePromise = loadStripe(
//     "pk_test_51MLeaCL5LvckWFaruQzdN4xS16TDB4a2Afhg6D4fJZPFL4ZuKfn9rma3K80QTQuLEi8J9nXwbhjf2EWFGISWlNmD00YQ4Ivqqi"
//   );
//   return (
//     <Row>
//       <Col style={{ paddingRight: 0 }} sm={{ size: 3, order: 1, offset: 2 }}>
//         <h1 style={{ margin: 20, fontSize: 20, textAlign: "center" }}>
//           チェックアウト
//         </h1>
//         <Cart />
//       </Col>
//       <Col style={{ paddingLeft: 5 }} sm={{ size: 6, order: 2 }}>
//         <Elements stripe={stripePromise}>
//           <CheckoutForm />
//         </Elements>
//       </Col>
//     </Row>
//   );
// };

// export default checkout;

