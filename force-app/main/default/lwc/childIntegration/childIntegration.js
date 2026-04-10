import { LightningElement, api, track } from 'lwc';
import getUserProfile from '@salesforce/apex/DummyAuthController.getUserProfile';
import refreshToken from '@salesforce/apex/DummyAuthController.refreshToken';

export default class ChildIntegration extends LightningElement {
    @track userDetails;
    @track errorMessage;

    _accessToken;
    _refreshToken; // ✅ Store refresh token separately

    @api
    get accessToken() {
        return this._accessToken;
    }

    set accessToken(value) {
        if (value) {
            console.log('New Access Token received:', value);
            this._accessToken = value;
            this.fetchUserProfile();
        }
    }

    @api
    get refreshToken() {
        return this._refreshToken;
    }

    set refreshToken(value) {
        if (value) {
            console.log('New Refresh Token received:', value);
            this._refreshToken = value; // ✅ Store refresh token
        }
    }

    async fetchUserProfile() {
        try {
            if (!this._accessToken) {
                console.error('No access token available');
                return;
            }

            console.log('Fetching user profile with accessToken:', this._accessToken);
            const userProfile = await getUserProfile({ accessToken: this._accessToken });

            console.log('User Profile Response:', userProfile);

            if (!userProfile.error) {
                this.userDetails = Object.keys(userProfile).map(key => ({
                    label: key.charAt(0).toUpperCase() + key.slice(1),
                    value: userProfile[key]
                }));
            } else {
                this.errorMessage = userProfile.error;
                console.error('User Profile Error:', this.errorMessage);
            }
        } catch (error) {
            this.errorMessage = 'Error: ' + JSON.stringify(error);
            console.error('Exception:', error);
        }
    }

    async handleRefreshToken() {
        try {
            if (!this._refreshToken) {
                this.errorMessage = 'No refresh token available.';
                console.error(this.errorMessage);
                return;
            }

            console.log('Refreshing token with:', this._refreshToken);
            const response = await refreshToken({ refreshToken: this._refreshToken });

            console.log('Refresh Token API Response:', response);

            if (response.accessToken) {
                console.log('New Access Token:', response.accessToken);
                this._accessToken = response.accessToken;

                // ✅ If a new refresh token is provided, update it
                if (response.refreshToken) {
                    console.log('New Refresh Token:', response.refreshToken);
                    this._refreshToken = response.refreshToken;
                }

                this.fetchUserProfile();  // Fetch updated user profile
            } else {
                this.errorMessage = response.error || 'Failed to refresh token.';
                console.error('Refresh Token Error:', this.errorMessage);
            }
        } catch (error) {
            this.errorMessage = 'Error: ' + JSON.stringify(error);
            console.error('Exception:', error);
        }
    }
}