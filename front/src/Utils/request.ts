const site = "http://localhost:8080/";
const postReq = async (surl: string, data: {}) => {
  const res = await fetch(site + surl, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(data),
  });
  const dat = await res.json();
  return dat;
};

export { postReq };
