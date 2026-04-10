import { LightningElement, track } from 'lwc';
import getAuthToken from '@salesforce/apex/DummyAuthController.getAuthToken';
import getUserProfile from '@salesforce/apex/DummyAuthController.getUserProfile';

export default class DummyAuthLogin extends LightningElement {
    @track username = '';
    @track password = '';
    @track accessToken = '';
    @track refreshToken = '';
    @track userDetails;
    @track errorMessage;

    handleInputChange(event) {
        const field = event.target.name;
        if (field === 'username') {
            this.username = event.target.value;
        } else if (field === 'password') {
            this.password = event.target.value;
        }
    }

    async handleLogin() {
        this.errorMessage = '';
        this.userDetails = null;

        try {
            // 🔥 Step 1: Get Auth Token
            const authResponse = await getAuthToken({ username: this.username, password: this.password });

            // 🔥 Step 2: Parse Response
            const parsedResponse = JSON.parse(authResponse);

            if (parsedResponse.accessToken) {
                this.accessToken = parsedResponse.accessToken;
                this.refreshToken = parsedResponse.refreshToken;

                // 🔥 Step 3: Fetch User Profile
                const userProfile = await getUserProfile({ accessToken: this.accessToken });

                if (!userProfile.error) {
                    this.userDetails = userProfile;
                } else {
                    this.errorMessage = userProfile.error;
                }
            } else {
                this.errorMessage = parsedResponse.error || 'Authentication failed.';
            }
        } catch (error) {
            this.errorMessage = 'Error: ' + JSON.stringify(error);
        }
    }

    // 🔥 Helper to format user details for display
    get userData() {
        if (!this.userDetails) return [];
        return Object.keys(this.userDetails).map((key) => ({
            label: key,
            value: this.userDetails[key]
        }));
    }
}