
const util = require('./utils')

const tokenBasePrice = 10
const exponentDivisor = 1000

function _nextTokenPrice(tokenSupply){

  // y = 10 + (x^2 / 10,000)
  const tokenPrice = tokenBasePrice + ( Math.pow(tokenSupply, 2) / exponentDivisor)
  return util.round(tokenPrice, 4)
}

function _purchasePrice(tokenSupply, numberOfTokensToPurchase){
  let tokens = Array(numberOfTokensToPurchase).fill('');
  let value = 0
  value = tokens.reduce((sum, token, index)=>{
    // console.log('token #' + (tokenSupply + index) + ': $' + _nextTokenPrice(tokenSupply + index))
    return sum + _nextTokenPrice(tokenSupply + index)
  }, 0)

  console.log('buy tokens - purchase price:', util.round(value, 4))
  return util.round(value, 4)
}


function _currentTokenSellPrice(tokenSupply, escrowBalance){

  const tokenPrice = escrowBalance/tokenSupply
  return util.round(tokenPrice, 4)
}

function _salePrice(tokenSupply, escrowBalance, numberOfTokensToSell) {
  return util.round(_currentTokenSellPrice(tokenSupply,escrowBalance) * numberOfTokensToSell, 4)
}

exports.nextTokenPrice = _nextTokenPrice
exports.purchasePrice = _purchasePrice
exports.currentTokenPrice = _currentTokenSellPrice
exports.salePrice = _salePrice
