export const priceOnThisOTF = (priceHour,expectedTime)=>{
    return ((priceHour*expectedTime)/60).toFixed(3)

}