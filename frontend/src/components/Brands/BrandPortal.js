import React, {useState} from 'react';
import {Button, Dropdown, Form} from 'react-bootstrap';
import India from "@react-map/india";


import 'react-bootstrap/dist/react-bootstrap.min.js';
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
                <>
                    {months.map((month, index) => (
                            <Button
                                key={index}
                                variant={selectedMonthYear.includes(month) ? "secondary" : "outline-secondary"}
                                onClick={() => handleMonthClick(month)}
                                style={{
                                    display: 'inline-block',
                                    margin: '5px',
                                    padding: '10px 20px',
                                    border: '2px solid #ffc107',
                                    borderRadius: '20px',
                                    backgroundColor: 'transparent',
                                    color: '#ffc107',
                                    cursor: 'pointer',
                                    fontFamily: 'Arial, sans-serif',
                                }}>
                                {month}
                            </Button>
                        )
                    )}
                </>
            )
                ;
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

        const handleObjectiveClick = (objective) => {
            if (!selectedObjective.includes(objective)) {
                setSelectedObjective([...selectedObjective, objective]);
            } else {
                setSelectedObjective(selectedObjective.filter((item) => item !== objective));
            }
        };


        return (<div className="container_brand">
            <h2>Your Brand Objective</h2>
            <Form>
                <Dropdown>
                    <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                        Select Objective
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        {objectives.map((objective, index) => (
                            <Dropdown.Item
                                key={index}
                                onClick={() => handleObjectiveClick(objective)}
                            >
                                {objective}
                            </Dropdown.Item>
                        ))}
                    </Dropdown.Menu>
                </Dropdown>
                <div className="selected-objective mt-2">
                    {selectedObjective.map((objective, index) => (<Button
                        key={index}
                        variant="outline-primary"
                        style={{
                            display: 'inline-block',
                            margin: '5px',
                            padding: '10px 20px',
                            border: '2px solid #ffc107',
                            borderRadius: '20px',
                            backgroundColor: 'transparent',
                            color: '#ffc107',
                            cursor: 'pointer',
                            fontFamily: 'Arial, sans-serif',
                        }}
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

            <h4 style={{textAlign: 'center', margin: '20px 0', fontFamily: 'Arial, sans-serif'}}>All Cities Present</h4>

            <div style={{textAlign: 'center', marginBottom: '15px'}}>
                {selectedState.map((state, index) => (
                    <button
                        key={index}
                        style={{
                            display: 'inline-block',
                            margin: '5px',
                            padding: '10px 20px',
                            border: '2px solid #ffc107',
                            borderRadius: '20px',
                            backgroundColor: 'transparent',
                            color: '#ffc107',
                            cursor: 'pointer',
                            fontFamily: 'Arial, sans-serif',
                        }}
                    >
                        {state} ({states[state].length} cities)
                    </button>
                ))}
            </div>

            <ul style={{
                textAlign: 'center',
                listStyleType: 'none',
                padding: 0,
                marginBottom: '30px',
                lineHeight: '1.8',
                fontFamily: 'Arial, sans-serif'
            }}>
                {selectedCities.map((city, index) => (
                    <li key={index}>{city}</li>
                ))}
            </ul>

            <h4 style={{textAlign: 'center', marginBottom: '20px', fontFamily: 'Arial, sans-serif'}}>Select your
                Activity Duration</h4>

            <div style={{textAlign: 'center', marginBottom: '20px'}}>
                <MonthButtons/>
            </div>

            <div style={{textAlign: 'center', marginBottom: '30px'}}>
                <button
                    onClick={fetchFestivalsData}
                    disabled={loading || !selectedState}
                    style={{
                        backgroundColor: '#007bff',
                        border: 'none',
                        color: 'white',
                        padding: '10px 20px',
                        borderRadius: '5px',
                        cursor: 'pointer',
                        fontFamily: 'Arial, sans-serif',
                    }}
                >
                    {loading ? 'Loading...' : 'Fetch Festivals/Colleges'}
                </button>
            </div>

            <table style={{
                width: '90%',
                margin: 'auto',
                borderCollapse: 'collapse',
                textAlign: 'center',
                fontFamily: 'Arial, sans-serif'
            }}>
                <thead>
                <tr style={{backgroundColor: '#f2f2f2', borderBottom: '2px solid #ddd'}}>
                    <th style={{padding: '10px', border: '1px solid #ddd'}}>#</th>
                    <th style={{padding: '10px', border: '1px solid #ddd'}}>College Name</th>
                    <th style={{padding: '10px', border: '1px solid #ddd'}}>Festival Name</th>
                    <th style={{padding: '10px', border: '1px solid #ddd'}}>State</th>
                    <th style={{padding: '10px', border: '1px solid #ddd'}}>City</th>
                    <th style={{padding: '10px', border: '1px solid #ddd'}}>Month</th>
                    <th style={{padding: '10px', border: '1px solid #ddd'}}>Footfall</th>
                </tr>
                </thead>
                <tbody>
                {festivalsData.map((item, index) => (
                    <tr key={item.id} style={{borderBottom: '1px solid #ddd'}}>
                        <td style={{padding: '10px', border: '1px solid #ddd'}}>{index + 1}</td>
                        <td style={{padding: '10px', border: '1px solid #ddd'}}>{item.name}</td>
                        <td style={{padding: '10px', border: '1px solid #ddd'}}>{item.festivals_name}</td>
                        <td style={{padding: '10px', border: '1px solid #ddd'}}>{item.states}</td>
                        <td style={{padding: '10px', border: '1px solid #ddd'}}>{item.city}</td>
                        <td style={{padding: '10px', border: '1px solid #ddd'}}>{item.month}</td>
                        <td style={{padding: '10px', border: '1px solid #ddd'}}>{item.footfall}</td>
                    </tr>
                ))}
                </tbody>
            </table>


        </div>);
    }
;

export default BrandPortal;
