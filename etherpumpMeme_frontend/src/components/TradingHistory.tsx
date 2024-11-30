import { useState } from "react";
import { transactions } from "../utils/transactionhistory";
import ReactPaginate from "react-paginate";

const TradingHistory = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 10;

  const totalPages = Math.ceil(transactions.length / itemsPerPage);
  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const subset = transactions.slice(startIndex, endIndex);

  const handlePageChange = (selectedPage:  { selected: number }) => {
    setCurrentPage(selectedPage.selected);
  };

  return (
    <div className="p-6 mb-10 bg-gray-900  rounded-xl">
      <h4 className="text-lg text-gray-100 font-bold mb-6">Trading History</h4>
      <div className="w-full mt-6 pb-4 overflow-x-scroll">
        <table className="w-full min-w-max">
          <thead>
            <tr className="text-left">
              <th className="p-0">
                <div className="py-3 px-6 rounded-l-xl bg-gray-800">
                  <span className="text-base text-gray-300 font-semibold">
                    Account
                  </span>
                </div>
              </th>
              <th className="p-0">
                <div className="py-3 px-6 bg-gray-800">
                  <span className="text-base text-gray-300 font-semibold">
                    Type
                  </span>
                </div>
              </th>
              <th className="p-0">
                <div className="py-3 px-6 bg-gray-800">
                  <span className="text-base text-gray-300 font-semibold">
                    ETH
                  </span>
                </div>
              </th>
              <th className="p-0">
                <div className="py-3 px-6 bg-gray-800">
                  <span className="text-base text-gray-300 font-semibold">
                    Token
                  </span>
                </div>
              </th>
              <th className="p-0">
                <div className="py-3 px-6 bg-gray-800">
                  <span className="text-base text-gray-300 font-semibold">
                    Date
                  </span>
                </div>
              </th>
              <th className="p-0">
                <div className="py-3 px-5 rounded-r-2xl bg-gray-800">
                  <span className="text-sm text-gray-300 font-bold">
                    Transaction
                  </span>
                </div>
              </th>
            </tr>
          </thead>

          <tbody>
            {subset.map((transaction, index) => (
              <tr key={index}>
                <td className="p-0">
                  <div className="h-16 p-6">
                    <h5 className="text-sm font-bold text-blue-300">
                      {transaction.Account}
                    </h5>
                  </div>
                </td>
                <td className="p-0">
                  <div className="h-16 p-6">
                    <span
                      className={`text-sm font-bold ${
                        transaction.Type === "Buy"
                          ? "text-blue-400"
                          : "text-pink-600"
                      }`}
                    >
                      {transaction.Type}
                    </span>
                  </div>
                </td>
                <td className="p-0">
                  <div className="h-16 p-6">
                    <span className="text-sm font-sem1 text-gray-200">
                      {transaction.ETH}
                    </span>
                  </div>
                </td>
                <td className="p-0">
                  <div className="h-16 p-6">
                    <span className="text-sm font-medium text-gray-200">
                      {transaction.Token}
                    </span>
                  </div>
                </td>
                <td className="p-0">
                  <div className="h-16 p-6">
                    <span className="text-sm text-gray-100 font-medium">
                      {transaction.Date}
                    </span>
                  </div>
                </td>
                <td className="p-0">
                  <div className="h-16 p-6">
                    <span className="text-sm font-bold text-blue-300">
                      {transaction.Transaction}
                    </span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="ml-4 flex justify-end p-2 text-white text-xs def_font join">
        <ReactPaginate
          pageCount={totalPages}
          onPageChange={handlePageChange}
          forcePage={currentPage}
          pageRangeDisplayed={1}
          nextLabel=">>"
          previousLabel="<<"
          containerClassName="flex"
          pageClassName="px-2 py-1 text-white"
          breakClassName="px-2 py-1"
          previousClassName="px-2 py-1 font-extrabold"
          nextClassName="px-2 py-1 font-extrabold"
          activeClassName="px-2 py-1 bg-primary text-white rounded-sm"
        />
      </div>
    </div>
  );
};

export default TradingHistory;
