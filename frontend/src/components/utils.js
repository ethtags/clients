import { ethers } from 'ethers';

export const ethProvider = new ethers.providers.JsonRpcProvider(
      process.env.REACT_APP_ETHERS_PROVIDER || "http://localhost:8545"
    );

export const addrStatuses = {
    "IDLE": "IDLE",
    "FETCHING_ADDRESS": "FETCHING_ADDRESS",
    "FETCHING_ENS": "FETCHING_ENS",
    "INVALID_ADDRESS": "INVALID_ADDRESS",
    "INVALID_ENS": "INVALID_ENS",
    "ADDRESS_FOUND": "ADDRESS_FOUND",
    "ENS_FOUND": "ENS_FOUND",
}

export const addScript = ({ src, id, onLoad }) => {
  const existing = document.getElementById(id);
  if (existing) {
    return existing;
  } else {
    const script = document.createElement("script");
    script.src = src;
    script.id = id;
    script.async = true;
    script.onload = () => {
      if (onLoad) {
        onLoad();
      }
    };
    document.head.appendChild(script);
    return script;
  }
};
