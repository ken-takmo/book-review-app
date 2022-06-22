export const UseFetch = () => {

    const fetchdata = async(url,method,headers,body) =>{
        const baseUrl = "https://api-for-missions-and-railways.herokuapp.com"
        const res = await fetch(baseUrl + url,{
                method: method,
                headers: headers,
                body: JSON.stringify(body)
            })
        console.log("fetching");
        return res;
    }

    const fetchRes = (res,successAction,result) => {
        switch(res.status){
            case 200:
                successAction();
                break;
            case 403:
            case 400:
                alert(result.ErrorMessageJP)
                break;
            case 500:
                alert(result.ErrorMessageJP)
                break;
            default:
                break;
        }
    }
    return {fetchdata,fetchRes};
}