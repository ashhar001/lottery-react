import Web3 from 'web3';

const web3 = new Web3(window.web3.currentProvider);//copyof web3 ie coming frm metamask library
//currentProvider is preconfigured to rinkeby Tnw and has access to all of our
//account addresses and public keys and private keys all thing we possibly want

export default web3;