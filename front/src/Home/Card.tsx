type prp = {
  name: string;
  place: string;
  img: string;
  price: number;
};

const Card = ({ prop }: { prop: prp }) => {
  return (
    <div className="card" style={{ backgroundImage: `url(${prop.img})` }}>
      <p>{prop.name}</p>
      <h2>{`SAIL FROM ${prop.place}`}</h2>
      <p>{`STARTING FROM ${prop.price}`}</p>
      <h2>{`$${prop.price}`}</h2>
    </div>
  );
};

export default Card;
