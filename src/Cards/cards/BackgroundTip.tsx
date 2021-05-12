import React from 'react'


interface BackgroundTipProps {
  gradientBackground: { background: string };
}

const BackgroundTip = ({ gradientBackground }: BackgroundTipProps) => (
  <div className="rounded-t-none w-full px-4 h-4 rounded-lg shadow-md" style={gradientBackground}>
  </div>
)

export default BackgroundTip;