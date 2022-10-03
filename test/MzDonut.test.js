const MzDountStore = artifacts.require("MzDountStore");

function tokensToWei(n) {
  return web3.utils.toWei(n, "ether");
}

contract("MzDountStore", ([deployer, user]) => {
  let storeApi;
  before(async () => {
    storeApi = await MzDountStore.new();
  });

  describe("RestockDonuts", async () => {
    it("Check donuts", async () => {
      const donuts = await storeApi.getMachineDonutBalance();
      assert.equal(donuts, 100);
    });
    it("Check Owner", async () => {
      const owner = await storeApi.owner();
      assert.equal(owner, deployer);
    });

    it("should be restockDonutBalance", async () => {
      await storeApi.restockDonutBalance(200, { from: deployer });
      const donuts = await storeApi.getMachineDonutBalance();
      assert.equal(donuts, 300);
    });
    it("should be error", async () => {
      try {
        await storeApi.restockDonutBalance(200, { from: user });
        const donuts = await storeApi.getMachineDonutBalance();
        assert.equal(donuts, 300);
      } catch (err) {
        assert.equal(
          err.message,
          "Returned error: VM Exception while processing transaction: revert only the owner can restock donuts this machine"
        );
      }
    });
  });
  describe("purchase", () => {
    before(async () => {
      await storeApi.purchase(10, {
        from: user,
        value: web3.utils.toWei("1", "ether"),
      });
    });
    it("Check user's Dounts", async () => {
      const donuts = await storeApi.getCustomerDonutBalance(user);
      assert.equal(donuts, 10);
    });
    it("Check store's Dounts", async () => {
      const donuts = await storeApi.getMachineDonutBalance();
      assert.equal(donuts, 290);
    });
  });
});
