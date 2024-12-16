import { algoliasearch, SearchResponse } from "algoliasearch";

const SearchProvider = () => {
    const appID = process.env.NEXT_PUBLIC_ALGOLIA_APP_KEY;
    const apiKey = process.env.NEXT_PUBLIC_ALGOLIA_API_KEY;
    const indexName = "city";
    
    const client = algoliasearch(appID || '', apiKey || '');
    
    const searchIndex = async (search: string) => {
        if(client){
            const result = await client.search({
                requests: [
                  {
                    indexName,
                    query: search,
                  },
                ],
              });
            const res = result.results[0] as SearchResponse;
            return res.hits;
        }
    };
    return {searchIndex}
}
export default SearchProvider();