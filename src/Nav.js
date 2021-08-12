import React,{useState , useEffect} from 'react'
import "./Nav.css"
import { useHistory } from 'react-router-dom'

function Nav() {
    const [show, handleShow] = useState(false);
    const history = useHistory();

    const transitionNavBar = () => {
        if(window.scrollY > 100)
            handleShow(true);
        else
            handleShow(false);
    }

    useEffect(()=>{
        window.addEventListener("scroll" , transitionNavBar);
        return () => window.removeEventListener('scroll',transitionNavBar); ///clean up
    },[])

    return (
        <div className={`nav ${show && "nav__black"}`}>
            <div className="nav__contents">
                <img onClick={() => history.push("/")}
                className="nav__logo" src="http://assets.stickpng.com/images/580b57fcd9996e24bc43c529.png" alt="logo" />
                <img 
                    onClick={() => history.push("/profile")}
                className="nav__avatar" src="https://cdn4.iconfinder.com/data/icons/avatars-xmas-giveaway/128/batman_hero_avatar_comics-512.png" alt="avatar" />
            </div>
        </div>
    )
}

export default Nav
