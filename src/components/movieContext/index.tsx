import React, { useState, useEffect, createContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const MovieContext = createContext<any>(null);

interface IProps {
  children: JSX.Element;
}

const MovieContextProvider: React.FC<IProps> = ({ children }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isLogged, setIsLogged] = useState<boolean>(false);

  const setDelay = (ms: number) => {
    return new Promise(reslove => setTimeout(reslove, ms));
  };

  // login
  const storeLoginData = async (value: any) => {
    const json = JSON.stringify(value);
    await AsyncStorage.setItem('@login_data', json);
  };

  const initLoadStorageData = async () => {
    setIsLoading(true);
    await setDelay(1300); // forced delay
    try {
      const user: any = await AsyncStorage.getItem('@login_data');
      if (user !== null) {
        const userObject = JSON.parse(user);
        if (userObject.status === 'ok') {
          setIsLogged(true);
          setIsLoading(false);
        }
      } else {
        setIsLoading(false);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const logout = async () => {
    try {
      // await AsyncStorage.clear();
      await AsyncStorage.removeItem('@login_data');
      setIsLogged(false);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    initLoadStorageData();
  }, []);

  return (
    <MovieContext.Provider
      value={{
        isLogged,
        setIsLogged,
        storeLoginData,
        isLoading,
        setIsLoading,
        logout,
      }}>
      {children}
    </MovieContext.Provider>
  );
};

export { MovieContext, MovieContextProvider };
