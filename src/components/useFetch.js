export const UseFetch = () => {

    const fetchdata = async(url,method,headers,body) =>{
        const baseUrl = "https://api-for-missions-and-railways.herokuapp.com"
        const res = await fetch(baseUrl + url,{
                method: method,
                headers: headers,
                body: JSON.stringify(body)
            })
        return res;
    }

    const fetchRes = (res,successAction, error400_403Action,result) => {
        switch(res.status){
            case 200:
                successAction();
                break;
            case 403:
            case 400:
                error400_403Action();
                break;
            case 500:
            case 503:    
                alert(result.ErrorMessageJP)
                break;
            default:
                break;
        }
    }
    return {fetchdata,fetchRes};
}