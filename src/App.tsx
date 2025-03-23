import { useEffect, useState } from 'react';
import CountryCardMemo from './CountryCard';
import type { Countries } from './countries';
import { useMemo } from 'react';
import { useCallback } from 'react';

function App() {
  const [data, setData] = useState<Countries[]>();
  const [selectedRegion, setSelectedRegion] = useState<string>('');
  const [sortPopulation, setSortPopulation] = useState<string>();
  const [sortname, setSortName] = useState<string>();
  const [searchValue, setSearchValue] = useState<HTMLInputElement | string>();

  useEffect(() => {
    const fetchData = async () => {
      const countries = await fetch('https://restcountries.com/v3.1/all');
      const resCountries = await countries.json();
      setData(resCountries);
    };

    fetchData();
  }, []);

  const handleSelectRegion = useCallback(
    (data: Countries[]) => {
      const serachByValue = data?.filter((x) => {
        const selectByRegion =
          !selectedRegion ||
          selectedRegion === 'All regions' ||
          x.region === selectedRegion;
        const incudedSearch =
          !searchValue || x?.name?.common?.includes(searchValue as string);
        return incudedSearch && selectByRegion;
      });
      return serachByValue;
    },
    [selectedRegion, searchValue]
  );

  const requirements = useMemo(() => {
    return handleSelectRegion(data as Countries[]);
  }, [handleSelectRegion, data]);

  const handlePopulation = useCallback(() => {
    if (sortPopulation === 'Ascen') {
      const x = requirements?.sort((a, b) => a?.population - b?.population);
      return x;
    }
    if (sortPopulation === 'Descen') {
      const x = requirements?.sort((a, b) => b?.population - a?.population);
      return x;
    }
  }, [sortPopulation, requirements]);

  const handleName = useCallback(() => {
    if (sortname === 'Ascending') {
      const name2 = requirements?.sort((a, b) =>
        a.name.common.localeCompare(b?.name?.common)
      );
      return name2;
    }
    if (sortname === 'Descending') {
      const popul2 = requirements?.sort((a, b) =>
        b.name.common.localeCompare(a?.name?.common)
      );
      return popul2;
    }
  }, [requirements, sortname]);

  handlePopulation();
  handleName();

  return (
    <>
      <div>
        <div className="flex flex-col my-5 justify-self-center gap-7 ">
          <h1 className="ml-[10%]">Countries</h1>
          <div>
            <form
              className="bg-amber-50 text-neutral-950 p-3 flex flex-row gap-5"
              onChange={(event) =>
                setSearchValue((event.target as HTMLInputElement)?.value)
              }
            >
              <input type="text" className="border rounded-lg p-3" />
              <input
                type="button"
                value="Search"
                className="border p-3 rounded-lg"
              />
            </form>

            <div>
              <select
                name="Region"
                id="regionFilter"
                onChange={(e) => setSelectedRegion(e.target.value)}
              >
                <option value="All regions" className="text-black">
                  All regions
                </option>
                <option value="Antarctic" className="text-black">
                  Antarctic
                </option>
                <option value="Americas" className="text-black">
                  Americas
                </option>
                <option value="Europe" className="text-black">
                  Europe
                </option>
                <option value="Africa" className="text-black">
                  Africa
                </option>
                <option value="Asia" className="text-black">
                  Asia
                </option>
                <option value="Oceania" className="text-black">
                  Oceania
                </option>
              </select>

              <select
                name="SortingName"
                id="sortingName"
                className="text-white"
                onChange={(e) => setSortName(e.target.value)}
                onClick={handleName}
                value={sortname}
              >
                <option className="text-black">Name</option>
                <option value="Ascending" className="text-black">
                  Ascending
                </option>
                <option value="Descending" className="text-black">
                  Descending
                </option>
              </select>

              <select
                name="SortingPopulation"
                id="sortingPopulation"
                className="text-white"
                onChange={(e) => setSortPopulation(e.target.value)}
                onClick={handlePopulation}
              >
                <option className="text-black">Population</option>
                <option value="Ascen" className="text-black">
                  Ascen
                </option>
                <option value="Descen" className="text-black">
                  Descen
                </option>
              </select>
            </div>
          </div>
        </div>

        <div className="lg:grid lg:grid-cols-4 lg:gap-5 lg:mx-7 justify-self-center gap-y-3 flex flex-col w-sm md:w-auto mx-8 md:grid md:grid-cols-3 md:gap-3 xl:grid-cols-6 ">
          {data?.length === 0 ? (
            <p>No results</p>
          ) : (
            requirements?.map((x) => (
              <CountryCardMemo
                data={x}
                key={x.name.common}
                unId={x.name.common}
              />
            ))
          )}
        </div>
      </div>
    </>
  );
}

export default App;
