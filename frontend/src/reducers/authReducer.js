
import {
    CUSTOMER_USER_LOADED,
    CUSTOMER_USER_FAILED,  
    OWNER_USER_LOADED,
    OWNER_USER_FAILED,
    LOGIN_SUCCESS,
    LOGIN_FAILED, LOGOUT_SUCCESS, REGISTER_CUSER_SUCCESS,
    REGISTER_FUSER_FAILED,
    REGISTER_FUSER_SUCCESS,
    REGISTER_CUSER_FAILED,
    PEMILIKKOS_USER_PROFILE,
    PASSWORD_RESET_CONFIRM_SUCCESS,
    PASSWORD_RESET_CONFIRM_FAIL,
    PASSWORD_RESET_SUCCESS,
    PASSWORD_RESET_FAIL,
    PASSWORD_CHANGE_FAIL,
    PASSWORD_CHANGE_SUCCESS,
    CLEAR_ERRORS
 } from "../actions/types"



    const initialState={
        token:localStorage.getItem('token'),
        access_token:localStorage.getItem('access_token'),
        refresh_token:localStorage.getItem('refresh_token'),
        userId: null,
        ownerId: null,
        customerId: null,
        username: localStorage.getItem('username'),
        isAuthenticated:null,
        isCustomer:null,
        isOwner: null,
        isLoading:false,
        email: localStorage.getItem('email'), 
        error: null,     
        user: null
    }
    
export const authReducer=(state=initialState, action)=>{
    switch(action.type){
       
        case REGISTER_CUSER_SUCCESS:
            localStorage.setItem('token', action.payload.token)
            localStorage.setItem('access_token', action.payload.access_token)
            localStorage.setItem('refresh_token', action.payload.refresh_token)
            return {
                ...state,
                ...action.payload,
                isAuthenticated:true,
                isCustomer:action.payload.user.is_customer,
                isOwner:action.payload.user.is_owner,
                isLoading:false
            }
        case REGISTER_FUSER_SUCCESS:
            localStorage.setItem('token', action.payload.token)
            localStorage.setItem('access_token', action.payload.access_token)
            localStorage.setItem('refresh_token', action.payload.refresh_token)
            return {
                ...state,
                ...action.payload,
                isAuthenticated:true,
                isCustomer:action.payload.user.is_customer,
                isOwner:action.payload.user.is_owner,
                isLoading:false
            }
        case CUSTOMER_USER_LOADED:
            return{
                ...state,
                isAuthenticated:true,
                isCustomer:true,
                user:action.payload,
                customer:action.payload
            }
        case  OWNER_USER_LOADED:
            return {
                ...state,
                isAuthenticated:true,
                isOwner: true,
                user:action.payload,
                owner:action.payload
            }

        case LOGIN_SUCCESS:
            localStorage.setItem('token', action.payload.token)
            localStorage.setItem('access_token', action.payload.access_token)
            localStorage.setItem('refresh_token', action.payload.refresh_token)
            return {
                ...state,
                ...action.payload,
                userId: action.payload.user_id,
                ownerId: action.payload.owner_id,
                customerId: action.payload.customer_id,
                username: action.payload.username,
                isAuthenticated:true,
                isLoading:false,
                isCustomer: action.payload.is_customer,
                isOwner:action.payload.is_owner,               
                
            }
        case LOGIN_FAILED:
            return {
                ...state,
                isLoading: false,
                error: action.payload,
            };
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null,
            };
        
        
        case REGISTER_CUSER_FAILED:
            return {
                ...state,
                isLoading: false,
                error: action.payload,
            };
        case REGISTER_FUSER_FAILED:
            return {
                ...state,
                isLoading: false,
                error: action.payload,
            };
        

        case CUSTOMER_USER_FAILED:
        case OWNER_USER_FAILED:
        case LOGOUT_SUCCESS:
            localStorage.removeItem('token')
            localStorage.removeItem('refresh_token')
            localStorage.removeItem('access_token')
            return {
                ...state,
                isCustomer:null,
                isOwner:null,
                token:null,
                access_token:null,
                refresh_token:null,
                username:null,
                userId:null,
                ownerId:null,
                customerId:null,
                isAuthenticated:false,
                isLoading:false,
                email:null
            }
   
            
        case PASSWORD_RESET_SUCCESS:
        case PASSWORD_RESET_FAIL:
            return {
                ...state,
                isLoading: false,
                error: action.payload,
            };
        case PASSWORD_RESET_CONFIRM_SUCCESS:
        case PASSWORD_RESET_CONFIRM_FAIL:
            return {
                ...state,
                isLoading: false,
                error: action.payload,
            };
        case PASSWORD_CHANGE_FAIL:
            
            return {
                ...state,
                isLoading: false,
                error: action.payload,
                
            };
            
        case PASSWORD_CHANGE_SUCCESS:
            
        default:
           
    }
    return state 
}

