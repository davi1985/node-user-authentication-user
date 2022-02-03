import { Pool } from 'pg';

const connectionString =
  'postgres://pyqgqqzn:b_4twNeLkj1eeqRR50tIuiDFLpjepF3R@kesavan.db.elephantsql.com/pyqgqqzn';

export const db = new Pool({ connectionString });
