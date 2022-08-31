const IconButton = ( {icon, borderColor} : {icon: any, borderColor: string} ) => {

  return (
    <button style={{borderColor: borderColor}} className="icon-button">
      {icon}
    </button>
  )
}

export default IconButton
