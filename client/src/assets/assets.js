import logo from './logo.svg'
import searchIcon from './searchIcon.svg'
import userIcon from './userIcon.svg'
import calenderIcon from './calenderIcon.svg'
import locationIcon from './locationIcon.svg'
import starIconFilled from './starIconFilled.svg'
import arrowIcon from './arrowIcon.svg'
import starIconOutlined from './starIconOutlined.svg'
import instagramIcon from './instagramIcon.svg'
import facebookIcon from './facebookIcon.svg'
import twitterIcon from './twitterIcon.svg'
import linkendinIcon from './linkendinIcon.svg'
import freeWifiIcon from './freeWifiIcon.svg'
import freeBreakfastIcon from './freeBreakfastIcon.svg'
import roomServiceIcon from './roomServiceIcon.svg'
import mountainIcon from './mountainIcon.svg'
import poolIcon from './poolIcon.svg'
import homeIcon from './homeIcon.svg'
import closeIcon from './closeIcon.svg'
import locationFilledIcon from './locationFilledIcon.svg'
import heartIcon from './heartIcon.svg'
import badgeIcon from './badgeIcon.svg'
import menuIcon from './menuIcon.svg'
import closeMenu from './closeMenu.svg'
import guestsIcon from './guestsIcon.svg'
import roomImg1 from './roomImg1.png'
import roomImg2 from './roomImg2.png'
import roomImg3 from './roomImg3.png'
import roomImg4 from './roomImg4.png'
import regImage from './regImage.png'
import exclusiveOfferCardImg1 from "./exclusiveOfferCardImg1.png";
import exclusiveOfferCardImg2 from "./exclusiveOfferCardImg2.png";
import exclusiveOfferCardImg3 from "./exclusiveOfferCardImg3.png";
import addIcon from "./addIcon.svg";
import dashboardIcon from "./dashboardIcon.svg";
import listIcon from "./listIcon.svg";
import uploadArea from "./uploadArea.svg";
import totalBookingIcon from "./totalBookingIcon.svg";
import totalRevenueIcon from "./totalRevenueIcon.svg";

export const assets = {
    logo,
    searchIcon,
    userIcon,
    calenderIcon,
    locationIcon,
    starIconFilled,
    arrowIcon,
    starIconOutlined,
    instagramIcon,
    facebookIcon,
    twitterIcon,
    linkendinIcon,
    freeWifiIcon,
    freeBreakfastIcon,
    roomServiceIcon,
    mountainIcon,
    poolIcon,
    closeIcon,
    homeIcon,
    locationFilledIcon,
    heartIcon,
    badgeIcon,
    menuIcon,
    closeMenu,
    guestsIcon,
    regImage,
    addIcon,
    dashboardIcon,
    listIcon,
    uploadArea,
    totalBookingIcon,
    totalRevenueIcon,
}

export const cities = [
    "Mumbai",
    "Delhi",
    "Goa",
    "Shimla",
];

export const exclusiveOffers = [
    { _id: 1, title: "Summer Escape Package", description: "Enjoy a complimentary night and daily breakfast", priceOff: 25, expiryDate: "Aug 31", image: exclusiveOfferCardImg1 },
    { _id: 2, title: "Romantic Getaway", description: "Special couples package including spa treatment", priceOff: 20, expiryDate: "Sep 20", image: exclusiveOfferCardImg2 },
    { _id: 3, title: "Luxury Retreat", description: "Book 60 days in advance and save on your stay at any of our luxury properties worldwide.", priceOff: 30, expiryDate: "Sep 25", image: exclusiveOfferCardImg3 },
]

export const testimonials = [
    { id: 1, name: "Aarav Verma", address: "Delhi, India", image: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=200", rating: 5, review: "SukoonStay made my vacation absolutely stress-free. The booking process was smooth, the hotel was exactly as shown in the pictures, and the service was exceptional. Highly recommended for luxury stays!"},
    { id: 2, name: "Liam Johnson", address: "New York, USA", image: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200", rating: 4, review: "SukoonStay exceeded my expectations. The booking process was seamless, and the hotels were absolutely top-notch. Highly recommended!" },
    { id: 3, name: "Ananya Sharma", address: "Mumbai, India", image: "https://images.unsplash.com/photo-1701615004837-40d8573b6652?q=80&w=200", rating: 5, review: "I had an amazing experience booking through SukoonStay. The recommendations were perfect, the property was luxurious, and everything was well-managed. I will definitely use it again!"}
];

export const facilityIcons = {
    "Free WiFi": freeWifiIcon,
    "Free Breakfast": freeBreakfastIcon,
    "Room Service": roomServiceIcon,
    "Mountain View": mountainIcon,
    "Pool Access": poolIcon,
};

export const roomCommonData = [
    { icon: homeIcon, title: "Clean & Safe Stay", description: "A well-maintained and hygienic space just for you." },
    { icon: badgeIcon, title: "Enhanced Cleaning", description: "This host follows Staybnb's strict cleaning standards." },
    { icon: locationFilledIcon, title: "Excellent Location", description: "90% of guests rated the location 5 stars." },
    { icon: heartIcon, title: "Smooth Check-In", description: "100% of guests gave check-in a 5-star rating." },
];

export const userDummyData = {
    "_id": "user_2unqyL4diJFP1E3pIBnasc7w8hP",
    "username": "Rachit Gupta",
    "email": "racguptt06@gmail.com",
    "image": "https://img.clerk.com/eyJ0eXBlIjoicHJveHkiLCJzcmMiOiJodHRwczovL2ltYWdlcy5jbGVyay5kZXYvdXBsb2FkZWQvaW1nXzJ2N2c5YVpSSEFVYVUxbmVYZ2JkSVVuWnFzWSJ9",
    "role": "hotelOwner",
    "createdAt": "2025-03-25T09:29:16.367Z",
    "updatedAt": "2025-04-10T06:34:48.719Z",
    "__v": 1,
    "recentSearchedCities": [
        "Jaipur"
    ]
}

export const hotelDummyData = {
    "_id": "67f76393197ac559e4089b72",
    "name": "The Heritage Stay",
    "address": "MI Road, Jaipur, Rajasthan 302001",
    "contact": "+917778787787",
    "owner": userDummyData,
    "city": "Jaipur",
    "createdAt": "2025-04-10T06:22:11.663Z",
    "updatedAt": "2025-04-10T06:22:11.663Z",
    "__v": 0
}

export const roomsDummyData = [
    {
        "_id": "67f7647c197ac559e4089b96",
        "hotel": hotelDummyData,
        "roomType": "Double Bed",
        "pricePerNight": 2499,
        "amenities": ["Room Service", "Mountain View", "Pool Access"],
        "images": [roomImg1, roomImg2, roomImg3, roomImg4],
        "isAvailable": true,
    },
    {
        "_id": "67f76452197ac559e4089b8e",
        "hotel": hotelDummyData,
        "roomType": "Double Bed",
        "pricePerNight": 5999,
        "amenities": ["Room Service", "Mountain View", "Pool Access"],
        "images": [roomImg2, roomImg3, roomImg4, roomImg1],
        "isAvailable": true,
    },
    {
        "_id": "67f76406197ac559e4089b82",
        "hotel": hotelDummyData,
        "roomType": "Double Bed",
        "pricePerNight": 3999,
        "amenities": ["Room Service", "Mountain View", "Pool Access"],
        "images": [roomImg3, roomImg4, roomImg1, roomImg2],
        "isAvailable": true,
    },
    {
        "_id": "67f763d8197ac559e4089b7a",
        "hotel": hotelDummyData,
        "roomType": "Double Bed",
        "pricePerNight": 8999,
        "amenities": ["Room Service", "Mountain View", "Pool Access"],
        "images": [roomImg4, roomImg1, roomImg2, roomImg3],
        "isAvailable": true,
    }
]