import Ether from '../eth';
import ABI from './abi';

class StableUnit extends Ether {
  constructor(web3, name, type, value) {
    super(web3, name, type, value);

    this.contractAddress = '0x75a853bba4143932cca6b80f2dd66d84aa8aa37f';
    this.contract = web3.eth.contract(ABI).at(this.web3.toChecksumAddress(this.contractAddress));
    this.precision = 10e25;
  }

  getBalance() {
    const address = this.web3.toChecksumAddress(this.web3.eth.defaultAccount);
    return new Promise((resolve, reject) => {
      this.contract.balanceOf(address, (error, balance) => {
        if (error) {
          return reject(error);
        }

        this.setBalance(balance);

        return resolve(balance);
      });
    });
  }
}

export default StableUnit;
