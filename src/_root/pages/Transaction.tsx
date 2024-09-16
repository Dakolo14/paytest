import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Lottie from "lottie-react";
import Parrot from "@/Parrot.json";
import { Payment, columns } from "@/_root/payments/Column";
import { DataTable } from "@/_root/payments/DataTable";

async function getData(): Promise<Payment[]> {
  return [
    {
      id: "728ed52fg",
      amount: 100,
      status: "failed",
      bankName: "Standard Chartered",
    },
    {
      id: "728ed52f",
      amount: 1232300,
      status: "success",
      bankName: "Access Bank",
    },
    {
      id: "728ed52f",
      amount: 100,
      status: "success",
      bankName: "Access Bank",
    },
    {
      id: "728ed52f",
      amount: 100,
      status: "success",
      bankName: "Standard Chartered",
    },
    {
      id: "728ed52f",
      amount: 100,
      status: "pending",
      bankName: "Access Bank",
    },
    {
      id: "728ed52f",
      amount: 100,
      status: "success",
      bankName: "Standard Chartered",
    },
    {
      id: "728ed52f",
      amount: 100,
      status: "success",
      bankName: "Standard Chartered",
    },
    {
      id: "728ed52f",
      amount: 100,
      status: "success",
      bankName: "Access Bank",
    },
    {
      id: "728ed52f",
      amount: 100,
      status: "failed",
      bankName: "Standard Chartered",
    },
    {
      id: "728ed52f",
      amount: 100,
      status: "pending",
      bankName: "Standard Chartered",
    },
    {
      id: "728ed52f",
      amount: 100,
      status: "pending",
      bankName: "Ecobank",
    },
    // More sample data...
  ];
}

const Transaction = () => {
  const [transactionAdded] = useState(true);
  const [data, setData] = useState<Payment[]>([]);

  useEffect(() => {
    async function fetchData() {
      const result = await getData();
      setData(result);
    }
    fetchData();
  }, []);

  return (
    <div className="w-full my-5 px-4">
      <div className="flex flex-col items-start w-full gap-5">
        <h3 className="text-2xl font-semibold text-left w-full py-4">
          Your Transactions
        </h3>

        <div className="text-white rounded-md" style={{ marginTop: "12px", paddingBottom: "32px" }}>
          {transactionAdded ? (
            <div className="flex gap-6 flex-col flex-1 min-h-screen pb-32">
              <div className="flex flex-col items-center">
                <Lottie animationData={Parrot} loop={true} className="lg:w-[500px]" />
                <p className="mt-2 text-md text-gray-300 text-center">
                  You don’t have any active transactions. Add your card to transact on Payfly.
                </p>
              </div>
              <Link
                to="/cards"
                className="bg-white hover:bg-slate-500 text-center text-black mt-3 font-semibold py-3 px-4 rounded-md"
              >
                Add Bank Card
              </Link>
            </div>
          ) : (
            <div>
              <div>
                <DataTable columns={columns} data={data} />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Transaction;
