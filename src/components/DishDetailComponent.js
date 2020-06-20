import React from "react";
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  Breadcrumb,
  BreadcrumbItem,
} from "reactstrap";
import { Link } from "react-router-dom";

function RenderComments(comments) {
  if (comments != null) {
    const comment = comments.comments.map((com) => {
      return (
        <div key={com.id}>
          <ul className="list-unstyled list-item">
            <li>{com.comment}</li>
            <li className="list-inline-item"> -- {com.author},</li>
            <li className="list-inline-item">
              {new Intl.DateTimeFormat("en-US", {
                year: "numeric",
                month: "short",
                day: "2-digit",
              }).format(new Date(Date.parse(com.date)))}
            </li>
          </ul>
        </div>
      );
    });

    return (
      <div className="col-12 col-md-5 m-1">
        <h4> Comments </h4>
        {comment}
      </div>
    );
  } else {
    return <div> </div>;
  }
}

function RenderDish({ dish }) {
  if (dish != null) {
    //console.log(dish.comments);
    return (
      <div className="col-12 col-md-5 m-1">
        <Card>
          <CardImg width="100%" src={dish.image} alt={dish.name} />
          <CardBody>
            <CardTitle>{dish.name}</CardTitle>
            <CardText>{dish.description}</CardText>
          </CardBody>
        </Card>
      </div>
    );
  } else {
    return <div></div>;
  }
}

const DishDetail = (props) => {
  //console.log(this.props.dish);
  console.log("DishDetail Component render invoked");

  return (
    <div className="container">
      <div className="row">
        <Breadcrumb>
          <BreadcrumbItem>
            <Link to="/menu">Menu</Link>
          </BreadcrumbItem>

          <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
        </Breadcrumb>
        <div className="col-12">
          <h3>{props.dish.name}</h3>
          <hr />
        </div>
      </div>
      <div className="row">
        <RenderDish dish={props.dish} />
        <RenderComments comments={props.comments} />
      </div>
    </div>
  );
};

export default DishDetail;
