global class EmailToLeadService implements Messaging.InboundEmailHandler {
    global Messaging.InboundEmailResult handleInboundEmail(Messaging.InboundEmail email, Messaging.InboundEnvelope envelope) {
        Messaging.InboundEmailResult result = new Messaging.InboundEmailResult();

        try {
            // Create a new Lead record
            Lead newLead = new Lead();
            newLead.LastName = email.fromName != null ? email.fromName : 'Unknown';
            newLead.Company = 'TPMM Inquiry'; // required field
            newLead.Email = envelope.fromAddress;
            newLead.Status = 'New';
            newLead.LeadSource = 'Email';
            newLead.Description = email.plainTextBody;

            insert newLead;
        } catch (Exception e) {
            System.debug('Error: ' + e.getMessage());
        }

        return result;
    }
}