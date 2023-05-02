.PHONY: prisma
prisma:
	rm -rf ./prisma/dev.db
	npx prisma migrate dev --name init && npm run dev
