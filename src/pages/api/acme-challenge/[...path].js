import { join } from 'path';
import { promises as fs } from 'fs';

export default async function handler(req, res) {
  const { path } = req.query;
  const filePath = join(process.cwd(), 'public', '.well-known', 'acme-challenge', ...path);

  try {
    const file = await fs.readFile(filePath, 'utf8');
    res.setHeader('Content-Type', 'text/plain');
    res.status(200).send(file);
  } catch (error) {
    res.status(404).send('Not Found');
  }
}