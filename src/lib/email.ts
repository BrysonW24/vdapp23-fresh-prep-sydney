import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function sendOrderConfirmation(email: string, orderNumber: string, total: number) {
  await resend.emails.send({
    from: 'Fresh Prep Sydney <orders@freshprepsydney.com.au>',
    to: email,
    subject: `Order Confirmed — ${orderNumber}`,
    html: `<h1>Thanks for your order!</h1><p>Order ${orderNumber} has been confirmed. Total: $${total.toFixed(2)}</p>`,
  })
}

export async function sendWelcomeEmail(email: string, name: string) {
  await resend.emails.send({
    from: 'Fresh Prep Sydney <hello@freshprepsydney.com.au>',
    to: email,
    subject: 'Welcome to Fresh Prep Sydney!',
    html: `<h1>Welcome, ${name}!</h1><p>Thanks for joining Fresh Prep Sydney. Start browsing our meals today.</p>`,
  })
}
