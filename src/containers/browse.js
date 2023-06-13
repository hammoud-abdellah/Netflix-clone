/* eslint-disable no-nested-ternary */
import  React, { useContext, useState, useEffect } from 'react';
import Fuse from 'fuse.js';
import { FirebaseContext } from '../context/firebase';
import { SelectProfileContainer } from './profiles';
import { Card, Header, Loading } from '../components';
import * as ROUTES from '../constants/routes';
import logo from '../logo.svg';
import { FooterContainer } from './footer';
import Player from '../components/player';



export function BrowseContainer({ slides }) {

    const [category, setCategory] = useState('series');
    const [searchTerm, setSearchTerm] = useState('');
    const [profile, setProfile] = useState({});
    const [loading, setLoading] = useState(true);
    const [slideRows, setSlideRows] = useState([]);

    const { firebase } = useContext(FirebaseContext);
    const user = firebase.auth().currentUser || {};

    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 3000);
    }, [profile.displayName]);
    

    useEffect(() => {
        setSlideRows(slides[category]);
    }, [slides, category]);

    useEffect(() => {
        const fuse = new Fuse(slideRows, 
            { keys: ['data.description', 'data,title', 'data.genre'], });
        const results = fuse.search(searchTerm).map(({ item }) => item);

        if(slideRows.length > 0 && searchTerm.length > 3 
            && results.length > 0 ) {
            setSlideRows(results);
        } else {
            setSlideRows(slides[category]);
        }

    }, [searchTerm]);

    return profile.displayName ? (
        <>
            {loading ? <Loading src={user.photoURL} /> 
                :  <Loading.ReleaseBody />}
            
            
                <Header>
                <Header.Frame>
                <Header.Group>
                    <Header.Logo to={ROUTES.HOME} src={logo} alt="Netflix" />
                        
                </Header.Group>

                <Header.Group>
                    <Header.Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
                    <Header.Profile>
                        <Header.Picture src={user.photoURL} />
                        <Header.Dropdown>
                            <Header.Group>
                                <Header.Picture src={user.photoURL} />
                                <Header.TextLink>{user.displayName}</Header.TextLink>
                            </Header.Group>

                            <Header.Group>
                                <Header.TextLink onClick={() => firebase.auth().signOut()}>Sign out</Header.TextLink>
                            </Header.Group>
                        </Header.Dropdown>
                    </Header.Profile>
                </Header.Group>
            </Header.Frame>
            <Header.Banner></Header.Banner>
            </Header>
           
        </>
    ) : (
        <SelectProfileContainer user={user} setProfile={setProfile} />
    );
}

//new timestamp 7:53:08, need to work on Player test and overall performance