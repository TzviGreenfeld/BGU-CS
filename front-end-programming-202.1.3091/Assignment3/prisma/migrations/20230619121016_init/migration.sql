-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_users" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT,
    "userName" TEXT,
    "password" TEXT,
    "email" TEXT,
    "email_verified" DATETIME,
    "image" TEXT DEFAULT 'https://res.cloudinary.com/dicczqmkf/image/upload/v1686396738/default_profile_pic_ojbb4o.jpg',
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL
);
INSERT INTO "new_users" ("created_at", "email", "email_verified", "id", "image", "name", "password", "updated_at", "userName") SELECT "created_at", "email", "email_verified", "id", "image", "name", "password", "updated_at", "userName" FROM "users";
DROP TABLE "users";
ALTER TABLE "new_users" RENAME TO "users";
CREATE UNIQUE INDEX "users_userName_key" ON "users"("userName");
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
