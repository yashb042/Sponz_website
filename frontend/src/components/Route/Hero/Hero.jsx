import React from "react";
import {Link} from "react-router-dom";
import styles from "../../../styles/styles";
import "./Offering.css";

const Hero = () => {
    return (
        <>
            <div
                className={`relative min-h-[60vh] 80px:min-h-[80vh] w-full bg-no-repeat ${styles.noramlFlex}`}
                style={{
                    backgroundImage:
                        "url(https://themes.rslahmed.dev/rafcart/assets/images/banner-2.jpg)",
                }}>
                <div className={`${styles.section} w-[90%] 800px:w-[60%]`}>
                    <h1 className={`text-[35px] leading-[1.2] 800px:text-[60px] text-[#3d3a3a] font-[600] capitalize`}>
                        Best Collection for <br/> Events Sponsorships
                    </h1>

                    <Link to="/events" className="inline-block">
                        <div className={`${styles.button} mt-5`}>
                 <span className="text-[#fff] font-[Poppins] text-[18px]">
                    Find Events
                 </span>
                        </div>
                    </Link>
                </div>
            </div>
            <div className="campaign-cards-container">
                <h2>Your Marketing Campaigns, <span>All in one place!</span></h2>
                <div className="cards">
                    <div className="card">
                        <div className="card-image find-athletes"></div>
                        <h3>Find Events</h3>
                        <p>
                            With over 20,000 events from 1000 colleges and 150 cities, there is an event on
                            Sprint for your campaign.
                        </p>
                    </div>
                    <div className="card">
                        <div className="card-image manage-campaigns"></div>
                        <h3>Manage Campaigns</h3>
                        <p>
                            You can connect directly with the event organizers to collaborate with your brand.
                        </p>
                    </div>
                    <div className="card">
                        <div className="card-image review-results"></div>
                        <h3>Review Results</h3>
                        <p>
                            Understand campaign results with a single click. Once a campaign is completed, the results
                            feature makes it easy to view the metrics for each deliverable.
                        </p>
                    </div>
                </div>
            </div>
            <div className="campaign-cards-container">
                <h2>Sprint Offerings</h2>
                <h2>Pre-Deal</h2>
                <div className="cards-container">
                    <div className="card">
                        <div className="card-image ai-assisted-recommendation"></div>
                        <h3>AI Assisted Recommendation</h3>
                        <p>
                            Discover best suited, AI-assisted events based on your preferences, describing why the said
                            event is good for your brand.
                        </p>
                    </div>
                    <div className="card">
                        <div className="card-image ai-assisted-recommendation"></div>
                        <h3>Event Filtering</h3>
                        <p>
                            Filter tournaments and events based on city, sport, sponsorship amount, footfall,
                            college/professional event, etc.
                        </p>
                    </div>
                    <div className="card">
                        <div className="card-image Sales-forecast"></div>
                        <h3>Revenue Prediction</h3>
                        <p>
                            Help predict your brand's revenue at the event venue per sqft ad space/stall space; thus
                            propelling your sales and marketing goals.
                        </p>
                    </div>
                </div>
                <div className="cards-container">
                    <div className="card">
                        <div className="card-image service-bundle-big"></div>
                        <h3>Bundled Packages</h3>
                        <p>
                            Combined sponsorship proposals for brands looking for multi-city/multi-facet reach, reducing
                            the
                            sponsorship turnaround time during search and deal closure cycle by a factor of 100.
                        </p>
                    </div>
                    <div className="card">
                        <div className="card-image contract"></div>
                        <h3>Easy Contract Creation</h3>
                        <p>
                            Dynamic and real-time contract creation catering to both parties involved.
                        </p>
                    </div>
                    <div className="card">
                        <div className="card-image insights"></div>
                        <h3>Insights</h3>
                        <p>
                            Get insights into any event's history. For example, brands associations in the past, overall
                            audience, revenue generated per sqft ad space.
                        </p>
                    </div>
                </div>

                <br/>
                <br/>
                <h2>During-Deal</h2>
                <div className="cards">
                    <div className="card">
                        <div className="card-image project-deliverables"></div>
                        <h3>Completion of Agreed Deliverables</h3>
                        <p>
                            Ensuring the completion of agreed deliverables with live reporting on the portal with
                            time-stamped pictures and videos
                        </p>
                    </div>
                    <div className="card">
                        <div className="card-image dispute-resolution"></div>
                        <h3>Dispute Resolution</h3>
                        <p>
                            Dedicated dispute resolution team and account manager for all ongoing deals
                        </p>
                    </div>
                    <div className="card">
                        <div className="card-image live-stream"></div>
                        <h3>Live-Streaming</h3>
                        <p>
                            Live-streaming of event with ad spaces
                        </p>
                    </div>
                </div>

                <br/>
                <br/>
                <h2>Post-Deal</h2>
                <div className="cards">
                    <div className="card">
                        <div className="card-image metrics"></div>
                        <h3><span>Metrics</span></h3>
                        <p>
                            Metrics on impressions (hits, clicks, likes) generated
                        </p>
                    </div>
                    <div className="card">
                        <div className="card-image click_report"></div>
                        <h3>1-click Downloadable Report</h3>
                        <p>
                            Downloadable report with metrics such a impact from the event, pictures from the event and
                            probable
                            sponsorship ROI
                        </p>
                    </div>
                    <div className="card">
                        <div className="card-image content-creation"></div>
                        <h3>Content Creation</h3>
                        <p>
                            On-demand digital content creation
                        </p>
                    </div>
                </div>
            </div>
        </>
    )
        ;
};

export default Hero;
