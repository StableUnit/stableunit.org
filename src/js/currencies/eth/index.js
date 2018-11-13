class Ether {
  constructor(web3, name, type, value = 0) {
    this.web3 = web3;
    this.name = name;
    this.type = type;
    this.value = value;
    this.balance = 0;
    // DOM elements
    this.container = null;
    this.input = null;
    this.balanceLabel = null;
    this.currencyImage = null;
    this.precision = 10e17;
  }

  create() {
    this.container = document.createElement('div');
    this.container.classList.add('currency', `currency_${this.name}`);

    this.balanceLabel = document.createElement('span');
    this.balanceLabel.classList.add('currency__balance-label');
    this.setBalance(0);
    this.container.append(this.balanceLabel);

    this.input = document.createElement('input');
    this.input.classList.add('currency__input');
    this.input.setAttribute('type', 'number');
    this.input.addEventListener('input', (e) => this.setValue(e));
    this.setType(this.type);

    this.container.append(this.input);

    return this.container;
  }

  getBalance() {
    return new Promise((resolve, reject) => {
      this.web3.eth.getBalance(this.web3.eth.defaultAccount, (error, balance) => {
        if (error) {
          return reject(error);
        }

        this.setBalance(balance);

        return resolve(balance);
      });
    });
  }

  setType(type) {
    this.type = type;

    if (!this.input) {
      return;
    }

    if (this.type === 'deposit') {
      this.input.setAttribute('placeholder', 'deposit amount');
    } else {
      this.input.setAttribute('placeholder', 'receive amount');
    }
  }

  setValue(e) {
    this.value = e.target.value;
  }

  setBalance(balance = 0) {
    this.balance = balance / this.precision;

    if (!this.balanceLabel) {
      return;
    }

    if (this.balance === 0) {
      this.balanceLabel.innerText = `${this.balance} ${this.name}`;
    } else {
      this.balanceLabel.innerText = `${this.balance.toFixed(4)} ${this.name}`;
    }
  }
}

export default Ether;
