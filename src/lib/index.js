import { ethers } from "ethers";
import SupplyGuard from "./SupplyGuard.json";

export const contract = async () => {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const { ethereum } = window;

  if (ethereum) {
    const signer = provider.getSigner();
    const contractReader = new ethers.Contract(
      "0xc6428e5edA433f0D4F818721bB6Bb0b9cDfffE54",
      SupplyGuard.abi,
      signer
    );

    return contractReader;
  }
};
