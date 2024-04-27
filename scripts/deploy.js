const hre = require("hardhat");

async function main() {
  const [deployer] = await hre.ethers.getSigners();
  console.log("Deploying contracts with the account:", deployer.address);

  // Get the contract factory
  const SupplyGuard = await hre.ethers.getContractFactory("SupplyGuard");

  const supplyGuard = await SupplyGuard.deploy();

  console.log("SupplyGuard deployed to:", supplyGuard);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
