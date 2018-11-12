/* global Web3, web3 */
class Market {
  constructor(root) {
    this.root = root;
    this.instance = new Web3(web3.currentProvider);
    this.currencies = [
      {
        name: 'eth',
        type: 'deposit',
        value: 0
      },
      {
        name: 'dai',
        type: 'receive',
        value: 0
      }
    ];

    this.accounts = null;
    this.view = null;

    web3.eth.getAccounts((error, accounts) => {
      if (error) {
        console.error(error);

        return;
      }

      this.accounts = accounts;

      this.createExchange();
    });
  }

  clearView() {
    if (this.view) {
      this.root.removeChild(this.view);
    }
  }

  createExchange() {
    const currencies = document.createElement('div');

    currencies.classList.add('makret__currencies');
    this.currencies.forEach((side) => currencies.append(this.createSide(side)));
    this.setView(currencies);
  }

  createSide(currency) {
    const side = document.createElement('div');

    side.classList.add('market-side', `market-side_${currency.name}`);

    const input = document.createElement('input');

    input.classList.add('market-side__input');
    input.setAttribute('type', 'number');

    if (currency.type === 'deposit') {
      input.setAttribute('placeholder', 'deposit amount');
    } else {
      input.setAttribute('placeholder', 'receive amount');
    }

    input.addEventListener('input', (e) => this.setCurrencyValue(currency, e));

    side.append(input);

    return side;
  }

  createAccount(account) {
    const accountItem = document.createElement('li');

    accountItem.classList.add('market-currency');
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

export default Market;
