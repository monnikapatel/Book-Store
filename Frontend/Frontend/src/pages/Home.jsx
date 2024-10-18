import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import { MdOutlineAddBox } from 'react-icons/md';
import Footer from '../components/Footer';


const Home = () => {
    return (
        <div className='h-screen grid content-between'>
            <div className="text-center text-white py-3 bg-sky-800 border-y-2 border-sky-900">
                <Link to='/table' className="text-4xl font-bold hover:font-extrabold hover:text-rose-200 mx-3 my-auto">
                    Book Store
                </Link>
            </div>
            <div className="d-flex align-items-center justify-content-center px-5">
                <div >
                    <h1 className="text-5xl font-bold ">
                        Create your <br /> own BOOK LIST...
                    </h1>
                    <h1 className="text-lg my-3">
                        Make your studies interesting... <br />
                        Create a relaxed study environment... <br />
                        Make your plan... <br />
                        Achieve your GOALS... <br />
                    </h1>
                    <div className="grid justify-between">
                        <span className="text-base font-bold text-sky-700">
                            CREATE BOOK LIST...
                        </span>
                        <Link to='/books/create'>
                            <MdOutlineAddBox className="text-sky-700 text-4xl hover:text-sky-800 hover:text-5xl" />
                        </Link>
                    </div>
                </div>
            </div>
            {/* <div className="fixed-bottom"> */}
            <Footer />
            {/* </div> */}
        </div>
    )
}

export default Home