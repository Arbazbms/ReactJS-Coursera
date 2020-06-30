import React, { Component } from "react";
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  Breadcrumb,
  BreadcrumbItem,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  FormGroup,
  Label,
} from "reactstrap";
import { Link } from "react-router-dom";
import { Control, LocalForm, Errors } from "react-redux-form";

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !val || val.length <= len;
const minLength = (len) => (val) => val && val.length >= len;

class DishDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalOpen: false,
    };
    this.toggleModal = this.toggleModal.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  toggleModal() {
    //it flips the isModelOpen eiher to true or false
    this.setState({
      isModalOpen: !this.state.isModalOpen,
    });
  }

  handleSubmit(values) {
    this.toggleModal();
    console.log("Current State is: " + JSON.stringify(values));
    alert("Current State is: " + JSON.stringify(values));
  }

  render() {
    const CommentForm = () => {
      return (
        <div>
          <Button outline onClick={this.toggleModal}>
            <span className="fa fa-pencil fa-lg">&nbsp;Submit Comment</span>
          </Button>

          <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
            <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
            <ModalBody>
              <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                <FormGroup>
                  <Label htmlFor="rating">Rating</Label>
                  <Control.select
                    model=".rating"
                    name="rating"
                    className="form-control"
                  >
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                  </Control.select>
                </FormGroup>
                <FormGroup>
                  <Label htmlFor="name">Your Name</Label>
                  <Control.text
                    model=".name"
                    className="form-control"
                    id="name"
                    name="name"
                    placeholder="Your Name"
                    validators={{
                      required,
                      minLength: minLength(3),
                      maxLength: maxLength(15),
                    }}
                  />
                  <Errors
                    className="text-danger"
                    model=".name"
                    show="touched"
                    messages={{
                      required: "Required",
                      minLength: "Must be greater than 2 characters",
                      maxLength: "Must be 15 characters or less",
                    }}
                  />
                </FormGroup>
                <FormGroup>
                  <Label htmlFor="name">Comment</Label>
                  <Control.textarea
                    model=".comment"
                    className="form-control"
                    rows="6"
                    id="comment"
                    name="comment"
                  />
                </FormGroup>
                <Button type="submit" value="submit" color="primary">
                  Submit
                </Button>
              </LocalForm>
            </ModalBody>
          </Modal>
        </div>
      );
    };

    const RenderComments = ({ comments }) => {
      if (comments != null) {
        const comment = comments.map((com) => {
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
            {CommentForm()}
          </div>
        );
      } else {
        return <div> </div>;
      }
    };

    const RenderDish = ({ dish }) => {
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
    };

    return (
      <div className="container">
        <div className="row">
          <Breadcrumb>
            <BreadcrumbItem>
              <Link to="/menu">Menu</Link>
            </BreadcrumbItem>

            <BreadcrumbItem active>{this.props.dish.name}</BreadcrumbItem>
          </Breadcrumb>
          <div className="col-12">
            <h3>{this.props.dish.name}</h3>
            <hr />
          </div>
        </div>
        <div className="row">
          <RenderDish dish={this.props.dish} />
          <RenderComments comments={this.props.comments} />
        </div>
      </div>
    );
  }
}

export default DishDetail;
