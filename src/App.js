
import lottery from './lottery'; 
import { Component } from 'react';
import web3 from './web3';


class App extends Component{
  
  // constructor(props){
  //   super(props);

  //   this.state = {manager:''}; 
  // }

  state = {
    manager:'',
    players: [],
    balance:'',
    value:'',
    message:''

  };//this code is 100% equivalent to the code above on line 10 constr.

  async componentDidMount(){

    const manager = await lottery.methods.manager().call();

    const players = await lottery.methods.getPlayers().call();

    const balance = await web3.eth.getBalance(lottery.options.address);//balance of the contract


    this.setState({manager,players, balance});

    web3.eth.personal.unlockAccount("0x63E7F4b5841A34D55185e2658f7E27ea9cCA48df", "Paas@2910", 600)
      .then(console.log('Account unlocked!'));
  }
 
  onEnter = async event => {

    event.preventDefault();

    const accounts = await web3.eth.getAccounts();

    this.setState({ message: 'Waiting on the transaction success...'});

    //this takes 15 to 20 sec to get processed
    //error in this 3 lines
    await lottery.methods.enter().send({
        from: accounts[0],
        value: web3.utils.toWei(this.state.value, 'ether')
    });

    this.setState({message: 'You have been Entered!'});
  };
  
  onClick = async () =>{

    const accounts = await web3.eth.getAccounts();

    this.setState({message: 'Picking a Winner!'});

    //error in this 3 lines
    await lottery.methods.pickWinner().send({
      from: accounts[0]
    });

    this.setState({message: 'The Winner is: '});
  }

  render(){
    return (
      <div>
        <h2>Lottery Smart Contract</h2>
        <p>
          This Contract is Managed By {this.state.manager}.
        </p>
        <p>
          There are currently {this.state.players.length} people entered,
          competing to win {web3.utils.fromWei(this.state.balance,'ether')} Ether!
        </p>

        <hr/>

        

        <form onSubmit={this.onEnter}>
        <h4>Try Your Luck!!!</h4>
        <div>
          <label>Amount of Ether to Enter: </label>
          <input value={this.state.value} onChange={event => this.setState({ value: event.target.value})}/ >

          

          <button>Enter</button>

        </div>
        </form>

        <hr/>

        <h4>Ready to Pick a Winner?</h4>
        <button onClick = {this.onClick}>Pick A Winner</button>

        <hr/>

        <h1>{this.state.message}</h1>
        
      </div>
    );
  };
};

export default App;
