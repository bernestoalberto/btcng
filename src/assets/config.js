export default
{
  result:"https://api.nicehash.com/1743289",
  stats:{
    global:{
      current:"https://api.nicehash.com/api?method=stats.global.current",
      twentyFourHour :"https://api.nicehash.com/api?method=stats.global.24h"
    },
    provider:{
      provider:"https://api.nicehash.com/api?method=stats.provider&addr=1P5PNW6Wd53QiZLdCs9EXNHmuPTX3rD6hW",
      ex:"https://api.nicehash.com/api?method=stats.provider.ex&addr=17a212wdrvEXWuipCV5gcfxdALfMdhMoqh",
      payments:"https://api.nicehash.com/api?method=stats.provider.payments&addr=17a212wdrvEXWuipCV5gcfxdALfMdhMoqh",
      workers:"https://api.nicehash.com/api?method=stats.provider.workers&addr=17a212wdrvEXWuipCV5gcfxdALfMdhMoqh&algo=3",

    },
    orders:{
      get:"https://api.nicehash.com/api?method=orders.get&location=1&algo=3"

    },
    multialgo:{
      info: "https://api.nicehash.com/api?method=multialgo.info"
    },
    simplemultialgo:{
      info:"https://api.nicehash.com/api?method=simplemultialgo.info"
    }
  },
  buy:{
    "info":"https://api.nicehash.com/api?method=buy.info"
  }

}
