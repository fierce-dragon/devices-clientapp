import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import {
  Container,
  Table,
  DropdownButton,
  Dropdown,
  Button,
	Modal,
} from "react-bootstrap";
import { useDevice } from "../../stores/useDevice";
import "./style.scss";

export const DeviceList = () => {
	const device = useDevice()
	const history = useHistory()
	const [index, setIndex] = useState(0)
	const [currentID, setCurrentID] = useState(null)
  const [data, setData] = useState([])
	const [show, setShow] = useState(false)
  const [sortIndex, setSortIndex] = useState(0)
  const [typeIndex, setTypeIndex] = useState(0)
  const typeArray = ["All", "MAC", "WINDOWS_SERVER", "WINDOWS_WORKSTATION"]
  const sortArray = ["System Name", "Type", "HDD Capacity"]

	useEffect(() => {
		setData(device.list)
	}, [device])

  const onSort = (index) => {
    setSortIndex(index);
    switch (index) {
      case 0:
        setData(
          device.list.sort((a, b) => a.system_name.localeCompare(b.system_name))
        );
        break;
      case 1:
        setData(device.list.sort((a, b) => a.type.localeCompare(b.type)));
        break;
      case 2:
        setData(device.list.sort((a, b) => a.hdd_capacity - b.hdd_capacity));
        break;
			default:
				break;
    }
  };

  const onType = (index) => {
    setTypeIndex(index)
		if(index === 0) {
			setData(device.list)
		}
		else {
			setData(device.list.filter((item) => item.type.localeCompare(typeArray[index]) === 0))
		}
  };

	const goEditDevice = (id) => {
		device.updateCurrentID(id)
		history.push("/edit")
	}

	const handleClose = () => setShow(false)
  const handleShow = (index, id) => {
		setShow(true)
		setIndex(index)
		setCurrentID(id)
	}
	const handleDelete = () => {
		setShow(false)
		device.removeDevice(currentID)
		data.splice(index, 1)
		setData(data)
	}

  return (
    <Container>
      <div className="d-flex mt-3 mb-3">
        <DropdownButton
          className="mx-3"
          title={"Device Type: " + typeArray[typeIndex]}
        >
          {typeArray.map((element, index) => {
            return (
              <Dropdown.Item key={index} onClick={() => onType(index)}>
                {element}
              </Dropdown.Item>
            );
          })}
        </DropdownButton>
        <DropdownButton
          variant="warning"
          title={"Sort by: " + sortArray[sortIndex]}
        >
          {sortArray.map((element, index) => {
            return (
              <Dropdown.Item key={index} onClick={() => onSort(index)}>
                {element}
              </Dropdown.Item>
            );
          })}
        </DropdownButton>
        <div className="flex-grow-1"></div>
        <Link to="/add">
          <Button variant="success">Add</Button>
        </Link>
      </div>
      <Table responsive bordered hover>
        <thead>
          <tr>
            <th>No</th>
            <th>System Name</th>
            <th>Type</th>
            <th>HDD Capacity</th>
            <th>Setting</th>
          </tr>
        </thead>
        <tbody>
          {data.map((device, index) => {
            return (
              <tr key={device.id}>
                <td>{index + 1}</td>
                <td>{device.system_name}</td>
                <td>{device.type}</td>
                <td>{device.hdd_capacity} GB</td>
                <td>
                  <Button variant="secondary" className="mx-2" onClick={() => {
											goEditDevice(device.id)
										}}
									>
                    Edit
                  </Button>
                  <Button variant="danger" onClick={() => handleShow(index, device.id)}>Delete</Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
			<Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Alert</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure to delete?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};
