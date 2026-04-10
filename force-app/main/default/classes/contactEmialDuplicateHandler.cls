public with sharing class contactEmialDuplicateHandler {
    // Method to prevent duplicate contacts
    public static void handleBeforeInsertUpdate(List<Contact> contacts) {
        Set<String> emailSet = new Set<String>();
        
        for (Contact con : contacts) {
            if (con.Email != null) {
                emailSet.add(con.Email);
            }
        }

        // Check for existing contacts with the same email
        if (!emailSet.isEmpty()) {
            Integer count = [SELECT COUNT() FROM Contact WHERE Email IN :emailSet];

            if (count > 0) {
                for (Contact con : contacts) {
                    if (con.Email != null) {
                        con.addError('A contact with this email already exists.');
                    }
                }
            }
        }
    }
    
    // Method to handle email change and send confirmation
    public static void handleAfterUpdate(Map<Id, Contact> oldMap, List<Contact> newContacts) {
        Set<Id> contactIds = new Set<Id>();

        for (Contact con : newContacts) {
            Contact oldCon = oldMap.get(con.Id);
            if (oldCon.Email != con.Email) {  // Detect email change
                contactIds.add(con.Id);
            }
        }

        if (!contactIds.isEmpty()) {
            sendConfirmationEmail(contactIds);
        }
    }

    // Future method to send confirmation email
    @future
    public static void sendConfirmationEmail(Set<Id> contactIds) {
        List<Contact> contactList = [SELECT Id, Email, FirstName FROM Contact WHERE Id IN :contactIds];

        List<Messaging.SingleEmailMessage> emails = new List<Messaging.SingleEmailMessage>();

        for (Contact con : contactList) {
            if (con.Email != null) {
                Messaging.SingleEmailMessage mail = new Messaging.SingleEmailMessage();
                mail.setToAddresses(new List<String>{con.Email});
                mail.setSubject('Email Change Confirmation');
                mail.setPlainTextBody('Hello ' + con.FirstName + ', your email has been updated successfully.');
                emails.add(mail);
            }
        }

        if (!emails.isEmpty()) {
            Messaging.sendEmail(emails);
        }
    }
}