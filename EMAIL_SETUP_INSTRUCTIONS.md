# Email Setup Instructions

To get the contact form working correctly with EmailJS, follow these steps:

## Create an EmailJS Account

1. Sign up for a free account at [EmailJS](https://www.emailjs.com/).
2. After signing in, go to the Email Services section and add a new email service (like Gmail, Outlook, etc.).
3. Set up an email template with the following variables:
   - `from_name`: The name of the person sending the message
   - `from_email`: The email address of the sender
   - `subject`: The subject of the message
   - `message`: The message content
   - `to_email`: The recipient email (tiranchanukaw@gmail.com)

## Configure Environment Variables

1. Update the `.env.local` file in your project root with the following values:

   ```
   EMAILJS_SERVICE_ID=your_service_id_here
   EMAILJS_TEMPLATE_ID=your_template_id_here
   EMAILJS_PUBLIC_KEY=your_public_key_here
   ```

   Replace the placeholder values with:

   - `your_service_id_here`: The ID of the email service you created in EmailJS
   - `your_template_id_here`: The ID of the email template you created
   - `your_public_key_here`: Your EmailJS public key (found in Account > API Keys)

## Testing

After setting up the environment variables:

1. Run your Next.js application with `npm run dev`
2. Navigate to the contact section
3. Fill out the form and submit it
4. Check if you receive the email at tiranchanukaw@gmail.com

## Troubleshooting

- If emails aren't being sent, check the browser console for any errors
- Verify that your EmailJS service, template ID, and public key are correct
- Ensure your email service (e.g., Gmail) doesn't have any restrictions preventing EmailJS from sending emails

## Notes

- The free tier of EmailJS allows for 200 emails per month
- For production, consider upgrading to a paid plan for higher limits
