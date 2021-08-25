import "./Home.css";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

const HomeView = (props) => {
  return (
    <div className="homescreen">
      <Typography variant="h4" component="h2">
        Welcome to Example shopping website
      </Typography>
      <div className="description">
        <Typography variant="p">
          In here you can make orders, create products & more <br />
          As Admin you can also can handle all your orders
          <br />
          Enjoy!
        </Typography>
      </div>
      <div className="buttons">
        <Link to="/login">
          <Button variant="contained" color="primary" className="btn-link">
            Login Page
          </Button>
        </Link>
        <Link to="/new-order">
          <Button variant="contained" color="primary" className="btn-link">
            Products Page
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default HomeView;
