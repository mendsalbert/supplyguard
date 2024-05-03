import { ethers } from "ethers";
import SupplyGuard from "./SupplyGuard.json";

export const contract = async () => {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const { ethereum } = window;
  // prevAddr = 0x05a9c0eb1CB700f6B86eF159FeCf0Cc82d8EA59D
  if (ethereum) {
    const signer = provider.getSigner();
    const contractReader = new ethers.Contract(
      "0x03EC49cbA10b6005abE9E69ff36A7728fB72acD6",
      SupplyGuard.abi,
      signer
    );

    return contractReader;
  }
};
