import type { NextApiRequest, NextApiResponse } from "next";
import connect from "@/helper/db";
import { corsAllow } from "@/helper/cors";
import { transporter } from "@/services/nodeMailer";
import { findCarById } from "@/services/carService";
const myEmail = process.env.NEXT_PUBLIC_PERSONAL_EMAIL;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await connect();
  await corsAllow(req, res);
  const data = req.body;
  console.log(data);
  switch (req.method) {
    case "POST":
      if (!data.email) {
        return res.status(400).json({ message: "Email required" });
      } else {
        try {
          const findUsersOrder = await findCarById(data.carId);
          await transporter.sendMail({
            from: myEmail,
            to: data.email,
            subject: "Invoice for your purchase",
            text: "Please find attached invoice for your purchase.",
            html: `<!DOCTYPE html>
                  <html lang="en">
                  <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>Invoice</title>
                    <style>
                      body {
                        font-family: Arial, sans-serif;
                      }
                      h1 {
                        text-align: center;
                      }
                      table {
                        width: 100%;
                        border-collapse: collapse;
                        margin-top: 20px;
                      }
                      th, td {
                        border: 1px solid #ddd;
                        padding: 8px;
                        text-align: left;
                      }
                      th {
                        background-color: #f2f2f2;
                      }
                      tfoot td {
                        font-weight: bold;
                      }
                      .footer {
                        margin-top: 20px;
                        text-align: center;
                      }
                    </style>
                  </head>
                  <body>
                    <h1>Invoice</h1>
                    <table>
                      <thead>
                        <tr>
                          <th>Model</th>
                          <th>Description</th>
                          <th>Price</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>${findUsersOrder.carModel}</td>
                          <td>Description of Item 1</td>
                          <td>${findUsersOrder.startPrice}</td>
                        </tr>
                      </tbody>
                      <tfoot>
                        <tr>
                          <td colspan="4" style="text-align: right;">Total:</td>
                          <td>${findUsersOrder.startPrice}</td>
                        </tr>
                      </tfoot>
                    </table>
                    <div class="footer">
                      <p>Please make the payment by the due date mentioned in the invoice.</p>
                      <p>If you have any questions, feel free to contact us at luxuryCarAuction@example.com</p>
                    </div>
                  </body>
                  </html>`,
          });
          return res.status(200).json({
            message: "Email successfully sent",
          });
        } catch (e: any) {
          return res.status(400).json({ message: e.message });
        }
      }
  }
}
