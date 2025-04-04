import { promises as fs } from 'fs';
import path from 'path';

export default async function handler(req, res) {
  const { token } = req.query;
  const filePath = path.join(process.cwd(), 'public', '.well-known', 'acme-challenge', token);

  try {
    const fileContent = await fs.readFile(filePath, 'utf8');
    res.status(200).send(fileContent);
  } catch (error) {
    res.status(404).send('File not found');
  }
}
