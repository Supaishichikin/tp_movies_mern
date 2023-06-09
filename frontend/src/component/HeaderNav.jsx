import { Link } from 'react-router-dom';

export default function HeaderNav(){
    return <>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <Link className="navbar-brand" to="/">Home</Link>
        <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
        >
            <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
            <li className="nav-item">
                <Link className="nav-link" to="/movies">Movies</Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" to="/post-movie">Post movie</Link>
            </li>
            </ul>
        </div>
        </nav>
    </>
}