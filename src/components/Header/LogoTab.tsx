import Link from 'next/link'
// import LogoSVG from '../../assets/svg/main-logo.svg'

const LogoTab = () => {
  return (
    <div className="header__logoTab">
      <Link href="/">
        <a>{/* <LogoSVG /> */}</a>
      </Link>
      
    </div>
  )
}

export default LogoTab
