import React from 'react';
import { HistoryDetails } from '../interfaces/interfaces';
import { Transaction } from '../interfaces/interfaces';

interface TransactionsScreenProps {
  walletDetails: HistoryDetails;
}

const TransactionsScreen: React.FC<TransactionsScreenProps> = ({ walletDetails }) => {
  return (
    <div className="w-full p-5 flex">
      <div className="tbox pt-20 h-full w-full">
        <p className="ttitle text-[20px]">Transactions for {walletDetails.address}</p>
        <div className="tcount ml-5 mt-11 text-[12px] text-[#ADABAA]">
          Total Transactions - {walletDetails.transactions.length}
        </div>
        <div className="endline"></div>
        <div className="overflow-x-auto">
          <table className="ttable table-fixed min-w-full mt-5">
            <thead>
              <tr className="text-[#7E7D7D] text-[12px] mb-10">
                <th className="theader text-left">Transaction Hash</th>
                <th className="theader text-left">Block Height</th>
                <th className="theader text-left">Total Amount</th>
              </tr>
            </thead>
            <tbody>
              {walletDetails.transactions.length > 0 ? (
                walletDetails.transactions.map((tx, index) => (
                  <tr
                    key={index}
                    className="bg-[#161C23] text-[#ADABAA] text-[12px]"
                  >
                    <td className="p-4">
                      <div>
                        <p>{tx.hash}</p>
                      </div>
                    </td>
                    <td>{tx.block_height}</td>
                    <td>{tx.total} satoshis</td>
                  </tr>
                ))
              ) : (
                <tr className="bg-[#161C23] text-[#ADABAA] text-[12px]">
                  <td colSpan={3} className="text-center py-4">
                    No Transactions Found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TransactionsScreen;
