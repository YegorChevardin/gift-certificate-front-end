import React, {useEffect, useState} from "react";
import Confetti from "react-confetti";
import {Link} from "react-router-dom";

function Main() {
    const [confettiVisible, setConfettiVisible] = useState(true);
    const [activeParticles, setActiveParticles] = useState(100);

    const [windowResize, setWindowsResize] = useState({
        width: undefined,
        height: undefined
    });
    function handleWindowSize() {
        setWindowsResize({
            width:window.innerWidth,
            height:window.innerHeight
        })
    }

    useEffect(() => {
        window.onresize = () => handleWindowSize();

        if (confettiVisible) {
            setTimeout(() => {
                setActiveParticles(activeParticles - 10);

            }, 1000);
        }
    }, [confettiVisible, activeParticles]);

    useEffect(() => {
        if (activeParticles === 0) {
                setConfettiVisible(false);
        }
    }, [activeParticles]);

    return (
        <div id="main">
            {confettiVisible && <Confetti width={windowResize.width} height={windowResize.height} numberOfPieces={activeParticles}/>}
            <div className="container my-5">
                <div className="p-5 text-center bg-body-tertiary rounded-3 rounded rounded-4">
                    <h1 className="text-body-emphasis mb-5">Welcome to Gift Shop!</h1>
                    <p className="col-lg-8 mx-auto fs-5 text-muted">
                        Discover the perfect gift! Browse our amazing selection of gift certificates or sign in to
                        unlock exclusive deals and personalized recommendations.
                    </p>
                    <div className="d-flex flex-wrap justify-content-center align-items-center gap-2 mb-5">
                        <Link to="/gift-certificates" className="d-inline-flex align-items-center btn btn-primary btn-lg px-4 rounded-pill"
                                type="button">
                            Browse certificates!
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Main;