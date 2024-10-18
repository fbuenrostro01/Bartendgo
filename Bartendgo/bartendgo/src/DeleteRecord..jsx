import React, {useEffect, useState} from 'react';
import './index.css';

const BASE_URL = "https://unit-4-project-app-24d5eea30b23.herokuapp.com";

const DeleteRecord = () => {
    const [records, setRecords] = useState([]);
    const [selectedRecord, setSelectedRecord] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
}

useEffect(( => {
    const deleteRecord = async () => {
        const response = await fetch(`${BASE_URL}/get/all?teamId=3`);
        const data = await response.json();
    }
}))