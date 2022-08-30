const MainButton = ( {label, color, border} : {label: string, color: string, border: string} ) => {

  return (
    <button style={{background: color, border: border }} className="main-button section__secondary-text--white">
      {label}
    </button>
  )
}

export default MainButton
