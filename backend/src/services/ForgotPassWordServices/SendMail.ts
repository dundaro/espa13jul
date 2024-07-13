import { config } from "dotenv";
import nodemailer from "nodemailer";
import sequelize from "sequelize";

import database from "../../database";

config();

interface UserData {
  companyId: number;
}

const SendMail = async (email: string, tokenSenha: string) => {
  const { hasResult, data } = await filterEmail(email);
  
  if (!hasResult) {
    return { status: 404, message: "Email não encontrado" };
  }
  
  const userData = data[0][0] as UserData;
  
  if (!userData || userData.companyId === undefined) {
    return { status: 404, message: "Dados do usuário não encontrados" };
  }
  
  const companyId = userData.companyId;
  const urlSmtp = process.env.MAIL_HOST;
  const userSmtp = process.env.MAIL_USER;
  const passwordSmpt = process.env.MAIL_PASS;
  const fromEmail = process.env.MAIL_FROM;
  
  const transporter = nodemailer.createTransport({
    host: urlSmtp,
    port: Number(process.env.MAIL_PORT),
    secure: true,
    auth: { user: userSmtp, pass: passwordSmpt }
  });
  
  if (hasResult === true) {
    const { hasResults, datas } = await insertToken(email, tokenSenha);
    
    async function sendEmail() {
      try {
        const mailOptions = {
          from: fromEmail,
          to: email,
          subject: "Redefinição de Senha - Whaticket Saas",
          html: `
            <!DOCTYPE html>
<html lang="pt">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Redefinição de Senha - Whaticket Saas</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      background-color: #f4f4f4;
      margin: 0;
      padding: 0;
    }
    .outer-container {
  background-color: #F7F7F7; /* Cinza claro */
  padding: 20px 0; /* Adicionando 20px de padding superior e inferior e 0 de padding esquerdo e direito */
  display: flex;
  justify-content: center; /* Centralizar horizontalmente */
  align-items: center; /* Centralizar verticalmente */
}

    .container {
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
      background-color: #ffffff; /* Branco */
      border-top: 4px solid #00ABFF; /* Borda laranja apenas na parte superior */
      border-radius: 0 0 10px 10px; /* Borda arredondada apenas na parte inferior */
      box-shadow: 0px 0px 10px 0px rgba(0,0,0,0.1);
    }

    h1 {
      color: #333;
      font-size: 24px;
      margin-bottom: 20px;
    }

    p {
      color: #333;
      font-size: 16px;
      line-height: 1.5;
      margin-bottom: 10px;
    }

    strong {
      color: #000;
    }

    .signature {
      color: #777;
      font-size: 14px;
    }
  </style>
</head>
<body>
  <div class="outer-container">
    <div class="container">
      <h1>Bem-vindo à Whaticket Saas</h1>
      <p>Você solicitou recuperação de senha do Sistema Whaticket!</p>
      <p>Seu código de verificação é: <strong>${tokenSenha}</strong></p>
      <p>Se não foi você, ignore este e-mail.</p>
      <p class="signature">Atenciosamente,<br>Equipe Whaticket Saas</p>
    </div>
  </div>
</body>
</html>

          `
        };
        
        const info = await transporter.sendMail(mailOptions);
        console.log("E-mail enviado: " + info.response);
      } catch (error) {
        console.log(error);
      }
    }
    
    sendEmail();
  }
};

const filterEmail = async (email: string) => {
  const sql = `SELECT * FROM "Users"  WHERE email ='${email}'`;
  const result = await database.query(sql, {
    type: sequelize.QueryTypes.SELECT
  });
  
  return { hasResult: result.length > 0, data: [result] };
};

const insertToken = async (email: string, tokenSenha: string) => {
  const sqls = `UPDATE "Users" SET "resetPassword"= '${tokenSenha}' WHERE email ='${email}'`;
  const results = await database.query(sqls, {
    type: sequelize.QueryTypes.UPDATE
  });
  
  return { hasResults: results.length > 0, datas: results };
};

export default SendMail;
