import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import ProtectedRoute from '../components/ProtectedRoute';
import * as auth from '../utils/auth';
import { useNavigate } from 'react-router-dom';
import InfoTooltip from './InfoTooltip';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import Header from './Header';
import Main from './Main';
import api from '../utils/api';
import Footer from './Footer';
import ImagePopup from './ImagePopup';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import ConfirmDeletePopup from './ConfirmDeletePopup';

const App = () => {
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] =
    React.useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] =
    React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);

  const [isPreviewPlacePopupOpen, setIsPreviewPlacePopupOpen] =
    React.useState(false);

  const [isConfirmDeletePopupOpen, setIsConfirmDeletePopupOpen] =
    React.useState(false);

  const [isDataLoading, setIsDataLoading] = React.useState(false);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = React.useState(false);
  const [isSuccess, setIsSuccess] = React.useState(true);
  const [cards, setCards] = React.useState([]);
  const [selectedCard, setSelectedCard] = React.useState(null);
  const [selectedToDeleteCard, setSelectedToDeletecard] = React.useState(null);
  const [currentUser, setCurrentUser] = React.useState({});
  const [userEmail, setUserEmail] = React.useState('');
  const [loggedIn, setLoggedIn] = React.useState(false);

  const navigate = useNavigate();

  React.useEffect(() => {
    loggedIn &&
      api
        .getUserData()
        .then((res) => setCurrentUser(res))
        .catch((err) => console.log(`Error.....: ${err}`));
  }, [loggedIn]);

  React.useEffect(() => {
    loggedIn &&
      api
        .getInitialCards()
        .then(setCards)
        .catch((err) => console.log(`Error.....: ${err}`));
  }, [loggedIn]);

  const handleCardLike = (card) => {
    const isLiked = card.likes.some((user) => user === currentUser._id);
    api
      .changeLikeCardStatus(card._id, isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((currentCard) =>
            currentCard._id === card._id ? newCard : currentCard
          )
        );
      })
      .catch((err) => console.log(`Error.....: ${err}`));
  };

  React.useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      auth
        .checkUserToken(token)
        .then((res) => {
          setUserEmail(res.email);
          setLoggedIn(true);
          navigate('/');
        })
        .catch((err) => console.log(`Error.....: ${err}`));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/signin');
    setLoggedIn(false);
    setUserEmail('');
  };

  const handleEditAvatarClick = () => setIsEditAvatarPopupOpen(true);
  const handleEditProfileClick = () => setIsEditProfilePopupOpen(true);
  const handleAddPlaceClick = () => setIsAddPlacePopupOpen(true);

  const handleCardClick = (card) => {
    setSelectedCard(card);
    setIsPreviewPlacePopupOpen(true);
  };

  const handleCardDeleteClick = (card) => {
    setSelectedToDeletecard(card);
    setIsConfirmDeletePopupOpen(true);
  };

  const handleUpdateUser = (user) => {
    setIsDataLoading(true);
    api
      .updateUserInfo(user)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => console.log(`Error.....: ${err}`))
      .finally(() => setIsDataLoading(false));
  };

  const handleUpdateAvatar = (newAvatarLink) => {
    setIsDataLoading(true);
    api
      .updateUserAvatar(newAvatarLink)
      .then((updateUserInfo) => {
        setCurrentUser(updateUserInfo);
        closeAllPopups();
      })
      .catch((err) => console.log(`Error.....: ${err}`))
      .finally(() => setIsDataLoading(false));
  };

  const handleAddPlaceSubmit = (cardName, cardLink) => {
    setIsDataLoading(true);
    api
      .addNewCard(cardName, cardLink)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => console.log(`Error.....: ${err}`))
      .finally(() => setIsDataLoading(false));
  };

  const handleCardDeleteSubmit = (card) => {
    setIsDataLoading(true);
    api
      .deleteCard(card._id)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== card._id));
        closeAllPopups();
      })
      .catch((err) => console.log(`Error.....: ${err}`))
      .finally(() => setIsDataLoading(false));
  };

  const closeAllPopups = () => {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsPreviewPlacePopupOpen(false);
    setIsConfirmDeletePopupOpen(false);
    setSelectedCard(null);
    setSelectedToDeletecard(null);
    setIsInfoTooltipOpen(false);
  };

  React.useEffect(() => {
    const handleClickOutside = (evt) => {
      if (evt.target.classList.contains('popup_opened')) {
        closeAllPopups();
      }
    };

    const handleEscape = (evt) => {
      if (evt.key === 'Escape') {
        closeAllPopups();
      }
    };

    document.addEventListener('click', handleClickOutside);
    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('click', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, []);

  const handleUserRegister = (email, password) => {
    setIsDataLoading(true);

    if (!email || !password) {
      return;
    }
    auth
      .register(email, password)
      .then(() => {
        setIsSuccess(true);
        navigate('/signin');
      })
      .catch((err) => {
        console.log(`Error.....: ${err}`);
        setIsSuccess(false);
      })
      .finally(() => {
        setIsDataLoading(false);
        setIsInfoTooltipOpen(true);
      });
  };

  const handleUserLogin = (email, password) => {
    setIsDataLoading(true);
    if (!email || !password) {
      return;
    }
    auth
      .authorize(email, password)
      .then((data) => {
        // console.log(data);
        if (data.token) {
          localStorage.setItem('token', data.token);
          setLoggedIn(true);
          setUserEmail(email);
          navigate('/');
          return data;
        }
      })
      .catch((err) => {
        console.log(`Error.....: ${err}`);
        setIsSuccess(false);
        setIsInfoTooltipOpen(true);
      })
      .finally(() => {
        setIsDataLoading(false);
      });
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className='page'>
        <Routes>
          <Route
            path='/signin'
            element={
              <>
                <Header
                  loggedIn={loggedIn}
                  linkText='Sign up'
                  linkPath='/signup'
                />
                <Login onSubmit={handleUserLogin} loggedIn={loggedIn} />
              </>
            }
          />
          <Route
            path='/signup'
            element={
              <>
                <Header
                  loggedIn={loggedIn}
                  linkText='Log in'
                  linkPath='/signin'
                />
                <Register onSubmit={handleUserRegister} loggedIn={loggedIn} />
              </>
            }
          />
          <Route
            path='/'
            element={
              <ProtectedRoute exact redirectPath='/signin' loggedIn={loggedIn}>
                <Header
                  loggedIn={loggedIn}
                  linkText='Log out'
                  linkPath='/signin'
                  userEmail={userEmail}
                  handleLogout={handleLogout}
                />

                <Main
                  onEditProfileClick={handleEditProfileClick}
                  onAddPlaceClick={handleAddPlaceClick}
                  onEditAvatarClick={handleEditAvatarClick}
                  onCardClick={handleCardClick}
                  onCardLike={handleCardLike}
                  onCardDeleteClick={handleCardDeleteClick}
                  cards={cards}
                />
              </ProtectedRoute>
            }
          />
        </Routes>

        <ImagePopup
          card={selectedCard}
          onClose={closeAllPopups}
          isOpen={isPreviewPlacePopupOpen}
        />

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
          isDataLoading={isDataLoading}
        />

        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
          isDataLoading={isDataLoading}
        />

        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlaceSubmit={handleAddPlaceSubmit}
          isDataLoading={isDataLoading}
        />

        <ConfirmDeletePopup
          card={selectedToDeleteCard}
          isOpen={isConfirmDeletePopupOpen}
          onClose={closeAllPopups}
          onCardDeleteSubmit={handleCardDeleteSubmit}
          isDataLoading={isDataLoading}
        />

        <Footer />

        <InfoTooltip
          isOpen={isInfoTooltipOpen}
          onClose={closeAllPopups}
          isSuccess={isSuccess}
        />
      </div>
    </CurrentUserContext.Provider>
  );
};

export default App;
