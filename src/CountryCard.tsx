import { useState } from 'react';
import { useLocalStorage } from './LocStorHook';
import type { Countries } from './countries';
import { memo } from 'react';

type CountryCardType = {
  data: Countries;
  unId: string;
};

const CountryCardMemo = memo(function CountryCard({
  data,
  unId,
}: CountryCardType) {
  const [name, setName] = useLocalStorage('country', []);
  const [visited, isVisited] = useState<boolean>(false);
  const handleLocal = (x: string) => {
    if (!name.includes(x)) {
      setName([...name, x]);
      isVisited(true);
    }
    if (name.includes(x)) {
      setName('');
      isVisited(false);
    }
  };

  return (
    <div
      className={
        visited
          ? 'bg-indigo-300 text-black border p-4 rounded-lg hover:cursor-pointer'
          : 'bg-white text-black border p-4 rounded-lg hover:cursor-pointer'
      }
      onClick={() => handleLocal(unId)}
    >
      <div className="flex flex-row gap-3">
        <div className="flex flex-col">
          <h3 className="font-bold">{data.name.common}</h3>
          <p>Region: {data.region}</p>
          <p> Population: {Number(data.population).toLocaleString()}</p>
        </div>
        <img src={data.flags.png} alt="flag" width={120} height={50} />
      </div>
    </div>
  );
});

export default CountryCardMemo;
