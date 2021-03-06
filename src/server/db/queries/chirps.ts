import { Query } from '../';

const all = () =>
	Query(`
    SELECT
        chirps.*,
        users.name
    FROM chirps
    JOIN users ON users.id = chirps.userid
    ORDER BY chirps.id DESC
`);

const one = (id: number) =>
	Query(
		`
    SELECT
        chirps.*,
        users.name
    FROM chirps
    JOIN users ON users.id = chirps.userid
    WHERE chirps.id = ?
`,
		[id]
	);

const insert = (content: string, userid?: number) =>
	Query(`INSERT INTO chirps (userid, content) VALUE (?, ?)`, [userid, content]);

const update = (id: number, content: string) => Query(`UPDATE chirps SET content = ? WHERE id = ?`, [content, id]);

const destroy = (id: number) => Query(`DELETE FROM chirps WHERE id = ?`, [id]);

export default {
	all,
	one,
	insert,
	update,
	destroy
};