import chr from "../assets/seat.svg";
import scr from "../assets/screen.svg";
import { getReq, postReq } from "../Utils/request";
import { useEffect, useState } from "react";

type seat = {
  char: string;
  no: number;
};

type slt = {
  from: string;
  to: string;
  sid: string;
};

type tht = {
  name: string;
  price: number;
  seat: seat[];
  slots: slt[];
  _id: string;
};

const Theater = () => {
  const [booked, setBooked] = useState<string[]>([]);
  const [tht, setTht] = useState<tht>({
    name: "",
    price: 0,
    seat: [],
    slots: [],
    _id: "",
  });
  const [slt, setSlt] = useState<slt | null>(null);
  const [seat, setSeat] = useState("");
  const [date, setDate] = useState("");

  const getData = async () => {
    const dat = await getReq("movie/seat");
    console.log(dat);
    setTht(dat);
  };

  const getBooked = async (d: string = date) => {
    if (date.length === 10 && slt) {
      const dat = await postReq("movie/booked", { date: d, sid: slt.sid });
      console.log(dat);
      setBooked(dat);
    }
  };

  const dateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    if (val) {
      setDate(val);
      getBooked(val);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      {slt ? (
        <div>
          <img src={scr} className="scr" />
          <div>
            {tht.seat &&
              tht.seat.map((el) => {
                const st = [...Array(el.no + 1).keys()].slice(1);
                return (
                  <div key={el.char}>
                    {st &&
                      st.map((e) => {
                        const sn = el.char + "-" + e.toString();
                        const chk = booked.includes(sn);
                        return (
                          <p
                            key={e}
                            style={{
                              color: sn === seat ? "aquamarine" : "black",
                              backgroundImage: chr,
                            }}
                            onClick={() => {
                              if (!chk) {
                                setSeat(sn);
                              }
                            }}
                          >
                            {sn}
                          </p>
                        );
                      })}
                  </div>
                );
              })}
          </div>
        </div>
      ) : (
        <div>
          <h2>SELECT TIME & DATE</h2>
          <input type="date" onChange={dateChange} />
          {tht.slots &&
            tht.slots.map((el) => {
              return (
                <div
                  className="slt"
                  key={el.sid}
                  onClick={() => {
                    setSlt(el);
                    getBooked();
                  }}
                >
                  <p>{el.from + " - " + el.to}</p>
                </div>
              );
            })}
        </div>
      )}
    </div>
  );
};

export default Theater;
