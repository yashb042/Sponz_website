import React from "react";
import Header from "../components/Layout/Header";
import BrandPortal from "../components/Brands/BrandPortal";

const BrandsPage = () => {
    return (
        <div>
            <Header activeHeading={3}/>
            <br/>
            <br/>
            <BrandPortal/>
        </div>
    );
};

export default BrandsPage;
