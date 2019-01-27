App = {
  web3Provider: null,
  contracts: {},

  init: async function() {
    return await App.initWeb3();
  },

  initWeb3: async function() {
    if (window.ethereum) {
      App.web3Provider = window.ethereum;
      try {
        // Request account access
        await window.ethereum.enable();
      } catch (error) {
        // User denied account access...
        console.error("User denied account access");
      }
    }
    // Legacy dapp browsers...
    else if (window.web3) {
      App.web3Provider = window.web3.currentProvider;
    }
    // If no injected web3 instance is detected, fall back to Ganache
    else {
      App.web3Provider = new Web3.providers.HttpProvider(
        "http://localhost:7545"
      );
    }
    web3 = new Web3(App.web3Provider);

    return await App.initContract();
  },

  initContract: async function() {
    let artifact = await $.getJSON("ChainContract.json");
    App.contracts.ChainContract = TruffleContract(artifact);
    App.contracts.ChainContract.setProvider(App.web3Provider);
    let instance = await App.contracts.ChainContract.deployed();
    return await App.initializePageaAndEvents(instance);
  },
  initializePageaAndEvents: async function(instance) {
    let addressField = $("#currentAddress");
    addressField.text(web3.eth.accounts[0]);
    let contractField = $("#contractAddress");
    contractField.text(instance.address);
  }
};

$(function() {
  $(window).load(function() {
    App.init();
  });
});
