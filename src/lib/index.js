import { ethers } from "ethers";
import SupplyGuard from "./SupplyGuard.json";

export const contract = async () => {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const { ethereum } = window;

  if (ethereum) {
    const signer = provider.getSigner();
    const contractReader = new ethers.Contract(
      "0x05a9c0eb1CB700f6B86eF159FeCf0Cc82d8EA59D",
      SupplyGuard.abi,
      signer
    );

    return contractReader;
  }
};
