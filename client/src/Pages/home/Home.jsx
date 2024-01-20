import {Link} from 'react-router-dom'

import './home.css'

const Home = () => {
  return (
    <div>
        Home <br />
        <Link to="/app1">App One</Link>
        <br />
        <Link to="/app2">App Two</Link>
    </div>
  )
}

export default Home