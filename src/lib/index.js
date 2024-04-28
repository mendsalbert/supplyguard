import { ethers } from "ethers";
import SupplyGuard from "./SupplyGuard.json";

export const contract = async () => {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const { ethereum } = window;

  if (ethereum) {
    const signer = provider.getSigner();
    const contractReader = new ethers.Contract(
      "0xb3ed1424ac12B8B6A2472aE3d744A05f5A7e940a",
      SupplyGuard.abi,
      signer
    );

    return contractReader;
  }
};
