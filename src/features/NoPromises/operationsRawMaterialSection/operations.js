export const priceOnThisRawMaterial = (totalCuts,priceCut) =>{
const price = totalCuts*priceCut
return price
}

export const priceCut = (lengthCut,priceMetro) =>{
    const price = (lengthCut*priceMetro)/1000
    return price
}