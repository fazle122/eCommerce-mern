

export default function Footer(){
    const currentYear = new Date().getFullYear();

    return (
        <footer>
            <div className="text-center">
                <p>E-Commerce &copy; {currentYear}</p>
            </div>
        </footer>
    )
}