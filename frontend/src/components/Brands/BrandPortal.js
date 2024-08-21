import React, {useState} from 'react';
import {Button, Dropdown, Form} from 'react-bootstrap';
import India from "@react-map/india";

import 'react-bootstrap/dist/react-bootstrap.min.js';
import 'bootstrap/dist/css/bootstrap.min.css';
// import 'react-svg-map/lib/index.css';
import './brands.css';

const BrandPortal = () => {
    const [selectedObjective, setSelectedObjective] = useState([]);
    const [selectedState, setSelectedState] = useState([]);
    const [selectedCities, setSelectedCities] = useState([]);
    const [selectedMonth, setSelectedMonth] = useState([]);

    const objectives = ['Product Sampling', 'Brand Awareness', 'Customer Acquisition'];
    const states = {
        'Andhra Pradesh': ['Visakhapatnam', 'Vijayawada', 'Guntur', 'Nellore'],
        'Arunachal Pradesh': ['Itanagar', 'Tawang', 'Ziro', 'Pasighat'],
        Assam: ['Guwahati', 'Silchar', 'Dibrugarh', 'Jorhat'],
        Bihar: ['Patna', 'Gaya', 'Bhagalpur', 'Muzaffarpur'],
        Chhattisgarh: ['Raipur', 'Bhilai', 'Bilaspur', 'Korba'],
        Goa: ['Panaji', 'Margao', 'Vasco da Gama', 'Mapusa'],
        Gujarat: ['Ahmedabad', 'Surat', 'Vadodara', 'Rajkot'],
        Haryana: ['Gurugram', 'Faridabad', 'Panipat', 'Ambala'],
        'Himachal Pradesh': ['Shimla', 'Manali', 'Dharamshala', 'Solan'],
        Jharkhand: ['Ranchi', 'Jamshedpur', 'Dhanbad', 'Bokaro'],
        Karnataka: ['Bengaluru', 'Mysuru', 'Mangaluru', 'Hubballi'],
        Kerala: ['Thiruvananthapuram', 'Kochi', 'Kozhikode', 'Thrissur'],
        'Madhya Pradesh': ['Bhopal', 'Indore', 'Jabalpur', 'Gwalior'],
        Maharashtra: ['Mumbai', 'Pune', 'Nagpur', 'Nashik'],
        Manipur: ['Imphal', 'Churachandpur', 'Thoubal', 'Bishnupur'],
        Meghalaya: ['Shillong', 'Tura', 'Nongpoh', 'Jowai'],
        Mizoram: ['Aizawl', 'Lunglei', 'Champhai', 'Serchhip'],
        Nagaland: ['Kohima', 'Dimapur', 'Mokokchung', 'Tuensang'],
        Odisha: ['Bhubaneswar', 'Cuttack', 'Rourkela', 'Sambalpur'],
        Punjab: ['Chandigarh', 'Ludhiana', 'Amritsar', 'Jalandhar'],
        Rajasthan: ['Jaipur', 'Jodhpur', 'Udaipur', 'Kota'],
        Sikkim: ['Gangtok', 'Namchi', 'Gyalshing', 'Mangan'],
        'Tamil Nadu': ['Chennai', 'Coimbatore', 'Madurai', 'Salem'],
        Telangana: ['Hyderabad', 'Warangal', 'Nizamabad', 'Khammam'],
        Tripura: ['Agartala', 'Udaipur', 'Dharmanagar', 'Kailashahar'],
        'Uttar Pradesh': ['Lucknow', 'Kanpur', 'Agra', 'Varanasi'],
        Uttarakhand: ['Dehradun', 'Haridwar', 'Nainital', 'Rishikesh'],
        'West Bengal': ['Kolkata', 'Howrah', 'Durgapur', 'Siliguri'], // Add more states and cities here if needed
    };

    const handleStateClick = (state) => {
        if (!selectedState.includes(state)) {
            setSelectedState([...selectedState, state]);
            setSelectedCities([...selectedCities, ...states[state]]);
        } else {
            setSelectedState(selectedState.filter((item) => item !== state));
            setSelectedCities(selectedCities.filter((city) => !states[state].includes(city)));
        }
    };

    return (<div className="container">
            <h2>Your Brand Objective</h2>
            <Form>
                <Dropdown>
                    <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                        Select Objective
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        {objectives.map((objective, index) => (<Dropdown.Item key={index}
                                                                              onClick={() => setSelectedObjective([...selectedObjective, objective])}>
                                {objective}
                            </Dropdown.Item>))}
                    </Dropdown.Menu>
                </Dropdown>
                <div className="selected-objective mt-2">
                    {selectedObjective.map((objective, index) => (<Button
                            key={index}
                            variant="outline-primary"
                            className="me-2"
                            onClick={() => setSelectedObjective(selectedObjective.filter((item) => item !== objective))}
                        >
                            {objective} <span>&times;</span>
                        </Button>))}
                </div>
            </Form>

            <h2>Select your Target State</h2>
            <India type={"select-multiple"} onSelect={handleStateClick}/>
            {/*<h3>Click on Map to Select your State</h3>*/}
            {/*<div className="map-container">*/}
            {/*    <IndiaMap*/}
            {/*        onClick={(event) => handleStateClick(event.target.getAttribute('name'))}*/}
            {/*        className="india-map"*/}
            {/*    />*/}
            {/*</div>*/}

            <h4 className="mt-3">Selected Cities</h4>
            <div className="selected-state mt-2">
                {selectedState.map((state, index) => (<Button
                        key={index}
                        variant="outline-warning"
                        className="me-2"
                        // onClick={() => {
                        //     setSelectedState(selectedState.filter((item) => item !== state));
                        //     setSelectedCities([]);
                        // }}
                    >
                        {state} ({states[state].length} cities)
                    </Button>))}
            </div>
            <ul>
                {selectedCities.map((city, index) => (<li key={index}>{city}</li>))}
            </ul>

            <h4>Select your Activity Duration</h4>
            <div className="duration-buttons mt-2">
                <Button variant="outline-secondary" className="me-2" onClick={() => setSelectedMonth('August 2024')}>
                    August 2024
                </Button>
                <Button variant="outline-secondary" onClick={() => setSelectedMonth('September 2024')}>
                    September 2024
                </Button>
            </div>
        </div>);
};

export default BrandPortal;
