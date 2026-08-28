import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import process from 'node:process';
import dotenv from 'dotenv';

dotenv.config();

const connectionString = process.env.DATABASE_URL;
console.log('📡 Probando conexión a PostgreSQL...');
console.log('URL:', connectionString?.replace(/:[^:@]*@/, ':****@'));

try {
  const adapter = new PrismaPg({ 
    connectionString: connectionString,
  });
  const prisma = new PrismaClient({ adapter });
  
  const result = await prisma.$queryRaw`SELECT 1 as test`;
  console.log('✅ Conexión exitosa:', result);
} catch (error) {
  console.error('❌ Error de conexión:', error);
  console.error('Detalles:', error?.meta?.driverAdapterError?.cause);
}