import dotenv from 'dotenv'
dotenv.config()
export default function generateUrl(): { url: string; port: string } {
    const port: string = process.env.PORT || "3000"
    const host: string = "127.0.0.1" || process.env.HOST
    const url: string = `http://${host}:${port}`
    return { url, port }
}