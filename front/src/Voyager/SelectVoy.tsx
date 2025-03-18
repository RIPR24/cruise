import Crdbtn from "./Crdbtn";

export type crbt = {
  name: string;
  description: string;
  path: string;
  img: string;
};

const route: crbt[] = [
  {
    name: "ORDER FOOD",
    description: "Order Delicious food from our fine dinning",
    path: "/voy/food",
    img: "https://chateaurestaurant.com/wp-content/uploads/2024/01/hero_mobile_crop.jpg",
  },
  {
    name: "ORDER STATIONARY ITEMS",
    description: "Order any items as per your liking",
    path: "/voy/items",
    img: "https://content.jdmagicbox.com/v2/comp/kolkata/i1/033pxx33.xx33.221214031206.u9i1/catalogue/md-asif-stationary-shop-park-street-kolkata-pen-dealers-qJ1rv5Saxt.jpg",
  },
  {
    name: "BOOK MOVIE TICKETS",
    description: "Watch Movies at our Movie Theater",
    path: "/voy/movie",
    img: "https://thumbs.dreamstime.com/b/movie-theater-red-seats-screen-336226757.jpg",
  },
  {
    name: "SET RESERVATIONS",
    description:
      "Set reservations To Our Fitness Center, Beauty Salon, Party Hall",
    path: "/voy/modfood",
    img: "https://www.dailyindian.com/wp-content/uploads/2018/10/gyms-696x354.png",
  },
];

const SelectVoy = () => {
  return (
    <div className="sel-con-voy">
      <img
        src="https://www.cruiseandtravel.co.uk/_gatsby/file/f5c75b243b6586f94e9f4146f7f4ee59/97061_Disney-Treasure-Exterior-2-1-1.jpg"
        className="img-bck"
      />
      {route.map((el, i) => {
        return <Crdbtn key={i} el={el} />;
      })}
    </div>
  );
};

export default SelectVoy;
