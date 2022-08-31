import Logo from './Logo'
import Navbar from './Navbar'

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="container footer__container">
        <Logo/>
        <Navbar/>
      </div>
    </footer>
  )
}

export default Footer
