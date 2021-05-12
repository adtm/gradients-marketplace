const gradientBackground = ({ left, right }: { left: string, right: string }) => {
  return { background: `linear-gradient(135deg, ${left} 0%, ${right} 100%)` }
}

export {
  gradientBackground
}