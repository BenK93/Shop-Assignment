import { Switch, Route, withRouter } from "react-router-dom";

// Screens
import HomeView from "./screens/Home/HomeView";
import OrdersView from "./screens/Orders/OrdersView";
import { NewOrderView } from "./screens/Orders/NewOrderView";
import { AuthView } from "./screens/Auth/AuthView";

export const BaseRouter = () => {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={HomeView} />
        {/* <Route exact path="/product/:id" component={ProductScreen} />
        <Route exact path="/cart" component={CartScreen} /> */}
        <Route exact path="/login/" component={withRouter(AuthView)} />
        <Route exact path="/new-order/" component={NewOrderView} />
        <Route exact path="/orders/" component={withRouter(OrdersView)} />
      </Switch>
    </div>
  );
};
