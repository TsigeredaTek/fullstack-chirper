import { Query } from '../'

const all = () => Query('SELECT id, username FROM users');
const one = (userid: number) => Query('SELECT id, username FROM users WHERE id = ?', [userid])
const newuser = (name: string) => Query('INSERT INTO users(name) VALUE (?)', [name])

export default {
    all,
    one,
    newuser
}