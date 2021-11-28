import React, { useState, useEffect, useContext, createContext } from "react";
import { getList, addDevice, updateDevice, deleteDevice } from "../api";

const DeviceContext = createContext();

export function DeviceProvider({ children }) {
  const device = useDeviceProvider();
  return <DeviceContext.Provider value={device}>{children}</DeviceContext.Provider>;
}

export const useDevice = () => {
  return useContext(DeviceContext);
};

function useDeviceProvider() {
  const [currentID, setCurrentID] = useState(null);
  const [list, setList] = useState([]);

	useEffect(() => {
		async function loadData(){
				const response = await getList()
				setList(
					response.data.sort((a, b) =>
						a.system_name.localeCompare(b.system_name)
					)
				);
		}
		loadData();
	}, [])

	function updateDeviceList(data) {
		setList(data)
	}

	async function addNew(system_name, type, hdd_capacity) {
		await addDevice({system_name, type, hdd_capacity})
	}

	async function editDevice(system_name, type, hdd_capacity) {
		await updateDevice(currentID, {system_name, type, hdd_capacity})
	}

	async function updateCurrentID(id) {
		await setCurrentID(id)
	}

	async function removeDevice(id) {
		await deleteDevice(id)
	}

  return {
    list,
		currentID,
		addNew,
		editDevice,
		updateCurrentID,
		updateDeviceList,
		removeDevice,
  };
}
