pragma solidity 0.4.18;
import './SafeMath.sol';

contract Servesa {
  using SafeMath for uint256;

  uint public version = 0;

  struct Funder {
    bool exists;
    uint tokenCount;
    uint totalPurchasePrice;
  }

  mapping(address => Funder) public funders;

  bool public live = true; // For sunsetting contract
  uint public sunsetWithdrawDate;
  uint public sunsetWithdrawalPeriod;
  uint public contractStartTime; // For accounting purposes

  uint public totalCurrentTokens = 0; // Keeps track of total tokens
  uint public totalCurrentFunders = 0; // Keeps track of total funders

  address owner;
  bool public ownerCanBurn = false;
  bool public ownerCanSpend = false;
  uint public tokenBasePrice = 100000000000000;
  uint public tokenPriceExponent = 1;
  uint public tokenPriceExponentDivisor = 10000;

  event NewContract(uint testOne, string testString);
  event Buy(address indexed funder, uint tokenCount);
  event Sell(address indexed funder, uint tokenCount);
  event Burn(address indexed funder, uint tokenCount);
  event Drain(uint amount);
  event Sunset(bool hasSunset);

  function Servesa (
    address ownerAddress,
    bool ownerCanBurnInit,
    bool ownerCanSpendInit,
    uint tokenBasePriceInit,
    uint tokenPriceExponentInit,
    uint sunsetWithdrawPeriodInit) public {

    owner = ownerAddress;
    ownerCanBurn = ownerCanBurnInit;
    ownerCanSpend = ownerCanSpendInit;
    tokenBasePrice = tokenBasePriceInit;
    tokenPriceExponent = tokenPriceExponentInit;

    sunsetWithdrawalPeriod = sunsetWithdrawPeriodInit;
    contractStartTime = now;

    NewContract(12900, 'test message ground control');
  }

  // Modifiers

  // Lifecycle
  modifier onlyWhenLive() {
    require(live);
    _;
  }
  modifier onlyWhenSunset() {
    require(!live);
    _;
  }

  // Auth
  modifier onlyByOwner() {
    require(msg.sender == owner);
    _;
  }
  modifier onlyByFunder() {
    require(isFunder(msg.sender));
    _;
  }

  // Contract options
  modifier canBurn() {
    require(ownerCanBurn);
    _;
  }
  modifier canSpend() {
    require(ownerCanSpend);
    _;
  }

  /*
  * External accounts can pay directly to contract to fund it.
  */
  function () payable public {
    buy();
  }

  /*
  * Buy: exchange ETH for tokens
  */
  function buy() public payable onlyWhenLive {

    // msg.value must be greater than buy price
    uint price = calculateNextBuyPrice();
    require(msg.value >= price);

    // Update funders array
    if(!isFunder(msg.sender)) {
      totalCurrentFunders = totalCurrentFunders.add(1); // Increase total funder count

      funders[msg.sender] = Funder({
        exists: true,
        tokenCount: 1,
        totalPurchasePrice: msg.value
      });
    }
    else {
      funders[msg.sender].tokenCount = funders[msg.sender].tokenCount.add(1);
      funders[msg.sender].totalPurchasePrice = funders[msg.sender].totalPurchasePrice.add(price);
    }

    // increment token count
    totalCurrentTokens = totalCurrentTokens.add(1);

    // refund overage
    msg.sender.transfer(msg.value.sub(price));

    // event
    Buy(msg.sender, funders[msg.sender].tokenCount);
  }

  /*
  * Sell: exchange tokens for ETH
  */
  function sell() public onlyWhenLive onlyByFunder {

    uint amount = calculateNextSellPrice();

    // decrease seller's token count
    funders[msg.sender].tokenCount = funders[msg.sender].tokenCount.sub(1);

    // decrement token count
    totalCurrentTokens = totalCurrentTokens.sub(1);

    // remove founder if count == 0
    if(funders[msg.sender].tokenCount == 0){
        delete funders[msg.sender];
        totalCurrentFunders = totalCurrentFunders.sub(1);
    }

    // Interaction
    msg.sender.transfer(amount);

    // event
    Sell(msg.sender, funders[msg.sender].tokenCount);
  }

  /*
  * Burn: delete tokens without affecting escrow balance
  */
  function burn(address addr) public onlyWhenLive onlyByOwner canBurn {

    // addr must be funder
    require(isFunder(addr));

    // decrease targets's token count
    funders[addr].tokenCount = funders[addr].tokenCount.sub(1);

    // remove target if count == 0
    if(funders[addr].tokenCount == 0){
        delete funders[addr];
        totalCurrentFunders = totalCurrentFunders.sub(1);
    }

    // decrement token count
    totalCurrentTokens = totalCurrentTokens.sub(1);

    // event
    Burn(addr, 1);
  }

  /*
  * Spend: remove balance
  */
  function spend(uint amount) public onlyWhenLive onlyByOwner canSpend {

    // send amount from contract to owner
    msg.sender.transfer(amount);

    // event
    Drain(amount);
  }



  // Pure functions
  function fracExp(uint k, uint q, uint n, uint p) internal pure returns (uint) {
    uint s = 0;
    uint N = 1;
    uint B = 1;
    for (uint i = 0; i < p; ++i){
      s += k * N / B / (q**i);
      N  = N * (n-i);
      B  = B * (i+1);
    }
    return s;
  }

  /*
  * use pricing function to determine next share's 'buy' price
  */
  function calculateNextBuyPrice() public view returns (uint){

    if(tokenPriceExponent == 1){
        return tokenBasePrice;
    } else {
        return fracExp(tokenBasePrice, 618046, totalCurrentTokens, 2);
    }
  }

  /*
  * use pricing function to determine the current share 'sell' price
  */
  function calculateNextSellPrice() public view returns (uint){

    // escrow balance / token supply
    return SafeMath.div(this.balance, totalCurrentTokens);
  }

  // Getter functions
  function getOwner() public view returns (address) {
    return owner;
  }

  function getCurrentTotalFunders() public constant returns (uint) {
    return totalCurrentFunders;
  }

  function getContractBalance() public constant returns (uint256 balance) {
    balance = this.balance;
  }

  function isFunder(address addr) public constant returns (bool) {
    return funders[addr].exists;
  }

  function isFunderTokens(address addr) public constant returns (uint256) {
    return funders[addr].tokenCount;
  }

  function isFunderPurchase(address addr) public constant returns (uint256) {
    return funders[addr].totalPurchasePrice;
  }

}
