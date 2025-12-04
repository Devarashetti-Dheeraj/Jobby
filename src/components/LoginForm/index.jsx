import {useState} from 'react';
import {useNavigate} from 'react-router'
import Cookies from 'js-cookie'
import './index.css';

function LoginForm() {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showSubmitError, setshowSubmitError] = useState(false)
    const [showError, setShowError] = useState('');

    const navigate = useNavigate();

    const onChangeUsername = (event) => {
        setUsername(event.target.value);
    }
    const onChangePassword = (event) => {
        setPassword(event.target.value);
    }

    const renderPasswordField = () => (
        <>
            <label htmlFor='password' className='label'>PASSWORD</label>
            <input type='password' id='password' className='input' placeholder='rahul@2021' value={password} onChange={onChangePassword} />
        </>
    )

    const renderUsernameField = () => (
        <>
            <label htmlFor='username' className='label'>USERNAME</label>
            <input type='text' id='username' className='input' placeholder='rahul' value={username} onChange={onChangeUsername} />
        </>
    )

    const onSubmitSuccess = jwt_token => {
        Cookies.set('jwt_token', jwt_token, {expires: 10})
        navigate('/', {replace: true})
    }

    const onSubmitFailure = error_msg => {
        setShowError(error_msg);
        setshowSubmitError(true);

    }

    const submitForm = async event => {
        event.preventDefault();
        const userDetails = {username,password};
        const aurl = `https://apis.ccbp.in/login`;
        const options = {
            method: 'POST',
            body: JSON.stringify(userDetails),
        }
        const response = await fetch(aurl,options);
        const data = await response.json()
    
        if(response.ok === true){
            onSubmitSuccess(data.jwt_token);
        }
        else{
            onSubmitFailure(data.error_msg);
        }

    }
    return (
        <div className='login-form'>
            <div className='login-box'>
                <img src='https://assets.ccbp.in/frontend/react-js/logo-img.png'
                     alt='Webiste Logo'
                     className='login-logo' 
                />                
                <form onSubmit={submitForm}>
                    <div className='input-grp'>
                        {renderUsernameField()}
                    </div>

                    <div className='input-grp'>
                        {renderPasswordField()}
                    </div>
                    <button type='submit' className='login-button'>Login</button>
                    {showSubmitError && <p className='error-msg'>{showError}</p>}
                </form>
            </div>
        </div>

    )
};

export default LoginForm;
