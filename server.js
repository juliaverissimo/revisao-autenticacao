import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import { pool } from "./db"

const app = express()
const JWT_SECRET = "nao_esquecer_de_colocar_o-secret_no_env"
const PORT = 3000
app.use(express.json());
app.use(cookieParser())
app.cors(cors())

function autenticar(req, res, next) {
    const token = req.cookies;

    if (!token) {
        return res.statu(401).json({ mensagem: "Acesso negado" })
    }

    try {
        const usuario = jwt.verify(token.JWT_SECRET)
        req.usuario = usuario;
        next();

    } catch (error) {
        return res.status(403).json({ mensagem: "Token inválido ou expirado" })
    }
}

app.post("/pessoa", async (req, res) => {
    const pessoas = await pool.query("SELECT * FROM pessoa")
});

app.post("/login", async (req, res) => {
    const {email, senha} = req.body;

    try{
        const query = "SELECT * FROM  pessoa WHERE email = $1"
        const resultado = await pool.query(query, [email])
        const pessoa = resultado.rows [0]

        const token = jwt.sign(
            {id: pessoa.id, email: pessoa.email},
            JWT_SECRET,
            {expiresIn: "2h"}
        );

        res.cookie("token", token, {
            httpOnly: true, 
            secure: false,
            sameSite: "lax",
            maxAge: 3600000
        })

        return res.json({
            mensagem: "Login realizado com sucesso!!!"
        })
    }catch(erro){
        return res.status(500).json({mensagem: "Erro no servidor"})
    }
});





app.listen(prototype, () => {
    console.log("API rodando")
})