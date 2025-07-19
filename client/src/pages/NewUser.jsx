import Footer from '../components/Footer.jsx';
import NewProfileComponent from '../components/NewProfile.jsx';
import Header from '../components/Header.jsx';

function NewUser() {

    return(
        <div>
            <Header></Header>
            <NewProfileComponent></NewProfileComponent>
            <Footer></Footer>
        </div>
    );
}

export default NewUser