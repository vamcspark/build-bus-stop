
const getAllStops = () => {
     return localStorage.getItem("stops");
}

const donateToAStop = (request) => {
    return new Promise((resolve,reject) => {
        let stops = JSON.parse(localStorage.getItem("stops"));
        stops.forEach((stop) => {
            if(request.stopName === stop.name){
                stop.funds.current += Number(request.amount);
                if(stop.funds.current < 700){
                    stop.funds.required = stop.funds.target - stop.funds.current;
                }
                else {
                    stop.funds.required = 0;
                }
                stop.funds.transactions.push(request.transaction);
            }
        })
       localStorage.setItem("stops",JSON.stringify(stops));
       resolve("success");
    })
}


export const httpService = {
    getAllStops: getAllStops,
    donateToAStop: donateToAStop
}