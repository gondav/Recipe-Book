import app from './app';
import { db } from './data/connection';

const PORT = process.env.PORT || 3000;

db.checkConnection();

app.listen(PORT, () => console.log(`Server started on port:${PORT}`));
