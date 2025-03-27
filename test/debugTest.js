const { expect } = require("chai");

describe("Voting System", function () {
    let Voting, voting, owner, voters, nonVoter;

    beforeEach(async function () {
        [owner, ...voters] = await ethers.getSigners();
        nonVoter = voters[20]; // Outside allowed 20 voters
        const allowedVoters = voters.slice(0, 20).map(voter => voter.address);

        Voting = await ethers.getContractFactory("Voting");
        voting = await Voting.deploy(allowedVoters);
        await voting.deployed();
    });

    it("Should register 4 candidates", async function () {
        for (let i = 1; i <= 4; i++) {
            const candidate = await voting.getCandidate(i);
            expect(candidate[0]).to.equal(i);
        }
    });

    it("Should allow only registered voters to vote", async function () {
        await voting.connect(voters[0]).vote(1);
        const candidate = await voting.getCandidate(1);
        expect(candidate[2]).to.equal(1);
    });

    it("Should prevent double voting", async function () {
        await voting.connect(voters[0]).vote(1);
        await expect(voting.connect(voters[0]).vote(1)).to.be.revertedWith("You have already voted");
    });

    it("Should prevent unregistered voters from voting", async function () {
        await expect(voting.connect(nonVoter).vote(1)).to.be.revertedWith("You are not an allowed voter");
    });
});