import { Component } from "react";
import { Form, Button, Col, Spinner, Alert } from "react-bootstrap";
import { createProduct } from "../services/productData";
import { WithContext as ReactTags } from "react-tag-input";
import SimpleSider from "../components/Siders/SimpleSider";
import Calendar from "react-calendar";
import "../components/CreateSell/CreateSell.css";
import "react-calendar/dist/Calendar.css";

const KeyCodes = {
  comma: 188,
  enter: 13,
};

const delimiters = [KeyCodes.comma, KeyCodes.enter];

class AddProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      description: "",
      tags: [],
      deadline: new Date(),
      loading: false,
      alertShow: false,
      errors: [],
    };
    this.onChangeHandler = this.onChangeHandler.bind(this);
    this.onSubmitHandler = this.onSubmitHandler.bind(this);
  }

  onChangeHandler(e) {
    e.preventDefault();
    this.setState({ [e.target.name]: e.target.value });
    if (e.target.files) {
      this.setState({ image: e.target.files[0] });
    }
  }

  onSubmitHandler(e) {
    e.preventDefault();
    const { title, description, tags, deadline } = this.state;
    const obj = {  title, description, tags: tags.map((tag => tag.text)), deadline: deadline.toJSON() };
    this.setState({ loading: true });
   
        createProduct(obj)
          .then((res) => {
            if (res.error) {
              this.setState({ loading: false });
              this.setState({ errors: res.error });
              this.setState({ alertShow: true });
            } else {
                //TODO: исправить ссылку
              this.props.history.push(
                `/`
              );
            }
          })
          .catch((err) => console.error("Creating product err: ", err));
  }

  getBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  }

  handleDelete = (i) => {
    this.setState({
      tags: this.state.tags.filter((tag, index) => index !== i),
    });
  };

  handleAddition = (tag) => {
    this.setState({ tags: [...this.state.tags, tag] });
  };

  handleDrag = (tag, currPos, newPos) => {
    const newTags = this.state.tags.slice();

    newTags.splice(currPos, 1);
    newTags.splice(newPos, 0, tag);

    this.setState({ tags: newTags });
  };

  render() {
    return (
      <>
        <SimpleSider />
        <div className="container">
          <h1 className="heading">Add a Product</h1>
          <Form onSubmit={this.onSubmitHandler}>
            {this.state.alertShow && (
              <Alert
                variant="danger"
                onClose={() => this.setState({ alertShow: false })}
                dismissible
              >
                <p>{this.state.errors}</p>
              </Alert>
            )}
            <Form.Row>
              <Form.Group as={Col} controlId="formGridTitle">
                <Form.Label>Title</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter title"
                  name="title"
                  required
                  onChange={this.onChangeHandler}
                />
              </Form.Group>
            </Form.Row>

            <Form.Group controlId="formGridDescription.ControlTextarea1">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="description"
                required
                onChange={this.onChangeHandler}
              />
            </Form.Group>

            <Form.Group controlId="formGridCategory">
              <Form.Label>Tags</Form.Label>

              <ReactTags
                inline
                tags={this.state.tags}
                delimiters={delimiters}
                handleDelete={this.handleDelete}
                handleAddition={this.handleAddition}
                handleDrag={this.handleDrag}
                inputFieldPosition="bottom"
              />
            </Form.Group>
            <Form.Group controlId="formGridCity">
              <Form.Label>Deadline</Form.Label>
              <Calendar
                value={this.state.deadline}
                locale="en"
                onChange={(val) => this.setState({ deadline: val })}
              />
            </Form.Group>

            {this.state.loading ? (
              <Button className="col-lg-12" variant="dark" disabled>
                Please wait... <Spinner animation="border" />
              </Button>
            ) : (
              <Button className="col-lg-12" variant="dark" type="submit">
                Create task
              </Button>
            )}
          </Form>
        </div>
      </>
    );
  }
}

export default AddProduct;
