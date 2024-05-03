<p align="center">
  <a href="" title="Project Initiator">
    <img src="https://i.imghippo.com/files/zdfS71714749363.png" width="120px" alt="Project Initiator"/>
  </a>
</p>
<h1 align="center">SupplyGuard</h1>

<p align="center">
    <a href="https://www.youtube.com/watch?v=FlKs6_5q5hk" title="">🖥️ Video</a>
    .
    <a href="https://supplyguard.netlify.app/" title="">🔗 Website</a>
    ·
    <a href="https://github.com/mendsalbert/supplyguard" title="">📂 Repo</a>
    ·
    <a href="https://github.com/mendsalbert/supplyguard" title="🐛Report Bug/🎊Request Feature">🚀 Got Issue</a>
</p>
<a href="" title="Project Initiator">
    <img src="https://i.imghippo.com/files/9hGC61714753154.png" width="100%" alt="Project Initiator"/>
</a>

### Inspiration 💡

The current landscape of supply chain management is often marred by inefficiencies due to centralized systems that are opaque and prone to delays and errors. This leads to a significant impact on the reliability and transparency that businesses and consumers desperately need. SupplyGuard was inspired by the potential of decentralized technology to fundamentally change this by ensuring every transaction within the supply chain is immutable, transparent, and verifiable by all parties involved.

### What it Does ⚙️

SupplyGuard introduces a transformative approach to managing supply chains by leveraging blockchain technology to enhance transparency, accountability, and operational efficiency:

- **Smart Contract Integration**: SupplyGuard uses Ethereum smart contracts to automate and secure all supply chain transactions from procurement to delivery.
- **Decentralized Storage**: Utilizes Web3.storage and IPFS technology for secure, decentralized data storage, ensuring no single point of failure can compromise the integrity of supply chain data.
- **User-Friendly Interface**: Built with Next.js and React, SupplyGuard offers a seamless and intuitive user interface that simplifies complex supply chain processes into user-friendly workflows.
- **Real-Time Tracking and Verification**: Incorporates QR codes and blockchain verification methods to provide real-time tracking of goods and authentication of transactions, enhancing trust and security.
- **AI-Enhanced Operations**: Features AI-generated arts and collectibles within the supply chain, adding value through unique digital assets that can be tracked and traded securely on the platform.

Through these features, SupplyGuard ensures:

- Enhanced transparency and accountability in supply chains.
- Reduced complexity and increased efficiency through automation.
- Secure and decentralized data management across the supply chain.

### How We Built It 🛠️

SupplyGuard is crafted using cutting-edge technology tailored for decentralized applications:

- **Blockchain Backend**: Developed using Solidity, smart contracts on Ethereum provide a robust and secure backend for transaction management.
- **Decentralized Data Architecture**: Integrates with IPFS through Web3.storage to ensure all supply chain data is stored securely and permanently without reliance on centralized data centers.
- **Advanced Frontend Technology**: Utilizes the latest in web development technology (Next.js, React) to deliver a responsive and dynamic user experience.
- **Integration of AI**: Leverages artificial intelligence to create and manage unique digital assets within the supply chain, enhancing the value and interaction within the platform.

### Prerequisite

- [Nodejs](https://nodejs.org/en// "Node") Installed

- [Git](https://git-scm.com/ "Git OFficial") Installed

- [npm](https://www.npmjs.com/ "npm ") Installed

- [Hardhat](https://hardhat.org/ "Hardhat ") Installed

### Installation Steps

1. Clone the repository

```Bash
git clone https://github.com/mendsalbert/supplyguard
```

2. Change the working directory

```Bash
cd supplyguard
```

3. Start the local Hardhat node

```Bash
npx hardhat node
```

4. With the network running, deploy the contracts to the local network in a separate terminal window

```Bash
npx hardhat run scripts/deploy.js --network BitTorrent
```

5. Start the app

```Bash
npm run start
```

**🎇 You are Ready to Go!**

### Configuration

The chain ID should be a number eg 1029. If you have a localhost rpc set up, you may need to overwrite it.

To deploy to a test or main networks, update the configurations located in hardhat.config.js to use a private key and, optionally, deploy to a private RPC like Infura.

```Bash
require('@nomiclabs/hardhat-waffle');
const privateKey = 'xx';
const projectId = 'xx';

module.exports = {
  defaultNetwork: 'hardhat',
  networks: {
    hardhat: {
      chainId: 1029,
    },
    "your-testnet": {
      url: 'test-net-rpc-url',
      accounts: [privateKey],
    },
  },
  solidity: {
    version: '0.8.4',
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
};
```

### Challenges We Ran Into 🧗‍♂️

- **Blockchain Integration**: Ensuring seamless integration of blockchain technology into existing supply chain workflows.
- **Data Security and Privacy**: Implementing robust security measures to protect sensitive supply chain data across decentralized networks.

### Accomplishments We're Proud Of 💪

- **Pioneering Decentralized Supply Chain Management**: SupplyGuard is at the forefront of integrating blockchain technology into supply chain management, setting a new standard for transparency and efficiency.
- **Robust and Scalable Technology**: Successfully developed a system that is not only secure and reliable but also scalable to meet the needs of any size enterprise.

### What's Next for SupplyGuard 🔮

- **Mobile and Desktop Expansion**: Plans to extend the functionality of SupplyGuard to mobile and desktop platforms, broadening its accessibility.
- **Enhancing AI Capabilities**: Further develop AI functionalities to automate more aspects of supply chain management, such as predictive analytics for supply and demand.

SupplyGuard is not just a technological innovation; it is a strategic redefinition of how supply chain interactions can be streamlined and secured through decentralized technology. This platform represents a pivotal advancement in making the supply chain industry more transparent, efficient, and user-friendly for all stakeholders involved.
