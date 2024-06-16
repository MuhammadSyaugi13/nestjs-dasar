
export class MailService {
    send() {
        console.log('Send Email from MailService class')
        return 'method send on MailService class success'
    }
}

// value provider
export const mailService = new MailService()
