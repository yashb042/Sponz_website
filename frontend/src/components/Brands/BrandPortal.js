import React, {useState} from 'react';
import {Button, Dropdown, Form, Table} from 'react-bootstrap';
import India from "@react-map/india";


import 'react-bootstrap/dist/react-bootstrap.min.js';
import 'bootstrap/dist/css/bootstrap.min.css';
// import 'react-svg-map/lib/index.css';
import './brands.css';
import Store from "../../redux/store";
import {getCbcEvents} from "../../redux/actions/cbc_events";

const BrandPortal = () => {
        const [selectedObjective, setSelectedObjective] = useState([]);
        const [selectedState, setSelectedState] = useState([]);
        const [selectedCities, setSelectedCities] = useState([]);
        const [selectedMonthYear, setSelectedMonthYear] = useState([]);
        const [festivalsData, setFestivalsData] = useState([]);
        const [loading, setLoading] = useState(false);

        const fetchFestivalsData = async () => {
            setLoading(true);
            setFestivalsData([]);
            const payload = {
                selectedStates: selectedState,
                selectedMonthYear: selectedMonthYear,
                selectedObjectives: selectedObjective,
                conductedNo: 10,
                // brandReqId: user.brandReqId, // Assuming this is stored in the user object
                // other_objective: user.otherObjective || "", // Optional field
                // participateCollege: 0, // Assuming static value
                // participateFestival: 1, // Assuming static value
                // conductedFor: "conductedForFestival", // Assuming static value
                // college_category: user.collegeCategory || [] // Optional field
            };

            Store.dispatch(getCbcEvents(payload))
                .then((response) => {
                    setFestivalsData(response);
                })
                .catch((error) => {
                    console.error("Error fetching data:", error);
                }).finally(() => {
                setLoading(false);
            });
        };

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
            'Jammu and Kashmir': ['Srinagar', 'Jammu', 'Leh', 'Anantnag'],
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

        const months = [
            'September 2024', 'October 2024', 'November 2024', 'December 2024',
            'January 2025', 'February 2025', 'March 2025', 'April 2025',
            'May 2025', 'June 2025', 'July 2025', 'August 2025'
        ];

        const MonthButtons = () => {
            return (
                <div className="duration-buttons mt-2">
                    {months.map((month, index) => (
                        <Button
                            key={index}
                            variant={selectedMonthYear.includes(month) ? "secondary" : "outline-secondary"}
                            onClick={() => handleMonthClick(month)}
                        >
                            {month}
                        </Button>
                    ))}
                </div>
            );
        };

        const handleMonthClick = (month) => {
            if (!selectedMonthYear.includes(month)) {
                setSelectedMonthYear([...selectedMonthYear, month]);
            } else {
                setSelectedMonthYear(selectedMonthYear.filter((item) => item !== month));
            }
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

            <br/>
            <h2>Select your Target State</h2>
            <br/>
            <India type={"select-multiple"} onSelect={handleStateClick}/>
            {/*<h3>Click on Map to Select your State</h3>*/}
            {/*<div className="map-container">*/}
            {/*    <IndiaMap*/}
            {/*        onClick={(event) => handleStateClick(event.target.getAttribute('name'))}*/}
            {/*        className="india-map"*/}
            {/*    />*/}
            {/*</div>*/}

            <h4 className="mt-3">All Cities Present</h4>
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
            <br/>
            <ul>
                {selectedCities.map((city, index) => (<li key={index}>{city}</li>))}
            </ul>

            <h4>Select your Activity Duration</h4>
            <br/>
            <MonthButtons/>

            {/* Fetch button */}
            <br/>
            <Button onClick={fetchFestivalsData} disabled={loading || !selectedState}>
                {loading ? 'Loading...' : `Fetch Festivals/Colleges`}
            </Button>

            <br/>
            <br/>
            {/* Display Table */}
            <Table striped bordered hover className="mt-3">
                <thead>
                <tr>
                    <th>#</th>
                    <th>College Name</th>
                    <th>Festival Name</th>
                    <th>State</th>
                    <th>City</th>
                    <th>Month</th>
                    <th>Footfall</th>
                </tr>
                </thead>
                <tbody>
                {festivalsData.map((item, index) => (
                    <tr key={item.id}>
                        <td>{index + 1}</td>
                        <td>{item.name}</td>
                        <td>{item.festivals_name}</td>
                        <td>{item.states}</td>
                        <td>{item.city}</td>
                        <td>{item.month}</td>
                        <td>{item.footfall}</td>
                    </tr>
                ))}
                </tbody>
            </Table>
        </div>);
    }
;

export default BrandPortal;
