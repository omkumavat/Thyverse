import { Client, Account, OAuthProvider } from "appwrite";
import conf from '../conf/conf.js';

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
            // Attempt to create a new account
            const userAccount = await this.account.create("unique()", email, password, fullName);
            return userAccount; // Return the created user account or handle differently if needed
        } catch (error) {
            console.error("Error creating account:", error);
            throw error;
        }
    }

    async login({ email, password }) {
        try {
            // Try to create a session using email and password
            return await this.account.createEmailPasswordSession(email, password);
        } catch (error) {
            console.error("Failed to create email session, error:", error);
            throw error;
        }
    }

    async getCurrentUser() {
        try {
            return await this.account.get();
        } catch (error) {
            console.error("Error fetching current user:", error);
            return null;
        }
    }

    async logout() {
        try {
            await this.account.deleteSessions();
        } catch (error) {
            console.error("Error logging out:", error);
        }
    }


    async loginWithGoogle() {
      if (!this.account) {
          console.error("Appwrite account is not initialized.");
          return;
      }
  
      try {
          // Redirects user to Google login page
          return await this.account.createOAuth2Session(OAuthProvider.Google);
      } catch (error) {
          console.error("Google login failed:", error);
      }
  }
}

const authService = new AuthService();
export default authService;
