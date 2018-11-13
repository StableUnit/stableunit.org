/* global Web3, web3 */
import Currency from './currency';

class Market {
  constructor(root, currencies = []) {
    this.root = root;
    this.accounts = null;
    this.activeAccount = -1;
    this.view = null;

    if (typeof web3 === 'undefined' || typeof Web3 === 'undefined') {
      this.instance = null;
      this.currencies = [];

      this.createEmpty();

      return;
    }

    this.instance = new Web3(web3.currentProvider);
    this.currencies = currencies.map((name, index) => new Currency(name, index === 0 ? 'deposit' : 'receive'));

    this.instance.eth.getAccounts()
      .then((accounts) => {
        this.accounts = accounts;

        this.createExchange();

        if (window.localStorage && localStorage.getItem('activeAccount')) {
          this.setActiveAccount(localStorage.getItem('activeAccount'), true);
        } else if (accounts.length) {
          this.setActiveAccount(accounts[0]);
        }
      })
      .catch((error) => {
        console.error('Getting accounts error', error);
      });
  }

  setActiveAccount(account, ignoreSave = false) {
    this.activeAccount = account;

    if (!ignoreSave && window.localStorage) {
      localStorage.setItem('activeAccount', account);
    }

    this.instance.eth.getBalance(this.activeAccount)
      .then((balance) => {
        for (let i = 0; i < this.currencies.length; i++) {
          if (this.currencies[i].type === 'deposit') {
            this.currencies[i].setBalance(balance);
            break;
          }
        }
      })
      .catch((error) => {
        console.error('Getting balance error', account, error);
      });
  }

  clearView() {
    if (this.view) {
      this.root.removeChild(this.view);
    }
  }

  createEmpty() {
    const empty = document.createElement('div');

    empty.innerText = 'No web3? You should consider trying MetaMask!';

    this.setView(empty);
  }

  createExchange() {
    const currencies = document.createElement('div');

    currencies.classList.add('market__currencies');
    this.currencies.forEach((side) => currencies.append(side.create()));
    this.setView(currencies);
  }

  createAccount(account) {
    const accountItem = document.createElement('li');

    accountItem.classList.add('market-account');
    accountItem.innerText = account;

    return accountItem;
  }

  setView(view) {
    this.clearView();

    this.view = document.createElement('div');

    this.view.classList.add('market__view');
    this.view.append(view);
    this.root.append(this.view);
  }

  createAccountsList() {
    const accountsList = document.createElement('ul');
    accountsList.classList.add('market__accounts');

    this.accounts.forEach((account) => accountsList.append(this.createAccount(account)));

    this.setView(accountsList);
  }

  setCurrencyValue(currency, e) {
    currency.value = Number(e.target.value);
    this.validate();
  }

  validate() {
    console.log('validate', this.currencies);
  }
}

function debounce(fn, threshold, immediate) {
  let timeout;

  return (...args) => {
    const later = () => {
      timeout = null;
      if (!immediate) {
        fn.apply(this, args);
      }
    };

    clearTimeout(timeout);

    const callNow = immediate && !timeout;

    timeout = setTimeout(later, threshold);

    if (callNow) {
      fn.apply(this, args);
    }
  };
}

export default Market;
