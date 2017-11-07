import React from 'react'
import { AreaChart, XAxis, YAxis, CartesianGrid, Tooltip, Area, ResponsiveContainer  } from 'recharts';



const tokenPriceChart = ({data}) => {

  return(
    <div style={{'height': '140px', 'width': '300px'}}>
      {!data || !data.length ?
        null
        :
        <ResponsiveContainer>
          <AreaChart data={data} margin={{ top: 28, right: 0, left: 0, bottom: 0 }}>

            <defs>
              <linearGradient id="colorSell" x1="1" y1="0" x2="0" y2="0">
                <stop offset="5%" stopColor="#fcd036" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#fcd036" stopOpacity={0.25}/>
              </linearGradient>
              <linearGradient id="colorBuy" x1="1" y1="0" x2="0" y2="0">
                <stop offset="5%" stopColor="#12ca01" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#12ca01" stopOpacity={0.25}/>
              </linearGradient>
            </defs>

            <XAxis dataKey="name" />
            <YAxis />
            <CartesianGrid strokeDasharray="3 3" />
            <Tooltip />

            <Area type="monotone" dataKey="buyPrice" stroke="#12ca01" fillOpacity={1} fill="url(#colorBuy)" />
            <Area type="monotone" dataKey="sellPrice" stroke="#fcd036" fillOpacity={0} fill="url(#colorSell)" />

          </AreaChart>
        </ResponsiveContainer>
      }

    </div>
  )
}

export default tokenPriceChart
