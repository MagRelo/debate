pragma solidity 0.4.18;
import './SafeMath.sol';
import './minime/MiniMeToken.sol';

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
  uint public totalCurrentFunders = 0; // Keeps track of total funders
  uint public withdrawalCounter = 0; // Keeps track of how many withdrawals have taken place
  uint public sunsetWithdrawDate;
  uint public sunsetWithdrawalPeriod;

  MiniMeToken public tokenContract;
  MiniMeTokenFactory public tokenFactory;

  address owner;
  bool ownerCanBurn;
  bool ownerCanSpend;
  uint tokenBasePrice;
  uint tokenPriceExponent;
  uint tokenPriceExponentDivisor;

  uint public contractStartTime; // For accounting purposes

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
    uint tokenPriceExponentDivisorInit,
    uint sunsetWithdrawPeriodInit) public {

    sunsetWithdrawalPeriod = sunsetWithdrawPeriodInit;

    owner = ownerAddress;
    ownerCanBurn = ownerCanBurnInit;
    ownerCanSpend = ownerCanSpendInit;
    tokenBasePrice = tokenBasePriceInit;
    tokenPriceExponent = tokenPriceExponentInit;
    tokenPriceExponentDivisor = tokenPriceExponentDivisorInit;

    uint8 tokenDecimals = 10;
    tokenFactory = new MiniMeTokenFactory();
    tokenContract = tokenFactory.createCloneToken(0x0, 0, "test", 18, "tst", true );

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

  // Contract options
  modifier canBurn() {
    require(ownerCanBurn);
    _;
  }
  modifier canSpend() {
    require(ownerCanSpend);
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

    /* value must be greater than buy price*/
    require(msg.value >= calculateNextBuyPrice(tokenBasePrice));

    // Only increase total funders when we have a new funder
    if(!isFunder(msg.sender)) {
      totalCurrentFunders = totalCurrentFunders.add(1); // Increase total funder count

      funders[msg.sender] = Funder({
        exists: true,
        tokenCount: 1,
        totalPurchasePrice: msg.value
      });
    }
    else {
      funders[msg.sender].tokenCount = funders[msg.sender].tokenCount + 1;
      funders[msg.sender].totalPurchasePrice = funders[msg.sender].totalPurchasePrice + msg.value;
    }

    // update token ledger escrow balance
    // update token count and prices
    // record transaction
    Buy(msg.sender, funders[msg.sender].tokenCount);
  }

  /*
  * Sell: exchange tokens for ETH
  */

  function sell() public onlyWhenLive onlyByFunder {

    /* Must be greater than buy price*/
    /*require(msg.value <= funders[msg.sender].tokenCount);*/

    // Only increase total funders when we have a new funder
    if(!isFunder(msg.sender)) {

      // get sender token count
      // update ledger

      // remove founder if count == 0
      totalCurrentFunders = totalCurrentFunders.sub(1); // Decrease total funder count

      // update total token count
      // record transaction
      Sell(msg.sender, funders[msg.sender].tokenCount);

    }
    else {
      /* Throw Error*/
    }

  }

  /*
  * Burn: delete tokens without affecting escrow balance
  */

  function burn() public onlyWhenLive onlyByOwner canBurn {


    Burn(msg.sender, 10);
  }

  /*
  * Burn: delete tokens without affecting escrow balance
  */

  function spend() public onlyWhenLive onlyByOwner canSpend {


    Drain(10);
  }

  // Pure functions

  /*
  * use pricing function to determine next token's 'buy' price
  */
  function calculateNextBuyPrice(uint tokenPrice) public  returns (uint){

    // do more math here
    return tokenPrice;
  }

  /*
  * use pricing function to determine the current token 'sell' price
  */
  function calculateNextSellPrice(uint total, uint supply) public returns (uint){

    // escrow balance / token supply
    return total.div(supply).mul(10).div(100);
  }

  // Getter functions

  /*
  * To calculate the refund amount we look at how many times the owner
  * has withdrawn since the funder added their funds.
  * We use that deduct 10% for each withdrawal.
  */

  function getOwner() public returns (address) {
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

  // State changing functions
  function setTokenBasePrice(uint amount) external onlyByOwner {
    require(amount > 0);
    tokenBasePrice = amount;
  }

  /* --- Sunsetting --- */
  /*
  * The owner can decide to stop using this contract.
  * They use this sunset function to put it into sunset mode.
  * The owner can then swipe rest of the funds after a set time
  * if funders have not withdrawn their funds.
  */

  function sunset() external onlyByOwner onlyWhenLive {
    sunsetWithdrawDate = now.add(sunsetWithdrawalPeriod);
    live = false;

    Sunset(true);
  }

  function swipe(address recipient) external onlyWhenSunset onlyByOwner {
    require(now >= sunsetWithdrawDate);

    recipient.transfer(this.balance);
  }

  /* --- Token Contract Forwarding Controller Functions --- */
  /*
  * Allows owner to call two additional functions on the token contract:
  * claimTokens
  * enabledTransfers
  *
  */
  function tokenContractClaimTokens(address _token) onlyByOwner public {
    tokenContract.claimTokens(_token);
  }
  function tokenContractEnableTransfers(bool _transfersEnabled) onlyByOwner public {
    tokenContract.enableTransfers(_transfersEnabled);
  }
}
