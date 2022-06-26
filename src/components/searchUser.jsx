import { UseFetch } from "./useFetch"
export const SearchUser = () => {

    const {fetchdata,fetchRes} = UseFetch();
    const results = [];

    const GetUserBooks = async(i) => {
        const res = await fetchdata(`/books?offset=${i}`,"get");
        const resJson = await res.Json();

        return resJson;
    }

    for(i = 0; i <= 100; i + 10) {
        const result = GetUserBooks(i);

        // const usersBook = Object.values(result).filter
        
        console.log(result);
    }
}