import { BigNumber, ethers } from "ethers";
import { contract } from "./index";
import { toEth } from "./ether-utils";

// Function to parse error messages
function parseErrorMsg(e) {
  const json = JSON.parse(JSON.stringify(e));
  return json?.reason || json?.error?.message;
}

// Function to add a new NFT to the collection
export async function addNFT(title, description, imageUrl, source, price) {
  try {
    const contractObj = await contract();
    const data = await contractObj.addNFT(
      title,
      description,
      imageUrl,
      source,
      ethers.utils.parseEther(price)
    );
    const receipt = await data.wait();
    return receipt;
  } catch (e) {
    return parseErrorMsg(e);
  }
}

// Function to get all NFTs
export async function getAllNFTs() {
  try {
    const contractObj = await contract();
    const data = await contractObj.getAllNFTs();
    return data;
  } catch (e) {
    return parseErrorMsg(e);
  }
}

// Function to get NFTs minted by a specific user
export async function getMintedNFTsByUser(userAddress) {
  try {
    const contractObj = await contract();
    const data = await contractObj.getMintedNFTsByUser(userAddress);
    return data;
  } catch (e) {
    return parseErrorMsg(e);
  }
}

export async function makePayment(amount) {
  try {
    let tx = { value: toWei(amount) };
    const amountInWei = ethers.utils.parseEther(amount.toString());
    const contractObj = await contract();
    const data = await contractObj.makePayment({
      value: amountInWei,
    });
    const receipt = await data.wait();
    return receipt;
  } catch (e) {
    console.error("Error in makePayment:", e);
    return null;
  }
}

// Function to mint an NFT
export async function mintNFT(nftId, value) {
  try {
    const amountInWei = ethers.utils.parseEther(value);
    const contractObj = await contract();
    const transactionResponse = await contractObj.mintNFT(nftId, {
      value: amountInWei,
    });
    const receipt = await transactionResponse.wait();
    return receipt;
  } catch (e) {
    console.log(e);
    return parseErrorMsg(e);
  }
}

function toWei(amount) {
  const toWei = ethers.utils.parseUnits(amount.toString());
  return toWei;
}
