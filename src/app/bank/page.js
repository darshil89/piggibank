"use client";

import Image from "next/image";
import { useState } from "react";
import axios from "axios";

const Piggybank = () => {
  const [depositAmount, setDepositAmount] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [balance, setBalance] = useState(0);
  const [bank, setBank] = useState(false);
  const [isBroken, setIsBroken] = useState(false);
  const [bankId, setBankId] = useState("");

  const handleCreateBank = async () => {
    console.log("Creating bank");
    try {
      const response = await axios.post("/api/createbank", {
        balance: 0,
        isBroken: isBroken,
      });

      if (response.status === 200) {
        setIsBroken(false);
        setBank(true);
        console.log("Bank created", response.data);
        setBankId(response.data.bank.id);
      }
    } catch (error) {
      console.error("error creating bank", error);
    }
  };

  const handleDeposit = async (e) => {
    e.preventDefault();

    try {
      if (depositAmount) {
        console.log("Depositing money", depositAmount, bankId);

        const depositmoney = await axios.post("/api/deposit", {
          amount: depositAmount,
          bankId: bankId,
        });

        if (depositmoney.status === 200) {
          const amt = parseFloat(balance) + parseFloat(depositAmount);
          setBalance(amt.toFixed(2));
          setIsModalOpen(false);
          console.log("Deposited money", depositmoney);
        }
      }

      setIsModalOpen(false);
    } catch (error) {
      console.error("error depositing money", error);
    }
  };

  const handleWithdraw = () => {
    //destroy bank
    console.log("Withdraw");
    
    setBank(false);
    setIsBroken(true);
    
  };
  return (
    <div className="flex min-h-screen flex-col  items-center  p-24">
      <div>
        <div>
          <h1 className="text-5xl text-center font-bold">Piggybank</h1>
          <p className="text-xl mt-3">Your personal savings account</p>
        </div>
        <div>
          {bank && (
            <div className="w-full flex flex-col items-center justify-center">
              <Image
                src="/images/Piggybank.jpg"
                alt="bank"
                width={200}
                height={200}
              />
            </div>
          )}

          {!bank && !isBroken && (
            <div className="w-full h-20 flex items-center justify-center">
              <button
                onClick={handleCreateBank}
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                Create Your Bank
              </button>
            </div>
          )}

          {isBroken && (
            <div className="w-full flex flex-col items-center justify-center">
              <h2 className="text-3xl font-bold mt-8">balance : {balance}</h2>

              <Image
                src="/images/brokenPiggyBank.jpg"
                alt="bank"
                width={200}
                height={200}
              />
              <button
                onClick={handleCreateBank}
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                Create new bank
              </button>
            </div>
          )}
        </div>
        {bank && (
          <div className="flex flex-row space-x-2 justify-center items-center">
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Deposit
            </button>
            <button
              onClick={handleWithdraw}
              className="bg-red-500 text-white px-4 py-2 rounded"
            >
              Withdraw
            </button>
            {/* Modal */}
            {isModalOpen && (
              <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                <div className="bg-white p-8 rounded-lg">
                  <h2 className="text-2xl font-bold mb-4">Deposit Money</h2>
                  <input
                    type="number"
                    placeholder="Enter amount"
                    className="border border-gray-300 rounded px-3 py-2 mb-4"
                    value={depositAmount}
                    onChange={(e) => setDepositAmount(e.target.value)}
                  />
                  <div className="flex justify-end">
                    <button
                      className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
                      onClick={handleDeposit}
                    >
                      Deposit
                    </button>
                    <button
                      className="bg-gray-300 text-gray-700 px-4 py-2 rounded"
                      onClick={() => setIsModalOpen(false)}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Piggybank;
