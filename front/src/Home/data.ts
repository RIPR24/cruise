type prop = {
  name: string;
  place: string;
  img: string;
  price: number;
};

export const card_data: prop[] = [
  {
    name: "ASIA CRUISES",
    place: "SINGAPORE",
    img: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/16/Marina_Bay_Singapore-3499.jpg/1200px-Marina_Bay_Singapore-3499.jpg",
    price: 308,
  },
  {
    name: "SOUTH PACIFIC CRUISES",
    place: "AUSTRALIA",
    img: "https://ichef.bbci.co.uk/ace/standard/976/cpsprodpb/10A3C/production/_129365186_gettyimages-103455489.jpg",
    price: 711,
  },
  {
    name: "MEDITERRANEAN CRUISES",
    place: "SPAIN",
    img: "https://res.cloudinary.com/dmxa8n1ci/image/upload/v1702400738/experience_the_costa_brava_on_holiday_in_spain_9fa464f6ec.jpg",
    price: 489,
  },
  {
    name: "CARIBBEAN CRUISES",
    place: "FLORIDA",
    img: "https://images.interhome.group/travelguide/usa-florida-miami.jpg",
    price: 501,
  },
];

export const fdin = {
  initial: {
    opacity: 0,
    x: -100,
  },
  animate: (d: number = 0.05) => ({
    opacity: 1,
    x: 0,
    transition: {
      delay: d,
      duration: 0.45,
    },
  }),
};

export const fdinup = {
  initial: {
    opacity: 0,
    y: 100,
  },
  animate: (d: number = 0.05) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: d,
    },
  }),
};
