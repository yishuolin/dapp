const { expect } = require('chai');
const { ethers } = require('hardhat');

describe('MyNFT', function () {
  it('Should mint and transfer an NFT to someone', async function () {
    const Greeter = await ethers.getContractFactory('MyToken');
    const greeter = await Greeter.deploy();
    await greeter.deployed();

    const recipient = '0x8626f6940e2eb28930efb4cef49b2d1f2c9c1199';
    const metadataURI = 'cid/test.png';

    let balance = await greeter.balanceOf(recipient);
    expect(balance).to.equal(0);

    const newlyMintedToken = await greeter.payToMint(recipient, metadataURI, {
      value: ethers.utils.parseEther('0.05'),
    });

    await newlyMintedToken.wait();
    balance = await greeter.balanceOf(recipient);
    expect(balance).to.equal(1);
  });
});
