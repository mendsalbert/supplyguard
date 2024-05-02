const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("SupplyGuard", (m) => {
  const supplyGuard = m.contract("SupplyGuard");

  return { supplyGuard };
});
