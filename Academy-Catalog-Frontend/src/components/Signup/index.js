import SignupForm from './SignupForm';
import './index.css';
import HeaderBefore from '../common/HeaderBefore/HeaderBefore';
import FooterBefore from '../common/FooterBefore/FooterBefore';

function Signup() {
    return (
      <div className="App">
         <HeaderBefore/>
          <SignupForm Signup={Signup}/>
          <FooterBefore/>
      </div>
    );
  }
  
  export default Signup;