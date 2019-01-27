pragma solidity ^0.5.0;

contract ChainContract {

    function getMyAddress() public view returns (address) {
        return msg.sender;
    }
}