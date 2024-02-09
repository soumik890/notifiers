export const Template2 = (data) => {
  return `<div>
    <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
      <tr>
        <td style="padding: 20px 0 30px 0;">
          <table align="center" border="0" cellpadding="0" cellspacing="0" width="600" style="border-collapse: collapse; border: 1px solid #cccccc;">
            <tr>
              <td align="center" bgcolor="#ff45f" style="padding: 30px 0 30px 0;">
                <p>Template 2</p>
              </td>
            </tr>
            <tr>
              <td bgcolor="#ffffff" style="padding: 40px 30px 40px 30px;">
                <table border="0" cellpadding="0" cellspacing="0" width="100%" style="border-collapse: collapse;">
                  <tr>
                    <td style="color: #153643; font-family: Arial, sans-serif;">
                      <h1 style="font-size: 24px; margin: 0;">Thank you For Contacting!! </h1>
                      <p>I will get back to you soon !!</p>
                    </td>
                  </tr>
                  <tr>
                    <td style="color: #153643; font-family: Arial, sans-serif; font-size: 16px; line-height: 24px; padding: 20px 0 30px 0;">
                      <p style="margin: 0;">
                      <table border="1" cellspacing="1" cellpadding="5">
                        <tr>
                          <td>First Name</td>
                          <td>:</td>
                          <td>${data?.receiverName}</td>
                        </tr>
                        <tr>
                          <td>Email</td>
                          <td>:</td>
                          <td>${data?.toEmail}</td>
                        </tr>
                        <tr>
                          <td>Message</td>
                          <td>:</td>
                          <td>${data?.message}</td>
                        </tr>
                        <tr>
                          <td>Email Received From Section</td>
                          <td>:</td>
                          <td>Contact Form</td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </div>`;
};
