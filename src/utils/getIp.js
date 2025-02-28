import { LOCALHOST_ADDRESSES, IP_LIST_FOR_LOCALHOST } from "../constants/global.js";

const getIp = remoteAddress => {
  const isLocalhost = LOCALHOST_ADDRESSES.includes(remoteAddress);

  if (isLocalhost) {
    const randomIndex = Math.floor(Math.random() * IP_LIST_FOR_LOCALHOST.length);
    return IP_LIST_FOR_LOCALHOST[randomIndex];
  }

  return remoteAddress;
};

export default getIp;
