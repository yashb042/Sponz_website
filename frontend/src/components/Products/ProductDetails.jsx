import React, {useState} from "react";
import {AiFillHeart, AiOutlineHeart, AiOutlineMessage,} from "react-icons/ai";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {server} from "../../server";
import styles from "../../styles/styles";
import {addToWishlist, removeFromWishlist,} from "../../redux/actions/wishlist";
import {addTocart} from "../../redux/actions/cart";
import {toast} from "react-toastify";
import axios from "axios";
import {FaFacebook, FaFilePdf, FaGlobe, FaInstagram, FaTwitter} from 'react-icons/fa';
import {projectsData} from "../../static/data";

const ProductDetails = ({data}) => {
    const {wishlist} = useSelector((state) => state.wishlist);
    const {cart} = useSelector((state) => state.cart);
    const {user, isAuthenticated} = useSelector((state) => state.user);
    const {products} = useSelector((state) => state.products);
    const [count, setCount] = useState(1);
    const [click, setClick] = useState(false);
    const [select, setSelect] = useState(0);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    // useEffect(() => {
    //   dispatch(getAllProductsShop(data && data?.shop._id));
    //   if (wishlist && wishlist.find((i) => i._id === data?._id)) {
    //     setClick(true);
    //   } else {
    //     setClick(false);
    //   }
    // }, [data, wishlist]);

    const incrementCount = () => {
        setCount(count + 1);
    };

    const decrementCount = () => {
        if (count > 1) {
            setCount(count - 1);
        }
    };

    const removeFromWishlistHandler = (data) => {
        setClick(!click);
        dispatch(removeFromWishlist(data));
    };

    const addToWishlistHandler = (data) => {
        setClick(!click);
        dispatch(addToWishlist(data));
    };

    const addToCartHandler = (id) => {
        const isItemExists = cart && cart.find((i) => i._id === id);
        if (isItemExists) {
            toast.error("Item already in cart!");
        } else {
            if (data.stock < 1) {
                toast.error("Product stock limited!");
            } else {
                const cartData = {...data, qty: count};
                dispatch(addTocart(cartData));
                toast.success("Item added to cart successfully!");
            }
        }
    };

    // const totalReviewsLength =
    //   products &&
    //   products.reduce((acc, product) => acc + product.reviews.length, 0);

    // const totalRatings =
    //   products &&
    //   products.reduce(
    //     (acc, product) =>
    //       acc + product.reviews.reduce((sum, review) => sum + review.rating, 0),
    //     0
    //   );
    //
    // const avg =  totalRatings / totalReviewsLength || 0;
    //
    // const averageRating = avg.toFixed(2);


    const handleMessageSubmit = async () => {
        if (isAuthenticated) {
            const groupTitle = data._id + user._id;
            const userId = user._id;
            const sellerId = data.College_Name;
            await axios
                .post(`${server}/conversation/create-new-conversation`, {
                    groupTitle,
                    userId,
                    sellerId,
                })
                .then((res) => {
                    navigate(`/inbox?${res.data.conversation._id}`);
                })
                .catch((error) => {
                    toast.error(error.response.data.message);
                });
        } else {
            toast.error("Please login to create a conversation");
        }
    };

    return (
        <div className="bg-white">
            {data ? (
                <div className={`${styles.section} w-[90%] 800px:w-[80%]`}>
                    <div className="w-full py-5">
                        <div className="block w-full 800px:flex">
                            <div className="w-full 800px:w-[50%]">
                                <img
                                    src={`${data && data.Event_Image}`}
                                    alt=""
                                    className="w-[80%]"
                                />
                                {/*<div className="w-full flex">*/}
                                {/*  {data &&*/}
                                {/*    data.image_Url.map((i, index) => (*/}
                                {/*      <div*/}
                                {/*        className={`${*/}
                                {/*          select === 0 ? "border" : "null"*/}
                                {/*        } cursor-pointer`}*/}
                                {/*      >*/}
                                {/*        <img*/}
                                {/*          src={`${i?.url}`}*/}
                                {/*          alt=""*/}
                                {/*          className="h-[200px] overflow-hidden mr-3 mt-3"*/}
                                {/*          onClick={() => setSelect(index)}*/}
                                {/*        />*/}
                                {/*      </div>*/}
                                {/*    ))}*/}
                                {/*  <div*/}
                                {/*    className={`${*/}
                                {/*      select === 1 ? "border" : "null"*/}
                                {/*    } cursor-pointer`}*/}
                                {/*  ></div>*/}
                                {/*</div>*/}
                            </div>
                            <div className="w-full 800px:w-[50%] pt-5">
                                <h1 className={`${styles.productTitle}`}>{data.Event_Name}</h1>
                                <p>{data['About Event']}</p>
                                <div className="flex pt-3">
                                    <h4 className={`${styles.productDiscountPrice}`}>
                                        {data['Start Date']} - {data['End Date']}
                                    </h4>
                                    {/*<h3 className={`${styles.price}`}>*/}
                                    {/*  {data.originalPrice ? data.originalPrice + "$" : null}*/}
                                    {/*</h3>*/}
                                </div>
                                <div className="flex pt-3">
                                    <h4 className={`${styles.productDiscountPrice}`}>
                                        {data['Location'].join(', ')}
                                    </h4>
                                </div>
                                {/*<div className="flex pt-3">*/}
                                {/*    <h4 className={`${styles.productDiscountPrice}`}>*/}
                                {/*        {data['Event Caption'] ? data['Event Caption'] : null}*/}
                                {/*    </h4>*/}
                                {/*</div>*/}

                                <div className="flex items-center mt-12 justify-between pr-3">
                                    {/*<div>*/}
                                    {/*  <button*/}
                                    {/*    className="bg-gradient-to-r from-teal-400 to-teal-500 text-white font-bold rounded-l px-4 py-2 shadow-lg hover:opacity-75 transition duration-300 ease-in-out"*/}
                                    {/*    onClick={decrementCount}*/}
                                    {/*  >*/}
                                    {/*    -*/}
                                    {/*  </button>*/}
                                    {/*  <span className="bg-gray-200 text-gray-800 font-medium px-4 py-[11px]">*/}
                                    {/*    {count}*/}
                                    {/*  </span>*/}
                                    {/*  <button*/}
                                    {/*    className="bg-gradient-to-r from-teal-400 to-teal-500 text-white font-bold rounded-l px-4 py-2 shadow-lg hover:opacity-75 transition duration-300 ease-in-out"*/}
                                    {/*    onClick={incrementCount}*/}
                                    {/*  >*/}
                                    {/*    +*/}
                                    {/*  </button>*/}
                                    {/*</div>*/}
                                    <div>
                                        {click ? (
                                            <AiFillHeart
                                                size={30}
                                                className="cursor-pointer"
                                                onClick={() => removeFromWishlistHandler(data)}
                                                color={click ? "red" : "#333"}
                                                title="Remove from wishlist"
                                            />
                                        ) : (
                                            <AiOutlineHeart
                                                size={30}
                                                className="cursor-pointer"
                                                onClick={() => addToWishlistHandler(data)}
                                                color={click ? "red" : "#333"}
                                                title="Add to wishlist"
                                            />
                                        )}
                                    </div>
                                </div>
                                {/*<div*/}
                                {/*  className={`${styles.button} !mt-6 !rounded !h-11 flex items-center`}*/}
                                {/*  onClick={() => addToCartHandler(data._id)}*/}
                                {/*>*/}
                                {/*  <span className="text-white flex items-center">*/}
                                {/*    Add to cart <AiOutlineShoppingCart className="ml-1" />*/}
                                {/*  </span>*/}
                                {/*</div>*/}
                                <div className="flex items-center pt-8">
                                    {/*<Link to={`/shop/preview/${data?.shop._id}`}>*/}
                                    {/*  <img*/}
                                    {/*    src={`${data?.shop?.avatar?.url}`}*/}
                                    {/*    alt=""*/}
                                    {/*    className="w-[50px] h-[50px] rounded-full mr-2"*/}
                                    {/*  />*/}
                                    {/*</Link>*/}
                                    <div className="pr-8">
                                        {/*<Link to={`/shop/preview/${data?.shop._id}`}>*/}
                                        <h3 className={`${styles.shop_name} pb-1 pt-1`}>
                                            {data.College_Name}
                                        </h3>
                                        {/*</Link>*/}
                                        {/*<h5 className="pb-3 text-[15px]">*/}
                                        {/*  ({averageRating}/5) Ratings*/}
                                        {/*</h5>*/}
                                    </div>
                                    <div
                                        className={`${styles.button} bg-[#6443d1] mt-4 !rounded !h-11`}
                                        onClick={handleMessageSubmit}
                                    >
                    <span className="text-white flex items-center">
                      Contact Event <AiOutlineMessage className="ml-1"/>
                    </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <ProductDetailsInfo
                        data={data}
                        products={products}
                        totalReviewsLength={0}
                        averageRating={0}
                    />
                    <br/>
                    <br/>
                </div>
            ) : null}
        </div>
    );
};

const ProductDetailsInfo = ({
                                data,
                                products,
                                totalReviewsLength,
                                averageRating,
                            }) => {
    const [active, setActive] = useState(1);

    return (
        <div className="bg-[#f5f6fb] px-3 800px:px-10 py-2 rounded">
            <div className="w-full flex justify-between border-b pt-10 pb-2">
                <div className="relative">
                    <h5
                        className={
                            "text-[#000] text-[18px] px-0.5 leading-5 font-[600] cursor-pointer 800px:text-[20px]"
                        }
                        onClick={() => setActive(1)}
                    >
                        About Event
                    </h5>
                    {active === 1 ? (
                        <div className={`${styles.active_indicator}`}/>
                    ) : null}
                </div>
                <div className="relative">
                    <h5
                        className={
                            "text-[#000] text-[18px] px-0.5 leading-5 font-[600] cursor-pointer 800px:text-[20px]"
                        }
                        onClick={() => setActive(2)}
                    >
                        Event Links and Details
                    </h5>
                    {active === 2 ? (
                        <div className={`${styles.active_indicator}`}/>
                    ) : null}
                </div>
                <div className="relative">
                    <h5
                        className={
                            "text-[#000] text-[18px] px-0.5 leading-5 font-[600] cursor-pointer 800px:text-[20px]"
                        }
                        onClick={() => setActive(3)}
                    >
                        Instagram Engagement details
                    </h5>
                    {active === 3 ? (
                        <div className={`${styles.active_indicator}`}/>
                    ) : null}
                </div>
                <div className="relative">
                    <h5
                        className={
                            "text-[#000] text-[18px] px-0.5 leading-5 font-[600] cursor-pointer 800px:text-[20px]"
                        }
                        onClick={() => setActive(4)}
                    >
                        Sponsorship Packages
                    </h5>
                    {active === 4 ? (
                        <div className={`${styles.active_indicator}`}/>
                    ) : null}
                </div>
            </div>


            {active === 1 ? (
                <>
                    <p className="py-2 text-[18px] leading-8 pb-10 whitespace-pre-line">
                        {data.Events}
                    </p>
                </>
            ) : null}

            {active === 2 ? (
                <div className="w-full min-h-[40vh] flex flex-col items-center py-3 overflow-y-scroll">
                    <div className="w-full min-h-[40vh] flex flex-col items-center py-3 overflow-y-scroll">
                        <a href={data['Website_Link']} target="_blank" rel="noopener noreferrer">
                            <FaGlobe size={30}
                                     className={`cursor-pointer ${!data['Website_Link'] ? 'text-gray-500' : 'text-green-500'}`}/>
                        </a>
                        <br></br>
                        <br></br>
                        <a href={data['Brochure_Link']} target="_blank" rel="noopener noreferrer">
                            <FaFilePdf size={30}
                                       className={`cursor-pointer ${!data['Brochure_Link'] ? 'text-gray-500' : 'text-red-500'}`}/>
                        </a>
                        <br></br>
                        <br></br>
                        <a href={data['Facebook_Link']} target="_blank" rel="noopener noreferrer">
                            <FaFacebook size={30}
                                        className={`cursor-pointer ${!data['Facebook_Link'] ? 'text-gray-500' : 'text-blue-500'}`}/>
                        </a>
                        <br></br>
                        <br></br>
                        <a href={data['Instagram_Link']} target="_blank" rel="noopener noreferrer">
                            <FaInstagram size={30}
                                         className={`cursor-pointer ${!data['Instagram_Link'] ? 'text-gray-500' : 'text-red-500'}`}/>
                        </a>
                        <br></br>
                        <br></br>
                        <a href={data['Twitter_Link']} target="_blank" rel="noopener noreferrer">
                            <FaTwitter size={30}
                                       className={`cursor-pointer ${!data['Twitter_Link'] ? 'text-gray-500' : 'text-blue-500'}`}/>
                        </a>
                        <div className="py-2 text-[18px] leading-8 pb-10 whitespace-pre-line">
                            {data && data['Related Links:'].map((department, index) => (
                                <div key={index}
                                     className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                                    {department.replace('/explore/category/', ' ')}
                                </div>
                            ))}
                        </div>
                    </div>
                    {/*<div className="relative">*/}
                    {/*    <h5 className={"text-[#000] text-[18px] px-0.5 leading-5 font-[600] cursor-pointer 800px:text-[20px]"}>*/}
                    {/*        {data && (*/}
                    {/*            <p>{data.Departments.join(', ')}</p>*/}
                    {/*        )}*/}
                    {/*    </h5>*/}
                    {/*</div>*/}

                </div>
            ) : null}

            {active === 3 && (
                <div className="w-full block 800px:flex p-5">
                    <div className="w-full 800px:w">
                        <div className="background-color: white border-radius: 8px overflow">
                            <div className="p-5">
                                <ProfileCard profile={data.profile}/>
                                <div className="stats-grid grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <StatCard label="Reach" value='1000' description="Latest Followers"/>
                                    <StatCard label="Activity" value='200' description="Avg feed post a month"/>
                                    <StatCard label="Likes" value='100' description="Avg likes a month"/>
                                    <StatCard label="Comments" value='20' description="Avg comments a month"/>
                                    <StatCard label="Engagement" value='33%' description="Engagement over followers"/>
                                </div>
                            </div>

                        </div>
                        {/*<p className="pt-2">{'Temp Data'}</p>*/}
                    </div>
                </div>
            )}
            {active === 4 && (
                <div className="w-full min-h-[40vh] flex flex-col items-center py-3 overflow-y-scroll">
                    <PackageCard/>
                </div>
            )}
        </div>
    );
};

const ProfileCard = ({profile}) => {
    return (
        <div style={{
            display: 'flex',
            alignItems: 'center',
            backgroundColor: '#e60073',
            color: 'white',
            padding: '20px',
            borderRadius: '8px',
            marginBottom: '20px'
        }}>
            <div style={{marginRight: '20px'}}>
                <FaInstagram size={40}/>
            </div>
            <div>
                <h2 style={{margin: '0', fontSize: '1.5rem'}}>Temp Name</h2>
                <p style={{margin: '0', fontSize: '1rem', fontWeight: '300'}}>Temp Bio</p>
                <p style={{fontSize: '0.8rem', color: '#ddd'}}>Last updated 2 days ago</p>
            </div>
        </div>
    );
};

const StatCard = ({label, value, description}) => {
    return (
        <div style={{
            backgroundColor: '#e60073',
            color: 'white',
            padding: '20px',
            borderRadius: '8px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center'
        }}>
            <div style={{fontWeight: 'bold', marginBottom: '5px'}}>{label}</div>
            <div style={{fontSize: '2rem', marginBottom: '5px'}}>{value}</div>
            <div style={{fontSize: '0.8rem', marginBottom: '10px'}}>{description}</div>
            {/*<div style={{fontSize: '0.8rem', color: '#ddd', cursor: 'pointer'}}>View More</div>*/}
        </div>
    );
};

const ProjectCard = ({title, description, price, buttonLabel, buttonStyle}) => {
    return (
        <div className="project-card" style={{backgroundColor: buttonStyle ? '#f0f4f8' : '#fff'}}>
            <h3 className="project-title">{title}</h3>
            <p className="project-description">{description}</p>
            <p className="project-price">
                <span className="price-icon"></span>
                {price}
            </p>
            <span className="price-label">Estimated Price</span>
            <button className="project-button" style={{ ...buttonStyle, marginLeft: '80px' }}>
                {buttonLabel}
            </button>
        </div>
    );
};

const PackageCard = ({}) => (
    <div className="pre-packaged-projects">
        <h2>Pre-Packaged Projects</h2>
        <div className="projects-container">
            {projectsData.map((project, index) => (
                <ProjectCard key={index} {...project} />
            ))}
        </div>
        <style>{`
        .pre-packaged-projects {
          font-family: Arial, sans-serif;
          max-width: 800px;
          margin: auto;
          padding: 20px;
          background-color: #fff;
          border-radius: 8px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }

        .projects-container {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 20px;
          margin-top: 20px;
        }

        .project-card {
          padding: 20px;
          border-radius: 8px;
          border: 1px solid #ddd;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
          transition: background-color 0.3s;
        }

        .project-title {
          margin: 0 0 10px;
          font-size: 1.2rem;
          color: #333;
        }

        .project-description {
          margin: 0 0 20px;
          color: #666;
          font-size: 0.9rem;
        }

        .project-price {
          margin: 0;
          font-size: 1.2rem;
          color: #333;
          display: flex;
          align-items: center;
        }

        .price-icon {
          margin-right: 5px;
        }

        .price-label {
          font-size: 0.8rem;
          color: #999;
          margin-top: 5px;
        }

        .project-button {
          margin-top: 20px;
          padding: 10px 20px;
          border: none;
          border-radius: 4px;
          font-size: 0.9rem;
          cursor: pointer;
        }
      `}</style>
    </div>
);
export default ProductDetails;
