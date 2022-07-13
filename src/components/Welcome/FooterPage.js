const FooterPage = () => {
    return(
        <footer className="footer" 
        style={{fontSize: "30px", display: "block", textAlign: "center", paddingLeft: "100px", paddingTop: "50px"}}>
            <div>
                <a href="https://www.google.com" target="_blank"><i className="fa-brands fa-facebook"></i></a>
                <a href="https://github.com/nashtech-rookies/Java-Rookies-B5/tree/Tran_Hai_Duong" target="_blank"><i
                        className="fa-brands fa-github" style={{color: "black"}}></i></a>
                <a href="https://www.youtube.com" target="_blank">
                    <i className="fa-brands fa-youtube" style={{color: "red"}}></i></a>
            </div>
            <div id="footer-text">Copyright <i className="fa-solid fa-copyright"></i> 2022 by Hai Duong</div>
        </footer>
    );
}

export default FooterPage;