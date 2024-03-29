import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { FirebaseContext } from '../context/firebase';
import { HeaderContainer } from '../containers/header';
import { FooterContainer } from '../containers/footer';
import { Form } from '../components';
import * as ROUTES from '../constants/routes';

export default function Signup() {
    const history = useHistory();
    const { firebase } = useContext(FirebaseContext);
    const [firstName, setFirstName] = useState('');
    const [emailAddress, setEmailAddress] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const isInvalid = firstName === '' || password === '' || emailAddress === '';

    const handleSignup = async (event) => {
        event.preventDefault();
      
        try {
          // Do Firebase signup
          const result = await firebase
            .auth()
            .createUserWithEmailAndPassword(emailAddress, password);
      
          // Send email verification
          await result.user.sendEmailVerification({
            url: "https://netflix-clone-rho-ashy.vercel.app/",
          });
          alert("Un email de vérification a été envoyé à votre adresse. Veuillez vérifier votre boîte de réception.")
            // Update display name
          await result.user.updateProfile({
            displayName: firstName,
            photoURL: Math.floor(Math.random() * 5) + 1,
          });

          if (result.user.emailVerified){
           history.push(ROUTES.BROWSE);
          }
          else {
            setError("Veuillez vérifier votre e-mail avant de vous connecter.");
            console.log("Veuillez vérifier votre e-mail avant de vous connecter.");
          }
        } 
    
        catch (error) {
          setFirstName('');
          setEmailAddress('');
          setPassword('');
          setError(error.message);
        }
      };
    return (
    
    <>
    
        <HeaderContainer>
            <Form>
                <Form.Title>Sign up</Form.Title>
                {error && <Form.Error>{error}</Form.Error>}
                
                <Form.Base onSubmit={handleSignup} method="POST">
                    <Form.Input 
                        placeholder="Enter your name" value={firstName}
                        onChange={({ target }) => setFirstName(target.value)}
                    />

                    <Form.Input 
                        placeholder="Email address" value={emailAddress}
                        onChange={({ target }) => setEmailAddress(target.value)}
                    />

                    <Form.Input 
                        type="password" placeholder="Password" autoComplete="off"
                        value={password} onChange={({ target }) => setPassword(target.value)}
                    />

                    <Form.Submit disabled={isInvalid} type="submit">
                        Sign Up
                    </Form.Submit>

                    <Form.Text>
                        Already a user? <Form.Link to="/signin">Sign in now</Form.Link>
                    </Form.Text>

                    <Form.TextSmall>
                        This page is protected by Google reCAPTCHA to ensure you're not a bot. Learn more.
                    </Form.TextSmall>
                    {/* <Form.TextSmall>
                        Please check your email to verify your account before signing in.
                    </Form.TextSmall> */}
                </Form.Base>
            </Form>
        </HeaderContainer>
        <FooterContainer />
    </>    
    );
}