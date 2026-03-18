import React from 'react'

const ScoreCircle = ({score='100',outOFF='100'}) => {
    const radius=22;
    const circumference=2*Math.PI*radius;
    const progress=score/100;
    const offset=circumference*1*progress;

  return (
    
    <div className='relative w-14 h-14'>
     
         <svg className="w-14 h-14 rotate-[-90deg]">

        {/* background circle */}
        <circle
          cx="28"
          cy="28"
          r={radius}
          stroke="#374151"
          strokeWidth="4"
          fill="transparent"
        />

        {/* progress circle */}
        <circle
          cx="28"
          cy="28"
          r={radius}
          stroke="#22c55e"
          strokeWidth="4"
          fill="transparent"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
        />

      </svg>
      {/* text */}
      <span className='absolute inset-0 flex items-center justify-center text-white text-sm font-bold'>{Math.round(score/outOFF*100)}%</span>
    </div>
  )
}

export default ScoreCircle