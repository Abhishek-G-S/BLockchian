// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Voting {
    string[4] public candidates = ["Ajay", "Alice", "Akash", "Arjun"];

    mapping(string => bool) public voters; // Tracks if a voter has voted
    uint[4] public votes; // Tracks votes for each candidate

    constructor() {
        // Initialize keys 'A' to 'T' with 'false'
        bytes1 start = 'A';
        for (uint i = 0; i < 20; i++) {
            voters[string(abi.encodePacked(start))] = false;
            start = bytes1(uint8(start) + 1); // Move to the next character
        }
    }

    function vote(string memory voterID, uint candidateIndex) public {
        require(bytes(voterID).length == 1, "Voter ID must be a single character.");
        require(
            bytes(voterID)[0] >= 'A' && bytes(voterID)[0] <= 'T',
            "Voter ID must be between 'A' and 'T'."
        );
        require(!voters[voterID], "Voter has already voted.");
        require(candidateIndex < 4, "Invalid candidate index.");

        voters[voterID] = true;
        votes[candidateIndex]++;
    }

    function getVotes() public view returns (uint[4] memory) {
        return votes;
    }

    function getWinner() public view returns (uint256) {
        uint256 maxVotes = 0;
        uint256 winnerIndex = 0;

        for (uint256 i = 0; i < candidates.length; i++) {
            if (votes[i] > maxVotes) {
                maxVotes = votes[i];
                winnerIndex = i;
            }
        }

        return winnerIndex;
    }
}
