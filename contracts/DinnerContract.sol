pragma solidity ^0.5.0;

contract DinnerContract {
    
    struct Partcipent {
        uint id;
        bool isComing;
        string name;
        address pAddress;
    }

    mapping(address => Partcipent) persons;

    Partcipent[10] public participents;

    uint public currentNoOfParticipents;

    constructor() public {
        participents[0] = Partcipent(1, true, "Organzier", msg.sender);
        currentNoOfParticipents = 1;
    }

    function getPartcipents() public view returns (address[10] memory) {
        address[10] memory list;
        uint j = 0;
        for(uint i = 0; i < 10 && (participents[i].pAddress != 0x0000000000000000000000000000000000000000 ); i++) {
            list[j++] = participents[i].pAddress;
        }
        return list;
    }

    function updateParticipentState(string memory name, bool isComing) public {
        require(isComing && currentNoOfParticipents < 10, "No Seats left");
        participents[currentNoOfParticipents - 1] = Partcipent(++currentNoOfParticipents,isComing, name, msg.sender);
    }

    
}