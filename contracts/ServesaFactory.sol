pragma solidity 0.4.18;
import './Servesa.sol';

/*name: this.state.name,
avatarUrl: this.state.avatarUrl,
wordArray: this.props.searchWords,
ownerCanBurn: this.state.ownerCanBurn,
ownerCanDrain: this.state.ownerCanDrain,
tokenBasePrice: 10,
exponent: 2,
exponentDivisor: 10000*/

contract ServesaFactory {
  uint public contractCount;
  mapping(address => address[]) public contracts;

  function newContract(
    address ownerAddress,
    bool ownerCanBurn,
    bool ownerCanSpend,
    uint tokenBasePrice,
    uint tokenPriceExponent,
    uint tokenPriceExponentDivisor,
    uint sunsetWithdrawPeriod) public returns (address newAddress) {

    Servesa contractId = new Servesa(
      ownerAddress,
      ownerCanBurn,
      ownerCanSpend,
      tokenBasePrice,
      tokenPriceExponent,
      tokenPriceExponentDivisor,
      sunsetWithdrawPeriod
    );

    contracts[msg.sender].push(contractId);
    contractCount += 1;

    return contractId;
  }

  function getContractAddress() public constant returns (address[]) {
    return contracts[msg.sender];
  }
}
