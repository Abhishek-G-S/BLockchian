const hre = require("hardhat");

async function main() {
    const deployedAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3"; 
    const voting = await hre.ethers.getContractAt("Voting", deployedAddress);

    const voterNames = "ABCDEFGHIJKLMNOPQRST".split(""); 
    const candidateNames = ["Ajay", "ABhi", "Akash", "Arjun"]; 

    const hardcodedVotes = [
        1, 1, 1, 3, 0, 1, 2, 0, 0, 1,
        2, 3, 2, 1, 3, 3, 0, 1, 2, 1
    ];

    for (let i = 0; i < voterNames.length; i++) {
        const voter = voterNames[i];
        const candidate = hardcodedVotes[i];

        try {
            await voting.vote(voter, candidate);
            console.log(`${voter} voted for ${candidateNames[candidate]}`);
        } catch (error) {
            console.error(`Error with ${voter}:`, error.reason || error.message);
        }
    }

    const votes = await voting.getVotes();

    console.log("\nFinal Vote Counts:");
    votes.forEach((voteCount, index) => {
        console.log(`${candidateNames[index]}: ${voteCount} votes`);
    });

    const winnerIndex = await voting.getWinner();
    console.log("\nWinner:", candidateNames[winnerIndex]);
}

main().catch((error) => {
    console.error(error);
    process.exit(1);
});
