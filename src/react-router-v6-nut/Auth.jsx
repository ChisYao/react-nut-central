import React, {useContext, useState} from "react";

const fakeAuthProvider = {
    isAuthenticated: false,
    signIn(callback){
        fakeAuthProvider.isAuthenticated = true;
        setTimeout(callback, 500);
    },
    signOut(callback){
        fakeAuthProvider.isAuthenticated = false;
        setTimeout(callback, 5000);
    }
}

const AuthContext = React.createContext(null);

export function AuthProvider({children}){
    const [user, setUser] = useState(null);
    // 用户登录方法
    const signIn = (newUser,callback) => {
        setUser(newUser);
        callback();
    }
    // 用户登出方发表
    const signOut = (callback) => {
        setUser(null);
        callback();
    }

    return <AuthContext.Provider value={{user,signIn,signOut}}>{children}</AuthContext.Provider>;
}

export function useAuth(){
    return useContext(AuthContext);
}