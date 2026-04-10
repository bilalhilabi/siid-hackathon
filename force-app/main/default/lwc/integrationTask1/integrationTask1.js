import { LightningElement, track } from 'lwc';
import getAuthToken from '@salesforce/apex/DummyAuthController.getAuthToken';

export default class IntegrationTask1 extends LightningElement {
    @track username = '';
    @track password = '';
    @track authData;
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
        this.authData = null;
    
        try {
            console.log('Logging in with:', this.username, this.password);
    
            const authResponseString = await getAuthToken({ username: this.username, password: this.password });
            console.log('Raw Auth API Response:', authResponseString);
    
            const authResponse = JSON.parse(authResponseString);
            console.log('Parsed Auth API Response:', authResponse);
    
            if (authResponse && authResponse.accessToken && authResponse.refreshToken) {
                this.authData = {
                    accessToken: authResponse.accessToken,
                    refreshToken: authResponse.refreshToken // ✅ Ensure refreshToken is stored
                };
                console.log('Auth Data Passed to Child:', this.authData);
            } else {
                this.errorMessage = authResponse.error || 'Authentication failed.';
                console.error('Auth Error:', this.errorMessage);
            }
        } catch (error) {
            this.errorMessage = 'Error: ' + JSON.stringify(error);
            console.error('Exception:', error);
        }
    }
    
}