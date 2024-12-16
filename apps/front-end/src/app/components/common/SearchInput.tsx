'use client'

import SearchProvider from '@/libs/SearchProvider';
import React, { useEffect, useState } from 'react'

type SearchInputProp = {
    onCityPicked: (city: string) => void;
}

const SearchInput = ({onCityPicked} : SearchInputProp) => {
    const [listResult, setListResult] = useState<string[]>([]);
    const [searchQuery, setSearchQuery] = useState('')
    
    useEffect(() => {
        const searchCity = async (city: string) => {
            const result = await SearchProvider.searchIndex(city);
            if(result){
                const names = result.map(value => value.name as string);
                setListResult(names)
            }
        };
        if(searchQuery.length > 0){
            searchCity(searchQuery);
        }
    }, [searchQuery])

    const pickCity = (city: string) => {
        onCityPicked(city);
        clearQuery();
    };

    const onSearchQuery = (q: string) => {
        setSearchQuery(q);
        if(!q)
            clearQuery();
    };

    const clearQuery = () => {
        setListResult([]);
        setSearchQuery('')
    }

    return (
    <div 
        className='flex-grow max-w-xs lg:max-w-lg lg:text-xl relative space-y-2'>
        <input
            value={searchQuery}
            className='p-2 rounded text-white bg-[#282828] border w-full'
            onChange={(e) => onSearchQuery(e.target.value)}
            type='text' placeholder='Search City'/>
        {
            listResult.length > 0 &&  
            <div className='absolute p-2 bg-gray-200 text-black w-full space-y-4 rounded max-h-[220px] overflow-auto'>
            {
                listResult.map((result, index) => 
                <button
                    onClick={() => pickCity(result)} 
                    key={index} 
                    className='hover:bg-black hover:text-white cursor-pointer border-b p-2 rounded block w-full text-start'>
                    {result}
                </button>
                )
            }
        </div>
        }
    </div>
  )
}

export default SearchInput