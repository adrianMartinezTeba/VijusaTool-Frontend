// export const priceOnThisOTF = (priceHour,expectedTime)=>{
//     return ((priceHour*expectedTime)/60).toFixed(3)

// }
export const priceOnThisOTF = (priceHour, expectedTimeInSeconds) => {
    return ((priceHour * expectedTimeInSeconds) / 3600).toFixed(3);
  };
  