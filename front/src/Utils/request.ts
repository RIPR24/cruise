const site = "https://cruise-api-ftfl.onrender.com/";
const postReq = async (surl: string, data: {}) => {
  const res = await fetch(site + surl, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(data),
  });
  const dat = await res.json();
  return dat;
};

const putReq = async (surl: string, data: {}) => {
  const res = await fetch(site + surl, {
    method: "PUT",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(data),
  });
  const dat = await res.json();
  return dat;
};

const delReq = async (surl: string, data: {}) => {
  const res = await fetch(site + surl, {
    method: "DELETE",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(data),
  });
  const dat = await res.json();
  return dat;
};

const getReq = async (surl: string) => {
  const res = await fetch(site + surl);
  const dat = await res.json();
  return dat;
};

export { postReq, putReq, getReq, site, delReq };
