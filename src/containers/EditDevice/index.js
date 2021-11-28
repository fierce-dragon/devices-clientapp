import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Container } from "react-bootstrap";
import { Form, Row, Col, Button } from "react-bootstrap";
import { useDevice } from "../../stores/useDevice";
import { getDevice } from "../../api";
import "./style.scss";

export const EditDevice = () => {
	const device = useDevice()
  const [validated, setValidated] = useState(false);
  const [systemName, setSystemName] = useState("");
  const [type, setType] = useState("MAC");
  const [hddCapacity, setHddCapacity] = useState(0);
  const typeArray = ["MAC", "WINDOWS_SERVER", "WINDOWS_WORKSTATION"];

	useEffect(() => {
		getDevice(device.currentID).then((response) => {
			const data = response.data
			setSystemName(data.system_name)
			setType(data.type)
			setHddCapacity(data.hdd_capacity)
		})
	}, [device])

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
			setValidated(true);
    }
		else {
			device.editDevice(systemName, type, hddCapacity).then(() => {
				window.location.replace('/');
			})
		}
  };

  return (
    <Container className="p-3">
      <h2 className="d-flex justify-content-center">Edit Device</h2>
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
          <Form.Label column sm={2}>
            System Name *
          </Form.Label>
          <Col sm={10}>
            <Form.Control type="text" value={systemName} onChange={(e) => setSystemName(e.target.value)} required />
          </Col>
        </Form.Group>

        <Form.Group
          as={Row}
          className="mb-3"
          controlId="formHorizontalPassword"
        >
          <Form.Label column sm={2}>
            Type *
          </Form.Label>
          <Col sm={10}>
            <Form.Select value={type} onChange={(e) => setType(e.target.value)}>
              {typeArray.map((element, index) => {
                return <option key={index}>{element}</option>;
              })}
            </Form.Select>
          </Col>
        </Form.Group>
        <fieldset>
          <Form.Group as={Row} className="mb-3">
            <Form.Label as="legend" column sm={2}>
              HDD Capacity (GB) *
            </Form.Label>
            <Col sm={10}>
              <Form.Control type="number" value={hddCapacity} onChange={(e) => setHddCapacity(e.target.value)} required />
            </Col>
          </Form.Group>
        </fieldset>

        <Form.Group as={Row} className="mb-3">
          <Col sm={{ span: 10, offset: 2 }}>
            <div className="d-flex">
              <div className="flex-grow-1"></div>
              <Button type="submit" className="mx-3">
                Save
              </Button>
              <Link to="/">
                <Button variant="danger">Close</Button>
              </Link>
            </div>
          </Col>
        </Form.Group>
      </Form>
    </Container>
  );
};
