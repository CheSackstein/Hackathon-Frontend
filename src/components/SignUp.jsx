import App from "../App";
import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  Input,
  Label,
  FormGroup,
  Col,
} from "reactstrap";
import NavBar from "./NavBar";
import { Link, useHistory } from "react-router-dom";
import './SignUp.css'
function SignUp(props) {
  const [user, setUser] = useState("");
  const [findUser, getUser] = useState("");
  const [modalLog, setModalLog] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [cell, setCell] = useState("");
  const [bloodType, setBloodType] = useState("");
  const [insurance, setInsurance] = useState("");
  const [IDNumber, setIDNumber] = useState("");
  const [previousDonor, setPreviousDonor] = useState(true);
  const [password, setPassword] = useState("");
  const toggleLog = () => setModalLog(!modalLog);
  const [modalSign, setModalSign] = useState(false);
  const history = useHistory();
  const toggleSign = () => setModalSign(!modalSign);

  function onSignUp(event) {
    event.preventDefault();
    const newUser = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      cell: cell,
      bloodType: bloodType,
      previousDonor: previousDonor,
      healthInsurance: insurance,
      IDNumber: IDNumber,
      password: password
    
    };

    setUser(newUser);
    console.log(user);
    Register(newUser);
    onAddUser();
  }


  function onAddUser(event) {
    const newUser = user;
    console.log(newUser);
  }



  async function Register(frmData) {
    console.log(frmData);

    const response = await axios.post('http://localhost:5000/signup',{
        firstName: firstName,
        lastName: lastName,
        email: email,
        cell: cell,
        bloodType: bloodType,
        healthInsurance: insurance,
        IDNumber: IDNumber,
        previousDonor: previousDonor,
        password: password
  });

  if (response.status === 200) {
    localStorage.setItem("token", response.data.token);
  }
  console.log(response.data);
  history.push("/Home");
window.location.reload();
}


  return (
    <div>
      <div className="Signup">
        <Button
          onClick={toggleSign}
          className="SignUpBtn"
          id="SignUpBtn"
        >
          Sign up
        </Button>
        <Modal isOpen={modalSign} toggle={toggleSign}>
          <ModalHeader toggle={toggleSign} style={{ color: "Black" }}>
            Sign up
          </ModalHeader>
          <ModalBody>
            <Form onSubmit={(event) => onSignUp(event)}>
              <FormGroup>
                <Label for="firstName">First name:</Label>
                <Input
                  type="text"
                  name="firstName"
                  id="firstName"
                  placeholder="First Name"
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </FormGroup>
              <FormGroup>
                <Label for="lastName">Last name:</Label>
                <Input
                  type="text"
                  name="lastName"
                  id="lastName"
                  placeholder="Last Name"
                  onChange={(e) => setLastName(e.target.value)}
                />
              </FormGroup>
              <FormGroup>
                <Label for="phone">Cell:</Label>
                <Input
                  type="text"
                  name="cellPhone"
                  id="cellPhone"
                  placeholder="Cell phone number"
                  onChange={(e) => setCell(e.target.value)}
                />
              </FormGroup>
              <FormGroup>
                <Label for="exampleEmail">Email</Label>
                <Input
                  type="email"
                  name="email"
                  id="exampleEmail"
                  placeholder="Email"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </FormGroup>
              <FormGroup>
                <Label for="Insurance">Medical Insurance: </Label>
                <Input
                  type="text"
                  name="insurance"
                  id="exampleInsurance"
                  placeholder="Insurance"
                  onChange={(e) => setInsurance(e.target.value)}
                />
              </FormGroup>
              <FormGroup>
                <Label for="IDNumber">Personal ID: </Label>
                <Input
                  type="text"
                  name="personalID"
                  id="personalID"
                  placeholder="personalID"
                  onChange={(e) => setIDNumber(e.target.value)}
                />
              </FormGroup>
              <FormGroup>
                <Label for="bloodType">Blood Type: </Label>
                <Input
                  type="text"
                  name="bloodType"
                  id="bloodType"
                  placeholder=""
                  onChange={(e) => setBloodType(e.target.value)}
                />
              </FormGroup>
              <FormGroup row>
                <Label for="checkbox2" sm={2}>
                  Are you a previous donor?
                </Label>
                <FormGroup check>
                  <Label check>
                    <Input type="checkbox" id="checkboxDonor" /> Yes
                  </Label>
                </FormGroup>
              </FormGroup>
              <FormGroup>
                <Label for="examplePassword">Password</Label>
                <Input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </FormGroup>
              <Button
                type="primary"
                color="primary"
                onClick={(event) => Register(event)}
              >
                Sign up
              </Button>
            </Form>
          </ModalBody>
        </Modal>
      </div>
    </div>
  );
}
export default SignUp;
