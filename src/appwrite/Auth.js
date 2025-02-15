import conf from '../conf/conf.js';
import { Client, Account } from "appwrite";


export class AuthService {
    client = new Client();
    account;

    constructor() {
       
        this.client
            .setEndpoint(conf.appWriteUrl)
            .setProject(conf.appWriteProjectId);
        this.account = new Account(this.client);
            
    }

    async createAccount({ email, password, fullName }) {
        try {
          // Passing an empty string to auto-generate the user ID (if your server supports it)
          const userAccount = await this.account.create("unique()", email, password, fullName);
          if (userAccount) {
            return this.login({ email, password });
          } else {
            return userAccount;
          }
        } catch (error) {
          console.log(error);
          throw error;
        }
      }
      
      
      async login({ email, password }) {
        try {
          // Option 1: Try createEmailSession first
          return await this.account.createEmailPasswordSession(email, password);
        } catch (error) {
          console.log("createEmailSession failed, trying createSession", error);
          // Option 2: Fall back to createSession
          return await this.account.createSession(email, password);
        }
      }
      

    async getCurrentUser() {
        try {
            return await this.account.get();
        } catch (error) {
            console.log("Appwrite serive :: getCurrentUser :: error", error);
        }

        return null;
    }

    async logout() {

        try {
            await this.account.deleteSessions();
        } catch (error) {
            console.log("Appwrite serive :: logout :: error", error);
        }
    }
}

const authService = new AuthService();

export default authService

