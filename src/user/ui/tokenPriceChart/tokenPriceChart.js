import React from 'react'
import { AreaChart, XAxis, YAxis, CartesianGrid, Tooltip, Area, ResponsiveContainer  } from 'recharts';

// <Area type="monotone" dataKey="salePriceOfCurrentToken" stroke="#f14646" fillOpacity={1} fill="url(#colorSell)" />

const tokenPriceChart = ({data}) => {

  return(
    <div style={{'height': '140px'}}>
      <ResponsiveContainer>
        <AreaChart data={data} margin={{ top: 28, right: 0, left: 0, bottom: 0 }}>

          <defs>
            <linearGradient id="colorSell" x1="1" y1="0" x2="0" y2="0">
              <stop offset="5%" stopColor="#f14646" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#f14646" stopOpacity={0.25}/>
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

          <Area type="monotone" dataKey="priceOfNextToken" stroke="#12ca01" fillOpacity={1} fill="url(#colorBuy)" />


        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}

export default tokenPriceChart
