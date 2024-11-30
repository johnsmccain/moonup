import { useEffect, useState } from "react";
import { TfiReload } from "react-icons/tfi";
import TokenCard from "./TokenCard";
import { fetchDynamicData } from "@/utils/api";
export interface IATOKENPAIR {metadataURI: String, tokeAddr: string, curveAddr: string};

const List = ({allPairsLength}: any) => {
  const [selectedOption, setSelectedOption] = useState("default");
  const [allTokens, setAllTokens] = useState<IATOKENPAIR[]>([]);

  useEffect(() => {
    if(allPairsLength > 0){
      fetchDynamicData("/curves", { params: { category: "", limit: 15 } }).then((data) => {
        setAllTokens(data.curves)
      })

    }
  }, [allPairsLength])


  return (
    <div className="flex">
      {/* Sidebar */}

      {/* Content area */}
      <div className="relative flex flex-col flex-1">
        {/*  Site header */}

        <main>
          <div className="px-3 lg:px-8 py-8 w-full max-w-9xl mx-auto z-50">
            <section className="overflow-hidden">
              <div className="">
                <div className="container md:px-4 mx-auto z-50">
                  <div className="w-full flex-col sm:flex-row gap-4 flex justify-between p-2 mb-4">
                    <div className="">
                      <label className="input input-bordered flex items-center gap-2 rounded-xl z-50">
                        <input
                          type="text"
                          className="grow text-sm z-50"
                          placeholder="Search for Token"
                        />
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 16 16"
                          fill="currentColor"
                          className="h-4 w-4 opacity-70"
                        >
                          <path
                            fillRule="evenodd"
                            d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </label>
                    </div>
                    <div className="flex items-center gap-4 z-50">
                      <select
                        className="select w-full max-w-xs rounded-lg"
                        value={selectedOption}
                        onChange={(e) => setSelectedOption(e.target.value)}
                      >
                        <option value="default" disabled>
                          Launch Time
                        </option>
                        <option value="Trading Volume">Trading Volume</option>
                        <option value="Market Cap">Market Cap</option>
                      </select>
                      <div className="border border-gray-600 rounded-lg p-3 cursor-pointer">
                        <TfiReload className="text-base font-extrabold" />
                      </div>
                    </div>
                  </div>
                  {/* <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-7"> */}
                  <div className="flex flex-wrap justify-center gap-7 ">

                    {allTokens?.map((item, id) => (
                      <TokenCard item={item} key={id}/>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            {/* Cards */}
          </div>
        </main>
      </div>
    </div>
  );
};

export default List;
